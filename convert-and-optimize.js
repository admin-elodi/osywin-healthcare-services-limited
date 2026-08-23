#!/usr/bin/env node
// convert-and-optimize.js
// Node v22+ ESM compatible
//
// Converts jpg/jpeg/png -> webp and mp4 -> webm, resizing/re-quality-searching
// each file down to a sensible size cap instead of just re-encoding at
// whatever resolution the source happened to be. Also rewrites the code
// references that import them, backs up every original before touching it,
// and (behind a flag) can revisit assets that were already converted by an
// earlier run to bring them under the current caps too.
//
// Usage:
//   node convert-and-optimize.js                    convert new files + update code refs
//   node convert-and-optimize.js --reoptimize-existing   also re-cap already-.webp/.webm files
//   node convert-and-optimize.js --images-only       skip video work entirely
//   node convert-and-optimize.js --videos-only       skip image work entirely
//   node convert-and-optimize.js --dry-run           log what would happen, touch nothing
//   node convert-and-optimize.js --help              print this usage

import fs from "fs-extra";
import sharp from "sharp";
import ffmpeg from "fluent-ffmpeg";
import { glob } from "glob";
import path from "path";
import process from "node:process";

// --------------------- CLI flags ---------------------
const argv = process.argv.slice(2);
const FLAGS = {
  dryRun: argv.includes("--dry-run"),
  reoptimizeExisting: argv.includes("--reoptimize-existing"),
  imagesOnly: argv.includes("--images-only"),
  videosOnly: argv.includes("--videos-only"),
  help: argv.includes("--help") || argv.includes("-h"),
};

if (FLAGS.help) {
  console.log(`
convert-and-optimize.js

  node convert-and-optimize.js                          convert new files + update code refs
  node convert-and-optimize.js --reoptimize-existing     also re-cap already-.webp/.webm files
  node convert-and-optimize.js --images-only             skip video work entirely
  node convert-and-optimize.js --videos-only             skip image work entirely
  node convert-and-optimize.js --dry-run                 log what would happen, touch nothing
`);
  process.exit(0);
}

// --------------------- Config ---------------------
const imageRoot = "src/assets/images";
const videoRoot = "src/assets/videos";
const codeRoot = "src";
const backupDir = "backup_before_conversion";

// Every image and video on this site ships full-bleed behind a dark overlay
// or as a small card/section photo - nothing needs to reach the browser at
// its original camera/stock-photo resolution. These caps make sure a
// forgotten 4000px hero shot (or a re-run that finds an already-converted
// file has crept back up in size) never ships at full size.
const IMAGE_MAX_DIMENSION = 2000; // longest side, px - resized before encoding
const IMAGE_MAX_QUALITY = 80; // webp quality search starts here
const IMAGE_MIN_QUALITY = 40; // ...and won't go below this even to hit the cap
const IMAGE_QUALITY_STEP = 6;
const IMAGE_EFFORT = 6; // webp compression effort, 0-6

// Target size caps, tiered by the image's resized footprint - a full-bleed
// hero shouldn't be squeezed as hard as a 300px card thumbnail just because
// they share one flat KB limit.
function imageTargetBytes(width, height) {
  const longest = Math.max(width, height);
  if (longest >= 1600) return 450 * 1024; // hero / full-bleed background
  if (longest >= 800) return 250 * 1024; // section or card photography
  return 150 * 1024; // thumbnails, icons, small art
}

// Every video here is an autoplay, muted, looping background - the visible
// detail tops out well below most source resolutions.
const VIDEO_MAX_WIDTH = 1600;
const VIDEO_TARGET_BYTES = 6 * 1024 * 1024; // soft cap - triggers one CRF escalation
const VIDEO_ESCALATED_CRF = 38;

const ffmpegVideoOptions = (crf) => [
  // fluent-ffmpeg already passes -y for file outputs, so overwrite is implicit
  "-c:v", "libvpx-vp9",
  "-b:v", "0", // must be 0 when using CRF
  "-crf", String(crf),
  "-cpu-used", "2",
  "-row-mt", "1",
  "-tile-columns", "2",
  "-frame-parallel", "1",
  "-c:a", "libopus",
  "-b:a", "80k",
];

// --------------------- Stats ---------------------
const stats = {
  images: { converted: 0, before: 0, after: 0 },
  videos: { converted: 0, before: 0, after: 0 },
  stillOverCap: [],
};

// Tracks basenames that either now exist on disk (real run) or successfully
// encoded in memory (dry run) so updateCodeReferences can give an accurate
// preview even when --dry-run never actually writes the .webp/.webm file.
const convertedWebpBasenames = new Set();
const convertedWebmBasenames = new Set();

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
  return `${(bytes / 1024).toFixed(1)}KB`;
}

// --------------------- Helpers ---------------------

async function ensureBackup(file) {
  if (FLAGS.dryRun) return;
  const relative = path.relative(process.cwd(), file);
  const backupPath = path.join(backupDir, relative);
  await fs.ensureDir(path.dirname(backupPath));
  await fs.copy(file, backupPath, { overwrite: false });
}

// Runs `worker` over `items` with at most `limit` in flight at once. Sharp's
// image work is cheap enough per-file to benefit from parallelism across
// cores; ffmpeg is not (it already threads internally per file), so video
// conversion is kept sequential further down instead of using this.
async function runWithConcurrency(items, limit, worker) {
  let cursor = 0;
  async function next() {
    while (cursor < items.length) {
      const index = cursor++;
      await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, next));
}

function probeVideo(file) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(file, (err, data) => {
      if (err) return reject(err);
      const videoStream = (data.streams || []).find((s) => s.codec_type === "video");
      resolve({
        width: videoStream?.width ?? null,
        height: videoStream?.height ?? null,
        duration: data.format?.duration ? parseFloat(data.format.duration) : null,
      });
    });
  });
}

// Encodes `inputFile` to `outputPath` at the given CRF, scaling down to
// VIDEO_MAX_WIDTH first if the source is wider than that. If the result is
// still above VIDEO_TARGET_BYTES, re-encodes once more at a higher
// (lossier) CRF and keeps whichever pass produced the smaller file.
async function encodeVideoCapped(inputFile, outputPath, label, displayPath = outputPath) {
  const probe = await probeVideo(inputFile).catch(() => null);
  const needsScale = probe?.width && probe.width > VIDEO_MAX_WIDTH;

  const runPass = (crf) =>
    new Promise((resolve, reject) => {
      const cmd = ffmpeg(inputFile).outputOptions(ffmpegVideoOptions(crf));
      if (needsScale) cmd.videoFilters(`scale='min(iw,${VIDEO_MAX_WIDTH})':-2`);
      cmd
        .save(outputPath)
        .on("start", (commandLine) => console.log(`   ffmpeg: ${commandLine}`))
        .on("progress", (progress) => {
          if (progress.percent) {
            process.stdout.write(`\r   ${label} - encoding (crf ${crf}): ${progress.percent.toFixed(1)}%`);
          }
        })
        .on("end", () => {
          process.stdout.write("\n");
          resolve();
        })
        .on("error", (err, stdout, stderr) => {
          process.stdout.write("\n");
          console.error(`   ✖ ffmpeg failed on ${inputFile}:`, err.message);
          if (stderr) console.error(stderr);
          reject(err);
        });
    });

  await runPass(33);
  let size = (await fs.stat(outputPath)).size;

  if (size > VIDEO_TARGET_BYTES) {
    console.log(`   ${formatBytes(size)} is still over the ${formatBytes(VIDEO_TARGET_BYTES)} target - re-encoding at crf ${VIDEO_ESCALATED_CRF}`);
    await runPass(VIDEO_ESCALATED_CRF);
    size = (await fs.stat(outputPath)).size;
  }

  if (size > VIDEO_TARGET_BYTES) {
    stats.stillOverCap.push(`${displayPath} (${formatBytes(size)})`);
    console.warn(`   ⚠ ${displayPath} is still ${formatBytes(size)} after escalation - consider trimming its duration.`);
  }

  return size;
}

// --------------------- Images: new conversions ---------------------

async function convertImagesToWebP(root) {
  const files = await glob(`${root}/**/*.{jpg,jpeg,png}`, { nocase: true, nodir: true });
  console.log(`\nFound ${files.length} image(s) to convert...`);

  await runWithConcurrency(files, 4, async (file, i) => {
    const webpPath = file.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    const label = `(${i + 1}/${files.length})`;

    if (await fs.pathExists(webpPath)) {
      console.log(`${label} ✅ already converted: ${webpPath}`);
      return;
    }

    const originalSize = (await fs.stat(file)).size;

    try {
      const { data: raw, info } = await sharp(file)
        .rotate() // respect EXIF orientation before anything else
        .resize({
          width: IMAGE_MAX_DIMENSION,
          height: IMAGE_MAX_DIMENSION,
          fit: "inside",
          withoutEnlargement: true,
        })
        .raw()
        .toBuffer({ resolveWithObject: true });

      const encodeAt = (quality) =>
        sharp(raw, { raw: { width: info.width, height: info.height, channels: info.channels } })
          .webp({ quality, effort: IMAGE_EFFORT })
          .toBuffer();

      const targetBytes = imageTargetBytes(info.width, info.height);
      let quality = IMAGE_MAX_QUALITY;
      let output = await encodeAt(quality);
      while (output.length > targetBytes && quality > IMAGE_MIN_QUALITY) {
        quality -= IMAGE_QUALITY_STEP;
        output = await encodeAt(quality);
      }
      if (output.length > targetBytes) {
        stats.stillOverCap.push(`${webpPath} (${formatBytes(output.length)})`);
      }

      if (!FLAGS.dryRun) {
        await ensureBackup(file);
        await fs.writeFile(webpPath, output);
        await fs.remove(file);
      }
      convertedWebpBasenames.add(path.basename(webpPath).toLowerCase());

      stats.images.converted++;
      stats.images.before += originalSize;
      stats.images.after += output.length;

      console.log(
        `${label} ${FLAGS.dryRun ? "(dry-run) would write" : "✔"} ${file} -> ${webpPath} ` +
          `[${formatBytes(originalSize)} -> ${formatBytes(output.length)} @ q${quality}, ${info.width}x${info.height}]`
      );
    } catch (err) {
      console.error(`${label} ✖ error converting ${file}:`, err.message);
    }
  });
}

// --------------------- Videos: new conversions ---------------------

async function convertVideosToWebM(root) {
  const files = await glob(`${root}/**/*.mp4`, { nocase: true, nodir: true });
  console.log(`\nFound ${files.length} video(s) to convert...`);

  for (const [i, file] of files.entries()) {
    const webmPath = file.replace(/\.mp4$/i, ".webm");
    const label = `(${i + 1}/${files.length})`;

    if (await fs.pathExists(webmPath)) {
      console.log(`${label} ✅ already converted: ${webmPath}`);
      continue;
    }

    if (FLAGS.dryRun) {
      // Not actually encoding in dry-run (too slow to be worth it just for a
      // preview) - optimistically assume it would succeed so the code
      // reference preview below still reflects what a real run would do.
      convertedWebmBasenames.add(path.basename(webmPath).toLowerCase());
      console.log(`${label} (dry-run) would convert ${file} -> ${webmPath}`);
      continue;
    }

    const originalSize = (await fs.stat(file)).size;

    try {
      await ensureBackup(file);
      const finalSize = await encodeVideoCapped(file, webmPath, label);
      await fs.remove(file); // only remove the original once encoding succeeded
      convertedWebmBasenames.add(path.basename(webmPath).toLowerCase());

      stats.videos.converted++;
      stats.videos.before += originalSize;
      stats.videos.after += finalSize;

      console.log(`${label} ✔ ${file} -> ${webmPath} [${formatBytes(originalSize)} -> ${formatBytes(finalSize)}]`);
    } catch (err) {
      console.error(`${label} ✖ skipping ${file}: ${err.message}`);
      // do NOT remove the original if conversion failed
    }
  }
}

// --------------------- Reoptimize already-converted assets ---------------------
// Opt-in (--reoptimize-existing): revisits .webp/.webm files a previous run
// already produced and brings them under the *current* caps. Useful after
// tightening IMAGE_MAX_DIMENSION/VIDEO_MAX_WIDTH, or for assets that were
// hand-placed already in their final format and never ran through this
// script's size caps at all.

async function reoptimizeExistingWebp(root) {
  const files = await glob(`${root}/**/*.webp`, { nocase: true, nodir: true });
  console.log(`\nChecking ${files.length} existing .webp file(s) against current caps...`);

  await runWithConcurrency(files, 4, async (file, i) => {
    const label = `(${i + 1}/${files.length})`;
    const originalSize = (await fs.stat(file)).size;
    const meta = await sharp(file).metadata();
    const withinDimensionCap = Math.max(meta.width, meta.height) <= IMAGE_MAX_DIMENSION;
    const withinSizeCap = originalSize <= imageTargetBytes(meta.width, meta.height);

    if (withinDimensionCap && withinSizeCap) {
      console.log(`${label} ✅ already within caps: ${file}`);
      return;
    }

    try {
      const { data: raw, info } = await sharp(file)
        .resize({
          width: IMAGE_MAX_DIMENSION,
          height: IMAGE_MAX_DIMENSION,
          fit: "inside",
          withoutEnlargement: true,
        })
        .raw()
        .toBuffer({ resolveWithObject: true });

      const encodeAt = (quality) =>
        sharp(raw, { raw: { width: info.width, height: info.height, channels: info.channels } })
          .webp({ quality, effort: IMAGE_EFFORT })
          .toBuffer();

      const targetBytes = imageTargetBytes(info.width, info.height);
      let quality = IMAGE_MAX_QUALITY;
      let output = await encodeAt(quality);
      while (output.length > targetBytes && quality > IMAGE_MIN_QUALITY) {
        quality -= IMAGE_QUALITY_STEP;
        output = await encodeAt(quality);
      }

      if (output.length >= originalSize) {
        console.log(`${label} ✅ re-encode didn't improve on original, keeping as-is: ${file}`);
        return;
      }

      if (output.length > targetBytes) {
        stats.stillOverCap.push(`${file} (${formatBytes(output.length)})`);
      }

      if (!FLAGS.dryRun) {
        await ensureBackup(file);
        await fs.writeFile(file, output);
      }

      stats.images.converted++;
      stats.images.before += originalSize;
      stats.images.after += output.length;

      console.log(
        `${label} ${FLAGS.dryRun ? "(dry-run) would shrink" : "✔ shrank"} ${file} ` +
          `[${formatBytes(originalSize)} -> ${formatBytes(output.length)} @ q${quality}, ${info.width}x${info.height}]`
      );
    } catch (err) {
      console.error(`${label} ✖ error re-optimizing ${file}:`, err.message);
    }
  });
}

async function reoptimizeExistingWebm(root) {
  const files = await glob(`${root}/**/*.webm`, { nocase: true, nodir: true });
  console.log(`\nChecking ${files.length} existing .webm file(s) against current caps...`);

  for (const [i, file] of files.entries()) {
    const label = `(${i + 1}/${files.length})`;
    const originalSize = (await fs.stat(file)).size;
    const probe = await probeVideo(file).catch(() => null);
    const withinDimensionCap = !probe?.width || probe.width <= VIDEO_MAX_WIDTH;
    const withinSizeCap = originalSize <= VIDEO_TARGET_BYTES;

    if (withinDimensionCap && withinSizeCap) {
      console.log(`${label} ✅ already within caps: ${file}`);
      continue;
    }

    if (FLAGS.dryRun) {
      console.log(`${label} (dry-run) would re-encode ${file} (${formatBytes(originalSize)}, ${probe?.width ?? "?"}px wide)`);
      continue;
    }

    const tempPath = `${file}.reoptimize.webm`;
    try {
      await ensureBackup(file);
      const finalSize = await encodeVideoCapped(file, tempPath, label, file);

      if (finalSize >= originalSize) {
        console.log(`${label} ✅ re-encode didn't improve on original, keeping as-is: ${file}`);
        await fs.remove(tempPath);
        continue;
      }

      await fs.move(tempPath, file, { overwrite: true });

      stats.videos.converted++;
      stats.videos.before += originalSize;
      stats.videos.after += finalSize;

      console.log(`${label} ✔ shrank ${file} [${formatBytes(originalSize)} -> ${formatBytes(finalSize)}]`);
    } catch (err) {
      console.error(`${label} ✖ error re-optimizing ${file}:`, err.message);
      await fs.remove(tempPath).catch(() => {});
    }
  }
}

// --------------------- Code references ---------------------
// Only rewrites a `name.jpg` / `name.mp4` reference to `.webp` / `.webm` when
// that converted file actually exists on disk - a failed conversion (or a
// source that was never in imageRoot/videoRoot to begin with) now leaves the
// original reference alone instead of quietly pointing at a file that was
// never created.

async function updateCodeReferences(root) {
  const files = await glob(`${root}/**/*.{js,jsx,ts,tsx}`, { nocase: true, nodir: true });
  console.log(`\nUpdating references in ${files.length} code file(s)...`);

  const [webpFiles, webmFiles] = await Promise.all([
    glob(`${imageRoot}/**/*.webp`, { nocase: true, nodir: true }),
    glob(`${videoRoot}/**/*.webm`, { nocase: true, nodir: true }),
  ]);
  // Union what's actually on disk with what this run just converted (or, in
  // --dry-run, would have converted) so the preview is accurate either way.
  const webpBasenames = new Set([...webpFiles.map((f) => path.basename(f).toLowerCase()), ...convertedWebpBasenames]);
  const webmBasenames = new Set([...webmFiles.map((f) => path.basename(f).toLowerCase()), ...convertedWebmBasenames]);

  const refPattern = /([\w.-]+?)\.(jpe?g|png|mp4)\b/gi;

  for (const [i, file] of files.entries()) {
    const label = `(${i + 1}/${files.length})`;
    const content = await fs.readFile(file, "utf8");

    if (!refPattern.test(content)) {
      console.log(`${label} ✅ no changes needed: ${file}`);
      continue;
    }
    refPattern.lastIndex = 0;

    let skipped = [];
    const updated = content.replace(refPattern, (match, stem, ext) => {
      const isVideo = ext.toLowerCase() === "mp4";
      const newExt = isVideo ? "webm" : "webp";
      const targetBasename = `${stem}.${newExt}`.toLowerCase();
      const set = isVideo ? webmBasenames : webpBasenames;
      if (set.has(targetBasename)) return `${stem}.${newExt}`;
      skipped.push(match);
      return match;
    });

    if (updated !== content) {
      if (!FLAGS.dryRun) {
        await ensureBackup(file);
        await fs.writeFile(file, updated, "utf8");
      }
      console.log(`${label} ${FLAGS.dryRun ? "(dry-run) would update" : "✔ updated"} references in: ${file}`);
    } else {
      console.log(`${label} ✅ references already correct: ${file}`);
    }

    if (skipped.length) {
      console.warn(`   ⚠ left unchanged (no converted file found): ${[...new Set(skipped)].join(", ")}`);
    }
  }
}

async function checkFFmpeg() {
  return new Promise((resolve) => {
    ffmpeg.getAvailableFormats((err) => {
      if (err) {
        console.warn("⚠ FFmpeg not found. Video conversion will be skipped.");
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

function printSummary() {
  const savedBytes = (before, after) => before - after;
  const pct = (before, after) => (before > 0 ? (((before - after) / before) * 100).toFixed(0) : "0");

  console.log("\n" + "─".repeat(50));
  console.log(FLAGS.dryRun ? "DRY RUN SUMMARY (nothing was written)" : "SUMMARY");
  console.log("─".repeat(50));
  console.log(
    `Images: ${stats.images.converted} file(s), ${formatBytes(stats.images.before)} -> ${formatBytes(stats.images.after)}` +
      (stats.images.converted ? ` (-${pct(stats.images.before, stats.images.after)}%)` : "")
  );
  console.log(
    `Videos: ${stats.videos.converted} file(s), ${formatBytes(stats.videos.before)} -> ${formatBytes(stats.videos.after)}` +
      (stats.videos.converted ? ` (-${pct(stats.videos.before, stats.videos.after)}%)` : "")
  );
  const totalSaved = savedBytes(stats.images.before, stats.images.after) + savedBytes(stats.videos.before, stats.videos.after);
  console.log(`Total saved: ${formatBytes(Math.max(totalSaved, 0))}`);

  if (stats.stillOverCap.length) {
    console.log(`\n⚠ ${stats.stillOverCap.length} file(s) still over their target cap after best effort:`);
    stats.stillOverCap.forEach((f) => console.log(`   - ${f}`));
  }
}

// --------------------- Main ---------------------
(async function main() {
  try {
    console.log(`🚀 Starting media conversions...${FLAGS.dryRun ? " (dry run)" : ""}`);

    if (!FLAGS.videosOnly) {
      await convertImagesToWebP(imageRoot);
      if (FLAGS.reoptimizeExisting) await reoptimizeExistingWebp(imageRoot);
    }

    if (!FLAGS.imagesOnly) {
      const ffmpegOk = await checkFFmpeg();
      if (ffmpegOk) {
        await convertVideosToWebM(videoRoot);
        if (FLAGS.reoptimizeExisting) await reoptimizeExistingWebm(videoRoot);
      }
    }

    await updateCodeReferences(codeRoot);

    printSummary();
    console.log(`\n✅ All done!${FLAGS.dryRun ? "" : ` Backup stored in: ${backupDir}`}`);
  } catch (err) {
    console.error("Fatal error:", err.message);
    process.exitCode = 1;
  }
})();

// Export functions and constants so one-liners can call them directly
export {
  checkFFmpeg,
  convertImagesToWebP,
  convertVideosToWebM,
  reoptimizeExistingWebp,
  reoptimizeExistingWebm,
  updateCodeReferences,
  imageRoot,
  videoRoot,
  codeRoot,
};
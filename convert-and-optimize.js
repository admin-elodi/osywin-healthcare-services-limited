#!/usr/bin/env node
// convert-and-optimize.js
// Node v22+ ESM compatible
// Features: fast, safe, progress indicators, backup, rewrites code references, optimized FFmpeg encoding

import fs from "fs-extra";
import sharp from "sharp";
import ffmpeg from "fluent-ffmpeg";
import { glob } from "glob";
import path from "path";
import process from 'node:process';

// --------------------- Config ---------------------
const imageRoot = "src/assets/images";
const videoRoot = "src/assets/videos";
const codeRoot = "src";
const backupDir = "backup_before_conversion";

// FFmpeg optimization options - UPDATED to VP9 + CRF (recommended 2026 web settings)
const ffmpegVideoOptions = [
  "-c:v", "libvpx-vp9",
  "-b:v", "0",           // must be 0 when using CRF
  "-crf", "33",          // 31–34 sweet spot: good quality + small size (lower = better quality)
  "-cpu-used", "2",      // 1–4 allowed; 2 = nice quality/speed balance
  "-row-mt", "1",        // multi-threading speedup
  "-tile-columns", "2",  // helps encoding performance
  "-frame-parallel", "1",
  "-c:a", "libopus",
  "-b:a", "80k",         // small bump from 64k - better audio without much size increase
];

// --------------------- Helpers ---------------------

async function ensureBackup(file) {
  const relative = path.relative(process.cwd(), file);
  const backupPath = path.join(backupDir, relative);
  await fs.ensureDir(path.dirname(backupPath));
  await fs.copy(file, backupPath, { overwrite: false });
}

async function convertImagesToWebP(root) {
  const files = await glob(`${root}/**/*.{jpg,jpeg,png}`, { nocase: true, nodir: true });
  console.log(`\nFound ${files.length} image(s) to convert...`);

  for (const [i, file] of files.entries()) {
    const webpPath = file.replace(/\.(jpg|jpeg|png)$/i, ".webp");

    if (await fs.pathExists(webpPath)) {
      console.log(`(${i + 1}/${files.length}) ✅ already converted: ${webpPath}`);
      continue; // skip already converted
    }

    await ensureBackup(file);

    try {
      await sharp(file)
        .webp({ quality: 75, effort: 6 })
        .toFile(webpPath);

      await fs.remove(file); // remove original
      console.log(`(${i + 1}/${files.length}) ✔ ${file} -> ${webpPath}`);
    } catch (err) {
      console.error(`(${i + 1}/${files.length}) ✖ error converting ${file}:`, err.message);
    }
  }
}

async function convertVideosToWebM(root) {
  const files = await glob(`${root}/**/*.mp4`, { nocase: true, nodir: true });
  console.log(`\nFound ${files.length} video(s) to convert...`);

  for (const [i, file] of files.entries()) {
    const webmPath = file.replace(/\.mp4$/i, ".webm");

    if (await fs.pathExists(webmPath)) {
      console.log(`(${i + 1}/${files.length}) ✅ already converted: ${webmPath}`);
      continue;
    }

    await ensureBackup(file);

    try {
      await new Promise((resolve, reject) => {
        ffmpeg(file)
          .outputOptions(ffmpegVideoOptions)
          .save(webmPath)
          .on("start", (commandLine) => {
            console.log(`(${i + 1}/${files.length}) FFmpeg command: ${commandLine}`);
          })
          .on("progress", (progress) => {
            // Optional: show progress for long videos
            if (progress.percent) {
              process.stdout.write(`\r(${i + 1}/${files.length}) Processing: ${progress.percent.toFixed(1)}%`);
            }
          })
          .on("end", () => {
            console.log(`\n(${i + 1}/${files.length}) ✔ ${file} -> ${webmPath}`);
            resolve();
          })
          .on("error", (err, stdout, stderr) => {
            console.error(`\n(${i + 1}/${files.length}) ✖ FFmpeg failed on ${file}`);
            console.error("Error message:", err.message);
            if (stderr) console.error("FFmpeg stderr:\n", stderr);
            reject(err);
          });
      });

      // Only remove original if conversion succeeded
      await fs.remove(file);
    } catch (err) {
      console.error(`(${i + 1}/${files.length}) ✖ Skipping bad file ${file}: ${err.message}`);
      // Do NOT remove the original file if conversion failed
    }
  }
}

async function updateCodeReferences(root) {
  const files = await glob(`${root}/**/*.{js,jsx,ts,tsx}`, { nocase: true, nodir: true });
  console.log(`\nUpdating references in ${files.length} code file(s)...`);

  for (const [i, file] of files.entries()) {
    let content = await fs.readFile(file, "utf8");

    // Skip files already updated
    if (!/\.(jpg|jpeg|png|mp4)\b/i.test(content)) {
      console.log(`(${i + 1}/${files.length}) ✅ no changes needed: ${file}`);
      continue;
    }

    await ensureBackup(file);

    const updated = content
      .replace(/\.(jpg|jpeg|png)\b/gi, ".webp")
      .replace(/\.mp4\b/gi, ".webm");

    if (updated !== content) {
      await fs.writeFile(file, updated, "utf8");
      console.log(`(${i + 1}/${files.length}) ✔ updated references in: ${file}`);
    } else {
      console.log(`(${i + 1}/${files.length}) ✅ references already correct: ${file}`);
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

// --------------------- Main ---------------------
(async function main() {
  try {
    console.log("🚀 Starting media conversions...");

    // Images
    await convertImagesToWebP(imageRoot);

    // Videos
    const ffmpegOk = await checkFFmpeg();
    if (ffmpegOk) {
      await convertVideosToWebM(videoRoot);
    }

    // Update code references
    await updateCodeReferences(codeRoot);

    console.log("\n✅ All done! Backup stored in:", backupDir);
  } catch (err) {
    console.error("Fatal error:", err.message);
  }
})();

// Export functions and constants so one-liners can call them directly
export {
  checkFFmpeg,
  convertVideosToWebM,
  updateCodeReferences,
  videoRoot,
  codeRoot
};
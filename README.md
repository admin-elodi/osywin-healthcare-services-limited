# OSYWIN Health

Marketing/informational website for **OSYWIN Healthcare Services Limited** — a unified,
family-centered healthcare system providing psychiatric care, mental health services,
addiction recovery, and whole-person wellness (including the WINN Psychiatry & Mental
Health Services program).

Built with React 19, Vite, and Tailwind CSS v4.

## Tech Stack

- **React 19** + **React Router v7** — SPA routing
- **Vite 6** — dev server / build tooling
- **Tailwind CSS v4** (`@tailwindcss/vite`) — styling
- **Framer Motion** — animations
- **lucide-react** / **react-icons** — icon sets
- **sharp**, **fluent-ffmpeg**, **fs-extra**, **glob** — used by the local image/video
  optimization script (not shipped to the browser)

## Project Structure

```
osywin-health/
├── public/                   # Static assets served as-is (icons, etc.)
├── src/
│   ├── assets/                # Images, icons, videos used by components
│   ├── components/
│   │   ├── common/             # Header, Footer, shared UI
│   │   └── sections/           # Page-section components (e.g. Hero)
│   ├── pages/                  # Route-level pages (Home, Programs, Winn, Renewed, AboutUs)
│   ├── App.jsx                 # Routes + layout (Header/Footer wrap all pages)
│   └── main.jsx                # Entry point
├── index.html                 # HTML entry / document title & meta
├── convert-and-optimize.js    # Node script to convert/compress images & video assets
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Routes

| Path         | Page       |
|--------------|------------|
| `/`          | Home       |
| `/programs`  | Programs   |
| `/winn`      | Winn       |
| `/renewed`   | Renewed    |
| `/about-us`  | AboutUs    |

The Footer also exposes a `#contact` anchor; navigating to `/#contact` scrolls to it.

## Getting Started

```bash
npm install
npm run dev            # start local dev server
npm run dev:mobile     # dev server bound to LAN (for testing on a phone)
npm run build           # production build
npm run preview         # preview the production build locally
npm run lint             # run ESLint
```

## Image/Video Optimization

`convert-and-optimize.js` converts and compresses media in `src/assets` (e.g. to WebP/VP8)
and creates a backup of originals before overwriting. Run with:

```bash
npm run convert-images
```

It skips files that are already converted and prints per-file progress.

## Deployment

This is a static Vite build (`npm run build` outputs to `dist/`), deployable to any static
host or cPanel-based hosting. Hosting/domain credentials are **not** stored in this repo —
keep those in a password manager or your host's dashboard, not in version control.

# WebMtoMP4 — 100% Client-Side WebM to MP4, MP3, GIF & MOV Video Converter

[![Live Demo](https://img.shields.io/badge/Live_Demo-webmtomp4.github.io-2A835F?style=for-the-badge&logo=googlechrome&logoColor=white)](https://webmtomp4.github.io/)
[![Astro 5.x](https://img.shields.io/badge/Astro-5.x-092328?style=for-the-badge&logo=astro&logoColor=8BBB92)](https://astro.build/)
[![FFmpeg.wasm](https://img.shields.io/badge/Engine-FFmpeg.wasm-12544F?style=for-the-badge&logo=webassembly&logoColor=white)](https://ffmpegwasm.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-8BBB92?style=for-the-badge&logoColor=092328)](./LICENSE)
[![Support the Developer](https://img.shields.io/badge/Support_Developer-Buy_Me_a_Coffee-2A835F?style=for-the-badge&logo=gumroad&logoColor=white)](https://kisharadilshan.gumroad.com/coffee)

**WebMtoMP4** ([https://webmtomp4.github.io/](https://webmtomp4.github.io/)) is a privacy-first, high-speed, 100% client-side video converter engineered with **Astro Islands** and **FFmpeg WebAssembly (`@ffmpeg/ffmpeg`)**. It transcodes VP8, VP9, and AV1 `.webm` videos into universal **H.264 + AAC `.mp4`** files (as well as `MP4 → WebM`, `WebM → MP3`, `WebM → GIF`, `WebM → MOV`, and `Compress WebM`) directly inside the user's local browser RAM—with zero server uploads, zero file size limits, and zero watermarks.

---

## Key Features

- **Zero Cloud Uploads (100% Local RAM):** All video decoding, scaling, trimming, and encoding execute strictly inside the browser's WebAssembly sandbox. Sensitive screen recordings and personal videos never leave the user's device.
- **Dual-Mode FFmpeg WebAssembly Engine:**
  - **Universal MP4 Transcode (`H.264/AAC`):** Converts VP8/VP9/AV1 WebM files into `yuv420p` H.264 video + AAC audio with the `+faststart` flag for 100% native playback on iPhone, iPad, Mac QuickTime, Windows Media Player, Adobe Premiere Pro, DaVinci Resolve, and CapCut.
  - **Instant Stream Copy / Remux:** Zero-reencode container remuxing when codecs are already compatible, with automatic fallback and custom CRF quality (`CRF 20 / 23 / 28`), resolution (`Original / 1080p / 720p / 480p`), and trim controls.
- **6 Instant 1-Click Format Modes:** `WebM → MP4`, `MP4 → WebM`, `WebM → MP3`, `WebM → GIF`, `WebM → MOV`, and `Compress WebM`, plus a built-in **Sample WebM Synthesizer** and HTML5 live playback preview.
- **Complete 8-Language i18n Architecture:** Fully localized routes and dictionaries for English (`/`), Spanish (`/es/`), Portuguese (`/pt/`), German (`/de/`), French (`/fr/`), Japanese (`/ja/`), Chinese (`/zh/`), and Russian (`/ru/`).
- **Deep Forest & Mint Emerald Light/Dark Theme:** High-contrast UI defaulting to Clean Mint Alabaster (`#F4F9F5`) with instant toggle to Deep Midnight Teal (`#092328`) dark mode and an ultra-minimal icon-only mobile navbar (`48x48px` touch targets on `< 768px`).
- **GSC-Ready Dual Sitemap & Strict JSON-LD Schema:** Outputs both a flat W3C-compliant `sitemap.xml` (with full `xhtml:link` hreflang annotations) and `sitemap-index.xml`, paired with `WebApplication`, `HowTo`, `FAQPage`, and `BreadcrumbList` schemas (strictly zero fabricated ratings).
- **Offline-Ready Progressive Web App (PWA):** Includes `manifest.webmanifest`, maskable `192x192` & `512x512` icons, and an offline-first Service Worker (`sw.js`) that caches the application shell and FFmpeg WASM core for offline conversions.

---

## Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Astro 5.x](https://astro.build/) (Static Output) | Zero-JS-by-default Islands Architecture & localized static route generation |
| **Styling & Theme** | [Tailwind CSS](https://tailwindcss.com/) + CSS Custom Properties | Responsive layout, semantic theme tokens, and smooth keyframe animations |
| **Video Engine** | [`@ffmpeg/ffmpeg`](https://www.npmjs.com/package/@ffmpeg/ffmpeg) & `@ffmpeg/core` | Client-side WebAssembly video/audio transcoding, remuxing, and frame scaling |
| **Internationalization** | Astro i18n + `src/i18n/ui.ts` | Prefix-except-default routing across 8 languages (`en, es, pt, de, fr, ja, zh, ru`) |
| **Offline & PWA** | Web App Manifest + Service Worker (`sw.js`) | Standalone installation (`Add to Home Screen`) & offline-first asset caching |
| **SEO & Analytics** | GTM (`GTM-KB23HDHK`) + GA4 (`G-F7L9QCNXPD`) | Technical telemetry, dual XML sitemaps, and Schema.org JSON-LD graphs |
| **CI/CD Deployment** | GitHub Actions (`withastro/action@v3`) | Automated Node 22 build and deployment to GitHub Pages |

---

## Color Palette Specification

| Token Name | Hex Code | Role in UI System |
| :--- | :--- | :--- |
| **Deep Midnight Teal** | `#092328` | Primary text in Light Mode; Primary background & pill badge in Dark Mode |
| **Rich Pine Teal** | `#12544F` | Secondary text & button hover state in Light Mode; Workspace card surface in Dark Mode |
| **Vibrant Emerald Green** | `#2A835F` | Primary CTA buttons, active mode pills, progress bar gradient, and border accents |
| **Soft Sage Mint** | `#8BBB92` | Dashed dropzone border, secondary accents, and primary action button in Dark Mode |
| **Clean Mint Alabaster** | `#F4F9F5` | Default Light Mode primary background and high-contrast Dark Mode typography |

---

## Quick Start & Deployment

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/webmtomp4/webmtomp4.github.io.git
cd webmtomp4.github.io
npm install
```

### 2. Run Local Development Server

```bash
npm run dev
```

Open `http://localhost:4321` in your browser to test live WebM-to-MP4 conversions, language switching, and theme toggling.

### 3. Build for Production

```bash
npm run build
npm run preview
```

This generates the static production bundle inside `dist/`, including all 8 localized HTML routes, `dist/sitemap.xml`, `dist/sitemap-index.xml`, `dist/robots.txt`, and `dist/.nojekyll`.

### 4. Automated GitHub Pages Deployment

Every push to the `main` branch automatically triggers [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):
1. Checks out the repository and ensures `public/.nojekyll` is present.
2. Builds the static Astro site using `withastro/action@v3` on Node 22.
3. Publishes the `dist/` artifact directly to GitHub Pages via `actions/deploy-pages@v4`.

---

## Support the Developer

If **WebMtoMP4** saved you time or helped your workflow, please consider supporting ongoing open-source development:

👉 **[Buy Me a Coffee on Gumroad](https://kisharadilshan.gumroad.com/coffee)**

---

## License

Released under the [MIT License](./LICENSE). Copyright © 2026 Kishara Dilshan (WebMtoMP4).

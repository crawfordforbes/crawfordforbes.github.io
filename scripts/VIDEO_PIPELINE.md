set browser to 1280x720
take vid
crop out address bar
refit
mute
cut
export as 720


Video pipeline (transcode videos)
=================================

This repository expects optimized video variants to live in `public/videos/` alongside the rest of the site `public` assets.

What the Node script does
- Scans `src/assets/images/projects/**` for video files (extensions: mp4,mov,mkv,avi,webm,m4v,ogv).
- For each source video it creates:
  - `public/videos/<project>-<basename>.webm` (VP9)
  - `public/videos/<project>-<basename>.mp4`  (H.264)
  - `public/videos/<project>-<basename>.jpg`  (poster thumbnail)
- The script is idempotent: it skips transcoding if outputs are newer than the source unless you set `FORCE_VIDEOS=1`.

Usage
-----

From the repository root:

```bash
npm run videos:build
```

Or (to force re-transcode all files):

```bash
FORCE_VIDEOS=1 npm run videos:build
```

Notes & tips
-------------
- The script uses the `ffmpeg` CLI. Make sure `ffmpeg` is installed and available on your PATH.
- Current defaults: scale videos to 720p tall (`scale=-2:720`), webm uses VP9 CRF 30, mp4 uses H.264 CRF 23. Adjust the flags in `scripts/transcode-videos.cjs` if you want different quality/encoders.
- The script writes into `public/videos/` with flat filenames prefixed by the project folder name. If you prefer a different layout (per-project folders), edit the script's output logic.

Metadata stripping
------------------
- By default the script strips metadata from the generated `.webm` and `.mp4` files using ffmpeg's `-map_metadata -1` flag. That removes fields such as the `comment` metadata.
- If you need to preserve some metadata or set specific tags, edit the ffmpeg arguments in `scripts/transcode-videos.cjs` (for example `-metadata title="My Title"` or omit `-map_metadata -1`).

FAQ
---
- Q: Should we check generated videos into git?
  A: Video files are large; prefer to keep generated artifacts out of git and use CI or local build steps.

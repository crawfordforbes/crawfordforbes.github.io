#!/usr/bin/env node
/*
  scripts/transcode-videos.cjs

  Idempotent Node script that finds video files under
  src/assets/images/projects/** and writes optimized variants to
  public/videos/<project>-<basename>.(webm|mp4|jpg).

  Usage:
    node scripts/transcode-videos.cjs

  Environment:
    FORCE_VIDEOS=1   # force re-transcode even when outputs are newer
*/

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const { spawn } = require('child_process');

const SRC_ROOT = path.resolve(__dirname, '../src/assets/images/projects');
const OUT_ROOT = path.resolve(__dirname, '../public/videos');
const VIDEO_EXTS = ['.mp4', '.mov', '.mkv', '.avi', '.webm', '.m4v', '.ogv'];
const FORCE = !!process.env.FORCE_VIDEOS;

function log(...args) { console.log('[videos]', ...args); }

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

async function walk(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    const res = path.join(dir, ent.name);
    if (ent.isDirectory()) files.push(...await walk(res));
    else files.push(res);
  }
  return files;
}

function isVideoFile(file) {
  return VIDEO_EXTS.includes(path.extname(file).toLowerCase());
}

function runFFmpeg(args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn('ffmpeg', args, { stdio: 'inherit', ...opts });
    p.on('close', (code) => code === 0 ? resolve() : reject(new Error('ffmpeg exit ' + code)));
    p.on('error', reject);
  });
}

async function processFile(src) {
  const rel = path.relative(SRC_ROOT, src);
  const parts = rel.split(path.sep);
  const project = parts[0] || 'unknown';
  const baseName = path.parse(src).name; // without ext
  const outDir = OUT_ROOT; // keep flat under public/videos
  await ensureDir(outDir);

  const outBase = path.join(outDir, `${project}-${baseName}`);
  const webm = outBase + '.webm';
  const mp4 = outBase + '.mp4';
  const jpg = outBase + '.jpg';

  try {
    const sStat = await fsp.stat(src);
    let need = FORCE;
    // if outputs missing or older than source, transcode
    try {
      const wStat = await fsp.stat(webm);
      const mStat = await fsp.stat(mp4);
      if (wStat.mtimeMs < sStat.mtimeMs || mStat.mtimeMs < sStat.mtimeMs) need = true;
    } catch (err) {
      need = true;
    }

    if (!need) {
      log('Skipping (up-to-date):', src);
      return { src, skipped: true };
    }

    log('Transcoding:', src);

    // webm (VP9) - more aggressive compression for web delivery
    // CRF 35 (was 30), 2-pass, constrained quality mode
    await runFFmpeg([
      '-y', '-i', src,
      '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '35',
      '-vf', 'scale=-2:720',
      '-row-mt', '1',          // faster encoding
      '-cpu-used', '2',         // balance speed/quality
      '-map_metadata', '-1',
      webm
    ]);

    // mp4 (H.264) - more aggressive compression + optimize for web
    // CRF 28 (was 23), preset slow for better compression
    await runFFmpeg([
      '-y', '-i', src,
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '28',
      '-vf', 'scale=-2:720',
      '-movflags', '+faststart', // enable progressive streaming
      '-map_metadata', '-1',
      mp4
    ]);

    // poster
    await runFFmpeg([
      '-y', '-i', src,
      '-vf', 'scale=320:-1,thumbnail,select=eq(n\\,0)',
      '-frames:v', '1',
      jpg
    ]);

    return { src, skipped: false };
  } catch (err) {
    log('Error processing', src, err && err.message);
    return { src, error: err };
  }
}

async function main() {
  log('Scanning for source videos in', SRC_ROOT);
  try {
    const all = await walk(SRC_ROOT);
    const vids = all.filter(isVideoFile);
    if (!vids.length) {
      log('No source videos found. Nothing to do.');
      return;
    }

    log(`Found ${vids.length} source video(s).`);
    const results = [];
    for (const v of vids) {
      // process sequentially to avoid overloading CPU; this is simpler and safer
      // for typical dev machines. If you want parallel, we can add concurrency.
      // eslint-disable-next-line no-await-in-loop
      results.push(await processFile(v));
    }

    const stats = {
      processed: results.filter(r => !r.skipped && !r.error).length,
      skipped: results.filter(r => r.skipped).length,
      errors: results.filter(r => r.error).length,
    };
    log('Done. Stats:', stats);
    if (stats.errors) process.exitCode = 2;
  } catch (err) {
    console.error('Fatal error', err);
    process.exitCode = 1;
  }
}

main();

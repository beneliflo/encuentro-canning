import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, 'public');
const scanDirs = ['app', 'lib'];
const videoExt = /\.(mp4|webm)$/i;
const pathPattern = /['"`](\/[^'"`\n]+\.(?:mp4|webm))['"`]/g;

function walk(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(walk(fullPath));
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function toProjectRelative(fullPath) {
  return path.relative(projectRoot, fullPath).split(path.sep).join('/');
}

function toPublicPath(urlPath) {
  return path.join(publicDir, urlPath.replace(/^\//, ''));
}

const references = new Map();

for (const dir of scanDirs) {
  const fullDir = path.join(projectRoot, dir);
  if (!fs.existsSync(fullDir)) continue;

  for (const filePath of walk(fullDir)) {
    const relativeFile = toProjectRelative(filePath);
    const content = fs.readFileSync(filePath, 'utf8');

    for (const match of content.matchAll(pathPattern)) {
      const assetPath = match[1];
      if (!videoExt.test(assetPath)) continue;

      const files = references.get(assetPath) ?? [];
      files.push(relativeFile);
      references.set(assetPath, files);
    }
  }
}

const missing = [];
for (const [assetPath, files] of references.entries()) {
  if (!fs.existsSync(toPublicPath(assetPath))) {
    missing.push({ assetPath, files });
  }
}

const publicVideosDir = path.join(publicDir, 'videos');
const publicVideos = fs.existsSync(publicVideosDir)
  ? walk(publicVideosDir)
      .filter((filePath) => videoExt.test(filePath))
      .map((filePath) => `/${toProjectRelative(filePath).replace(/^public\//, '')}`)
      .sort()
  : [];

const unused = publicVideos.filter((assetPath) => !references.has(assetPath));

if (missing.length === 0 && unused.length === 0) {
  console.log('All video links are valid. No unused video files found.');
  process.exit(0);
}

if (missing.length > 0) {
  console.error('Missing video assets:');
  for (const item of missing) {
    console.error(`- ${item.assetPath}`);
    console.error(`  referenced from: ${item.files.join(', ')}`);
  }
}

if (unused.length > 0) {
  console.error('Unused video files in public/videos:');
  for (const assetPath of unused) {
    console.error(`- ${assetPath}`);
  }
}

process.exit(1);

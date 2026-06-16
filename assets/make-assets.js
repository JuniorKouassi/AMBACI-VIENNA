// Generates assets/icon.png (1024x1024) and assets/splash.png (2732x2732)
// Emblem centered on brand background #F7F5F0
const sharp = require('../node_modules/sharp');
const path = require('path');
const dir = __dirname;

const BG = { r: 247, g: 245, b: 240, alpha: 1 };
const emblem = path.join(dir, '../mobile/img/armoiries-ci.png');

async function makeIcon() {
  const size = 1024;
  const pad = Math.round(size * 0.12);
  const inner = size - pad * 2;
  const bg = { create: { width: size, height: size, channels: 4, background: BG } };
  const overlay = await sharp(emblem).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp(bg).composite([{ input: overlay, top: pad, left: pad }]).png().toFile(path.join(dir, 'icon.png'));
  console.log('icon.png done (1024x1024)');
}

async function makeSplash() {
  const size = 2732;
  const inner = Math.round(size * 0.28);
  const pad = Math.round((size - inner) / 2);
  const bg = { create: { width: size, height: size, channels: 4, background: BG } };
  const overlay = await sharp(emblem).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp(bg).composite([{ input: overlay, top: pad, left: pad }]).png().toFile(path.join(dir, 'splash.png'));
  console.log('splash.png done (2732x2732)');
}

async function makeSplashDark() {
  const size = 2732;
  const inner = Math.round(size * 0.28);
  const pad = Math.round((size - inner) / 2);
  const bg = { create: { width: size, height: size, channels: 4, background: { r: 10, g: 31, b: 16, alpha: 1 } } };
  const overlay = await sharp(emblem).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp(bg).composite([{ input: overlay, top: pad, left: pad }]).png().toFile(path.join(dir, 'splash-dark.png'));
  console.log('splash-dark.png done');
}

makeIcon().then(makeSplash).then(makeSplashDark).catch(console.error);

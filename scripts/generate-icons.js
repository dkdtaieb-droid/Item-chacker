import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Standard Brand SVG (for standard icons & favicon)
const standardSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="50%" stop-color="#059669" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f0fdf4" />
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#064e3b" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Background rounded squircle -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />

  <!-- Subtle scanner laser effect line -->
  <rect x="64" y="252" width="384" height="8" rx="4" fill="#6ee7b7" opacity="0.4" />

  <!-- Central Shield -->
  <g filter="url(#dropShadow)">
    <path d="M 256 96 
             C 340 96 384 128 384 180 
             C 384 288 288 368 256 408 
             C 224 368 128 288 128 180 
             C 128 128 172 96 256 96 Z" 
          fill="url(#shieldGrad)" />
  </g>

  <!-- Checkmark + Pill Cross Inside Shield -->
  <!-- Emerald checkmark -->
  <path d="M 200 240 L 238 278 L 316 195" 
        fill="none" 
        stroke="#059669" 
        stroke-width="32" 
        stroke-linecap="round" 
        stroke-linejoin="round" />

  <!-- Medicine capsule accent at top right of shield -->
  <g transform="translate(295, 125) rotate(35)">
    <rect x="0" y="0" width="30" height="60" rx="15" fill="#3b82f6" />
    <path d="M 0 30 L 30 30 L 30 45 A 15 15 0 0 1 0 45 Z" fill="#ffffff" opacity="0.9" />
  </g>
</svg>
`;

// 2. Maskable SVG with safe-zone margin (central 80% circle)
// Canvas is 512x512, background extends to full bleed, icon is scaled down to fit inside 400x400
const maskableSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="maskBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="50%" stop-color="#059669" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="shieldGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f0fdf4" />
    </linearGradient>
  </defs>

  <!-- Full bleed background for Android masking -->
  <rect width="512" height="512" fill="url(#maskBgGrad)" />

  <!-- Content scaled and centered inside safe zone (70% scale centered at 256, 256) -->
  <g transform="translate(256, 256) scale(0.72) translate(-256, -256)">
    <!-- Central Shield -->
    <path d="M 256 96 
             C 340 96 384 128 384 180 
             C 384 288 288 368 256 408 
             C 224 368 128 288 128 180 
             C 128 128 172 96 256 96 Z" 
          fill="url(#shieldGrad2)" />

    <!-- Emerald checkmark -->
    <path d="M 200 240 L 238 278 L 316 195" 
          fill="none" 
          stroke="#059669" 
          stroke-width="32" 
          stroke-linecap="round" 
          stroke-linejoin="round" />

    <!-- Medicine capsule accent -->
    <g transform="translate(295, 125) rotate(35)">
      <rect x="0" y="0" width="30" height="60" rx="15" fill="#3b82f6" />
      <path d="M 0 30 L 30 30 L 30 45 A 15 15 0 0 1 0 45 Z" fill="#ffffff" opacity="0.9" />
    </g>
  </g>
</svg>
`;

async function generate() {
  console.log('Generating PWA icons...');
  
  // Save icon.svg
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), standardSvg.trim());

  // 192x192 PNG
  await sharp(Buffer.from(standardSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('✓ pwa-192x192.png generated');

  // 512x512 PNG
  await sharp(Buffer.from(standardSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('✓ pwa-512x512.png generated');

  // 512x512 Maskable PNG
  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('✓ pwa-maskable-512x512.png generated');

  // 180x180 Apple Touch Icon PNG
  await sharp(Buffer.from(standardSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png generated');

  // Favicon 64x64 PNG
  await sharp(Buffer.from(standardSvg))
    .resize(64, 64)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));
  console.log('✓ favicon.png generated');
}

generate().catch(err => {
  console.error('Failed to generate icons:', err);
  process.exit(1);
});

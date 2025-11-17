# Placeholder Assets

This directory contains **branded placeholder assets** for the WYKILLA website.

## Status

All placeholders are clearly marked in `/src/config/assets.ts` with `isPlaceholder: true`.

Run `getPlaceholderStatus()` in development to see which assets are still placeholders.

## How to Replace Placeholders

### 1. Prepare Your Asset

- Follow the specifications in the planning docs (dimensions, format, file size)
- Optimize images with tools like TinyPNG or Squoosh
- For 3D models: Use Draco compression, keep poly-count < 50k

### 2. Place Asset in Correct Directory

```
public/
├── images/
│   ├── hero/           → Hero image (EXISTS: wykilla_hero.png)
│   ├── logo/           → Logo SVG (REPLACE: placeholder-logo.svg)
│   ├── thumbs/         → Chapter thumbnails (REPLACE: 6x .webp files)
│   ├── lore/           → Lore background (REPLACE: lore_bg.webp)
│   └── merch/          → Product images (REPLACE: 4x .webp files)
├── audio/              → Music tracks (ADD: track_01.mp3, etc.)
├── models/             → 3D assets (ADD: world_scene.glb, etc.)
└── demos/              → Tool demo videos (ADD: lyric_generator.mp4, etc.)
```

### 3. Update Asset Config (IMPORTANT!)

In `/src/config/assets.ts`, change:

```typescript
// BEFORE
logo: '/images/logo/placeholder-logo.svg',
isPlaceholder: { logo: true }

// AFTER
logo: '/images/logo/wykilla_logo.svg',
isPlaceholder: { logo: false }
```

### 4. Verify

- Check the website updates correctly
- Run `npm run build` to ensure no errors
- Test on different devices/browsers

## Current Placeholders

- ⚠️ Logo (hero & favicon)
- ⚠️ Chapter Thumbnails (6x: Music, World, Tools, Lore, Merch, Outro)
- ⚠️ Music Tracks (3x)
- ⚠️ 3D World Models (using procedural primitives)
- ⚠️ Tool Demo Videos (using CSS animations)
- ⚠️ Lore Background Image
- ⚠️ Lore Content Text
- ⚠️ Merch Product Images (4x)
- ⚠️ OG Image

## Asset Specifications

See full specs in planning docs, but quick reference:

**Images:**
- Format: WebP (primary), PNG fallback
- Optimization: <100-500KB depending on type
- Hero: 1920x1080 (16:9)
- Thumbnails: 600x400 (3:2)
- Products: 1000x1000 (1:1)

**Audio:**
- Format: MP3 (320kbps) + OGG
- Duration: 3-6 min typical
- ID3 Tags: Artist, Title, Artwork

**3D Models:**
- Format: GLB (binary)
- Poly Count: <50k visible
- Compression: Draco
- File Size: <3-8MB

---

**Need help?** Check `/src/config/assets.ts` for exact paths and placeholder status.

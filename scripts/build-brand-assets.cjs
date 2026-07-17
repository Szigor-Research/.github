const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "docs", "brand", "assets");

const brands = {
  szigor: {
    source: "szigor-proof-instrument.png",
    name: "SZIGOR RESEARCH",
    eyebrow: "MASTER RESEARCH IDENTITY / PROOF INSTRUMENT",
    line: "Evidence before action.",
    meta: "EVIDENCE-BOUND DECISION SYSTEMS",
    accent: "#D9553B",
    bg: "#070809",
  },
  laszlo: {
    source: "laszlo-signal-gate.png",
    name: "LASZLO",
    eyebrow: "SZIGOR RESEARCH / ON-CHAIN MARKET LAB",
    line: "Signal is only useful when action is bounded.",
    meta: "EVENT  /  GATE  /  STATE",
    accent: "#F3B52E",
    bg: "#070809",
  },
  janos: {
    source: "janos-ledger-window.png",
    name: "JANOS",
    eyebrow: "SZIGOR RESEARCH / US EQUITY MARKET LAB",
    line: "Every price has a time. Every action has a record.",
    meta: "POINT-IN-TIME  /  RELEASE  /  RECONCILIATION",
    accent: "#3979E8",
    bg: "#050912",
  },
};

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function textSvg({ width, height, brand, mode }) {
  const d = brands[brand];
  const social = mode === "social";
  const lockup = mode === "lockup";
  const x = social ? 82 : lockup ? 360 : 64;
  const eyebrowY = social ? 110 : lockup ? 82 : 58;
  const nameY = social ? 258 : lockup ? 176 : 154;
  const lineY = social ? 334 : lockup ? 236 : 218;
  const metaY = social ? 420 : lockup ? 278 : 278;
  const nameSize = social ? 88 : lockup ? 76 : 76;

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <style>
      .eyebrow,.meta{font-family:"IBM Plex Mono","Roboto Mono",Consolas,monospace;font-weight:600;letter-spacing:2.2px}
      .name{font-family:"Arial Narrow","Noto Sans",Arial,sans-serif;font-weight:800;letter-spacing:${brand === "szigor" ? 6 : 12}px}
      .line{font-family:"Noto Sans",Arial,sans-serif;font-weight:500}
    </style>
    <text class="eyebrow" x="${x}" y="${eyebrowY}" fill="${d.accent}" font-size="12">${escapeXml(d.eyebrow)}</text>
    <text class="name" x="${x}" y="${nameY}" fill="#FFFDF8" font-size="${nameSize}">${escapeXml(d.name)}</text>
    <rect x="${x}" y="${nameY + 28}" width="${social ? 230 : 176}" height="8" fill="${d.accent}" />
    <text class="line" x="${x}" y="${lineY}" fill="#D6D4CE" font-size="${social ? 24 : lockup ? 19 : 20}">${escapeXml(d.line)}</text>
    <text class="meta" x="${x}" y="${metaY}" fill="#8F96A1" font-size="11">${escapeXml(d.meta)}</text>
  </svg>`);
}

function fadeSvg(width, height, start = 610) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs><linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#070809" stop-opacity="1"/><stop offset="${start / width}" stop-color="#070809" stop-opacity=".98"/><stop offset=".82" stop-color="#070809" stop-opacity=".12"/><stop offset="1" stop-color="#070809" stop-opacity="0"/></linearGradient></defs>
    <rect width="${width}" height="${height}" fill="url(#fade)" />
  </svg>`);
}

async function resizeSource(source, width, height) {
  return sharp(source).resize(width, height, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
}

async function buildBrand(brand) {
  const d = brands[brand];
  const source = path.join(ASSETS, d.source);
  if (!fs.existsSync(source)) throw new Error(`Missing primary emblem: ${source}`);

  await sharp(source).resize(512, 512, { fit: "cover" }).png({ compressionLevel: 9 }).toFile(path.join(ASSETS, `${brand}-avatar.png`));
  await sharp(source).resize(512, 512, { fit: "cover" }).png({ compressionLevel: 9 }).toFile(path.join(ASSETS, `${brand}-mark.png`));
  await sharp(source).resize(32, 32, { fit: "cover" }).png({ compressionLevel: 9 }).toFile(path.join(ASSETS, `${brand}-favicon-32.png`));
  await sharp(source).resize(16, 16, { fit: "cover" }).png({ compressionLevel: 9 }).toFile(path.join(ASSETS, `${brand}-favicon-16.png`));

  const bannerArt = await resizeSource(source, 540, 340);
  await sharp({ create: { width: 1200, height: 340, channels: 4, background: d.bg } })
    .composite([
      { input: bannerArt, left: 660, top: 0 },
      { input: fadeSvg(1200, 340, 600), left: 0, top: 0 },
      { input: textSvg({ width: 1200, height: 340, brand, mode: "banner" }), left: 0, top: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(ASSETS, `${brand}-banner.png`));

  const socialArt = await resizeSource(source, 620, 620);
  await sharp({ create: { width: 1280, height: 640, channels: 4, background: d.bg } })
    .composite([
      { input: socialArt, left: 690, top: 10 },
      { input: fadeSvg(1280, 640, 660), left: 0, top: 0 },
      { input: textSvg({ width: 1280, height: 640, brand, mode: "social" }), left: 0, top: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(ASSETS, `${brand}-social-preview.png`));

  const lockupArt = await resizeSource(source, 300, 300);
  await sharp({ create: { width: 1200, height: 320, channels: 4, background: d.bg } })
    .composite([
      { input: lockupArt, left: 20, top: 10 },
      { input: textSvg({ width: 1200, height: 320, brand, mode: "lockup" }), left: 0, top: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(ASSETS, `${brand}-lockup.png`));
}

async function buildFamilyPreview() {
  const source = path.join(ASSETS, "family-proof-instruments-hero.png");
  const image = await sharp(source).resize(1280, 640, { fit: "cover", position: "centre" }).png().toBuffer();
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="640">
    <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#050607" stop-opacity=".94"/><stop offset=".48" stop-color="#050607" stop-opacity=".42"/><stop offset=".72" stop-color="#050607" stop-opacity="0"/></linearGradient></defs>
    <rect width="1280" height="640" fill="url(#g)"/>
    <text x="72" y="104" fill="#D9553B" font-family="'IBM Plex Mono',Consolas,monospace" font-size="13" font-weight="600" letter-spacing="2.4">SZIGOR RESEARCH / FAMILY SYSTEM 01</text>
    <text x="72" y="224" fill="#FFFDF8" font-family="'Arial Narrow',Arial,sans-serif" font-size="72" font-weight="800" letter-spacing="4">EVIDENCE</text>
    <text x="72" y="306" fill="#FFFDF8" font-family="'Arial Narrow',Arial,sans-serif" font-size="72" font-weight="800" letter-spacing="4">BEFORE ACTION.</text>
    <rect x="72" y="342" width="210" height="8" fill="#D9553B"/>
    <text x="72" y="402" fill="#C9C8C3" font-family="'Noto Sans',Arial,sans-serif" font-size="21">Three instruments. One evidence standard.</text>
  </svg>`);
  await sharp(image).composite([{ input: overlay, left: 0, top: 0 }]).png({ compressionLevel: 9 }).toFile(path.join(ROOT, "social-preview.png"));
}

async function main() {
  for (const brand of Object.keys(brands)) await buildBrand(brand);
  await buildFamilyPreview();
  console.log("Built image-led avatar, banner, lockup, favicon, and social-preview assets.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

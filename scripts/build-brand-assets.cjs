const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "docs", "brand", "assets");

const COLORS = {
  ink: "#070809",
  panel: "#111419",
  panelSoft: "#181C22",
  paper: "#F1EEE7",
  smoke: "#8F96A1",
  rule: "#2B3037",
  szigor: "#3979E8",
  laszlo: "#F3B52E",
  janos: "#D9553B",
};

const brands = {
  szigor: {
    name: "SZIGOR RESEARCH",
    shortName: "SZIGOR",
    role: "MASTER RESEARCH BRAND",
    instrument: "EVIDENCE FRAME",
    line: "One evidence standard. Two independent research systems.",
    meta: "GOVERNANCE  /  PROOF  /  RECOVERABLE STATE",
    accent: COLORS.szigor,
    bg: "#050912",
    avatarBg: "#050912",
    sculptureSource: "janos-ledger-window.png",
    sculpture: "szigor-brand-sculpture.png",
  },
  laszlo: {
    name: "LASZLO",
    shortName: "LASZLO",
    role: "ON-CHAIN RESEARCH SUB-BRAND",
    instrument: "SIGNAL GATE",
    line: "Signal is only useful when action is bounded.",
    meta: "EVENT  /  GATE  /  STATE",
    accent: COLORS.laszlo,
    bg: COLORS.ink,
    avatarBg: COLORS.ink,
    sculptureSource: "laszlo-signal-gate.png",
    sculpture: "laszlo-brand-sculpture.png",
  },
  janos: {
    name: "JANOS",
    shortName: "JANOS",
    role: "US EQUITY RESEARCH SUB-BRAND",
    instrument: "PROOF ENGINE",
    line: "Every price has a time. Every action has a record.",
    meta: "POINT-IN-TIME  /  RELEASE  /  RECONCILIATION",
    accent: COLORS.janos,
    bg: COLORS.ink,
    avatarBg: COLORS.paper,
    sculptureSource: "szigor-proof-instrument.png",
    sculpture: "janos-brand-sculpture.png",
  },
};

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function svgDocument(width, height, content, background = null) {
  const bg = background ? `<rect width="${width}" height="${height}" fill="${background}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${bg}
  ${content}
</svg>`;
}

function markPalette(brand, variant) {
  if (variant === "mono") {
    return { primary: COLORS.ink, secondary: COLORS.ink, aperture: COLORS.paper };
  }
  if (variant === "reverse") {
    return { primary: COLORS.paper, secondary: COLORS.paper, aperture: COLORS.ink };
  }
  if (brand === "szigor") {
    return { primary: COLORS.szigor, secondary: "#78A7FF", aperture: COLORS.paper };
  }
  if (brand === "laszlo") {
    return { primary: COLORS.laszlo, secondary: "#A56D00", aperture: COLORS.ink };
  }
  return {
    primary: variant === "dark" ? "#6F7782" : "#171A1F",
    secondary: variant === "dark" ? "#B8BEC6" : "#3C424B",
    aperture: COLORS.janos,
  };
}

function markShapes(brand, variant = "primary") {
  const c = markPalette(brand, variant);
  if (brand === "laszlo") {
    return `
      <path fill="${c.primary}" fill-rule="evenodd" d="
        M256 38 L474 420 H332 L291 354 L256 474 L221 354 L180 420 H38 Z
        M256 142 L382 360 H312 L281 308 L256 388 L231 308 L200 360 H130 Z"/>
      <path fill="${c.secondary}" d="M221 354 L256 474 L291 354 L275 328 L256 389 L237 328 Z"/>`;
  }
  if (brand === "janos") {
    const accent = variant === "mono" || variant === "reverse" ? c.primary : c.aperture;
    return `
      <path fill="${c.primary}" d="M92 62 H364 L438 136 V220 H340 L314 190 H198 L172 220 H74 V136 Z"/>
      <path fill="${c.primary}" d="M74 292 H172 L198 322 H314 L340 292 H438 V376 L364 450 H148 L74 376 Z"/>
      <rect x="168" y="190" width="176" height="132" rx="10" fill="${accent}"/>
      <circle cx="126" cy="256" r="50" fill="${c.secondary}"/>
      <circle cx="126" cy="256" r="25" fill="${c.primary}"/>
      <path fill="${c.secondary}" d="M300 206 H326 V306 H300 Z M334 206 H348 V306 H334 Z"/>`;
  }
  const arrow = variant === "mono" ? COLORS.paper : c.aperture;
  return `
    <path fill="${c.primary}" d="M60 74 H220 V156 L244 194 L220 228 V284 L244 318 L220 356 V438 H60 L22 400 V112 Z"/>
    <path fill="${c.primary}" d="M452 74 H292 V156 L268 194 L292 228 V284 L268 318 L292 356 V438 H452 L490 400 V112 Z"/>
    <path fill="${c.secondary}" d="M60 74 H220 V112 H78 L60 130 Z M452 74 H292 V112 H434 L452 130 Z"/>
    <path fill="${arrow}" d="M256 142 L310 210 H282 V326 H230 V210 H202 Z"/>`;
}

function transformMark(brand, x, y, scale, variant = "primary") {
  return `<g transform="translate(${x} ${y}) scale(${scale})">${markShapes(brand, variant)}</g>`;
}

function markSvg(brand, variant = "primary", background = null) {
  return svgDocument(512, 512, markShapes(brand, variant), background);
}

function textLines(x, y, lines, options = {}) {
  const {
    size = 24,
    fill = COLORS.paper,
    weight = 600,
    family = "Arial, sans-serif",
    lineHeight = Math.round(size * 1.22),
    anchor = "start",
    letterSpacing = 0,
  } = options;
  const tspans = lines
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join("");
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${fill}" font-family="${family}" font-size="${size}" font-weight="${weight}" letter-spacing="${letterSpacing}">${tspans}</text>`;
}

function brandLockupSvg(brand, { reverse = false, background = null } = {}) {
  const d = brands[brand];
  const variant = reverse ? (brand === "janos" ? "dark" : "primary") : "primary";
  const nameColor = reverse ? COLORS.paper : COLORS.ink;
  const copyColor = reverse ? "#B6BBC2" : "#626872";
  const mark = transformMark(brand, 44, 24, 0.53, variant);
  const content = `
    ${mark}
    <text x="360" y="132" fill="${nameColor}" font-family="'Arial Narrow',Arial,sans-serif" font-size="72" font-weight="800" letter-spacing="8">${d.name}</text>
    <rect x="360" y="158" width="186" height="8" fill="${d.accent}"/>
    <text x="360" y="210" fill="${copyColor}" font-family="Arial,sans-serif" font-size="20" font-weight="500">${d.line}</text>
    <text x="360" y="260" fill="${copyColor}" font-family="Consolas,monospace" font-size="11" font-weight="600" letter-spacing="2">${d.role} / ${d.instrument}</text>`;
  return svgDocument(1200, 320, content, background);
}

function brandBannerSvg(brand) {
  const d = brands[brand];
  const markVariant = brand === "janos" ? "dark" : "primary";
  const content = `
    <rect x="720" width="480" height="340" fill="${brand === "szigor" ? "#071125" : "#0B0D10"}"/>
    ${transformMark(brand, 805, 18, 0.59, markVariant)}
    <text x="64" y="58" fill="${d.accent}" font-family="Consolas,monospace" font-size="12" font-weight="700" letter-spacing="2.4">${d.role}</text>
    <text x="64" y="154" fill="${COLORS.paper}" font-family="'Arial Narrow',Arial,sans-serif" font-size="76" font-weight="800" letter-spacing="9">${d.name}</text>
    <rect x="64" y="181" width="176" height="8" fill="${d.accent}"/>
    <text x="64" y="222" fill="#D6D4CE" font-family="Arial,sans-serif" font-size="20" font-weight="500">${d.line}</text>
    <text x="64" y="278" fill="${COLORS.smoke}" font-family="Consolas,monospace" font-size="11" font-weight="600" letter-spacing="2">${d.meta}</text>`;
  return svgDocument(1200, 340, content, d.bg);
}

function brandSocialSvg(brand) {
  const d = brands[brand];
  const variant = brand === "janos" ? "dark" : "primary";
  const content = `
    <rect x="740" width="540" height="640" fill="${brand === "szigor" ? "#071125" : "#0B0D10"}"/>
    ${transformMark(brand, 800, 68, 0.86, variant)}
    <text x="78" y="106" fill="${d.accent}" font-family="Consolas,monospace" font-size="13" font-weight="700" letter-spacing="2.5">${d.role}</text>
    <text x="78" y="270" fill="${COLORS.paper}" font-family="'Arial Narrow',Arial,sans-serif" font-size="88" font-weight="800" letter-spacing="8">${d.name}</text>
    <rect x="78" y="306" width="230" height="9" fill="${d.accent}"/>
    ${textLines(78, 370, [d.line], { size: 24, fill: "#D6D4CE", weight: 500 })}
    <text x="78" y="454" fill="${COLORS.smoke}" font-family="Consolas,monospace" font-size="12" font-weight="600" letter-spacing="2">${d.meta}</text>
    <text x="78" y="562" fill="#626872" font-family="Consolas,monospace" font-size="11" font-weight="600" letter-spacing="1.8">SZIGOR RESEARCH / PROOF INSTRUMENTS / SYSTEM 02</text>`;
  return svgDocument(1280, 640, content, d.bg);
}

function familyGeometricSvg() {
  const columns = [
    { brand: "laszlo", x: 70, index: "01" },
    { brand: "janos", x: 570, index: "02" },
    { brand: "szigor", x: 1070, index: "03" },
  ];
  const cards = columns
    .map(({ brand, x, index }) => {
      const d = brands[brand];
      const variant = brand === "janos" ? "dark" : "primary";
      return `
        <g>
          <rect x="${x}" y="150" width="460" height="350" rx="18" fill="${brand === "szigor" ? "#0B1429" : COLORS.panel}"/>
          <rect x="${x}" y="150" width="460" height="10" rx="5" fill="${d.accent}"/>
          <text x="${x + 30}" y="198" fill="${d.accent}" font-family="Consolas,monospace" font-size="12" font-weight="700" letter-spacing="2">${index}</text>
          ${transformMark(brand, x + 28, 206, 0.42, variant)}
          <text x="${x + 250}" y="294" fill="${COLORS.paper}" font-family="'Arial Narrow',Arial,sans-serif" font-size="42" font-weight="800" letter-spacing="5">${d.shortName}</text>
          <text x="${x + 250}" y="332" fill="${d.accent}" font-family="Consolas,monospace" font-size="11" font-weight="700" letter-spacing="1.8">${d.instrument}</text>
          ${textLines(x + 250, 378, [d.role.replace(" RESEARCH ", " "), "IDENTITY"], { size: 13, fill: COLORS.smoke, weight: 600, family: "Consolas,monospace", lineHeight: 22, letterSpacing: 1.3 })}
        </g>`;
    })
    .join("");
  const content = `
    <text x="70" y="65" fill="${COLORS.szigor}" font-family="Consolas,monospace" font-size="13" font-weight="700" letter-spacing="2.5">SZIGOR RESEARCH / GEOMETRIC IDENTITY FAMILY</text>
    <text x="70" y="118" fill="${COLORS.paper}" font-family="'Arial Narrow',Arial,sans-serif" font-size="44" font-weight="800" letter-spacing="2">THREE MARKS. ONE EVIDENCE STANDARD.</text>
    ${cards}`;
  return svgDocument(1600, 560, content, COLORS.ink);
}

function brandArchitectureSvg() {
  const content = `
    <text x="70" y="68" fill="${COLORS.szigor}" font-family="Consolas,monospace" font-size="13" font-weight="700" letter-spacing="2.5">BRAND ARCHITECTURE / CONTROLLED ENDORSEMENT</text>
    <text x="70" y="128" fill="${COLORS.paper}" font-family="'Arial Narrow',Arial,sans-serif" font-size="54" font-weight="800" letter-spacing="2">ONE STANDARD. TWO INDEPENDENT SYSTEMS.</text>

    <rect x="360" y="170" width="680" height="240" rx="22" fill="#0B1429"/>
    <rect x="360" y="170" width="680" height="11" rx="5" fill="${COLORS.szigor}"/>
    ${transformMark("szigor", 405, 193, 0.34, "primary")}
    <text x="620" y="260" fill="${COLORS.szigor}" font-family="Consolas,monospace" font-size="12" font-weight="700" letter-spacing="2">MASTER RESEARCH BRAND</text>
    <text x="620" y="318" fill="${COLORS.paper}" font-family="'Arial Narrow',Arial,sans-serif" font-size="48" font-weight="800" letter-spacing="5">SZIGOR RESEARCH</text>
    <text x="620" y="358" fill="#AEB5BE" font-family="Arial,sans-serif" font-size="18">Evidence governance · shared engineering standard · portfolio</text>

    <path d="M520 448 H880 V496 H964 L700 596 L436 496 H520 Z" fill="${COLORS.szigor}"/>
    <text x="700" y="505" text-anchor="middle" fill="#FFFFFF" font-family="Consolas,monospace" font-size="16" font-weight="800" letter-spacing="2">EVIDENCE BEFORE ACTION</text>
    <text x="700" y="541" text-anchor="middle" fill="#DDE8FF" font-family="Arial,sans-serif" font-size="16" font-weight="600">Shared proof discipline · separate authority</text>

    <rect x="70" y="630" width="600" height="240" rx="22" fill="${COLORS.panel}"/>
    <rect x="70" y="630" width="600" height="11" rx="5" fill="${COLORS.laszlo}"/>
    ${transformMark("laszlo", 105, 660, 0.31, "primary")}
    <text x="310" y="706" fill="${COLORS.laszlo}" font-family="Consolas,monospace" font-size="12" font-weight="700" letter-spacing="2">RESEARCH SUB-BRAND / ON-CHAIN</text>
    <text x="310" y="762" fill="${COLORS.paper}" font-family="'Arial Narrow',Arial,sans-serif" font-size="48" font-weight="800" letter-spacing="6">LASZLO</text>
    ${textLines(310, 804, ["Events · risk gates · execution state", "Independent data, models, accounts and capital"], { size: 16, fill: "#AEB5BE", weight: 500, lineHeight: 27 })}

    <rect x="730" y="630" width="600" height="240" rx="22" fill="${COLORS.panel}"/>
    <rect x="730" y="630" width="600" height="11" rx="5" fill="${COLORS.janos}"/>
    ${transformMark("janos", 765, 660, 0.31, "dark")}
    <text x="970" y="706" fill="${COLORS.janos}" font-family="Consolas,monospace" font-size="12" font-weight="700" letter-spacing="2">RESEARCH SUB-BRAND / US EQUITIES</text>
    <text x="970" y="762" fill="${COLORS.paper}" font-family="'Arial Narrow',Arial,sans-serif" font-size="48" font-weight="800" letter-spacing="6">JANOS</text>
    ${textLines(970, 804, ["Point-in-time evidence · releases · Paper control", "Independent data, models, accounts and capital"], { size: 16, fill: "#AEB5BE", weight: 500, lineHeight: 27 })}

    <text x="700" y="938" text-anchor="middle" fill="${COLORS.smoke}" font-family="Consolas,monospace" font-size="12" font-weight="600" letter-spacing="1.5">BRAND HIERARCHY DOES NOT BY ITSELF ASSERT LEGAL OWNERSHIP, SHARED ACCOUNTS OR SHARED CAPITAL.</text>`;
  return svgDocument(1400, 980, content, COLORS.ink);
}

function flowArrow(x, y, width, color) {
  return `<path fill="${color}" d="M${x} ${y - 6} H${x + width - 18} V${y - 16} L${x + width} ${y} L${x + width - 18} ${y + 16} V${y + 6} H${x} Z"/>`;
}

function flowNode({ x, y, width, height, index, title, lines, accent }) {
  return `
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="14" fill="${COLORS.panelSoft}"/>
    <rect x="${x}" y="${y}" width="${width}" height="8" rx="4" fill="${accent}"/>
    <text x="${x + 18}" y="${y + 36}" fill="${accent}" font-family="Consolas,monospace" font-size="11" font-weight="700" letter-spacing="1.8">${index}</text>
    ${textLines(x + 18, y + 78, title, { size: 18, fill: COLORS.paper, weight: 800, family: "'Arial Narrow',Arial,sans-serif", lineHeight: 23 })}
    ${textLines(x + 18, y + 132, lines, { size: 13, fill: "#AEB5BE", weight: 500, lineHeight: 20 })}`;
}

function technicalDiagramSvg(brand) {
  const isLaszlo = brand === "laszlo";
  const d = brands[brand];
  const nodes = isLaszlo
    ? [
        { title: ["BASE L2", "UNISWAP V3"], lines: ["On-chain", "market events"] },
        { title: ["MULTI-RPC", "INGESTOR"], lines: ["WebSocket", "failover"] },
        { title: ["STREAMS +", "FEATURE STATE"], lines: ["Redis streams", "positions"] },
        { title: ["XGBOOST", "STRATEGY"], lines: ["Manifest-locked", "features"] },
        { title: ["RISK +", "ROUTE GATE"], lines: ["Conservative BUY", "fee-tier quote"] },
        { title: ["RUST", "EXECUTOR"], lines: ["Paper → Anvil", "Live by approval"] },
        { title: ["LEDGER +", "RECONCILE"], lines: ["Append-only", "replayable state"] },
      ]
    : [
        { title: ["EVIDENCE", "INPUTS"], lines: ["Market + SEC", "source archive"] },
        { title: ["IMMUTABLE", "PIT DATASET"], lines: ["Dual-price", "available_at"] },
        { title: ["FROZEN", "PROTOCOL"], lines: ["Cutoff · costs", "purged folds"] },
        { title: ["CONFIRMED", "EXPERIMENT"], lines: ["One-time test", "walk-forward"] },
        { title: ["HMAC", "RELEASE GATE"], lines: ["Dataset · model", "source binding"] },
        { title: ["DETERMINISTIC", "PAPER PLANE"], lines: ["Snapshot · outbox", "risk · worker"] },
        { title: ["IBKR DU", "PAPER CONTROL"], lines: ["Reconcile · halt", "recovery · audit"] },
      ];
  const startX = 52;
  const nodeWidth = 166;
  const gap = 28;
  const nodeY = 210;
  const cards = nodes
    .map((node, index) => {
      const x = startX + index * (nodeWidth + gap);
      const arrow = index < nodes.length - 1 ? flowArrow(x + nodeWidth + 4, nodeY + 94, gap - 8, d.accent) : "";
      return flowNode({
        x,
        y: nodeY,
        width: nodeWidth,
        height: 205,
        index: String(index + 1).padStart(2, "0"),
        title: node.title,
        lines: node.lines,
        accent: d.accent,
      }) + arrow;
    })
    .join("");

  const boundaryTitle = isLaszlo
    ? "AI RESEARCH IS SHADOW-ONLY — NO ORDER, RISK OR CAPITAL AUTHORITY"
    : "HARD AUTHORITY BOUNDARY — AI HAS NO RUNTIME ORDER PATH";
  const notes = isLaszlo
    ? [
        ["Only rust_executor can transmit a swap.", "BUY fails closed; SELL preserves an escape path."],
        ["Paper / Anvil and Live / Base stay separate.", "Live capital requires independent approval."],
      ]
    : [
        ["Only contract-qualified instruments and", "DU-prefixed IBKR Paper accounts reach the worker."],
        ["Verified: offline + PostgreSQL control paths.", "Pending: licensed data, SEC monitoring, real DU Paper."],
      ];

  const content = `
    <text x="52" y="65" fill="${d.accent}" font-family="Consolas,monospace" font-size="13" font-weight="700" letter-spacing="2.4">${d.role} / TECHNICAL ARCHITECTURE</text>
    <text x="52" y="128" fill="${COLORS.paper}" font-family="'Arial Narrow',Arial,sans-serif" font-size="52" font-weight="800" letter-spacing="2">${isLaszlo ? "EVENT → GATE → EXECUTION → REPLAY" : "EVIDENCE → RELEASE → PAPER CONTROL"}</text>
    <text x="52" y="168" fill="#AEB5BE" font-family="Arial,sans-serif" font-size="17">${isLaszlo ? "Stable public hot path; research evidence remains outside runtime authority." : "Research and release remain separate from the deterministic Paper control plane."}</text>
    ${cards}
    <path fill="${d.accent}" d="M52 468 H1348 V530 H1298 L1268 500 L1238 530 H52 Z"/>
    <text x="700" y="506" text-anchor="middle" fill="${isLaszlo ? COLORS.ink : "#FFFFFF"}" font-family="Consolas,monospace" font-size="15" font-weight="800" letter-spacing="1.7">${boundaryTitle}</text>
    <rect x="52" y="572" width="620" height="150" rx="14" fill="${COLORS.panel}"/>
    <rect x="728" y="572" width="620" height="150" rx="14" fill="${COLORS.panel}"/>
    <text x="78" y="612" fill="${d.accent}" font-family="Consolas,monospace" font-size="11" font-weight="700" letter-spacing="1.6">CONTROL BOUNDARY</text>
    ${textLines(78, 650, notes[0], { size: 16, fill: "#C1C5CA", weight: 500, lineHeight: 27 })}
    <text x="754" y="612" fill="${d.accent}" font-family="Consolas,monospace" font-size="11" font-weight="700" letter-spacing="1.6">CURRENT STATUS</text>
    ${textLines(754, 650, notes[1], { size: 16, fill: "#C1C5CA", weight: 500, lineHeight: 27 })}
    <text x="52" y="780" fill="${COLORS.smoke}" font-family="Consolas,monospace" font-size="11" font-weight="600" letter-spacing="1.3">${isLaszlo ? "REDIS DELIVERY IS AT-LEAST-ONCE · INTENT IDEMPOTENCY · RECEIPT POLLING WITHOUT RESUBMISSION" : "POSITIVE EXPECTANCY NOT ESTABLISHED · PAPER OBSERVATION NOT STARTED · NO LIVE-CAPITAL ROUTE"}</text>`;
  return svgDocument(1400, 820, content, COLORS.ink);
}

async function renderSvg(svg, output, width, height) {
  await sharp(Buffer.from(svg))
    .resize(width, height)
    .png({ compressionLevel: 9 })
    .toFile(path.join(ASSETS, output));
}

function writeSvg(output, svg) {
  fs.writeFileSync(path.join(ASSETS, output), svg, "utf8");
}

async function buildBrand(brand) {
  const d = brands[brand];
  const source = path.join(ASSETS, d.sculptureSource);
  const canonical = path.join(ASSETS, d.sculpture);
  if (!fs.existsSync(source)) throw new Error(`Missing sculpture source: ${source}`);
  fs.copyFileSync(source, canonical);

  const primary = markSvg(brand, "primary");
  const mono = markSvg(brand, "mono");
  const reverse = markSvg(brand, "reverse");
  const avatarVariant = brand === "janos" ? "primary" : "primary";
  const avatar = markSvg(brand, avatarVariant, d.avatarBg);
  const lockupPrimary = brandLockupSvg(brand);
  const lockupReverse = brandLockupSvg(brand, { reverse: true });
  const lockupPng = brandLockupSvg(brand, { reverse: true, background: d.bg });
  const banner = brandBannerSvg(brand);
  const social = brandSocialSvg(brand);

  writeSvg(`${brand}-geometric.svg`, primary);
  writeSvg(`${brand}-geometric-mono.svg`, mono);
  writeSvg(`${brand}-geometric-reverse.svg`, reverse);
  writeSvg(`${brand}-geometric-lockup.svg`, lockupPrimary);
  writeSvg(`${brand}-geometric-lockup-reverse.svg`, lockupReverse);
  writeSvg(`${brand}-banner.svg`, banner);
  writeSvg(`${brand}-social-preview.svg`, social);

  await renderSvg(primary, `${brand}-geometric.png`, 512, 512);
  await renderSvg(primary, `${brand}-mark.png`, 512, 512);
  await renderSvg(avatar, `${brand}-avatar.png`, 512, 512);
  await renderSvg(avatar, `${brand}-favicon-32.png`, 32, 32);
  await renderSvg(avatar, `${brand}-favicon-16.png`, 16, 16);
  await renderSvg(lockupPng, `${brand}-lockup.png`, 1200, 320);
  await renderSvg(banner, `${brand}-banner.png`, 1200, 340);
  await renderSvg(social, `${brand}-social-preview.png`, 1280, 640);
}

async function buildFamilyAssets() {
  const family = familyGeometricSvg();
  const architecture = brandArchitectureSvg();
  const laszloTech = technicalDiagramSvg("laszlo");
  const janosTech = technicalDiagramSvg("janos");

  writeSvg("family-geometric-system.svg", family);
  writeSvg("brand-architecture-map.svg", architecture);
  writeSvg("laszlo-technical-architecture.svg", laszloTech);
  writeSvg("janos-technical-architecture.svg", janosTech);

  await renderSvg(family, "family-geometric-system.png", 1600, 560);
  await renderSvg(architecture, "brand-architecture-map.png", 1400, 980);
  await renderSvg(laszloTech, "laszlo-technical-architecture.png", 1400, 820);
  await renderSvg(janosTech, "janos-technical-architecture.png", 1400, 820);

  const heroPath = path.join(ASSETS, "family-proof-instruments-hero.png");
  const hero = await sharp(heroPath).resize(1280, 640, { fit: "cover", position: "centre" }).toBuffer();
  const szigorMark = await sharp(Buffer.from(markSvg("szigor", "primary"))).resize(150, 150).png().toBuffer();
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="640">
    <defs><linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#050912" stop-opacity=".98"/><stop offset=".52" stop-color="#050912" stop-opacity=".68"/><stop offset=".78" stop-color="#050912" stop-opacity=".08"/></linearGradient></defs>
    <rect width="1280" height="640" fill="url(#fade)"/>
    <text x="72" y="280" fill="#3979E8" font-family="Consolas,monospace" font-size="13" font-weight="700" letter-spacing="2.4">SZIGOR RESEARCH / MASTER BRAND</text>
    <text x="72" y="374" fill="#F1EEE7" font-family="'Arial Narrow',Arial,sans-serif" font-size="66" font-weight="800" letter-spacing="3">ONE EVIDENCE STANDARD.</text>
    <text x="72" y="446" fill="#F1EEE7" font-family="'Arial Narrow',Arial,sans-serif" font-size="54" font-weight="800" letter-spacing="3">TWO INDEPENDENT SYSTEMS.</text>
    <text x="72" y="512" fill="#B6BBC2" font-family="Arial,sans-serif" font-size="20">LASZLO / on-chain research · JANOS / US equity research</text>
  </svg>`);
  await sharp(hero)
    .composite([
      { input: overlay, left: 0, top: 0 },
      { input: szigorMark, left: 68, top: 62 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(ROOT, "social-preview.png"));
}

async function main() {
  for (const brand of Object.keys(brands)) await buildBrand(brand);
  await buildFamilyAssets();
  console.log("Built geometric identity, architecture, banner, avatar, favicon, and social-preview assets.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

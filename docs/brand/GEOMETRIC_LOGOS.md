# Geometric Logo System

> Everyday identity standard · 2026-07-17

The geometric family is the default identity for organization profiles,
websites, navigation, favicons, diagrams, documentation, and small interface
surfaces. The marks use solid mass and decisive negative space rather than thin
outlines.

## Canonical mapping

| Brand | Geometric mark | Three-dimensional instrument | Color |
| --- | --- | --- | --- |
| **Szigor Research** | **Evidence Frame** — two blue leaves around a central proof arrow | Blue twin-frame instrument, right side of the family hero | Szigor Blue `#3979E8` |
| **LASZLO** | **Signal Gate** — gold triangular gate with an integrated event pulse | Gold triangular instrument, left side of the family hero | LASZLO Gold `#F3B52E` |
| **JANOS** | **Proof Engine** — carbon housing around an oxide witness cell | Black/red instrument, center of the family hero | JANOS Oxide `#D9553B` |

Szigor is the master research brand. LASZLO and JANOS are peer research
sub-brands. The central arrow belongs to Szigor's Evidence Frame and to the
brand-architecture diagram; it is not a claim that Szigor shares runtime
authority, accounts, data, models, releases, or capital with either sub-brand.

## Production files

Every brand receives the same complete set:

| Asset | Pattern | Use |
| --- | --- | --- |
| Primary vector | `{brand}-geometric.svg` | Light backgrounds and documentation |
| Monochrome vector | `{brand}-geometric-mono.svg` | One-color production |
| Reverse vector | `{brand}-geometric-reverse.svg` | Dark backgrounds |
| Primary lockup | `{brand}-geometric-lockup.svg` | Light editorial surfaces |
| Reverse lockup | `{brand}-geometric-lockup-reverse.svg` | Dark editorial surfaces |
| Compact PNG | `{brand}-geometric.png`, `{brand}-mark.png` | Raster UI and integrations |
| Avatar | `{brand}-avatar.png` | 512 × 512 organization or repository avatar |
| Favicons | `{brand}-favicon-16.png`, `{brand}-favicon-32.png` | Browser and compact UI |
| Banner | `{brand}-banner.svg`, `{brand}-banner.png` | README and profile header |
| Social preview | `{brand}-social-preview.svg`, `{brand}-social-preview.png` | Repository sharing |

Family assets:

- `family-geometric-system.svg` — three-mark identity sheet;
- `brand-architecture-map.svg` — Szigor endorsement and central arrow;
- `laszlo-technical-architecture.svg` — stable LASZLO hot path;
- `janos-technical-architecture.svg` — JANOS research, release, and Paper control;
- `family-proof-instruments-hero.png` — three-dimensional editorial family image.

PNG counterparts are supplied for each family diagram.

## Usage hierarchy

1. **Geometric mark first:** organization avatar, repository avatar, website
   navigation, favicon, docs, architecture, and UI.
2. **Lockup when the name matters:** README headers, partner decks, and
   editorial surfaces.
3. **Three-dimensional instrument for emotion:** launches, social media,
   campaign covers, and large feature imagery.
4. **Never shrink the sculptures into favicons:** small sizes use geometric
   marks only.

## Construction rules

- Use filled shapes; never reduce a mark to a hairline drawing.
- Preserve the negative aperture or witness cell exactly.
- Keep clear space equal to at least one quarter of the mark width.
- Minimum recommended size: 24 px for the standalone mark, 180 px for a
  horizontal lockup.
- Do not stretch, rotate, bevel, outline, add shadows, or apply gradients to the
  geometric master.
- Do not splice the three marks into one composite logo. Use the approved
  architecture diagram when the family relationship must be shown.
- Identity colors never replace risk, warning, approval, execution, or health
  semantics.

## Deterministic build

Run from the repository root:

```powershell
node scripts/build-brand-assets.cjs
python scripts/validate-brand-assets.py
```

The builder writes every vector and raster export from one geometric source so
the website, GitHub profile, favicons, diagrams, and social previews cannot
drift apart.

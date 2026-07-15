# Szigor Research Visual System

> Direction: **Confluence S / 合流 S**
> Status: implementation candidate with LASZLO product pilot · 2026-07-15

This is the shared identity system for **Szigor Research**, **LASZLO**, and
**JANOS**. It replaces the earlier LASZLO-only warm-editorial proposal as the
family-level source of truth. This organization repository is canonical;
product repositories may carry pinned local copies for offline rendering and
must preserve the same geometry, color tokens, and product boundaries.

## 1. Brand architecture

| Layer | Name | Meaning | Relationship |
| --- | --- | --- | --- |
| Shared research identity | **Szigor Research** | Evidence, constraints, recoverable state, and public engineering governance | Not a legal holding company and not a third product |
| Parallel market lab | **LASZLO** | EVM / on-chain events, risk gates, and execution | Parallel to JANOS |
| Parallel market lab | **JANOS** | US equity evidence, point-in-time datasets, portfolios, and broker reconciliation | Parallel to LASZLO |

The endorsed lockups make this boundary visible:

- `Szigor Research`
- `LASZLO — Szigor Research / On-chain market lab`
- `JANOS — Szigor Research / US equity market lab`

Neither product may be presented as the parent of the other. Szigor Research
names the common standard of proof, not shared strategy code, capital, legal
ownership, or accounts.

## 2. Core mark: Confluence S

The mark is an abstract `S` built from two rails.

1. At the upper and lower terminals, both rails remain visibly independent.
2. At the center, they align into one short carbon proof band.
3. After the shared interval, they become distinct again.

The center therefore means **the same evidence threshold**, not merger,
absorption, or hierarchy. LASZLO is the ochre rail; JANOS is the ledger-blue
rail. The small fusion-clay aperture marks the inspectable proof point.

### Construction rules

- Design grid: `64 × 64`; production master: `512 × 512`.
- Standard rail width: approximately `3/64` of the canvas.
- Shared proof band: approximately `9–12%` of total path length.
- Terminals use a controlled square/oblique cut, not playful round caps.
- The pure monochrome mark is the legal master. Color is an identity layer.
- At `24px+`, use the full twin-rail mark. At `16–20px`, omit the clay aperture.
- Maintain at least one terminal-gap of clear space around the mark.

Do not turn the center into a chain link, infinity loop, road junction, dollar
sign, or permanent blend of the two product colors.

## 3. Visual principle

The system borrows the *discipline* of strong contemporary AI brands rather
than copying another company's palette, mascot, or page layout:

- **Editorial scale:** one decisive image or typographic statement, not a grid
  of equally loud cards.
- **Material intelligence:** paper tooth, dry pigment, graphite registration,
  vellum, metal edges, and measured imperfection.
- **Compositional motion:** rails enter independently, align, and resolve.
- **Technical exactness:** evidence labels, timestamps, coordinates, and rules
  stay legible and restrained.
- **Recognizable without the logo:** crops of the twin rail and proof interval
  should identify the family even when the complete S is absent.

The internal visual phrase is **Two systems. One standard of proof.**

## 4. Color

### Shared neutrals

| Token | Value | Role |
| --- | --- | --- |
| `--sg-paper` | `#F3EEE4` | Primary editorial field |
| `--sg-warm-white` | `#FBF8F1` | Raised paper and document surfaces |
| `--sg-carbon` | `#1E1D1A` | Master mark, headlines, dark fields |
| `--sg-graphite` | `#65615A` | Secondary copy and construction notes |
| `--sg-hairline` | `#D8D0C3` | Rules, grids, and registration marks |
| `--sg-fusion` | `#BC6548` | The common proof point only |

### Product identity accents

| Product | Identity color | Meaning |
| --- | --- | --- |
| LASZLO | `#C9912F` Signal Ochre | On-chain events, pulse, execution |
| JANOS | `#345D7E` Ledger Blue | Company evidence, breadth, reconciliation |

LASZLO's historical `#FFB24D` may remain as a high-luminance compatibility
signal inside the existing product UI. New brand/editorial assets use the
deeper Signal Ochre. Brand colors never replace semantic risk colors.

Use approximately `80%` neutrals, `12%` identity color, and `8%` state or
supporting color. Red and green remain reserved for risk and health semantics.

## 5. Typography

| Role | Preferred family | Repository-safe fallback |
| --- | --- | --- |
| Display / editorial | Newsreader Variable | `Noto Serif SC`, Georgia, serif |
| Interface / narrative | Source Sans 3 | Source Sans Pro, Segoe UI, sans-serif |
| Data / evidence | IBM Plex Mono | Consolas, monospace |
| Chinese | Noto Serif SC / Noto Sans SC | system serif / sans |

Display typography is large, quiet, and sentence case. System names remain
uppercase in endorsed lockups. Evidence labels use restrained mono uppercase;
paragraphs and warnings do not.

## 6. Family grammar

### Szigor Research

- Full twin-color mark or monochrome master.
- Light mineral-paper field is the default public expression.
- Fusion clay appears only at the central proof interval or as a short rule.
- Primary line: **Evidence-bound decision systems.**
- Supporting line: **Evidence before action.**

### LASZLO

- Same S geometry; Signal Ochre is emphasized and the other rail is neutral.
- Motion language: event pulse, temporal sequence, deterministic gate.
- Product UI may remain dense and dark; editorial and launch media use the
  shared paper/material system.
- The historical triangle/pulse logo and Inversion Sentinel are product-level
  legacy assets, not the family master.

### JANOS

- Same S geometry; Ledger Blue is emphasized and the other rail is neutral.
- Motion language: dual-price bands, evidence grid, session window, ledger
  reconciliation.
- It must not look like a blue recolor of the old LASZLO terminal.

## 7. Layout and motion

- Use full-bleed rail crops, hard editorial edges, and large quiet fields.
- A section may begin with two rules and finish with one short proof rule.
- Registration ticks and evidence metadata support a composition; they never
  become decorative pseudo-technical noise.
- Entry motion target: `500–700ms`, two rails arrive independently, the center
  holds for `120–180ms`, then the headline resolves.
- Operational alerts never inherit brand animation.

## 8. Asset inventory

| Asset | Use |
| --- | --- |
| `assets/szigor-confluence-mark.svg` | Primary family color mark |
| `assets/szigor-confluence-mark-mono.svg` | Monochrome master |
| `assets/szigor-avatar.svg` / `.png` | GitHub/avatar source and upload-ready export |
| `assets/szigor-banner.svg` / `.png` | Organization profile and social banner source plus upload-ready export |
| `assets/szigor-lockup.svg` | Organization lockup |
| `assets/laszlo-confluence-mark.svg` | LASZLO-endorsed mark |
| `assets/laszlo-confluence-banner.svg` / `.png` | LASZLO launch/banner source plus upload-ready export |
| `assets/laszlo-lockup.svg` | LASZLO endorsed lockup |
| `assets/janos-confluence-mark.svg` | JANOS-endorsed mark |
| `assets/janos-confluence-banner.svg` / `.png` | JANOS launch/banner source plus upload-ready export |
| `assets/janos-lockup.svg` | JANOS endorsed lockup |
| `assets/szigor-confluence-hero.png` | Generated tactile master-brand key visual |
| `visual-system.html` | Runnable family specimen and review board |
| `IMAGEGEN_PROMPTS.md` | Reproducible image-generation source |

## 9. Legacy and migration

- `laszlo-icon.png` and `laszlo-banner.png` remain LASZLO historical assets.
- The Inversion Sentinel may remain a secondary LASZLO character after a
  separate review; it does not appear in Szigor or JANOS identity media.
- `laszlo-sentinel-signal-garden.png` is a rejected family direction. It may be
  retained for audit/history but must not be used as the new master visual.
- LASZLO dashboards may pilot the endorsed lockup and semantic palette. That
  product-level pilot does not authorize replacing the public organization
  avatar or banner; those remain gated by small-size and crop review.

## 10. Review checklist

- Does the mark still read as an `S` in monochrome?
- Are two rails visible at both terminals and only one interval visible at the center?
- Do LASZLO and JANOS look parallel rather than parent/subsidiary?
- Can a composition be recognized from rail crops without showing a mascot?
- Are identity colors separated from risk, health, and execution states?
- Does the system feel exact and expressive without copying Claude's assets?

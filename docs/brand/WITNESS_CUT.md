# Witness Cut / Proof Instruments

> Adopted for Szigor Research, LASZLO, and JANOS on 2026-07-17.
>
> Supersedes the Confluence S system.

The family premise is **Three instruments. One evidence standard.** Szigor
Research is the master research brand. LASZLO and JANOS are specialist
sub-brands beneath it and peers to each other. Hierarchy changes the role of a
brand, never its level of craft.

This is an image-led identity system. Each brand is represented by a
photographic, physically substantial proof instrument—not by a recolored
shared glyph or a collection of thin technical lines.

## Brand architecture

| Brand | Role | Research focus | Primary emblem |
| --- | --- | --- | --- |
| **Szigor Research** | Master research brand | Evidence governance, engineering standards, and the research portfolio | **Proof Instrument** |
| **LASZLO** | Research sub-brand | On-chain events, risk gates, execution state, and replay | **Signal Gate** |
| **JANOS** | Research sub-brand | US equity evidence, point-in-time datasets, releases, and reconciliation | **Ledger Window** |

Preferred endorsement names are `LASZLO / SZIGOR RESEARCH` and
`JANOS / SZIGOR RESEARCH`. The architecture does not itself assert legal
ownership, equity, account, or IP relationships.

## Shared visual grammar

The shared idea is the **Witness Cut**: a controlled aperture, interruption, or
contrast cell where evidence becomes inspectable. The three outer silhouettes
remain independent.

All three identities use:

- dense black fields and directional studio light;
- thick, machined mass with visible material texture;
- one controlled brand color;
- a single legible aperture or witness event;
- restrained editorial typography and operational metadata;
- finished imagery as the composition, with rules and grids only as support.

Do not rebuild the family as an `S`, chain link, infinity loop, road junction,
or shared letterform. Do not reduce the primary emblems to hairline icons.

## The three instruments

### Szigor Research — Proof Instrument

A compact black and titanium calibration housing holds one oxide-red witness
cell. The form is authoritative, asymmetrical, and purpose-built rather than a
literal letter.

- Color: Szigor Oxide `#D9553B`
- Voice: **Evidence before action.**
- Use: organization profile, governance, research standards, and family media
- Master image: `assets/szigor-proof-instrument.png`

### LASZLO — Signal Gate

A heavy gold triangular gate surrounds a black ceramic core. A broad event
pulse is structurally fused into the lower frame. The outline must feel forged
and load-bearing, never like a heartbeat line, chart, mountain, or thin wire.

- Color: LASZLO Signal `#F3B52E`
- Voice: **Signal is only useful when action is bounded.**
- Sequence: **EVENT / GATE / STATE**
- Master image: `assets/laszlo-signal-gate.png`

The approved version is the thick-frame refinement. Earlier thin-outline
LASZLO studies are rejected and must not be used.

### JANOS — Ledger Window

Two cobalt ledger plates form a stable point-in-time window around a narrow
central aperture. The object is balanced, archival, and materially durable.

- Color: JANOS Ledger `#3979E8`
- Voice: **Every price has a time. Every action has a record.**
- Sequence: **POINT-IN-TIME / RELEASE / RECONCILIATION**
- Master image: `assets/janos-ledger-window.png`

## Equal professional completeness

Each identity ships with the same finished asset set:

| Deliverable | Pattern | Size |
| --- | --- | --- |
| Primary emblem render | `{brand}-proof-instrument.png` or brand equivalent | High-resolution source |
| Avatar | `{brand}-avatar.png` | 512 × 512 |
| Compact mark | `{brand}-mark.png` | 512 × 512 |
| Favicons | `{brand}-favicon-16.png`, `{brand}-favicon-32.png` | 16 × 16, 32 × 32 |
| Horizontal lockup | `{brand}-lockup.png` | 1200 × 320 |
| README banner | `{brand}-banner.png` | 1200 × 340 |
| Social preview | `{brand}-social-preview.png` | 1280 × 640 |

In family presentations, show all three emblems at equal optical weight and
production finish. Brand order may communicate architecture—Szigor first,
followed by LASZLO and JANOS as peers—but no identity is a minor badge.

## Color and typography

| Token | Value | Role |
| --- | --- | --- |
| Instrument Black | `#070809` | Shared field |
| Instrument White | `#F1EEE7` | Primary reverse copy |
| Evidence Gray | `#8F96A1` | Metadata and secondary copy |
| Szigor Oxide | `#D9553B` | Szigor identity accent |
| LASZLO Signal | `#F3B52E` | LASZLO identity accent |
| JANOS Ledger | `#3979E8` | JANOS identity accent |

Use a modern, condensed sans-serif for names, a clear sans-serif for narrative
copy, and a monospace face for timestamps, state, release IDs, and evidence
labels. The supplied lockup PNGs are the approved GitHub treatments; do not
approximate them by typing a substitute logo.

Identity colors do not replace operational risk, warning, health, or execution
semantics.

## Image direction

Primary emblems are approved high-resolution image masters. Preserve their
shape, material, and lighting; do not trace them into thin vectors or ask a
model to invent text inside them.

- Prefer one dominant object and a large, quiet black field.
- Use close crops only when the complete emblem appears elsewhere on the same
  surface.
- Keep overlays sparse and legible.
- Avoid generic neon charts, crypto coins, glowing circuits, fake interfaces,
  line-only diagrams, decorative rails, and pseudo-technical filler.
- Never stretch, rotate, outline, recolor, or add effects to an emblem.

## Current asset inventory

All paths below are relative to `docs/brand/`.

| Asset family | Current source |
| --- | --- |
| Three-brand hero | `assets/family-proof-instruments-hero.png` |
| Szigor master | `assets/szigor-proof-instrument.png` |
| LASZLO master | `assets/laszlo-signal-gate.png` |
| JANOS master | `assets/janos-ledger-window.png` |
| GitHub export kit | `assets/{brand}-{avatar,mark,lockup,banner,social-preview}.png` |
| Favicons | `assets/{brand}-favicon-{16,32}.png` |
| Runnable specimen | `visual-system.html` |
| Deterministic export builder | `../../scripts/build-brand-assets.cjs` |
| Generation record | `IMAGEGEN_PROMPTS.md` |

Run the builder from the repository root after changing an approved master:

```powershell
node scripts/build-brand-assets.cjs
```

## Retirement and migration

- Confluence S is retired as the active identity.
- Files matching `*-confluence-*` are historical records only.
- Thin-outline LASZLO studies and the first line-led Witness Cut drafts are
  rejected.
- Current profiles, READMEs, social previews, presentations, and campaigns
  must use the image-led PNG kit listed above.
- The Szigor organization profile uses `assets/szigor-banner.png`; each
  product repository uses its own banner and social preview.

## Approval checklist

- Is the correct brand's independent emblem leading the surface?
- Does LASZLO retain the approved thick frame and broad structural pulse?
- Do all three emblems have comparable mass, scale, and finish?
- Is the hierarchy clear: Szigor master, LASZLO and JANOS peer sub-brands?
- Is the composition carried by a finished image rather than decorative lines?
- Are colors separated from operational semantics?
- Are all legacy Confluence and rejected thin-line assets absent from the
  current surface?

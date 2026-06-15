# Whitepaper Index

Canonical published versions live on **Wisdom Echoes**. This repository indexes public releases only.

## Current

| Version | Date | Link | Notes |
|---------|------|------|-------|
| **v2.0** | 2026-03-17 | [Read on wisdomechoes.net](https://wisdomechoes.net/blog/laszlo-whitepaper-v2) | **Recommended** — Base L2, production architecture |
| v1.0 | — | [Read on wisdomechoes.net](https://wisdomechoes.net/blog/laszlo-whitepaper-v1) | Historical blueprint (Ethereum mainnet era) |

## Progress reports

| Report | Link |
|--------|------|
| Engineering status (2026-06) | [laszlo-status-2026-06](https://wisdomechoes.net/blog/laszlo-status-2026-06) |

## v2 highlights (summary)

- Target chain: **Base L2** (OP Stack)  
- MEV approach: precise **EIP-1559** gas pricing on a single sequencer  
- Pipeline: Rust ingest → Redis Streams → Python strategy → Rust execution  
- ML: dual-stage models with real-label retraining cycle  
- Risk: automated daily drawdown circuit, position-level stops  

For the full document, use the v2 link above.

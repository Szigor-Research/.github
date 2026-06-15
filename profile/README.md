<div align="center">

<img src="assets/laszlo-banner.png" alt="LASZLO" width="680" />

### Institutional on-chain alpha infrastructure

**From on-chain noise to executable alpha** · Base L2

<sub>机构级闭环链上 Alpha 终端 — 采集、推理、执行、风控一体化</sub>

<br/>

[![Whitepaper](https://img.shields.io/badge/Whitepaper-v2.0-FFB24D?style=for-the-badge&logo=readthedocs&logoColor=0B0D10)](https://wisdomechoes.net/blog/laszlo-whitepaper-v2)
[![Progress](https://img.shields.io/badge/Engineering-2026-0B0D10?style=for-the-badge&logo=hammer&logoColor=FFB24D)](https://wisdomechoes.net/blog/laszlo-status-2026-06)
[![Chain](https://img.shields.io/badge/Chain-Base_L2-0052FF?style=for-the-badge&logo=ethereum&logoColor=white)](https://base.org)
[![Site](https://img.shields.io/badge/Site-wisdomechoes.net-15181D?style=for-the-badge&logo=link&logoColor=FFB24D)](https://wisdomechoes.net)
[![Docs](https://img.shields.io/badge/Docs-public-15181D?style=for-the-badge&logo=gitbook&logoColor=FFB24D)](https://github.com/LASZLO-Quantification/.github/tree/main/docs)

</div>

---

## The problem

On-chain markets never sleep. Event volume is enormous; **signal density is not**.

Most products stop at visibility — alerts, dashboards, copy-trading shells. The hard problem remains:

> How do you turn filtered signal into **repeatable, risk-bounded execution** — with an audit trail?

Retail tooling is fragmented. Institutional workflows are slow to adapt to L2. **LASZLO closes that gap.**

---

## What LASZLO is

A **closed-loop alpha terminal** for EVM chains — **Base L2** today, architected to extend.

Not a block explorer. Not a signal channel. Not a copy-trading app. **Infrastructure an operator runs.**

| Layer | Role |
|-------|------|
| **Ingest** | Low-latency on-chain event capture |
| **Infer** | Feature engineering + ML signal generation |
| **Execute** | Unified routing, position management, risk gates |
| **Learn** | Data flywheel — collect → label → retrain → deploy |

```mermaid
flowchart LR
  subgraph ingest["Ingest · Rust"]
    I[WebSocket capture]
  end
  subgraph bus["Message bus"]
    R[(Redis Streams)]
  end
  subgraph infer["Infer · Python"]
    S[Strategy + ML]
  end
  subgraph exec["Execute · Rust"]
    E[Orders + risk]
  end
  I --> R --> S --> E
  E -.->|Base L2 · Uniswap V3| I
```

**One pipeline. One operator surface. Risk before return.**

---

## Built different

| Typical tooling | LASZLO |
|-----------------|--------|
| Charts and alerts | **Signal → execution loop** |
| Fragmented scripts | **Unified ingest / infer / execute stack** |
| Risk as an afterthought | **Risk gates before every order** |
| Demo-grade infra | **Observable, drill-tested, operator-first** |

---

## Principles

- **Signal over volume** — only decision-grade data enters the loop
- **Heterogeneous by design** — Rust for latency; Python for research velocity
- **Risk-first execution** — automated stops, conservative entry, operator kill-switches
- **Infrastructure, not hype** — built to harden and measure

Named after **Laszlo Hanyecz** — the first real on-chain exchange. The reference is **execution discipline**, not nostalgia.

---

## Stack

| Component | Technology |
|-----------|------------|
| Ingestion & execution | Rust |
| Strategy & ML | Python |
| Message bus | Redis Streams |
| Target chain | Base L2 (EVM-extensible) |
| DEX focus | Uniswap V3 spot |
| Orchestration | Docker Compose |

---

## Operator surface

<p align="center">
  <img src="assets/laszlo-terminal.png" alt="LASZLO terminal concept" width="720" />
  <br/>
  <sub><em>Terminal concept — dark-mode operator UI. Production systems under active development.</em></sub>
</p>

---

## Status

**Active engineering on Base L2.** The full ingest → signal → execute loop is implemented. Current focus: data quality, model calibration, and production hardening.

We ship like an infrastructure team — measurable pipelines, explicit risk gates, reproducible research cycles.

---

## Read more

| Resource | Link |
|----------|------|
| **Public docs** | [github.com/LASZLO-Quantification/.github/tree/main/docs](https://github.com/LASZLO-Quantification/.github/tree/main/docs) |
| Whitepaper v2 | [wisdomechoes.net/blog/laszlo-whitepaper-v2](https://wisdomechoes.net/blog/laszlo-whitepaper-v2) |
| Engineering progress | [wisdomechoes.net/blog/laszlo-status-2026-06](https://wisdomechoes.net/blog/laszlo-status-2026-06) |
| Home | [wisdomechoes.net](https://wisdomechoes.net) |

---

## Open engineering

This organization publishes **research, design, and brand artifacts** publicly — see **[docs](https://github.com/LASZLO-Quantification/.github/tree/main/docs)**.

Core repositories remain **private during active development**. **Follow [@LASZLO-Quantification](https://github.com/LASZLO-Quantification)** for selective releases and partner-facing tooling as we open the stack.

**Early access or research collaboration** → [wisdomechoes.net](https://wisdomechoes.net)

---

<div align="center">

<img src="assets/laszlo-mark.png" alt="LASZLO" width="56" />

<br/>

**LASZLO** · *Signal to execution*

<br/>

<sub>Hong Kong · <a href="https://wisdomechoes.net">wisdomechoes.net</a></sub>

</div>

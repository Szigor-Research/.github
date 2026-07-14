# Portfolio

Szigor Research separates private systems research from reusable public
references. Maturity labels describe engineering evidence, not investment or
production readiness.

## Portfolio matrix

| Project | Visibility | Category | Current boundary |
|---|---|---|---|
| **LASZLO** | Private | On-chain market research | Point-in-time ingest, model research, risk, execution state, and replay |
| **JANOS** | Private | US equity research | Dual-price research evidence, constrained portfolios, signed releases, and IBKR Paper recovery |
| [**KeyVeil**](https://github.com/Szigor-Research/KeyVeil) | Public | Agent payment policy | Alpha reference; no signer, custody, funds, or executor |
| [**Omni-Asset Quant Terminal**](https://github.com/Szigor-Research/Omni-Asset-Quant-Terminal) | Public | Quant research workflow | Runnable local reference; no broker connection or market orders |

## Private research labs

LASZLO and JANOS are parallel labs under the same risk-first engineering
standard. Szigor Research is their shared public research identity, not a legal
holding company. The labs do not share strategy code by default. Public
descriptions expose system boundaries, not proprietary data, models,
performance, or operational topology.

## KeyVeil

KeyVeil demonstrates how an AI-agent payment intent can be evaluated without
giving the agent authority to expand its session or claim human approval.

```text
intent -> session gate -> organization policy -> decision
                                    |-> blocked or review -> receipt
                                    |-> approved -> atomic reservation -> receipt
```

- [Architecture](https://github.com/Szigor-Research/KeyVeil/blob/main/docs/ARCHITECTURE.md)
- [Security model](https://github.com/Szigor-Research/KeyVeil/blob/main/docs/SECURITY_MODEL.md)
- [Open-source boundary](https://github.com/Szigor-Research/KeyVeil/blob/main/docs/OPEN_SOURCE_BOUNDARY.md)

## Omni-Asset Quant Terminal

Omni turns deterministic investment strategies into a reproducible local
research workflow with cash and position constraints, transaction-cost
estimates, ledger replay, and backtests.

```text
market data -> signal -> constrained estimate -> local confirmation
            -> ledger -> state rebuild -> backtest and export
```

- [Architecture](https://github.com/Szigor-Research/Omni-Asset-Quant-Terminal/blob/main/docs/REFERENCE_ARCHITECTURE.md)
- [Open-source boundary](https://github.com/Szigor-Research/Omni-Asset-Quant-Terminal/blob/main/docs/OPEN_SOURCE_BOUNDARY.md)

## Publication boundary

Public repositories never contain credentials, real account or wallet data,
private-source copies, model weights, alpha features, proprietary thresholds,
provider topology, incident records, or operator telemetry.

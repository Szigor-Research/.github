# Public Projects

LASZLO Quantification publishes reusable reference implementations with
explicit public/private boundaries. Public repositories contain synthetic
fixtures and generic contracts, not production data or private execution code.

## Portfolio

| Project | Category | Core contracts | Status |
|---|---|---|---|
| [KeyVeil](https://github.com/LASZLO-Quantification/KeyVeil) | Agent payment policy | Session scope, approval verification, atomic budget reservation, hashed decision receipt | Alpha reference |
| [Omni-Asset Quant Terminal](https://github.com/LASZLO-Quantification/Omni-Asset-Quant-Terminal) | Quant research workflow | Signal, constrained execution estimate, local ledger, state replay, backtest | Runnable reference |

## KeyVeil

KeyVeil demonstrates how an AI-agent payment intent can be evaluated without
giving the agent authority to expand its own session or claim human approval.

```text
intent -> session gate -> organization policy -> decision
                                    |-> blocked or review -> receipt
                                    |-> approved -> atomic reservation -> receipt
```

The repository has no signer, no wallet custody, and no payment executor.

- [Architecture](https://github.com/LASZLO-Quantification/KeyVeil/blob/main/docs/ARCHITECTURE.md)
- [Security model](https://github.com/LASZLO-Quantification/KeyVeil/blob/main/docs/SECURITY_MODEL.md)
- [Open-source boundary](https://github.com/LASZLO-Quantification/KeyVeil/blob/main/docs/OPEN_SOURCE_BOUNDARY.md)

## Omni-Asset Quant Terminal

Omni turns deterministic investment strategies into a reproducible local
research workflow with cash and position constraints, transaction-cost
estimates, ledger replay, and backtests.

```text
market data -> signal -> constrained estimate -> local confirmation
            -> ledger -> state rebuild -> backtest and export
```

The repository does not connect to a broker or place market orders.

- [Architecture](https://github.com/LASZLO-Quantification/Omni-Asset-Quant-Terminal/blob/main/docs/REFERENCE_ARCHITECTURE.md)
- [Open-source boundary](https://github.com/LASZLO-Quantification/Omni-Asset-Quant-Terminal/blob/main/docs/OPEN_SOURCE_BOUNDARY.md)

## Private work

The LASZLO core stack remains private while production boundaries are under
active development. The organization does not publish:

- credentials, signing or routing internals;
- real wallet, ledger, customer, or incident data;
- model weights, alpha features, labels, or thresholds;
- provider inventories, failover configuration, or operator telemetry;
- private-source copies inside public reference repositories.

Public reference repositories use sanitized source trees and histories that do
not expose private implementation lineage.

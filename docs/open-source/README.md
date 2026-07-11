# Open-Source Policy

LASZLO Quantification publishes reusable contracts and synthetic reference
implementations while keeping production systems and data private.

## Publication checklist

Every public repository must have:

- a clear reference or production maturity label;
- an OSI license for code intended for reuse;
- security, contribution, and limitation documentation;
- synthetic fixtures only;
- bounded dependencies and automated tests;
- an explicit list of excluded production capabilities;
- a history scan for credentials and private-source copies;
- a fresh Git history when an existing private history cannot be safely exposed.

## Allowed public material

- Generic data models, interfaces, and state machines.
- Deterministic algorithms and synthetic scenarios.
- Failure-mode tests, CI, Docker, and local development tooling.
- Architecture, security model, and operational boundary documentation.
- Visual components that do not embed private data or imply unsupported behavior.

## Private by default

- Credentials, private endpoints, provider inventories, and failover topology.
- Real wallet, ledger, customer, transaction, incident, or telemetry data.
- Signing, custody, production routing, and approval infrastructure.
- Models, weights, labels, feature manifests, and proprietary thresholds.
- Internal runbooks and private repository source copies.

## Claim discipline

Descriptions and interfaces must distinguish:

- policy approval from payment execution;
- local ledger writes from broker fills;
- receipt hashes from cryptographic signatures;
- synthetic examples from production telemetry;
- reference components from production-ready services.

# GitHub Brand Migration Record

## Current state

- Display brand: **Szigor Research**
- Canonical GitHub organization: `Szigor-Research`
- Legacy GitHub login: `LASZLO-Quantification`
- Migration status: completed in July 2026
- Product repositories: LASZLO, JANOS, KeyVeil, and Omni-Asset Quant Terminal

The new organization login is canonical. The legacy GitHub redirect is useful
for compatibility but is not a substitute for updated automation and external
dependencies.

## Post-migration validation

The handle migration is complete. Keep these checks current until every external
dependency has been verified:

1. Inventory clone URLs, submodules, badges, package metadata, GitHub Apps,
   Actions variables, webhooks, Pages, deployment providers, and external docs.
2. Confirm every local remote and canonical URL uses `Szigor-Research`.
3. Run CI in all active repositories and verify public badges, raw assets, advisories, and Pages.
4. Check package indexes and external integrations that may not follow GitHub redirects.
5. Keep a dated migration and communication record.

## Completed migration controls

- Shared display identity no longer treats LASZLO as the organization.
- Product hierarchy separates private labs from public references.
- Public documentation uses the `Szigor-Research` canonical URLs.
- LASZLO visual assets are explicitly product-scoped.

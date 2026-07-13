# GitHub Brand Migration

## Current state

- Display brand: **Szigor Research**
- Current GitHub login: `LASZLO-Quantification`
- Candidate future login: `Szigor-Research`
- Product repositories: LASZLO, JANOS, KeyVeil, and Omni-Asset Quant Terminal

The current login remains canonical. A GitHub redirect is useful but is not a
substitute for updating automation and external dependencies.

## Handle migration gate

Do not rename the organization login until all items pass:

1. Inventory clone URLs, submodules, badges, package metadata, GitHub Apps,
   Actions variables, webhooks, Pages, deployment providers, and external docs.
2. Confirm `Szigor-Research` is available in the GitHub rename UI at execution time.
3. Freeze repository transfers, releases, and deployment changes for the migration window.
4. Rename the organization, then update every local remote and canonical URL.
5. Run CI in all active repositories and verify public badges, raw assets, advisories, and Pages.
6. Check package indexes and external integrations that may not follow GitHub redirects.
7. Keep a dated rollback and communication record.

## Completed before handle migration

- Shared display identity no longer treats LASZLO as the organization.
- Product hierarchy separates private labs from public references.
- New documentation uses Szigor Research while retaining current canonical URLs.
- LASZLO visual assets are explicitly product-scoped.

# Finding: billing API price fields

**Question:** Does the billing API return yearly prices, or only monthly?
**Method:** research (API docs, `docs/billing-api.md`)
**Date:** 2026-11-03

## Answer
Only `monthlyPrice` per plan. No yearly field, no discount field.

## Evidence
- `docs/billing-api.md`, section "Plans": response example lists `id`, `name`, `monthlyPrice`, `features`.

## Consequence
Yearly price must be computed client-side. The discount rule (open decision 1) decides how.

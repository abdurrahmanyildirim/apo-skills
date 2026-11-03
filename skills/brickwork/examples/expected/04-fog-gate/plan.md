# Pricing page

**Branch:** `feature/pricing-page`
**Created:** 2026-11-03
**Status:** `planning`
**Destination:** `/pricing` shows plan cards with a monthly/yearly toggle, fed by a service that can later switch from mock to API.

## Scope
- In: pricing route, plan card, billing toggle, price service.
- Out (non-goals): checkout flow, auth, i18n.
- Constraints: standalone components, signals, existing design tokens.

## Open decisions
| # | Decision | Type | Blocked by | State |
|---|----------|------|------------|-------|
| 1 | Yearly discount rule (flat 20%? per plan?) | grilling | – | open |
| 2 | Does the billing API return yearly prices or only monthly? | research | – | resolved → D1 |
| 3 | Price service shape (depends on 1 and 2) | task | 1, 2 | open |

## Decisions
| # | Decision | Why | Source | Date |
|---|----------|-----|--------|------|
| D1 | API returns monthly prices only; yearly is computed client-side | API docs list no yearly field | [finding-billing-api.md](finding-billing-api.md) | 2026-11-03 |

## Assumptions / Open questions
- [ ] Currency fixed to EUR for now.

## Chapters
None yet. Chapters are designed once no open decisions remain.

## Change Map
Nothing implemented yet.

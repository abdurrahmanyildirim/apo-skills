# Pricing page

**Branch:** `feature/pricing-page`
**Created:** 2026-11-03
**Destination:** `/pricing` shows three plan cards with a monthly/yearly toggle, fed by a service that can later switch from mock to API.

## Scope
- In: pricing route, plan card, price formatting, billing toggle, mock-backed price service.
- Out (non-goals): checkout flow, auth, real API call, i18n.
- Constraints: standalone components, signals, existing design tokens.

## Decisions
| # | Decision | Why | Date |
|---|----------|-----|------|
| 1 | Yearly price = monthly × 12 × 0.8 | Product rule confirmed by user | 2026-11-03 |
| 2 | Service returns `Plan[]` via signal | Matches existing services in repo | 2026-11-03 |

## Assumptions / Open questions
- [ ] Currency fixed to EUR for now (assumption; revisit with API).

## Brick contracts
- `Plan` (`src/app/pricing/plan.model.ts`): `{ id, name, monthlyPrice, features: string[] }`
- `Billing` (`src/app/pricing/plan.model.ts`): `'monthly' | 'yearly'`
- `PriceFormatPipe` (`src/app/pricing/price-format.pipe.ts`): in `monthlyPrice: number, billing: Billing`, out `string` like `€12 / mo` or `€115.2 / yr`.
- `PriceCardComponent` (`src/app/pricing/price-card.component.ts`): in `plan: Plan`, `billing: Billing`; out `select` event with plan id.
- `BillingToggleComponent` (`src/app/pricing/billing-toggle.component.ts`): model `billing: Billing`.
- `PricingService` (`src/app/pricing/pricing.service.ts`): `plans(): Signal<Plan[]>`.

## Chapters

| # | Title | Status | Depends on | Commit |
|---|-------|--------|------------|--------|
| 1 | Skeleton: route, page shell, placeholders, mocks | todo | – | – |
| 2 | PriceFormatPipe | todo | 1 | – |
| 3 | PriceCardComponent | todo | 2 | – |
| 4 | BillingToggleComponent | todo | 1 | – |
| 5 | PricingService + integrate | todo | 3, 4 | – |
| 6 | Remove mocks and demo scaffolding | todo | 5 | – |

Status: `todo` · `in-progress` · `done` · `blocked`
Commit: `–` (not done) · `uncommitted` (done, not committed) · short hash

### Chapter 1: Skeleton
**Goal:** `/pricing` reachable, shows labelled placeholders for toggle and three cards, using mock data.
**Tasks:**
- [ ] Add lazy route `/pricing`
- [ ] Create `PricingPageComponent` shell
- [ ] Add `Plan`/`Billing` types and `pricing.mock.ts` (3 plans: Basic, Pro, Team)
- [ ] Render placeholders: "[Billing toggle]", "[Plan card: <name>]" ×3
- [ ] Add a component spec for the page
**Acceptance criteria:**
- `/pricing` route resolves to the page
- Three labelled placeholders show mock plan names
- Page loads without console errors
**Verification:**
- `pnpm test --include pricing-page` (route resolves, three placeholders with mock names)
- `pnpm build`, `pnpm lint`
- Console errors: manual, see UI steps
**How to test in UI:** `pnpm start`, open `/pricing` with devtools console open; see toggle placeholder and three card placeholders (Basic, Pro, Team); console has no errors.
**Depends on:** –
**Brick contracts:** `Plan`, `Billing`
**Deviations:** none

### Chapter 2: PriceFormatPipe
**Goal:** pipe formats prices per billing period.
**Tasks:**
- [ ] Write tests first: monthly, yearly (×12×0.8), zero, decimals
- [ ] Implement pipe
**Acceptance criteria:**
- Output matches the contract for monthly and yearly
- Zero and decimal prices format correctly
**Verification:** `pnpm test --include price-format`, `pnpm lint`
**Depends on:** 1
**Brick contracts:** `PriceFormatPipe`
**Deviations:** none

### Chapter 3: PriceCardComponent
**Goal:** real card replaces the card placeholders.
**Tasks:**
- [ ] Implement component using the pipe
- [ ] Replace the three placeholders in the page
**Acceptance criteria:**
- Each card shows name, formatted price, features, CTA
- CTA emits `select` with the plan id
**Verification:** `pnpm test --include price-card`, `pnpm build`
**How to test in UI:** `/pricing`; cards show name, price, features, CTA; clicking CTA logs/handles `select`.
**Depends on:** 2
**Brick contracts:** `PriceCardComponent`
**Deviations:** none

### Chapter 4: BillingToggleComponent
**Goal:** real toggle replaces its placeholder; page holds a `billing` signal.
**Tasks:**
- [ ] Implement toggle as a model input
- [ ] Wire to page signal, pass to cards
**Acceptance criteria:**
- Switching Monthly/Yearly updates all card prices
**Verification:** `pnpm test --include billing-toggle`, `pnpm build`
**How to test in UI:** `/pricing`; click Yearly; all prices change; click Monthly; they revert.
**Depends on:** 1
**Brick contracts:** `BillingToggleComponent`
**Deviations:** none

### Chapter 5: PricingService + integrate
**Goal:** page reads plans from the service (still mock-backed).
**Tasks:**
- [ ] Implement service returning `Plan[]` signal
- [ ] Inject in page, remove direct mock import
**Acceptance criteria:**
- Page output unchanged
- Service has tests
**Verification:** `pnpm test`, `pnpm build`
**How to test in UI:** `/pricing` looks and behaves as after chapter 4.
**Depends on:** 3, 4
**Brick contracts:** `PricingService`
**Deviations:** none

### Chapter 6: Cleanup
**Goal:** no demo scaffolding left.
**Tasks:**
- [ ] Remove leftover placeholder labels
- [ ] Remove `pricing.mock.ts` usage outside the service's temporary data source (or replace with real API stub as agreed)
**Acceptance criteria:**
- No `temporary` rows in the Change Map
- No `[Plan card` / `[Billing toggle]` strings in `src/`
**Verification:** `grep -r "\[Plan card\|\[Billing toggle" src/` returns nothing, `pnpm build`, `pnpm test`, `pnpm lint`
**Depends on:** 5
**Deviations:** none

## Change Map

### Overview
Nothing implemented yet.

### Brick graph
(empty)

### Files
| File | Brick | Status | Chapter | Purpose |
|------|-------|--------|---------|---------|

## Handoffs

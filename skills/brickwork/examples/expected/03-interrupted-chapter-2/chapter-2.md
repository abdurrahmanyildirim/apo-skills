# Chapter 2: PriceFormatPipe

## Deviations
none

## Handoffs

### 2026-11-04 · failed
- **Done:** wrote four pipe tests (monthly, yearly, zero, decimals); implemented monthly, zero, decimals.
- **Verified:** `pnpm test --include price-format` → 3 passed, 1 failed (yearly: expected `€115.2 / yr`, got `€115.20000000000002 / yr`).
- **Not done / half-done:** yearly formatting; rounding approach not chosen. `price-format.pipe.ts` is half-done. Build and lint not run.
- **New decisions:** none yet. Open: round to 2 decimals and trim trailing zeros, or use `Intl.NumberFormat`? Needs a decision before continuing.
- **Blockers / failures:** floating-point result in yearly test, see above.
- **Next:** decide rounding approach (record in Decisions), fix yearly case, run `pnpm test --include price-format`, `pnpm lint`, then mark Chapter 2 `done`.

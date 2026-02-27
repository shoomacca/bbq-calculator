# Shard 3.3 Summary: Timeline Offset Labels & Polish

**Executed:** 2026-02-24
**Status:** Complete ✓

## Tasks Completed

### Task 1: Add time offset to MilestoneCard + fix last-card connector
- **Files:** `components/calculator/MilestoneCard.tsx`, `app/results/page.tsx`
- **Changes:**
  - Added `timeOffsetLabel?: string` prop to `MilestoneCard` — rendered as a muted chip (e.g. "~4 hrs 45 min in") that shows with or without a start time
  - Added `isLast?: boolean` prop — conditionally hides the trailing vertical connector line on the final card
  - In `results/page.tsx`: imported `formatCookTime`, computed offset labels per milestone, passed `isLast={i === result.milestones.length - 1}`
  - Added Cook Timeline empty state fallback for safety
  - Offset chip appears before clock time chip in the row
- **Commit:** `4939abd`

### Task 2: Verify all cut categories
- **Files:** `lib/calculator.ts` (no changes needed), `data/meats.json` (audited)
- **Verified:**
  - **bbq with stall + wrap** (pork shoulder smoker): 3 milestones ✓
  - **bbq without stall** (rump roast oven): 1 milestone (rest) ✓
  - **fish** (salmon smoker): 1 milestone (rest) ✓
  - **veggie**: 1 milestone (doneness cue) ✓
  - **jerky** (with preheatTempC): 3 milestones ✓
- No `internalTempC: null` exists for any bbq/fish cut — zero-milestone case cannot occur
- Empty state fallback already in place for defensive coverage

### Task 3: Results page layout review
- **Files:** `app/results/page.tsx`
- **Changes:**
  - Added `w-full` to `input[type="time"]` to prevent mobile overflow
  - Confirmed `max-w-2xl mx-auto px-4` container already in place
  - Section order correct: ResultsCard → Save CTA → Start time picker → Cook Timeline → Start new cook
  - Last connector hidden via `isLast` prop
- **Commit:** `3ad39f3`

## Verification
- [x] Every milestone card shows a time offset label ("~X hrs Y min in")
- [x] Clock time chip appears alongside offset when start time is set
- [x] All 5 cut categories produce at least one milestone card
- [x] Last milestone card has no trailing vertical line
- [x] `w-full` on time input prevents horizontal overflow on 375px mobile
- [x] `npm run build` passes clean, no type errors

## Notes
- Offset label shows even without start time, making the timeline useful standalone
- `flex-wrap` on chip row ensures long labels don't overflow on narrow screens

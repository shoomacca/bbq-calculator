# Shard 3.3: Timeline Offset Labels & Polish

**Goal:** Improve the cook timeline — add relative time offset labels to each milestone, verify all cut categories render correctly, and ensure mobile readability across all types.

**Dependencies:** 3.1

---

## Tasks

### Task 1: Add time offset to MilestoneCard
- Files: `components/calculator/MilestoneCard.tsx`, `types/calculator.ts`
- Action:
  - Add an optional `timeOffsetLabel` prop to `MilestoneCard` (e.g. `"~4 hrs 45 min in"`)
  - In `app/results/page.tsx`, compute the label from `milestone.timeOffsetHours` using `formatCookTime()` before passing to `MilestoneCard`
  - Render the offset label as a secondary chip alongside the clock time chip — show it when `clockTime` is absent too, so timeline is useful even without a start time set
  - Format: prefix with "~" to communicate it's an estimate
- Verify: Each milestone card shows e.g. "~4 hrs 45 min in" as a label; clock time shows additionally when start time is set

### Task 2: Verify all cut category milestone types
- Files: `app/results/page.tsx`, `lib/calculator.ts`
- Action: Manually trace through the milestone generation logic in `calculator.ts` for each cut category and verify no rendering bugs:
  - **bbq with stall + wrap** (e.g. pork shoulder): stall card, wrap card, rest card — all three milestone cards present
  - **bbq without stall** (e.g. rump roast): only rest card
  - **fish** (e.g. salmon): rest card only (short rest)
  - **veggie** (e.g. cauliflower): doneness cue card
  - **jerky** (e.g. beef jerky): pre-heat card, dry card, cool card
  - If any category produces zero milestones or renders incorrectly, fix the calculator.ts logic
  - Add a fallback "no milestones" empty state if milestones array is empty (e.g. rump roast with oven method shouldn't show a blank section)
- Verify: At least one milestone card renders for every cut/method combination

### Task 3: Results page layout review
- Files: `app/results/page.tsx`
- Action:
  - Ensure the page layout at 375px (mobile) is not cramped: ResultsCard → Save CTA → Start time picker → Cook Timeline (heading + milestone cards) → Start new cook button
  - Add `max-w-2xl mx-auto` container and consistent `px-4` padding matching the rest of the app
  - Ensure the last `MilestoneCard` in the list hides its trailing vertical connector line (add `last:hidden` or conditional logic on the line in `MilestoneCard`)
  - Page should scroll cleanly on mobile with no overflow issues
- Verify: Visual check at 375px — all sections visible, readable, no horizontal overflow

---

## Done When
- [ ] Every milestone card shows a time offset label ("~X hrs Y min in")
- [ ] Clock time chip appears alongside offset when start time is set
- [ ] All 5 cut categories (bbq, fish, veggie, jerky, bbq-no-stall) produce at least one milestone card
- [ ] Last milestone card has no trailing vertical line
- [ ] Results page scrolls cleanly on 375px mobile with no overflow
- [ ] `npm run build` passes, lint clean

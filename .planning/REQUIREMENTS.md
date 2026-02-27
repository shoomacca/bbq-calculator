# Requirements

**Project:** Dynamic BBQ & Slow Cook Calculator
**Last Updated:** 2026-02-22

---

## v1 (MVP)

### Calculator
- [ ] Cooking method selector: Smoker, Slow Cooker, Oven
- [ ] Meat category selector (e.g., Beef, Pork, Lamb, Chicken)
- [ ] Specific cut selector (e.g., Brisket, Pork Shoulder, Leg of Lamb, Whole Chicken)
- [ ] Weight input in kilograms (decimal supported, e.g., 4.2 kg)
- [ ] Instant calculation — no signup required

### Results Output
- [ ] Appliance temperature (°C) — exact setting for smoker/oven/slow cooker
- [ ] Estimated cook time range (e.g., "8.5 to 9.5 hours")
- [ ] Target internal temperature (°C) for doneness
- [ ] Critical milestone alerts tailored to cut (e.g., "Wrap at 75°C internal", "The Stall warning", rest instructions)
- [ ] Resting time recommendation before slicing/pulling
- [ ] All values in metric (kg and Celsius) exclusively

### User Accounts
- [ ] Progressive auth: prompted to "Save this cook" after viewing results
- [ ] Supabase auth — email/password signup + Google OAuth
- [ ] Saved cooks dashboard — list of past calculations
- [ ] Ability to re-run or delete a saved cook

### Platform
- [ ] Mobile-responsive design (works on phone and desktop)
- [ ] Deployed to Vercel
- [ ] Custom domain connected

---

## v2 (Post-Launch)

- [ ] Monetisation / paid tier (specific features TBD)
- [ ] Additional meat types and cuts (e.g., Duck, Venison, Ribs by rack)
- [ ] Print / share a cook plan (PDF or link)
- [ ] Cook timers / push reminders ("wrap in 30 mins")
- [ ] Personal cook notes and annotations on saved cooks
- [ ] Cook history statistics (total cooks, favourite cuts)

---

## Out of Scope (v1)

- Native iOS / Android app
- Social or community features (no sharing feed, no comments)
- Multiple languages (English only)
- Payment processing / subscriptions
- Recipe content (this is a calculator, not a recipe site)
- Imperial units (pounds / Fahrenheit) — metric only

# Shard 1.1: Project Scaffold

**Goal:** Initialize the Next.js 14 project with TypeScript, Tailwind CSS, and the correct folder structure ready for development.

**Dependencies:** None

---

## Tasks

### 1. Initialize Next.js Project
- **Files:** `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`
- **Action:** Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"` inside the project root. Accept all defaults.
- **Verify:** `package.json` exists with Next.js 14+, TypeScript, and Tailwind listed as dependencies

### 2. Configure Tailwind
- **Files:** `tailwind.config.ts`, `app/globals.css`
- **Action:** Ensure `tailwind.config.ts` content paths include `./app/**/*.{ts,tsx}` and `./components/**/*.{ts,tsx}`. Add base CSS resets in `globals.css`.
- **Verify:** Tailwind classes apply correctly when dev server runs

### 3. Set Up Folder Structure
- **Files:** `app/`, `components/`, `lib/`, `types/`, `data/`
- **Action:** Create the following empty folders with `.gitkeep` files:
  - `components/` — shared UI components
  - `lib/` — utility functions, DB client, calculator logic
  - `types/` — TypeScript interfaces
  - `data/` — static meat database JSON files
- **Verify:** All folders exist in the project root

### 4. Environment Variables Template
- **Files:** `.env.local.example`, `.env.local`
- **Action:** Create `.env.local.example` with placeholders:
  ```
  DB_HOST=your-hostinger-mysql-host
  DB_PORT=3306
  DB_NAME=bbq_calculator
  DB_USER=your-db-user
  DB_PASSWORD=your-db-password
  ```
  Copy to `.env.local` with actual values (leave blank for now — filled in Shard 1.2).
- **Verify:** `.env.local.example` committed, `.env.local` in `.gitignore`

---

## Done When
- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes with no TypeScript or build errors
- [ ] All 4 folders (`components/`, `lib/`, `types/`, `data/`) exist
- [ ] `.env.local.example` committed, `.env.local` gitignored

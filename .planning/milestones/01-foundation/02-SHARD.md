# Shard 1.2: MySQL Schema

**Goal:** Define the MySQL database schema for saved cooks and create the DB client utility used by API routes.

**Dependencies:** Shard 1.1

---

## Tasks

### 1. Install MySQL Client
- **Files:** `package.json`
- **Action:** Run `npm install mysql2`. This is the Node.js MySQL driver used by Next.js API routes.
- **Verify:** `mysql2` appears in `package.json` dependencies

### 2. Create DB Client Utility
- **Files:** `lib/db.ts`
- **Action:** Create a MySQL connection pool using `mysql2/promise`:
  ```typescript
  import mysql from 'mysql2/promise';

  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  export default pool;
  ```
- **Verify:** File exists and TypeScript compiles without errors

### 3. Write Migration SQL
- **Files:** `lib/migrations/001_create_saved_cooks.sql`
- **Action:** Create the `saved_cooks` table:
  ```sql
  CREATE TABLE IF NOT EXISTS saved_cooks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    method VARCHAR(50) NOT NULL,
    meat_category VARCHAR(100) NOT NULL,
    cut VARCHAR(100) NOT NULL,
    weight_kg DECIMAL(5,2) NOT NULL,
    result_json TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_session (session_id)
  );
  ```
  Note: `session_id` is a browser-generated UUID stored in localStorage — no user accounts needed.
- **Verify:** SQL file exists and is valid SQL syntax

### 4. Create Session Utility
- **Files:** `lib/session.ts`
- **Action:** Create a utility that generates and persists a UUID session ID in localStorage:
  ```typescript
  export function getSessionId(): string {
    if (typeof window === 'undefined') return '';
    let id = localStorage.getItem('bbq_session_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('bbq_session_id', id);
    }
    return id;
  }
  ```
- **Verify:** File exists and TypeScript compiles

---

## Done When
- [ ] `mysql2` installed and in `package.json`
- [ ] `lib/db.ts` exists with connection pool
- [ ] `lib/migrations/001_create_saved_cooks.sql` exists with correct schema
- [ ] `lib/session.ts` exists with `getSessionId()` utility
- [ ] `npm run build` still passes

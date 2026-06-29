/* eslint-disable @typescript-eslint/no-explicit-any */
import mysql from 'mysql2/promise';
import pg from 'pg';
import fs from 'fs';
import path from 'path';

// Initial Gear Seed Data
const INITIAL_GEAR = [
  { id: 1, slug: 'thermapen-one', name: 'Thermapen ONE', category: 'Thermometers', affiliate_url: '#', description: 'Instant-read thermometer — reads in 1 second. The gold standard for BBQ.', recommended_for: 'all', sort_order: 1 },
  { id: 2, slug: 'meater-plus', name: 'MEATER+', category: 'Thermometers', affiliate_url: '#', description: 'Wireless smart probe — monitor from your phone up to 50m away.', recommended_for: 'Smoker,Kamado,Oven', sort_order: 2 },
  { id: 3, slug: 'thermoworks-smoke', name: 'ThermoWorks Smoke', category: 'Thermometers', affiliate_url: '#', description: 'Dual-probe remote thermometer — monitor pit and meat simultaneously.', recommended_for: 'Smoker,Kamado,Wood Fire', sort_order: 3 },
  { id: 4, slug: 'inkbird-ibt-4xs', name: 'Inkbird IBT-4XS', category: 'Thermometers', affiliate_url: '#', description: 'Bluetooth 4-probe thermometer — great value for multi-protein cooks.', recommended_for: 'all', sort_order: 4 },
  { id: 5, slug: 'weber-smokey-mountain-18', name: 'Weber Smokey Mountain 18"', category: 'Smokers', affiliate_url: '#', description: 'The classic water smoker. Reliable, affordable, beloved by competition pitmasters.', recommended_for: 'Smoker', sort_order: 10 },
  { id: 6, slug: 'weber-kettle-57', name: 'Weber Kettle 57cm', category: 'Smokers', affiliate_url: '#', description: 'The iconic charcoal kettle — grilling, smoking, roasting all in one.', recommended_for: 'Charcoal Kettle,BBQ (Charcoal/Gas)', sort_order: 11 },
  { id: 7, slug: 'big-green-egg-large', name: 'Big Green Egg (Large)', category: 'Smokers', affiliate_url: '#', description: 'The original kamado — retains heat like nothing else. Built to last a lifetime.', recommended_for: 'Kamado', sort_order: 12 },
  { id: 8, slug: 'pit-barrel-cooker', name: 'Pit Barrel Cooker', category: 'Smokers', affiliate_url: '#', description: 'Drum smoker — incredibly simple, produces outstanding smoke flavour.', recommended_for: 'Smoker', sort_order: 13 },
  { id: 9, slug: 'napoleon-pro-500', name: 'Napoleon PRO 500', category: 'Smokers', affiliate_url: '#', description: 'Premium gas grill with infrared sear zone and smoker tray.', recommended_for: 'BBQ (Charcoal/Gas)', sort_order: 14 },
  { id: 10, slug: 'weber-briquettes-8kg', name: 'Weber Briquettes 8kg', category: 'Charcoal & Fuel', affiliate_url: '#', description: 'Long-burn briquettes — consistent heat, low ash. Perfect for low-and-slow.', recommended_for: 'Charcoal Kettle,Smoker', sort_order: 20 },
  { id: 11, slug: 'jealous-devil-lump', name: 'Jealous Devil Lump Charcoal', category: 'Charcoal & Fuel', affiliate_url: '#', description: 'Premium hardwood lump — burns hotter and cleaner than briquettes.', recommended_for: 'Kamado,BBQ (Charcoal/Gas)', sort_order: 21 },
  { id: 12, slug: 'weber-hickory-chunks', name: 'Weber Hickory Wood Chunks', category: 'Charcoal & Fuel', affiliate_url: '#', description: 'Hickory chunks for bold smoky flavour. Great with beef and pork.', recommended_for: 'Smoker,Kamado,Wood Fire', sort_order: 22 },
  { id: 13, slug: 'weber-applewood-chips', name: 'Weber Apple Wood Chips', category: 'Charcoal & Fuel', affiliate_url: '#', description: 'Mild, sweet smoke — ideal for chicken, fish, and pork.', recommended_for: 'Smoker,Kamado,Charcoal Kettle', sort_order: 23 },
  { id: 14, slug: 'fire-starters-pack', name: 'Weber Fire Starters (50pk)', category: 'Charcoal & Fuel', affiliate_url: '#', description: 'Odourless, reliable fire starters. Never use lighter fluid again.', recommended_for: 'all', sort_order: 24 },
  { id: 15, slug: 'killer-hogs-bbq-rub', name: 'Killer Hogs The BBQ Rub', category: 'Rubs & Seasonings', affiliate_url: '#', description: 'Championship-winning rub — the benchmark for competition-style BBQ flavour.', recommended_for: 'all', sort_order: 30 },
  { id: 16, slug: 'meat-church-holy-gospel', name: 'Meat Church Holy Gospel', category: 'Rubs & Seasonings', affiliate_url: '#', description: 'All-purpose BBQ rub — sweet heat with a Tex-Mex influence.', recommended_for: 'all', sort_order: 31 },
  { id: 17, slug: 'lanes-bbq-signature', name: "Lane's BBQ Signature Blend", category: 'Rubs & Seasonings', affiliate_url: '#', description: 'Savoury-sweet blend — works on everything from brisket to veggies.', recommended_for: 'all', sort_order: 32 },
  { id: 18, slug: 'maldon-sea-salt', name: 'Maldon Sea Salt Flakes', category: 'Rubs & Seasonings', affiliate_url: '#', description: 'Finishing salt for steaks and grilled proteins — a little goes a long way.', recommended_for: 'all', sort_order: 33 },
  { id: 19, slug: 'weber-chimney-starter', name: 'Weber Chimney Starter', category: 'Accessories', affiliate_url: '#', description: 'Light charcoal in 15 minutes — no lighter fluid, no mess.', recommended_for: 'Charcoal Kettle,Smoker,Kamado', sort_order: 40 },
  { id: 20, slug: 'rapicca-bbq-gloves', name: 'RAPICCA BBQ Gloves (932°F)', category: 'Accessories', affiliate_url: '#', description: 'Heat-resistant gloves rated to 500°C — pull pork bare-handed like a pro.', recommended_for: 'all', sort_order: 41 },
  { id: 21, slug: 'spitjack-injector', name: 'SpitJack Magnum Meat Injector', category: 'Accessories', affiliate_url: '#', description: 'Professional-grade injector — marinades deep into thick cuts like brisket and shoulder.', recommended_for: 'Smoker,Kamado,Oven', sort_order: 42 },
  { id: 22, slug: 'oxo-basting-brush', name: 'OXO Silicone Basting Brush', category: 'Accessories', affiliate_url: '#', description: 'Silicone bristles hold sauce perfectly — dishwasher safe.', recommended_for: 'all', sort_order: 43 },
  { id: 23, slug: 'teakhaus-xl-board', name: 'Teakhaus XL Teak Cutting Board', category: 'Accessories', affiliate_url: '#', description: 'Extra-large teak board — perfect for resting and slicing whole briskets.', recommended_for: 'all', sort_order: 44 },
  { id: 24, slug: 'instant-read-timer', name: 'ThermoWorks TimeStack Timer', category: 'Accessories', affiliate_url: '#', description: '4-channel kitchen timer — track multiple milestones in your cook simultaneously.', recommended_for: 'all', sort_order: 45 }
];

interface LocalDB {
  cook_tally: { id: number; count: number; updated_at: string }[];
  gallery_posts: any[];
  gear: any[];
  gear_clicks: any[];
  subscribers: any[];
  users: any[];
  saved_cooks: any[];
  post_stars: { user_id: number; post_id: string }[];
  post_comments: { id: number; post_id: string; user_id: number; comment_text: string; created_at: string }[];
}

class LocalDBProxy {
  private dbPath: string;

  constructor() {
    this.dbPath = path.join(process.cwd(), 'data', 'local_db.json');
    this.initDB();
  }

  private initDB() {
    const dataDir = path.dirname(this.dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(this.dbPath)) {
      const initial: LocalDB = {
        cook_tally: [{ id: 1, count: 0, updated_at: new Date().toISOString() }],
        gallery_posts: [],
        gear: INITIAL_GEAR,
        gear_clicks: [],
        subscribers: [],
        users: [],
        saved_cooks: [],
        post_stars: [],
        post_comments: [],
      };
      fs.writeFileSync(this.dbPath, JSON.stringify(initial, null, 2), 'utf8');
    }
  }

  private read(): LocalDB {
    this.initDB();
    try {
      return JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
    } catch {
      return {
        cook_tally: [{ id: 1, count: 0, updated_at: new Date().toISOString() }],
        gallery_posts: [],
        gear: INITIAL_GEAR,
        gear_clicks: [],
        subscribers: [],
        users: [],
        saved_cooks: [],
        post_stars: [],
        post_comments: [],
      };
    }
  }

  private write(data: LocalDB) {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2), 'utf8');
  }

  public async execute<T = any>(sql: string, params: any[] = []): Promise<[any, any]> {
    return this.query<T>(sql, params);
  }

  public async query<T = any>(sql: string, params: any[] = []): Promise<[any, any]> {
    const db = this.read();
    const queryLower = sql.toLowerCase().trim();

    // 1. SELECT count FROM cook_tally
    if (queryLower.includes('select count from cook_tally') || queryLower.includes('select * from cook_tally')) {
      return [db.cook_tally as any as T, null];
    }

    // 2. UPDATE cook_tally SET count = count + 1
    if (queryLower.includes('update cook_tally set count = count + 1')) {
      if (db.cook_tally.length === 0) {
        db.cook_tally.push({ id: 1, count: 0, updated_at: new Date().toISOString() });
      }
      db.cook_tally[0].count += 1;
      db.cook_tally[0].updated_at = new Date().toISOString();
      this.write(db);
      return [ { affectedRows: 1 } as any as T, null ];
    }

    // 3. SELECT FROM users WHERE email = ?
    if (queryLower.includes('select id, password_hash, email from users') || queryLower.includes('select id from users')) {
      const email = params[0];
      const found = db.users.filter(u => u.email === email);
      return [found as any as T, null];
    }

    // 4. INSERT INTO users
    if (queryLower.includes('insert into users')) {
      const email = params[0];
      const passwordHash = params[1];
      const newId = db.users.length + 1;
      db.users.push({ id: newId, email, password_hash: passwordHash, created_at: new Date().toISOString() });
      this.write(db);
      return [{ insertId: newId, affectedRows: 1 } as any as T, null];
    }

    // 5. SELECT FROM gear
    if (queryLower.includes('select name, slug, recommended_for from gear') || queryLower.includes('select * from gear')) {
      return [db.gear as any as T, null];
    }

    // 6. SELECT FROM gear WHERE slug = ?
    if (queryLower.includes('select affiliate_url from gear where slug = ?')) {
      const slug = params[0];
      const item = db.gear.filter(g => g.slug === slug);
      return [item as any as T, null];
    }

    // 7. INSERT INTO gear_clicks
    if (queryLower.includes('insert into gear_clicks')) {
      const slug = params[0];
      db.gear_clicks.push({ gear_slug: slug, clicked_at: new Date().toISOString() });
      this.write(db);
      return [ { affectedRows: 1 } as any as T, null ];
    }

    // 8. SELECT FROM saved_cooks WHERE user_id = ?
    if (queryLower.includes('select id, user_id, session_id, method, meat_category, cut, weight_kg, result_json, created_at from saved_cooks')) {
      const userId = params[0];
      const found = db.saved_cooks.filter(c => c.user_id === userId);
      return [found as any as T, null];
    }

    // 9. INSERT INTO saved_cooks
    if (queryLower.includes('insert into saved_cooks')) {
      const userId = params[0];
      const sessionId = params[1];
      const method = params[2];
      const meatCategory = params[3];
      const cut = params[4];
      const weight = params[5];
      const resultJson = params[6];
      const newId = db.saved_cooks.length + 1;
      db.saved_cooks.push({
        id: newId,
        user_id: userId,
        session_id: sessionId,
        method,
        meat_category: meatCategory,
        cut,
        weight_kg: weight,
        result_json: resultJson,
        created_at: new Date().toISOString(),
      });
      this.write(db);
      return [{ insertId: newId, affectedRows: 1 } as any as T, null];
    }

    // 10. UPDATE saved_cooks SET result_json = ?
    if (queryLower.includes('update saved_cooks set result_json')) {
      const resultJson = params[0];
      const id = params[1];
      const userId = params[2];
      const idx = db.saved_cooks.findIndex(c => c.id === id && c.user_id === userId);
      if (idx !== -1) {
        db.saved_cooks[idx].result_json = resultJson;
        this.write(db);
        return [{ affectedRows: 1 } as any as T, null];
      }
      return [{ affectedRows: 0 } as any as T, null];
    }

    // 11. DELETE FROM saved_cooks WHERE id = ?
    if (queryLower.includes('delete from saved_cooks where id = ?')) {
      const id = params[0];
      const userId = params[1];
      const initialLen = db.saved_cooks.length;
      db.saved_cooks = db.saved_cooks.filter(c => !(c.id === id && c.user_id === userId));
      this.write(db);
      return [{ affectedRows: initialLen - db.saved_cooks.length } as any as T, null];
    }

    // 12. SELECT FROM subscribers
    if (queryLower.includes('select id from subscribers')) {
      const email = params[0];
      const found = db.subscribers.filter(s => s.email === email);
      return [found as any as T, null];
    }

    // 13. INSERT INTO subscribers
    if (queryLower.includes('insert into subscribers')) {
      const email = params[0];
      const name = params[1];
      const newId = db.subscribers.length + 1;
      db.subscribers.push({ id: newId, email, name, status: 'subscribed', created_at: new Date().toISOString() });
      this.write(db);
      return [{ insertId: newId, affectedRows: 1 } as any as T, null];
    }

    // 14. UPDATE subscribers SET status = 'unsubscribed'
    if (queryLower.includes('update subscribers set status =')) {
      const email = params[0];
      const idx = db.subscribers.findIndex(s => s.email === email);
      if (idx !== -1) {
        db.subscribers[idx].status = 'unsubscribed';
        db.subscribers[idx].unsubscribed_at = new Date().toISOString();
        this.write(db);
        return [{ affectedRows: 1 } as any as T, null];
      }
      return [{ affectedRows: 0 } as any as T, null];
    }

    // 15. SELECT FROM gallery_posts (Forum Feed)
    if (queryLower.includes('select p.id, p.before_url, p.after_url, p.name, p.cut, p.method, p.gear_used, p.created_at')) {
      const currentUserId = params[0]; // Used to calculate starred status
      const posts = db.gallery_posts.filter(p => !p.reported).sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      const mapped = posts.map(p => {
        const starCount = db.post_stars.filter(s => s.post_id === p.id).length;
        const starred = db.post_stars.some(s => s.post_id === p.id && s.user_id === currentUserId) ? 1 : 0;
        return { ...p, star_count: starCount, starred };
      });
      return [mapped as any as T, null];
    }

    // 16. INSERT INTO gallery_posts
    if (queryLower.includes('insert into gallery_posts')) {
      const id = params[0];
      const beforeUrl = params[1];
      const afterUrl = params[2];
      const name = params[3];
      const cut = params[4];
      const method = params[5];
      const gearUsed = params[6];
      const userId = params[7];
      db.gallery_posts.push({
        id,
        before_url: beforeUrl,
        after_url: afterUrl,
        name,
        cut,
        method,
        gear_used: gearUsed,
        user_id: userId,
        report_count: 0,
        reported: 0,
        created_at: new Date().toISOString(),
      });
      this.write(db);
      return [{}, null];
    }

    // 17. DELETE FROM gallery_posts
    if (queryLower.includes('delete from gallery_posts where id = ?')) {
      const id = params[0];
      db.gallery_posts = db.gallery_posts.filter(p => p.id !== id);
      db.post_stars = db.post_stars.filter(s => s.post_id !== id);
      db.post_comments = db.post_comments.filter(c => c.post_id !== id);
      this.write(db);
      return [{}, null];
    }

    // 18. Toggle/Insert Stars
    if (queryLower.includes('insert into post_stars') || queryLower.includes('delete from post_stars')) {
      const userId = params[0];
      const postId = params[1];
      const existsIdx = db.post_stars.findIndex(s => s.user_id === userId && s.post_id === postId);
      if (queryLower.includes('insert')) {
        if (existsIdx === -1) {
          db.post_stars.push({ user_id: userId, post_id: postId });
        }
      } else {
        if (existsIdx !== -1) {
          db.post_stars.splice(existsIdx, 1);
        }
      }
      this.write(db);
      return [{}, null];
    }

    // 19. SELECT comments
    if (queryLower.includes('select c.id, c.comment_text, c.created_at, c.user_id')) {
      const postId = params[0];
      const comms = db.post_comments.filter(c => c.post_id === postId).sort((a,b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      return [comms as any as T, null];
    }

    // 20. INSERT comment
    if (queryLower.includes('insert into post_comments')) {
      const postId = params[0];
      const userId = params[1];
      const text = params[2];
      const newId = db.post_comments.length + 1;
      db.post_comments.push({
        id: newId,
        post_id: postId,
        user_id: userId,
        comment_text: text,
        created_at: new Date().toISOString(),
      });
      this.write(db);
      return [{}, null];
    }

    return [[], null];
  }

  public async getConnection(): Promise<any> {
    return {
      query: async (sql: string, params: any[] = []) => this.query(sql, params),
      execute: async (sql: string, params: any[] = []) => this.execute(sql, params),
      release: () => {}
    };
  }
}

class PostgresDBPool {
  public pool: pg.Pool;

  constructor() {
    this.pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }

  // Translates MySQL dialect to PostgreSQL dialect transparently
  private translateQuery(sql: string, params: any[] = []): { text: string; values: any[] } {
    let text = sql;
    
    // Replace MySQL backticks with double quotes
    text = text.replace(/`/g, '"');
    
    // Replace MySQL "?" parameter placeholders with PostgreSQL "$1", "$2", etc.
    let paramIndex = 1;
    text = text.replace(/\?/g, () => {
      return `$${paramIndex++}`;
    });

    // Check if it's an INSERT statement and append RETURNING id for auto-incrementing tables
    const isInsert = /^\s*insert\s+into/i.test(text);
    let shouldReturnId = false;
    if (isInsert) {
      const match = text.match(/insert\s+into\s+([\w"]+)/i);
      if (match) {
        const table = match[1].replace(/"/g, '').toLowerCase();
        const autoIncrementTables = ['saved_cooks', 'subscribers', 'gear', 'gear_clicks', 'users', 'post_comments'];
        if (autoIncrementTables.includes(table)) {
          shouldReturnId = true;
        }
      }
    }

    if (shouldReturnId && !/returning\s+/i.test(text)) {
      text = text.trim() + ' RETURNING id';
    }

    return { text, values: params };
  }

  public async execute<T = any>(sql: string, params: any[] = []): Promise<[T, any]> {
    const { text, values } = this.translateQuery(sql, params);
    const result = await this.pool.query(text, values);
    
    // Emulate MySQL's result metadata for inserts
    const isInsert = /^\s*insert\s+into/i.test(sql);
    if (isInsert && result.rows.length > 0) {
      const insertId = result.rows[0].id;
      const response = { insertId, affectedRows: result.rowCount || 1 } as any;
      return [response as any as T, null];
    }
    
    return [result.rows as any as T, null];
  }

  public async query<T = any>(sql: string, params: any[] = []): Promise<[T, any]> {
    return this.execute<T>(sql, params);
  }

  public async getConnection(): Promise<any> {
    const client = await this.pool.connect();
    return {
      query: async (sql: string, params: any[] = []) => {
        const { text, values } = this.translateQuery(sql, params);
        const result = await client.query(text, values);
        
        const isInsert = /^\s*insert\s+into/i.test(sql);
        if (isInsert && result.rows.length > 0) {
          const insertId = result.rows[0].id;
          const response = { insertId, affectedRows: result.rowCount || 1 } as any;
          return [response, null];
        }
        return [result.rows, null];
      },
      execute: async (sql: string, params: any[] = []) => {
        const { text, values } = this.translateQuery(sql, params);
        const result = await client.query(text, values);
        
        const isInsert = /^\s*insert\s+into/i.test(sql);
        if (isInsert && result.rows.length > 0) {
          const insertId = result.rows[0].id;
          const response = { insertId, affectedRows: result.rowCount || 1 } as any;
          return [response, null];
        }
        return [result.rows, null];
      },
      release: () => client.release()
    };
  }
}

// Setup PostgreSQL schema
async function runPostgresSetup(pool: PostgresDBPool) {
  const client = await pool.pool.connect();
  try {
    // 1. Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS saved_cooks (
        id SERIAL PRIMARY KEY,
        user_id INT NULL,
        session_id VARCHAR(255) NOT NULL,
        method VARCHAR(50) NOT NULL,
        meat_category VARCHAR(100) NOT NULL,
        cut VARCHAR(100) NOT NULL,
        weight_kg DECIMAL(5,2) NOT NULL,
        result_json TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await client.query('CREATE INDEX IF NOT EXISTS idx_saved_cooks_session ON saved_cooks (session_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_saved_cooks_user_id ON saved_cooks (user_id)');

    await client.query(`
      CREATE TABLE IF NOT EXISTS cook_tally (
        id INT PRIMARY KEY,
        count INT DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(100) NULL,
        status VARCHAR(50) DEFAULT 'subscribed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        unsubscribed_at TIMESTAMP NULL
      )
    `);
    await client.query('CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers (email)');

    await client.query(`
      CREATE TABLE IF NOT EXISTS gallery_posts (
        id VARCHAR(21) NOT NULL PRIMARY KEY,
        before_url VARCHAR(500) NOT NULL,
        after_url VARCHAR(500) NOT NULL,
        name VARCHAR(100),
        cut VARCHAR(100) NOT NULL,
        method VARCHAR(100) NOT NULL,
        gear_used TEXT,
        report_count INT NOT NULL DEFAULT 0,
        reported SMALLINT NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS gear (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(100) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        category VARCHAR(100) NOT NULL,
        affiliate_url VARCHAR(500) NOT NULL DEFAULT '#',
        image_url VARCHAR(500),
        description TEXT,
        recommended_for VARCHAR(500),
        sort_order INT NOT NULL DEFAULT 0
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS gear_clicks (
        id SERIAL PRIMARY KEY,
        gear_slug VARCHAR(100) NOT NULL,
        clicked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await client.query('CREATE INDEX IF NOT EXISTS idx_gear_clicks_slug ON gear_clicks (gear_slug)');

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS post_stars (
        user_id INT NOT NULL,
        post_id VARCHAR(21) NOT NULL,
        PRIMARY KEY (user_id, post_id)
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS post_comments (
        id SERIAL PRIMARY KEY,
        post_id VARCHAR(21) NOT NULL,
        user_id INT NOT NULL,
        comment_text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Seed cook_tally if empty
    const tallyRes = await client.query('SELECT id FROM cook_tally WHERE id = 1');
    if (tallyRes.rows.length === 0) {
      await client.query('INSERT INTO cook_tally (id, count) VALUES (1, 0)');
    }

    // 3. Seed gear if empty
    const gearRes = await client.query('SELECT id FROM gear LIMIT 1');
    if (gearRes.rows.length === 0) {
      for (const item of INITIAL_GEAR) {
        await client.query(
          `INSERT INTO gear (id, slug, name, category, affiliate_url, description, recommended_for, sort_order)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [item.id, item.slug, item.name, item.category, item.affiliate_url, item.description, item.recommended_for, item.sort_order]
        );
      }
      // Reset sequence for SERIAL id
      await client.query("SELECT setval('gear_id_seq', (SELECT MAX(id) FROM gear))");
    }

    console.log('✅ Supabase PostgreSQL schema verified & seeded successfully.');
  } catch (error) {
    console.error('❌ Supabase PostgreSQL setup error:', error);
  } finally {
    client.release();
  }
}

// Instantiate pool depending on env configs
let pool: {
  execute<T = any>(sql: string, params?: any[]): Promise<[T, any]>;
  query<T = any>(sql: string, params?: any[]): Promise<[T, any]>;
  getConnection(): Promise<any>;
};

if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== '') {
  const pgPool = new PostgresDBPool();
  pool = pgPool;

  // Run schema setups once on startup - skip during Next.js build
  if (process.env.NEXT_PHASE !== 'phase-production-build') {
    runPostgresSetup(pgPool).catch(console.error);
  }
} else if (process.env.DB_HOST && process.env.DB_HOST.trim() !== '') {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  async function runMigrations() {
    const migrationsDir = path.join(process.cwd(), 'lib', 'migrations');
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();
    const conn = await pool.getConnection();
    try {
      for (const file of files) {
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        await conn.query(sql);
      }
    } finally {
      conn.release();
    }
  }

  if (process.env.NEXT_PHASE !== 'phase-production-build') {
    runMigrations().catch(console.error);
  }
} else {
  if (typeof window === 'undefined') {
    console.warn('⚠️ No database credentials found. Falling back to local JSON database.');
  }
  pool = new LocalDBProxy();
}

export default pool;

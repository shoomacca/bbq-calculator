/* eslint-disable @typescript-eslint/no-explicit-any */
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

// Initial Gear Seed Data (from 005_gear_seed.sql)
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async query<T = any>(sql: string, params: any[] = []): Promise<[any, any]> {
    const db = this.read();
    const cleanSql = sql.replace(/\s+/g, ' ').trim();

    // 1. SELECT count FROM cook_tally WHERE id = 1
    if (/SELECT\s+count\s+FROM\s+cook_tally/i.test(cleanSql)) {
      return [[{ count: db.cook_tally[0]?.count ?? 0 }], null];
    }

    // 2. UPDATE cook_tally SET count = count + 1 WHERE id = 1
    if (/UPDATE\s+cook_tally\s+SET\s+count\s+=\s+count\s+\+\s+1/i.test(cleanSql)) {
      if (db.cook_tally[0]) {
        db.cook_tally[0].count += 1;
        db.cook_tally[0].updated_at = new Date().toISOString();
        this.write(db);
      }
      return [{}, null];
    }

    // 3. SELECT name, slug, recommended_for FROM gear ORDER BY sort_order ASC
    if (/SELECT\s+name,\s*slug,\s*recommended_for\s+FROM\s+gear\s+ORDER\s+BY\s+sort_order\s+ASC/i.test(cleanSql)) {
      const rows = db.gear.map(({ name, slug, recommended_for }) => ({ name, slug, recommended_for }));
      return [rows, null];
    }

    // 4. SELECT * FROM gear
    if (/SELECT\s+\*\s+FROM\s+gear/i.test(cleanSql)) {
      let rows = [...db.gear];
      // WHERE category = ?
      const categoryMatch = /WHERE\s+category\s+=\s+\?/i.test(cleanSql);
      if (categoryMatch) {
        const catVal = params[0];
        rows = rows.filter(g => g.category === catVal);
      }
      // ORDER BY sort_order ASC LIMIT ?
      rows.sort((a, b) => a.sort_order - b.sort_order);
      const limitMatch = /LIMIT\s+(\?|\d+)/i.exec(cleanSql);
      if (limitMatch) {
        const limitVal = limitMatch[1] === '?' ? params[params.length - 1] : parseInt(limitMatch[1], 10);
        if (typeof limitVal === 'number') {
          rows = rows.slice(0, limitVal);
        }
      }
      return [rows, null];
    }

    // 5. SELECT affiliate_url FROM gear WHERE slug = ?
    if (/SELECT\s+affiliate_url\s+FROM\s+gear\s+WHERE\s+slug\s+=\s+\?/i.test(cleanSql)) {
      const slugVal = params[0];
      const match = db.gear.find(g => g.slug === slugVal);
      return [[match ? { affiliate_url: match.affiliate_url } : undefined].filter(Boolean), null];
    }

    // 6. INSERT INTO gear_clicks
    if (/INSERT\s+INTO\s+gear_clicks/i.test(cleanSql)) {
      const slugVal = params[0];
      db.gear_clicks.push({
        id: db.gear_clicks.length + 1,
        gear_slug: slugVal,
        clicked_at: new Date().toISOString()
      });
      this.write(db);
      return [{}, null];
    }

    // 7. SELECT * FROM gallery_posts
    if (/SELECT\s+.*FROM\s+gallery_posts/i.test(cleanSql)) {
      let rows = [...db.gallery_posts];
      
      const isFlaggedQuery = /WHERE\s+report_count\s+>\s+0\s+ORDER\s+BY\s+report_count\s+DESC/i.test(cleanSql);
      if (isFlaggedQuery) {
        rows = rows.filter(p => p.report_count > 0);
        rows.sort((a, b) => b.report_count - a.report_count);
      } else {
        rows = rows.filter(p => p.reported === 0);
        // Check filtering parameters
        let paramIdx = 0;
        if (/AND\s+method\s+=\s+\?/i.test(cleanSql)) {
          const methodVal = params[paramIdx++];
          rows = rows.filter(p => p.method === methodVal);
        }
        if (/AND\s+cut\s+=\s+\?/i.test(cleanSql)) {
          const cutVal = params[paramIdx++];
          rows = rows.filter(p => p.cut === cutVal);
        }
        rows.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
      
      // Limit
      const limitMatch = /LIMIT\s+(\d+)/i.exec(cleanSql);
      if (limitMatch) {
        rows = rows.slice(0, parseInt(limitMatch[1], 10));
      }
      
      // Map counts
      const mappedRows = rows.map(p => {
        const starCount = (db.post_stars || []).filter(s => s.post_id === p.id).length;
        const commentCount = (db.post_comments || []).filter(c => c.post_id === p.id).length;
        return {
          ...p,
          star_count: starCount,
          comment_count: commentCount
        };
      });
      return [mappedRows, null];
    }

    // 8. SELECT before_url, after_url FROM gallery_posts WHERE id = ?
    if (/SELECT\s+before_url,\s*after_url\s+FROM\s+gallery_posts\s+WHERE\s+id\s+=\s+\?/i.test(cleanSql)) {
      const idVal = params[0];
      const match = db.gallery_posts.find(p => p.id === idVal);
      return [match ? [{ before_url: match.before_url, after_url: match.after_url }] : [], null];
    }

    // 9. INSERT INTO gallery_posts
    if (/INSERT\s+INTO\s+gallery_posts/i.test(cleanSql)) {
      const [id, before_url, after_url, name, cut, method, gear_used, user_id] = params;
      db.gallery_posts.push({
        id, before_url, after_url, name, cut, method, gear_used,
        user_id: user_id !== undefined ? user_id : null,
        report_count: 0, reported: 0, created_at: new Date().toISOString()
      });
      this.write(db);
      return [{}, null];
    }

    // 9a. SELECT post_id FROM post_stars WHERE user_id = ?
    if (/SELECT\s+post_id\s+FROM\s+post_stars\s+WHERE\s+user_id\s+=\s+\?/i.test(cleanSql)) {
      const [userIdVal] = params;
      const list = (db.post_stars || []).filter(s => s.user_id === userIdVal);
      return [list, null];
    }

    // 9b. INSERT INTO post_stars
    if (/INSERT\s+INTO\s+post_stars/i.test(cleanSql)) {
      const [userIdVal, postIdVal] = params;
      if (!db.post_stars) db.post_stars = [];
      const exists = db.post_stars.some(s => s.user_id === userIdVal && s.post_id === postIdVal);
      if (!exists) {
        db.post_stars.push({ user_id: userIdVal, post_id: postIdVal });
        this.write(db);
      }
      return [{}, null];
    }

    // 9c. DELETE FROM post_stars WHERE user_id = ? AND post_id = ?
    if (/DELETE\s+FROM\s+post_stars\s+WHERE\s+user_id\s+=\s+\?\s+AND\s+post_id\s+=\s+\?/i.test(cleanSql)) {
      const [userIdVal, postIdVal] = params;
      if (!db.post_stars) db.post_stars = [];
      db.post_stars = db.post_stars.filter(s => !(s.user_id === userIdVal && s.post_id === postIdVal));
      this.write(db);
      return [{}, null];
    }

    // 9d. SELECT * FROM post_comments WHERE post_id = ? ORDER BY created_at ASC
    if (/SELECT\s+.*FROM\s+post_comments/i.test(cleanSql)) {
      const [postIdVal] = params;
      if (!db.post_comments) db.post_comments = [];
      const list = db.post_comments
        .filter(c => c.post_id === postIdVal)
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      return [list, null];
    }

    // 9e. INSERT INTO post_comments
    if (/INSERT\s+INTO\s+post_comments/i.test(cleanSql)) {
      const [postIdVal, userIdVal, textVal] = params;
      if (!db.post_comments) db.post_comments = [];
      const newComment = {
        id: db.post_comments.length + 1,
        post_id: postIdVal,
        user_id: userIdVal,
        comment_text: textVal,
        created_at: new Date().toISOString()
      };
      db.post_comments.push(newComment);
      this.write(db);
      return [{ insertId: newComment.id }, null];
    }

    // 10. UPDATE gallery_posts SET report_count = report_count + 1...
    if (/UPDATE\s+gallery_posts\s+SET\s+report_count/i.test(cleanSql)) {
      const idVal = params[0];
      const match = db.gallery_posts.find(p => p.id === idVal);
      if (match) {
        match.report_count += 1;
        match.reported = match.report_count >= 3 ? 1 : 0;
        this.write(db);
      }
      return [{}, null];
    }

    // 11. DELETE FROM gallery_posts WHERE id = ?
    if (/DELETE\s+FROM\s+gallery_posts\s+WHERE\s+id\s+=\s+\?/i.test(cleanSql)) {
      const idVal = params[0];
      db.gallery_posts = db.gallery_posts.filter(p => p.id !== idVal);
      this.write(db);
      return [{}, null];
    }

    // 12. INSERT INTO subscribers
    if (/INSERT\s+INTO\s+subscribers/i.test(cleanSql)) {
      const [email, cut, method, weight_kg, cook_time_minutes, appliance_temp_c, internal_temp_c, unsubscribe_token] = params;
      // Unique check
      if (db.subscribers.some(s => s.email === email)) {
        const err: any = new Error('Duplicate entry');
        err.code = 'ER_DUP_ENTRY';
        throw err;
      }
      db.subscribers.push({
        id: db.subscribers.length + 1,
        email, cut, method, weight_kg, cook_time_minutes, appliance_temp_c, internal_temp_c, unsubscribe_token,
        created_at: new Date().toISOString(),
        unsubscribed_at: null
      });
      this.write(db);
      return [{}, null];
    }

    // 13. SELECT id, unsubscribed_at FROM subscribers WHERE unsubscribe_token = ?
    if (/SELECT\s+id,\s*unsubscribed_at\s+FROM\s+subscribers\s+WHERE\s+unsubscribe_token\s+=\s+\?/i.test(cleanSql)) {
      const tokenVal = params[0];
      const match = db.subscribers.find(s => s.unsubscribe_token === tokenVal);
      return [match ? [{ id: match.id, unsubscribed_at: match.unsubscribed_at }] : [], null];
    }

    // 14. UPDATE subscribers SET unsubscribed_at = NOW()...
    if (/UPDATE\s+subscribers\s+SET\s+unsubscribed_at\s+=\s+NOW\(\)/i.test(cleanSql)) {
      const tokenVal = params[0];
      const match = db.subscribers.find(s => s.unsubscribe_token === tokenVal);
      if (match) {
        match.unsubscribed_at = new Date().toISOString();
        this.write(db);
      }
      return [{}, null];
    }

    // 15. SELECT * FROM users WHERE email = ?
    if (/SELECT\s+\*\s+FROM\s+users\s+WHERE\s+email\s+=\s+\?/i.test(cleanSql)) {
      const emailVal = params[0];
      const match = db.users.find(u => u.email.toLowerCase() === emailVal.toLowerCase());
      return [match ? [match] : [], null];
    }

    // 16. INSERT INTO users
    if (/INSERT\s+INTO\s+users\s+\(email,\s*password_hash\)/i.test(cleanSql)) {
      const [email, password_hash] = params;
      const id = db.users.length + 1;
      db.users.push({
        id, email, password_hash, created_at: new Date().toISOString()
      });
      this.write(db);
      return [{ insertId: id }, null];
    }

    // 17. SELECT * FROM saved_cooks WHERE user_id = ?
    if (/SELECT\s+\*\s+FROM\s+saved_cooks\s+WHERE\s+user_id\s+=\s+\?/i.test(cleanSql)) {
      const userIdVal = params[0];
      const rows = db.saved_cooks.filter(c => c.user_id === userIdVal);
      rows.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return [rows, null];
    }

    // 18. INSERT INTO saved_cooks
    if (/INSERT\s+INTO\s+saved_cooks\s+\(user_id,\s*method,\s*meat_category,\s*cut,\s*weight_kg,\s*result_json\)/i.test(cleanSql)) {
      const [user_id, method, meat_category, cut, weight_kg, result_json] = params;
      const id = db.saved_cooks.length + 1;
      db.saved_cooks.push({
        id,
        user_id,
        session_id: 'local-session',
        method,
        meat_category,
        cut,
        weight_kg,
        result_json,
        created_at: new Date().toISOString()
      });
      this.write(db);
      return [{ insertId: id }, null];
    }

    // 19. UPDATE saved_cooks SET result_json = ?
    if (/UPDATE\s+saved_cooks\s+SET\s+result_json\s+=\s+\?\s+WHERE\s+id\s+=\s+\?\s+AND\s+user_id\s+=\s+\?/i.test(cleanSql)) {
      const [result_json, idVal, userIdVal] = params;
      const match = db.saved_cooks.find(c => c.id === idVal && c.user_id === userIdVal);
      if (match) {
        match.result_json = result_json;
        this.write(db);
      }
      return [{}, null];
    }

    // 20. DELETE FROM saved_cooks WHERE id = ? AND user_id = ?
    if (/DELETE\s+FROM\s+saved_cooks\s+WHERE\s+id\s+=\s+\?\s+AND\s+user_id\s+=\s+\?/i.test(cleanSql)) {
      const [idVal, userIdVal] = params;
      db.saved_cooks = db.saved_cooks.filter(c => !(c.id === idVal && c.user_id === userIdVal));
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

// Instantiate pool depending on DB_HOST config
let pool: {
  execute<T = any>(sql: string, params?: any[]): Promise<[T, any]>;
  query<T = any>(sql: string, params?: any[]): Promise<[T, any]>;
  getConnection(): Promise<any>;
};

if (process.env.DB_HOST && process.env.DB_HOST.trim() !== '') {
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

  // Run once on startup — skip during `next build` (no DB available at build time)
  if (process.env.NEXT_PHASE !== 'phase-production-build') {
    runMigrations().catch(console.error);
  }
} else {
  if (typeof window === 'undefined') {
    console.warn('⚠️ No DB_HOST found in env. Falling back to local JSON database at data/local_db.json.');
  }
  pool = new LocalDBProxy();
}

export default pool;

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { type SavedCook } from '@/lib/resultStorage';

// Helper to authenticate user
async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) return null;
  return verifyToken(sessionCookie.value);
}

interface SavedCookDbRow extends RowDataPacket {
  id: number;
  method: string;
  meat_category: string;
  cut: string;
  weight_kg: string | number;
  result_json: string;
  created_at: string;
}

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const [rows] = await pool.execute<SavedCookDbRow[]>(
      'SELECT id, method, meat_category, cut, weight_kg, result_json, created_at FROM saved_cooks WHERE user_id = ? ORDER BY created_at DESC',
      [user.userId]
    );

    const saves = rows.map((row) => {
      let resultObj: Partial<SavedCook> = {};
      try {
        resultObj = JSON.parse(row.result_json);
      } catch (e) {
        console.error('Error parsing result_json:', e);
      }
      return {
        ...resultObj,
        id: row.id,
        saveId: String(row.id),
        method: row.method,
        meat_category: row.meat_category,
        cut: row.cut,
        weightKg: Number(row.weight_kg),
        savedAt: row.created_at,
      };
    });

    return NextResponse.json({ saves });
  } catch (error) {
    console.error('Fetch saves error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const cook = await req.json();
    if (!cook.method || !cook.cutName || !cook.weightKg) {
      return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
    }

    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO saved_cooks (user_id, method, meat_category, cut, weight_kg, result_json) VALUES (?, ?, ?, ?, ?, ?)',
      [
        user.userId,
        cook.method,
        cook.categoryName || '',
        cook.cutName,
        cook.weightKg,
        JSON.stringify(cook),
      ]
    );

    const insertId = result.insertId;
    return NextResponse.json({ success: true, id: insertId });
  } catch (error) {
    console.error('Save cook error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const { saveId, rating, notes } = await req.json();
    if (!saveId) {
      return NextResponse.json({ error: 'missing_id' }, { status: 400 });
    }

    const id = parseInt(saveId, 10);

    // Fetch the current record first to merge JSON
    const [rows] = await pool.execute<SavedCookDbRow[]>(
      'SELECT result_json FROM saved_cooks WHERE id = ? AND user_id = ?',
      [id, user.userId]
    );

    const row = rows[0];
    if (!row) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }

    let resultJsonObj: Partial<SavedCook> = {};
      try {
        resultJsonObj = JSON.parse(row.result_json);
    } catch {}

    const updatedResult = {
      ...resultJsonObj,
      rating: rating !== undefined ? rating : resultJsonObj.rating,
      notes: notes !== undefined ? notes : resultJsonObj.notes,
    };

    await pool.execute(
      'UPDATE saved_cooks SET result_json = ? WHERE id = ? AND user_id = ?',
      [JSON.stringify(updatedResult), id, user.userId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update cook error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const saveId = searchParams.get('saveId');
    if (!saveId) {
      return NextResponse.json({ error: 'missing_id' }, { status: 400 });
    }

    const id = parseInt(saveId, 10);

    await pool.execute(
      'DELETE FROM saved_cooks WHERE id = ? AND user_id = ?',
      [id, user.userId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete cook error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

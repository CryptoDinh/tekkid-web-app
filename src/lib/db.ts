import { Pool } from 'pg';
import { neon } from '@neondatabase/serverless';
// Create a connection pool
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// Connect to the Neon database
const pool = neon(`${process.env.DATABASE_URL}`);

// Helper function to execute queries
export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.length });
    return res;
  } catch (error) {
    console.error('Error executing query', { text, error });
    throw error;
  }
}

// Get all games
export async function getAllGames() {
  const result = await query('SELECT * FROM "tekkid-games"."games" ORDER BY id');
  return result;
}

// Get game by slug
export async function getGameBySlug(slug: string) {
  const result = await query('SELECT * FROM "tekkid-games"."games" WHERE slug = $1', [slug]);
  return result[0];
}

// Get games by category
export async function getGamesByCategory(categoryId: string) {
  const result = await query(
    'SELECT * FROM "tekkid-games"."games" WHERE catalog_ids LIKE $1 ORDER BY id',
    [`%${categoryId}%`]
  );
  return result;
}

// Get featured games
export async function getFeaturedGames() {
  const result = await query('SELECT * FROM "tekkid-games"."games" WHERE featured = 1 ORDER BY id');
  return result;
}

// Update game plays count
export async function incrementGamePlays(gameId: number) {
  await query('UPDATE "tekkid-games"."games" SET plays = plays + 1 WHERE id = $1', [gameId]);
}

// Get all categories
export async function getAllCategories() {
  const result = await query(
    'SELECT * FROM "tekkid-games"."categories" ORDER BY id'
  );
  return result;
} 
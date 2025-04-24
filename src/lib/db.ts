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

// Get all games with limit and offset, prioritize featured games
export async function getAllGames(limit: number = 200, offset: number = 0) {
  const result = await query(
    `SELECT * FROM "tekkid-games"."games"
     ORDER BY featured DESC, plays DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return result;
}

// Get game by slug
export async function getGameBySlug(slug: string) {
  const result = await query('SELECT * FROM "tekkid-games"."games" WHERE slug = $1', [slug]);
  return result[0];
}

// Get related games by category with limit, prioritize featured games
export async function getRelatedGames(slug: string, limit: number = 50) {
  const result = await query(
    `SELECT * FROM "tekkid-games"."games"
     WHERE $1 = ANY(category_ids)
     AND slug != $2
     ORDER BY featured DESC, plays DESC
     LIMIT $3`,
    [slug, slug, limit]
  );
  return result;
}

// Get related games by tags
export async function getRelatedGamesByTags(slug: string, limit: number = 50) {
  const result = await query(
    `SELECT * FROM "tekkid-games"."games"
     WHERE EXISTS (
       SELECT 1 FROM unnest(tag_ids) tag
       WHERE tag = ANY(
         SELECT unnest(tag_ids)
         FROM "tekkid-games"."games"
         WHERE slug = $1
       )
     )
     AND slug != $1
     ORDER BY featured DESC, plays DESC
     LIMIT $2`,
    [slug, limit]
  );
  return result;
}

// Get games by category with limit, prioritize featured games
export async function getGamesByCategory(categoryId: number, limit: number = 100, offset: number = 0) {
  const result = await query(
    `SELECT * FROM "tekkid-games"."games"
     WHERE $1 = ANY(category_ids)
     ORDER BY featured DESC, plays DESC
     LIMIT $2 OFFSET $3`,
    [categoryId, limit, offset]
  );

  return result;
}

export async function getGamesByCategorySlug(categorySlug: string, limit: number = 100, offset: number = 0): Promise<any[]> {
  try {
    const query = `
      SELECT g.*
      FROM "tekkid-games"."games" g
      INNER JOIN "tekkid-games"."categories" c ON c.id = ANY(g.category_ids)
      WHERE c.slug = $1
      ORDER BY g.featured DESC, g.plays DESC
      LIMIT $2 OFFSET $3
    `;
    const values = [categorySlug, limit, offset];
    const result = await pool.query(query, values);
    return result;
  } catch (error) {
    console.error('Error fetching games by category slug:', error);
    return [];
  }
}

// Get games by tag
export async function getGamesByTag(tagId: number, limit: number = 100, offset: number = 0) {
  const result = await query(
    `SELECT * FROM "tekkid-games"."games"
     WHERE $1 = ANY(tag_ids)
     ORDER BY featured DESC, plays DESC
     LIMIT $2 OFFSET $3`,
    [tagId, limit, offset]
  );
  return result;
}

// Get featured games with limit
export async function getFeaturedGames(limit: number = 200) {
  const result = await query(
    `SELECT * FROM "tekkid-games"."games"
     WHERE featured = 1
     ORDER BY plays DESC
     LIMIT $1`,
    [limit]
  );
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

// Get category ID by slug
export async function getCategoryIdBySlug(categorySlug: string): Promise<number | null> {
  try {
    const query = `SELECT id FROM categories WHERE slug = $1`;
    const values = [categorySlug];
    const result = await pool.query(query, values);

    if (result.length > 0) {
      return result[0].id; // Assuming 'id' is the column name for the category ID
    } else {
      return null; // Category not found
    }
  } catch (error) {
    console.error('Error fetching category ID by name:', error);
    return null;
  }
}
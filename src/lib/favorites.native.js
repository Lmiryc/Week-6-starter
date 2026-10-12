import * as SQLite from 'expo-sqlite';

let database;

// Open the database once and create the favorites table if it doesn't exist yet.
async function getDatabase() {
  if (!database) {
    database = await SQLite.openDatabaseAsync('moviewiki.db');
    await database.execAsync(
      'CREATE TABLE IF NOT EXISTS favorites (movie_id INTEGER PRIMARY KEY NOT NULL)'
    );
  }
  return database;
}

export async function getFavoriteIds() {
  const db = await getDatabase();
  const rows = await db.getAllAsync('SELECT movie_id FROM favorites');
  return rows.map((row) => row.movie_id);
}

export async function saveFavorite(id, active) {
  const db = await getDatabase();
  if (active) {
    await db.runAsync('INSERT OR IGNORE INTO favorites (movie_id) VALUES (?)', id);
  } else {
    await db.runAsync('DELETE FROM favorites WHERE movie_id = ?', id);
  }
}

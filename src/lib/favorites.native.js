import * as SQLite from 'expo-sqlite';

let database;
async function db() {
  if (!database) {
    database = await SQLite.openDatabaseAsync('moviewiki.db');
    await database.execAsync('CREATE TABLE IF NOT EXISTS favorites (movie_id INTEGER PRIMARY KEY NOT NULL)');
  }
  return database;
}

export async function getFavoriteIds() {
  const rows = await (await db()).getAllAsync('SELECT movie_id FROM favorites');
  return rows.map((row) => row.movie_id);
}

export async function saveFavorite(id, active) {
  const ref = await db();
  if (active) await ref.runAsync('INSERT OR IGNORE INTO favorites (movie_id) VALUES (?)', id);
  else await ref.runAsync('DELETE FROM favorites WHERE movie_id = ?', id);
}

// The native app persists with SQLite. This lightweight fallback keeps Expo web usable
// when the browser SQLite WASM bundle is unavailable in a static export.
const favoriteIds = new Set();

export async function getFavoriteIds() {
  return [...favoriteIds];
}

export async function saveFavorite(id, active) {
  if (active) {
    favoriteIds.add(id);
  } else {
    favoriteIds.delete(id);
  }
}

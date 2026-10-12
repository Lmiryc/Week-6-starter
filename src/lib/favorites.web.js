// The native app persists with SQLite. This lightweight fallback keeps Expo web usable
// when the browser SQLite WASM bundle is unavailable in a static export.
const ids = new Set();
export async function getFavoriteIds() { return [...ids]; }
export async function saveFavorite(id, active) { if (active) ids.add(id); else ids.delete(id); }

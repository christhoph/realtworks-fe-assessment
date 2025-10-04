const store = new Map();

function set(key, value, ttlMs = 60000) {
  const expiresAt = Date.now() + ttlMs;
  store.set(key, { value, expiresAt });
}

function get(key) {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.value;
}

function invalidate(key) {
  store.delete(key);
}

module.exports = { set, get, invalidate };

// Auth utility helpers

function sanitizeUsername(username) {
  return username.trim().toLowerCase();
}

function isExpiredToken(token, createdAt) {
  const SESSION_DURATION_MS = 60 * 60 * 1000; // 1 hour
  return Date.now() - new Date(createdAt).getTime() > SESSION_DURATION_MS;
}

module.exports = { sanitizeUsername, isExpiredToken };

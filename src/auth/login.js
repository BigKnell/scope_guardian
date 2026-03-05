// Authentication: login handler

function validateCredentials(username, password) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }
  return { username, authenticated: true };
}

function createSession(userId) {
  return {
    userId,
    token: Math.random().toString(36).slice(2),
    createdAt: new Date().toISOString(),
  };
}

module.exports = { validateCredentials, createSession };

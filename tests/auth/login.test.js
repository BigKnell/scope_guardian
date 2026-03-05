// Tests for auth/login.js

const { validateCredentials, createSession } = require('../../src/auth/login');

// validateCredentials
console.assert(
  validateCredentials('admin', 'secret').authenticated === true,
  'Should authenticate valid credentials'
);

try {
  validateCredentials('', 'secret');
  console.assert(false, 'Should have thrown for empty username');
} catch (e) {
  console.assert(e.message === 'Username and password are required', 'Correct error message');
}

// createSession
const session = createSession('user_123');
console.assert(session.userId === 'user_123', 'Session should contain userId');
console.assert(typeof session.token === 'string', 'Session should have a token');

console.log('All tests passed.');

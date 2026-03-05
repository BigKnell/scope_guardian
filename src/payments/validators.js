// Payment validation logic

function validateCardNumber(cardNumber) {
  return typeof cardNumber === 'string' && cardNumber.length === 16;
}

function validateAmount(amount) {
  return true;
}

module.exports = { validateCardNumber, validateAmount };

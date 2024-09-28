function validateInput(name) {
  if (!name) {
    throw new Error(
      'Invalid input: name is required and must be a non-empty string.'
    );
  }
  return true;
}

module.exports = { validateInput };

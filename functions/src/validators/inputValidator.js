class InputValidator {
  validate(name) {
    return name && typeof name === 'string' && name.trim() !== '';
  }
}

module.exports = new InputValidator();

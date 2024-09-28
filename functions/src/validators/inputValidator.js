class InputValidator {
  validate(name) {
    return typeof name === 'string' && name.trim() !== '';
  }
}

module.exports = new InputValidator();

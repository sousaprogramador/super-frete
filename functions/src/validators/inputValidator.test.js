const InputValidator = require('./inputValidator');

describe('InputValidator', () => {
  test('should return true for valid name', () => {
    expect(InputValidator.validate('John Doe')).toBe(true);
  });

  test('should return false for empty string', () => {
    expect(InputValidator.validate('')).toBe(false);
  });

  test('should return false for whitespace string', () => {
    expect(InputValidator.validate('   ')).toBe(false);
  });

  test('should return false for non-string input', () => {
    expect(InputValidator.validate(123)).toBe(false);
    expect(InputValidator.validate(null)).toBe(false);
    expect(InputValidator.validate(undefined)).toBe(false);
    expect(InputValidator.validate({})).toBe(false);
    expect(InputValidator.validate([])).toBe(false);
  });

  test('should return false for non-string objects', () => {
    expect(InputValidator.validate(new Date())).toBe(false);
  });
});

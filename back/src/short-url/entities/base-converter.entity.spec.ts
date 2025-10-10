import { BaseConverter } from './base-converter.entity';
describe('BaseConverter', () => {
  it.each([
    [1000, 'g8'],
    [6200, '1C0'],
    [8457, '2cp'],
  ])('should convert to base62', (value, expectedResult) => {
    const result = BaseConverter.toBase62(value);
    expect(result).toBe(expectedResult);
  });

  it.each([
    ['g8', 1000],
    ['1C0', 6200],
    ['2cp', 8457],
  ])('Should convert to base10', (value, expectedResult) => {
    const result = BaseConverter.toBase10(value);
    expect(result).toBe(expectedResult);
  });
});

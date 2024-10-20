// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      a: 4,
      b: 3,
      action: Action.Add,
    };

    const result = simpleCalculator(input);
    expect(result).toBe(7);
  });

  test('should subtract two numbers', () => {
    const input = {
      a: 10,
      b: 4,
      action: Action.Subtract,
    };

    const result = simpleCalculator(input);
    expect(result).toBe(6);
  });

  test('should multiply two numbers', () => {
    const input = {
      a: 10,
      b: 4,
      action: Action.Multiply,
    };

    const result = simpleCalculator(input);
    expect(result).toBe(40);
  });

  test('should divide two numbers', () => {
    const input = {
      a: 10,
      b: 4,
      action: Action.Divide,
    };

    const result = simpleCalculator(input);
    expect(result).toBe(2.5);
  });

  test('should exponentiate two numbers', () => {
    const input = {
      a: 10,
      b: 3,
      action: Action.Exponentiate,
    };

    const result = simpleCalculator(input);
    expect(result).toBe(1000);
  });

  test('should return null for invalid action', () => {
    const input = {
      a: 10,
      b: 4,
      action: 'test',
    };

    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = {
      a: 10,
      b: 'test',
      action: Action.Divide,
    };

    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });
});

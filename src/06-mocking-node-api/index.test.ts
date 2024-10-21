// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    const delay = 1000;

    doStuffByTimeout(mockCallback, delay);

    jest.advanceTimersByTime(delay);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();
    const delay = 1000;

    doStuffByTimeout(mockCallback, delay);
    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    const delay = 100;

    doStuffByInterval(mockCallback, delay);

    jest.advanceTimersByTime(delay);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    const delay = 100;

    doStuffByInterval(mockCallback, delay);

    jest.advanceTimersByTime(delay * 3);

    expect(mockCallback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = '/user/files/test.txt';
    const spy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(spy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = '/user/files/test.txt';

    const fileContents = await readFileAsynchronously(pathToFile);

    expect(fileContents).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const pathToFile = './test.txt';

    const fileContents = await readFileAsynchronously(pathToFile);

    expect(fileContents).toBe('123');
  });
});

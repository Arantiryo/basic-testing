// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  const fakeData = { userId: 1, title: 'Test Data' };
  const relativePath = '/posts/1';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    mockedAxios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: fakeData }),
    });

    await throttledGetDataFromApi(relativePath);

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // not implemented
  });

  test('should return response data', async () => {
    mockedAxios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: fakeData }),
    });

    const relativePath = '/posts/1';

    const data = await throttledGetDataFromApi(relativePath);

    expect(data).toEqual(fakeData);
  });
});

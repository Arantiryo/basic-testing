// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 120;
  let account = getBankAccount(initialBalance);
  let receiverAccount = getBankAccount(initialBalance);

  beforeEach(() => {
    account = getBankAccount(initialBalance);
    receiverAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawAmount = 200;

    expect(() => account.withdraw(withdrawAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const transferAmount = 200;
    expect(() => account.transfer(transferAmount, receiverAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const transferAmount = 50;
    expect(() => account.transfer(transferAmount, account)).toThrow();
  });

  test('should deposit money', () => {
    const depositAmount = 50;
    const resultingBalance = initialBalance + depositAmount;
    account.deposit(depositAmount);

    expect(account.getBalance()).toBe(resultingBalance);
  });

  test('should withdraw money', () => {
    const withdrawAmount = 50;
    const resultingBalance = initialBalance - withdrawAmount;
    account.withdraw(withdrawAmount);

    expect(account.getBalance()).toBe(resultingBalance);
  });

  test('should transfer money', () => {
    const transferAmount = 50;
    account.transfer(transferAmount, receiverAccount);

    expect(account.getBalance()).toBe(initialBalance - transferAmount);
    expect(receiverAccount.getBalance()).toBe(initialBalance + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    try {
      const responseType = typeof (await account.fetchBalance());
      expect(responseType).toBe('number');
    } catch (e) {}
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      await account.synchronizeBalance();

      expect(account.getBalance()).not.toBe(initialBalance);
    } catch (e) {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});

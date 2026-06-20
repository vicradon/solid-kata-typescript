import { AccountService } from '../srp/AccountService';
import { TransactionRepository } from '../srp/TransactionRepository';
import { Clock } from '../srp/Clock';
import { Console } from '../srp/Console';
import { Transaction } from '../srp/Transaction';

describe('SRP - Single Responsibility Principle', () => {
  let accountService: AccountService;
  let mockRepository: jest.Mocked<TransactionRepository>;
  let mockClock: jest.Mocked<Clock>;
  let mockConsole: jest.Mocked<Console>;

  beforeEach(() => {
    mockRepository = {
      add: jest.fn(),
      all: jest.fn(),
    };

    mockClock = {
      today: jest.fn(),
    };

    mockConsole = {
      printLine: jest.fn(),
    };

    accountService = new AccountService(mockRepository, mockClock, mockConsole);
  });

  it('should deposit money', () => {
    const date = new Date();
    mockClock.today.mockReturnValue(date);

    accountService.deposit(100);

    expect(mockRepository.add).toHaveBeenCalled();
    const transaction = (mockRepository.add as jest.Mock).mock.calls[0][0];
    expect(transaction.amount()).toBe(100);
  });

  it('should withdraw money', () => {
    const date = new Date();
    mockClock.today.mockReturnValue(date);

    accountService.withdraw(50);

    expect(mockRepository.add).toHaveBeenCalled();
    const transaction = (mockRepository.add as jest.Mock).mock.calls[0][0];
    expect(transaction.amount()).toBe(-50);
  });

  it('should print statement', () => {
    const transactions = [
      new Transaction(new Date(2014, 3, 1), 1000),
      new Transaction(new Date(2014, 3, 2), -100),
      new Transaction(new Date(2014, 3, 10), 500),
    ];

    mockRepository.all.mockReturnValue(transactions);

    accountService.printStatement();

    expect(mockConsole.printLine).toHaveBeenCalledTimes(4);

    const calls = (mockConsole.printLine as jest.Mock).mock.calls;
    expect(calls[0][0]).toBe('DATE | AMOUNT | BALANCE');
    expect(calls[1][0]).toBe('10/04/2014 | 500.00 | 1400.00');
    expect(calls[2][0]).toBe('02/04/2014 | -100.00 | 900.00');
    expect(calls[3][0]).toBe('01/04/2014 | 1000.00 | 1000.00');
  });
});

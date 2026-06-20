import { AccountService } from '../main/AccountService';
import { Clock } from '../main/Clock';
import { Console } from '../main/Console';
import { PrintStatementService } from '../main/PrintStatementService';
import { Transaction } from '../main/Transaction';
import { TransactionRepository } from '../main/TransactionRepository';

describe('AccountService', () => {
  const POSITIVE_AMOUNT = 100;
  const NEGATIVE_AMOUNT = -POSITIVE_AMOUNT;
  const TODAY = new Date(2017, 8, 6); // September 6, 2017 (month is 0-indexed)
  const TRANSACTIONS: Transaction[] = [
    Transaction.create(new Date(2014, 3, 1), 1000),
    Transaction.create(new Date(2014, 3, 2), -100),
    Transaction.create(new Date(2014, 3, 10), 500)
  ];

  let clock: jest.Mocked<Clock>;
  let transactionRepository: jest.Mocked<TransactionRepository>;
  let console: jest.Mocked<Console>;
  let accountService: AccountService;
  let printStatementService: PrintStatementService;

  beforeEach(() => {
    clock = {
      today: jest.fn().mockReturnValue(TODAY)
    } as unknown as jest.Mocked<Clock>;

    transactionRepository = {
      add: jest.fn(),
      all: jest.fn().mockReturnValue(TRANSACTIONS)
    } as unknown as jest.Mocked<TransactionRepository>;

    console = {
      printLine: jest.fn()
    } as unknown as jest.Mocked<Console>;

    printStatementService = new PrintStatementService(console);
    accountService = new AccountService(transactionRepository, clock, printStatementService);
  });

  test('deposit amount into the account', () => {
    accountService.deposit(POSITIVE_AMOUNT);

    expect(transactionRepository.add).toHaveBeenCalledWith(
      expect.objectContaining({
        date: TODAY,
        amount: POSITIVE_AMOUNT
      })
    );
  });

  test('withdraw amount from the account', () => {
    accountService.withdraw(POSITIVE_AMOUNT);

    expect(transactionRepository.add).toHaveBeenCalledWith(
      expect.objectContaining({
        date: TODAY,
        amount: NEGATIVE_AMOUNT
      })
    );
  });

  test('print statement', () => {
    accountService.printStatement();

    expect(console.printLine).toHaveBeenCalledTimes(4);
    expect(console.printLine).toHaveBeenNthCalledWith(1, 'DATE | AMOUNT | BALANCE');
    expect(console.printLine).toHaveBeenNthCalledWith(2, '10/04/2014 | 500.00 | 1400.00');
    expect(console.printLine).toHaveBeenNthCalledWith(3, '02/04/2014 | -100.00 | 900.00');
    expect(console.printLine).toHaveBeenNthCalledWith(4, '01/04/2014 | 1000.00 | 1000.00');
  });
});

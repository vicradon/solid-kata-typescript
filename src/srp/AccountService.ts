import { TransactionRepository } from './TransactionRepository';
import { Clock } from './Clock';
import { Console } from './Console';
import { Transaction } from './Transaction';

export class AccountService {
  private static readonly STATEMENT_HEADER = 'DATE | AMOUNT | BALANCE';
  private static readonly DATE_FORMAT = 'dd/MM/yyyy';
  private static readonly AMOUNT_FORMAT = '#.00';

  constructor(
    private transactionRepository: TransactionRepository,
    private clock: Clock,
    private console: Console
  ) {}

  deposit(amount: number): void {
    this.transactionRepository.add(this.transactionWith(amount));
  }

  withdraw(amount: number): void {
    this.transactionRepository.add(this.transactionWith(-amount));
  }

  printStatement(): void {
    this.printHeader();
    this.printTransactions();
  }

  private printHeader(): void {
    this.printLine(AccountService.STATEMENT_HEADER);
  }

  private printTransactions(): void {
    const transactions = this.transactionRepository.all();
    let balance = 0;
    const lines: string[] = [];

    transactions.forEach((transaction) => {
      balance += transaction.amount();
      lines.push(
        this.statementLine(transaction, balance)
      );
    });

    // Print in reverse order
    lines.reverse().forEach((line) => this.printLine(line));
  }

  private transactionWith(amount: number): Transaction {
    return new Transaction(this.clock.today(), amount);
  }

  private statementLine(transaction: Transaction, balance: number): string {
    return `${this.formatDate(transaction.date)} | ${this.formatNumber(
      transaction.amount()
    )} | ${this.formatNumber(balance)}`;
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private formatNumber(amount: number): string {
    return amount.toFixed(2);
  }

  private printLine(line: string): void {
    this.console.printLine(line);
  }
}

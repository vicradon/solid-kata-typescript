import { Transaction } from './Transaction';
import { Console } from './Console';

export class PrintStatementService {
  private static readonly STATEMENT_HEADER = 'DATE | AMOUNT | BALANCE';
  private static readonly DATE_FORMAT = 'dd/MM/yyyy';
  private static readonly AMOUNT_FORMAT = '#.00';

  constructor(private readonly console: Console) {}

  public printStatement(transactions: Transaction[]): void {
    this.printHeader();
    this.printTransactions(transactions);
  }

  private printHeader(): void {
    this.printLine(PrintStatementService.STATEMENT_HEADER);
  }

  private printTransactions(transactions: Transaction[]): void {
    let balance = 0;
    const lines: string[] = [];

    for (const transaction of transactions) {
      balance += transaction.amount;
      lines.push(this.statementLine(transaction, balance));
    }

    // Print in reverse order (most recent first)
    for (let i = lines.length - 1; i >= 0; i--) {
      this.printLine(lines[i]);
    }
  }

  private statementLine(transaction: Transaction, balance: number): string {
    return `${this.formatDate(transaction.date)} | ${this.formatNumber(transaction.amount)} | ${this.formatNumber(balance)}`;
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private formatNumber(amount: number): string {
    const formatted = amount.toFixed(2);
    // Ensure negative numbers keep the minus sign at the front
    if (amount < 0) {
      return formatted;
    }
    return formatted;
  }

  private printLine(line: string): void {
    this.console.printLine(line);
  }
}

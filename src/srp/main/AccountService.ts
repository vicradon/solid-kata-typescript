import { Transaction } from './Transaction';
import { TransactionRepository } from './TransactionRepository';
import { Clock } from './Clock';
import { PrintStatementService } from './PrintStatementService';

export class AccountService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly clock: Clock,
    private readonly printStatementService: PrintStatementService
  ) {}

  public deposit(amount: number): void {
    this.transactionRepository.add(this.transactionWith(amount));
  }

  public withdraw(amount: number): void {
    this.transactionRepository.add(this.transactionWith(-amount));
  }

  public printStatement(): void {
    const transactionsToPrint = this.transactionRepository.all();
    this.printStatementService.printStatement(transactionsToPrint);
  }

  private transactionWith(amount: number): Transaction {
    return Transaction.create(this.clock.today(), amount);
  }
}

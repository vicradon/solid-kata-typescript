import { Transaction } from './Transaction';

export interface TransactionRepository {
  add(transaction: Transaction): void;
  all(): Transaction[];
}

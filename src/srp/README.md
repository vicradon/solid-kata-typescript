# SRP - Single Responsibility Principle Violation

## Principle
> A class should have only one reason to change.

## The Violation

The `AccountService` class handles **multiple responsibilities**:

| Responsibility | Methods |
|---|---|
| Transaction Management | `deposit()`, `withdraw()`, `transactionWith()` |
| Statement Printing | `printStatement()`, `printHeader()`, `printTransactions()` |
| Transaction Formatting | `statementLine()`, `formatDate()`, `formatNumber()` |
| Console Output | `printLine()` |

### Problem
Any change to formatting, printing, or transaction logic requires modifying the same class. This violates SRP because the class has **more than one reason to change**.

### Evidence in Code
```typescript
export class AccountService {
  // Transaction responsibility
  deposit(amount: number): void { ... }
  withdraw(amount: number): void { ... }

  // Printing responsibility
  printStatement(): void { ... }
  private printHeader(): void { ... }
  private printTransactions(): void { ... }

  // Formatting responsibility
  private statementLine(...): string { ... }
  private formatDate(date: Date): string { ... }
  private formatNumber(amount: number): string { ... }

  // Output responsibility
  private printLine(line: string): void { ... }
}
```

## What the Solution Would Look Like

Extract each responsibility into separate classes:

- **AccountService** - Orchestrates operations only
- **TransactionRepository** - Handles transaction storage
- **PrintStatementService** - Handles statement formatting and printing
- **Console** - Handles console output

Each class would have a **single reason to change**.

## Solution Branch
```bash
git checkout srp-solution
```

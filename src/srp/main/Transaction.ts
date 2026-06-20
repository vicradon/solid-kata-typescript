export class Transaction {
  private constructor(
    public readonly date: Date,
    public readonly amount: number
  ) {}

  public static create(date: Date, amount: number): Transaction {
    return new Transaction(date, amount);
  }
}

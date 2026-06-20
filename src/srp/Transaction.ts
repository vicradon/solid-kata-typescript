export class Transaction {
  constructor(public date: Date, private amount_value: number) {
  }
  
  amount(): number {
    return this.amount_value;
  }
}

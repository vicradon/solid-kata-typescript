import { IPayAmount } from './IPayAmount';

export class Manager implements IPayAmount {
  constructor(
    private readonly salary: number,
    private readonly bonus: number
  ) {}

  public payAmount(): number {
    return this.bonus + this.salary;
  }
}

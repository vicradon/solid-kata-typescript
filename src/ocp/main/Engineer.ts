import { IPayAmount } from './IPayAmount';

export class Engineer implements IPayAmount {
  constructor(private readonly salary: number) {}

  public payAmount(): number {
    return this.salary;
  }
}

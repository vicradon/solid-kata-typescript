export class MonthDay {
  constructor(private month: number, private day: number) {}

  getMonth(): number {
    return this.month;
  }

  getDay(): number {
    return this.day;
  }

  equals(other: MonthDay): boolean {
    return this.month === other.month && this.day === other.day;
  }

  toString(): string {
    return `${this.month}-${this.day}`;
  }
}

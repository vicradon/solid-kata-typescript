import { EmployeeRepository } from './EmployeeRepository';
import { Sender } from './Sender';
import { Clock } from './Clock';

export class BirthdayGreeter {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly sender: Sender,
    private readonly clock: Clock
  ) {}

  public sendGreetings(): void {
    const today = this.clock.monthDay();
    this.employeeRepository
      .findEmployeesBornOn(today)
      .forEach((employee) => this.sender.send(employee));
  }
}

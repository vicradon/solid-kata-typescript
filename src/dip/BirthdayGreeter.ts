import { EmployeeRepository } from './EmployeeRepository';
import { Clock } from './Clock';
import { Email } from './Email';
import { EmailSender } from './EmailSender';
import { Employee } from './Employee';

export class BirthdayGreeter {
  constructor(
    private employeeRepository: EmployeeRepository,
    private clock: Clock
  ) {}

  sendGreetings(): void {
    const today = this.clock.monthDay();
    const employees = this.employeeRepository.findEmployeesBornOn(today);
    employees.forEach((employee) => {
      const email = this.emailFor(employee);
      new EmailSender().send(email);
    });
  }

  private emailFor(employee: Employee): Email {
    const message = `Happy birthday, dear ${employee.getFirstName()}!`;
    return new Email(employee.getEmail(), 'Happy birthday!', message);
  }
}

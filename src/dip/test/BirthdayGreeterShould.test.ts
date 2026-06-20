import { BirthdayGreeter } from '../main/BirthdayGreeter';
import { Clock } from '../main/Clock';
import { EmployeeRepository } from '../main/EmployeeRepository';
import { EmailSender } from '../main/EmailSender';
import { EmployeeBuilder } from './EmployeeBuilder';

describe('BirthdayGreeter', () => {
  const CURRENT_MONTH = 7;
  const CURRENT_DAY_OF_MONTH = 9;
  const TODAY = { month: CURRENT_MONTH, day: CURRENT_DAY_OF_MONTH };

  let employeeRepository: jest.Mocked<EmployeeRepository>;
  let clock: jest.Mocked<Clock>;
  let emailSender: EmailSender;
  let birthdayGreeter: BirthdayGreeter;

  let consoleContent = '';
  const originalStdoutWrite = process.stdout.write;

  beforeEach(() => {
    consoleContent = '';
    // Mock process.stdout.write to capture output
    process.stdout.write = (chunk: string | Buffer): boolean => {
      consoleContent += chunk.toString();
      return true;
    };

    employeeRepository = {
      findEmployeesBornOn: jest.fn()
    } as unknown as jest.Mocked<EmployeeRepository>;

    clock = {
      monthDay: jest.fn().mockReturnValue(TODAY)
    } as unknown as jest.Mocked<Clock>;

    emailSender = new EmailSender();
    birthdayGreeter = new BirthdayGreeter(employeeRepository, emailSender, clock);
  });

  afterEach(() => {
    // Restore original stdout.write
    process.stdout.write = originalStdoutWrite;
  });

  test('should send greeting email to employee', () => {
    const employee = EmployeeBuilder.anEmployee().build();
    employeeRepository.findEmployeesBornOn.mockReturnValue([employee]);

    birthdayGreeter.sendGreetings();

    expect(clock.monthDay).toHaveBeenCalled();
    expect(employeeRepository.findEmployeesBornOn).toHaveBeenCalledWith(TODAY);

    const expected = `To:${employee.email}, Subject: Happy birthday!, Message: Happy birthday, dear ${employee.firstName}!`;
    expect(consoleContent).toBe(expected);
  });
});

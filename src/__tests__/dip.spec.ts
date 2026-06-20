import { BirthdayGreeter } from '../dip/BirthdayGreeter';
import { EmployeeRepository } from '../dip/EmployeeRepository';
import { Clock } from '../dip/Clock';
import { Employee } from '../dip/Employee';
import { MonthDay } from '../dip/MonthDay';

describe('BirthdayGreeter', () => {
  const CURRENT_MONTH = 7;
  const CURRENT_DAY_OF_MONTH = 9;
  const TODAY = new MonthDay(CURRENT_MONTH, CURRENT_DAY_OF_MONTH);

  let mockEmployeeRepository: jest.Mocked<EmployeeRepository>;
  let mockClock: jest.Mocked<Clock>;
  let birthdayGreeter: BirthdayGreeter;

  beforeEach(() => {
    mockEmployeeRepository = {
      findEmployeesBornOn: jest.fn(),
    };

    mockClock = {
      monthDay: jest.fn(),
    };

    birthdayGreeter = new BirthdayGreeter(mockEmployeeRepository, mockClock);

    // Capture console output
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should send greeting email to employee', () => {
    const employee = new Employee('John', 'Doe', new Date(1980, 8, 10), 'john.doe@foobar.com');

    mockClock.monthDay.mockReturnValue(TODAY);
    mockEmployeeRepository.findEmployeesBornOn.mockReturnValue([employee]);

    birthdayGreeter.sendGreetings();

    const output = (console.log as jest.Mock).mock.calls[0][0];
    expect(output).toContain(employee.getEmail());
    expect(output).toContain('Happy birthday!');
    expect(output).toContain(`Happy birthday, dear ${employee.getFirstName()}!`);
  });
});

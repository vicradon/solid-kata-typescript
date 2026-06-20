import { Employee } from '../ocp/Employee';
import { EmployeeType } from '../ocp/EmployeeType';

describe('OCP - Open/Closed Principle', () => {
  it('should calculate pay for engineer', () => {
    const employee = new Employee(1000, 0, EmployeeType.ENGINEER);

    expect(employee.payAmount()).toBe(1000);
  });

  it('should calculate pay for manager', () => {
    const employee = new Employee(1000, 500, EmployeeType.MANAGER);

    expect(employee.payAmount()).toBe(1500);
  });
});

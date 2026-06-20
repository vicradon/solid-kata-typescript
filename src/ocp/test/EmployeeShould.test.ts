import { Engineer } from '../main/Engineer';
import { Manager } from '../main/Manager';

describe('Employee', () => {
  const BONUS = 100;
  const SALARY = 1000;

  test('should not add bonus to the engineer pay amount', () => {
    const engineer = new Engineer(SALARY);
    expect(engineer.payAmount()).toBe(SALARY);
  });

  test('should add bonus to the manager pay amount', () => {
    const manager = new Manager(SALARY, BONUS);
    expect(manager.payAmount()).toBe(SALARY + BONUS);
  });
});

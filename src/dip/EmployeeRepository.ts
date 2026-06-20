import { Employee } from './Employee';
import { MonthDay } from './MonthDay';

export interface EmployeeRepository {
  findEmployeesBornOn(monthDay: MonthDay): Employee[];
}

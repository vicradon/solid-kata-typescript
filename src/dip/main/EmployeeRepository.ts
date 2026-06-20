import { Employee } from './Employee';

export interface EmployeeRepository {
  findEmployeesBornOn(monthDay: { month: number; day: number }): Employee[];
}

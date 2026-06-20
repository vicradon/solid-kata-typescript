import { Employee } from '../main/Employee';

export class EmployeeBuilder {
  private firstName = 'John';
  private lastName = 'Doe';
  private dateOfBirth = new Date(1980, 8, 10); // September 10, 1980 (month is 0-indexed)
  private email = 'john.doe@foobar.com';

  public static anEmployee(): EmployeeBuilder {
    return new EmployeeBuilder();
  }

  public withEmail(email: string): EmployeeBuilder {
    this.email = email;
    return this;
  }

  public withFirstName(firstName: string): EmployeeBuilder {
    this.firstName = firstName;
    return this;
  }

  public withLastName(lastName: string): EmployeeBuilder {
    this.lastName = lastName;
    return this;
  }

  public withDateOfBirth(dateOfBirth: Date): EmployeeBuilder {
    this.dateOfBirth = dateOfBirth;
    return this;
  }

  public build(): Employee {
    return Employee.create(this.firstName, this.lastName, this.dateOfBirth, this.email);
  }
}

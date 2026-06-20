export class Employee {
  private constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dateOfBirth: Date,
    public readonly email: string
  ) {}

  public static create(
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    email: string
  ): Employee {
    return new Employee(firstName, lastName, dateOfBirth, email);
  }
}

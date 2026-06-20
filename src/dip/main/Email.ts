export class Email {
  private constructor(
    public readonly to: string,
    public readonly subject: string,
    public readonly message: string
  ) {}

  public static create(to: string, subject: string, message: string): Email {
    return new Email(to, subject, message);
  }
}

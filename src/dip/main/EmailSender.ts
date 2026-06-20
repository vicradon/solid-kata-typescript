import { Employee } from './Employee';
import { Email } from './Email';
import { Sender } from './Sender';

export class EmailSender implements Sender {
  public send(employee: Employee): void {
    const emailToSend = this.emailFor(employee);
    process.stdout.write(
      `To:${emailToSend.to}, Subject: ${emailToSend.subject}, Message: ${emailToSend.message}`
    );
  }

  private emailFor(employee: Employee): Email {
    const message = `Happy birthday, dear ${employee.firstName}!`;
    return Email.create(employee.email, 'Happy birthday!', message);
  }
}

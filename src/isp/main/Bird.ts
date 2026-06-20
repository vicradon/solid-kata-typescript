import { Runnable } from './Runnable';
import { Flyable } from './Flyable';

export class Bird implements Runnable, Flyable {
  public run(): void {
    process.stdout.write('Bird is running');
  }

  public fly(): void {
    process.stdout.write('Bird is flying');
  }
}

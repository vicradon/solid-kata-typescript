import { Runnable } from './Runnable';
import { Barkable } from './Barkable';

export class Dog implements Runnable, Barkable {
  public run(): void {
    process.stdout.write('Dog is running');
  }

  public bark(): void {
    process.stdout.write('Dog is barking');
  }
}

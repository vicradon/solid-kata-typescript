import { Animal } from './Animal';

export class Bird implements Animal {
  bark(): void {
    // Birds don't bark
  }

  run(): void {
    console.log('Bird is running');
  }

  fly(): void {
    console.log('Bird is flying');
  }
}

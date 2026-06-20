import { Animal } from './Animal';

export class Dog implements Animal {
  fly(): void {
    // Dogs can't fly
  }

  run(): void {
    console.log('Dog is running');
  }

  bark(): void {
    console.log('Dog is barking');
  }
}

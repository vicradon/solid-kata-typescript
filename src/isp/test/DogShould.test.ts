import { Dog } from '../main/Dog';

describe('Dog', () => {
  let consoleContent: string = '';
  const originalStdoutWrite = process.stdout.write;

  beforeEach(() => {
    consoleContent = '';
    // Mock process.stdout.write to capture output
    process.stdout.write = (chunk: string | Buffer): boolean => {
      consoleContent += chunk.toString();
      return true;
    };
  });

  afterEach(() => {
    // Restore original stdout.write
    process.stdout.write = originalStdoutWrite;
  });

  test('should run', () => {
    const dog = new Dog();
    dog.run();
    expect(consoleContent).toBe('Dog is running');
  });

  test('should bark', () => {
    const dog = new Dog();
    dog.bark();
    expect(consoleContent).toBe('Dog is barking');
  });
});

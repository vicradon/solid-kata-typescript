import { Bird } from '../main/Bird';

describe('Bird', () => {
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
    const bird = new Bird();
    bird.run();
    expect(consoleContent).toBe('Bird is running');
  });

  test('should fly', () => {
    const bird = new Bird();
    bird.fly();
    expect(consoleContent).toBe('Bird is flying');
  });
});

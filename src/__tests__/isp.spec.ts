import { Bird } from '../isp/Bird';
import { Dog } from '../isp/Dog';

describe('ISP - Interface Segregation Principle', () => {
  it('should allow bird to fly', () => {
    const bird = new Bird();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    bird.fly();

    expect(consoleSpy).toHaveBeenCalledWith('Bird is flying');

    consoleSpy.mockRestore();
  });

  it('should allow bird to run', () => {
    const bird = new Bird();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    bird.run();

    expect(consoleSpy).toHaveBeenCalledWith('Bird is running');

    consoleSpy.mockRestore();
  });

  it('should allow dog to run', () => {
    const dog = new Dog();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    dog.run();

    expect(consoleSpy).toHaveBeenCalledWith('Dog is running');

    consoleSpy.mockRestore();
  });

  it('should allow dog to bark', () => {
    const dog = new Dog();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    dog.bark();

    expect(consoleSpy).toHaveBeenCalledWith('Dog is barking');

    consoleSpy.mockRestore();
  });
});

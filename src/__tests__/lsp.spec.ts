import { PetrolCar } from '../lsp/PetrolCar';
import { ElectricCar } from '../lsp/ElectricCar';
import { FillingStation } from '../lsp/FillingStation';
import { Vehicle } from '../lsp/Vehicle';

// Testable vehicle for testing the abstract Vehicle class
class TestableVehicle extends Vehicle {
  fillUpWithFuel(): void {
    // No-op for testing
  }

  chargeBattery(): void {
    // No-op for testing
  }
}

describe('LSP - Liskov Substitution Principle', () => {
  describe('Vehicle', () => {
    it('should start engine', () => {
      const vehicle = new TestableVehicle();

      vehicle.startEngine();

      expect(vehicle.engineIsStarted()).toBe(true);
    });

    it('should stop engine', () => {
      const vehicle = new TestableVehicle();

      vehicle.startEngine();
      vehicle.stopEngine();

      expect(vehicle.engineIsStarted()).toBe(false);
    });
  });

  describe('PetrolCar', () => {
    it('should fill up petrol car with fuel', () => {
      const petrolCar = new PetrolCar();
      const fillingStation = new FillingStation();

      fillingStation.refuel(petrolCar);

      expect(petrolCar.fuelTankLevel_()).toBe(100);
    });

    it('should throw error when trying to charge petrol car', () => {
      const petrolCar = new PetrolCar();

      expect(() => {
        petrolCar.chargeBattery();
      }).toThrow('A petrol car cannot be recharged');
    });
  });

  describe('ElectricCar', () => {
    it('should charge electric car battery', () => {
      const electricCar = new ElectricCar();
      const fillingStation = new FillingStation();

      fillingStation.charge(electricCar);

      expect(electricCar.batteryLevel_()).toBe(100);
    });

    it('should throw error when trying to fill up electric car with fuel', () => {
      const electricCar = new ElectricCar();

      expect(() => {
        electricCar.fillUpWithFuel();
      }).toThrow("It's an electric car");
    });
  });

  describe('FillingStation', () => {
    it('should refuel a petrol car', () => {
      const car = new PetrolCar();
      const fillingStation = new FillingStation();

      fillingStation.refuel(car);

      expect(car.fuelTankLevel_()).toBe(100);
    });

    it('should not fail refueling an electric car', () => {
      const car = new ElectricCar();
      const fillingStation = new FillingStation();

      expect(() => {
        fillingStation.refuel(car);
      }).not.toThrow();
    });

    it('should recharge an electric car', () => {
      const car = new ElectricCar();
      const fillingStation = new FillingStation();

      fillingStation.charge(car);

      expect(car.batteryLevel_()).toBe(100);
    });

    it('should not fail recharging a petrol car', () => {
      const car = new PetrolCar();
      const fillingStation = new FillingStation();

      expect(() => {
        fillingStation.charge(car);
      }).not.toThrow();
    });
  });
});

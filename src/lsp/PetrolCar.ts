import { Vehicle } from './Vehicle';

export class PetrolCar extends Vehicle {
  private static readonly FUEL_TANK_FULL = 100;
  private fuelTankLevel: number = 0;

  fillUpWithFuel(): void {
    this.fuelTankLevel = PetrolCar.FUEL_TANK_FULL;
  }

  chargeBattery(): void {
    throw new Error('A petrol car cannot be recharged');
  }

  fuelTankLevel_(): number {
    return this.fuelTankLevel;
  }
}

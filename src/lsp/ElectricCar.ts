import { Vehicle } from './Vehicle';

export class ElectricCar extends Vehicle {
  private static readonly BATTERY_FULL = 100;
  private batteryLevel: number = 0;

  fillUpWithFuel(): void {
    throw new Error("It's an electric car");
  }

  chargeBattery(): void {
    this.batteryLevel = ElectricCar.BATTERY_FULL;
  }

  batteryLevel_(): number {
    return this.batteryLevel;
  }
}

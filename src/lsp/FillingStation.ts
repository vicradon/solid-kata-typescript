import { Vehicle } from './Vehicle';
import { PetrolCar } from './PetrolCar';
import { ElectricCar } from './ElectricCar';

export class FillingStation {
  refuel(vehicle: Vehicle): void {
    if (vehicle instanceof PetrolCar) {
      vehicle.fillUpWithFuel();
    }
  }

  charge(vehicle: Vehicle): void {
    if (vehicle instanceof ElectricCar) {
      vehicle.chargeBattery();
    }
  }
}

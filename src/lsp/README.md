# LSP - Liskov Substitution Principle Violation

## Principle
> If S is a subtype of T, then objects of type T may be replaced with objects of type S without breaking the program.

## The Violation

The `Vehicle` abstract class forces **all** subclasses to implement both `fillUpWithFuel()` AND `chargeBattery()`.

### Problem
- A `PetrolCar` cannot charge its battery - but MUST implement `chargeBattery()`
- An `ElectricCar` cannot fill with fuel - but MUST implement `fillUpWithFuel()`
- Substituting one vehicle type for another breaks the expected behavior
- The abstraction doesn't apply uniformly to all subtypes

### Evidence in Code
```typescript
export abstract class Vehicle {
  startEngine(): void { ... }
  stopEngine(): void { ... }

  // ⚠️ Forces ALL vehicles to implement both!
  abstract fillUpWithFuel(): void;
  abstract chargeBattery(): void;
}
```

**This violates LSP because:**
- A `PetrolCar` has no battery but must implement `chargeBattery()`
- An `ElectricCar` has no fuel tank but must implement `fillUpWithFuel()`
- The contract promises behavior that some subtypes cannot honor
- Clients using `Vehicle` cannot safely assume all methods are valid

## What the Solution Would Look Like

Use **separate abstractions** for different vehicle behaviors:

- `Vehicle` - Common vehicle operations (engine management)
- `Refuelable` - Interface for fuel-based vehicles
- `Rechargeable` - Interface for electric vehicles

Each vehicle implements **only** the interfaces that make sense for it.

## Solution Branch
```bash
git checkout lsp-solution
```

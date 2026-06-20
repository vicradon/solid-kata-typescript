# OCP - Open/Closed Principle Violation

## Principle
> Software entities should be open for extension, but closed for modification.

## The Violation

The `Employee` class uses a **switch statement** that must be modified every time a new employee type is added.

### Problem
- To add a new employee type (Intern, Consultant, etc.), you **must modify** the existing `Employee` class
- This breaks the "closed for modification" rule
- Risk of introducing bugs in existing, tested code
- The class is NOT extensible without modification

### Evidence in Code
```typescript
export class Employee {
  payAmount(): number {
    switch (this.type) {
      case EmployeeType.ENGINEER:
        return this.salary;
      case EmployeeType.MANAGER:
        return this.salary + this.bonus;
      // ⚠️ Must add new cases here for each employee type!
      default:
        return 0;
    }
  }
}
```

Every new employee type requires:
1. Adding to the `EmployeeType` enum
2. Adding a new `case` to the switch statement
3. **Modifying existing code** ❌

## What the Solution Would Look Like

Use **polymorphism** instead of switch statements:

- Create an `IPayAmount` interface
- Each employee type implements the interface
- New types added by creating new classes (no modification to existing code)

```typescript
// No modification needed to add new types!
class Engineer implements IPayAmount { ... }
class Manager implements IPayAmount { ... }
class Intern implements IPayAmount { ... }  // New type - no existing code changed
```

## Solution Branch
```bash
git checkout ocp-solution
```

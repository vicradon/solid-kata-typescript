# DIP - Dependency Inversion Principle Violation

## Principle
> High-level modules should not depend on low-level modules. Both should depend on abstractions.

## The Violation

The `BirthdayGreeter` high-level module **directly instantiates** the `EmailSender` low-level module.

### Problem
- `BirthdayGreeter` depends on the concrete `EmailSender` class
- Tight coupling between high-level and low-level modules
- Cannot substitute `EmailSender` with `SMSSender` without modifying `BirthdayGreeter`
- Violates "depend on abstractions, not concretions"

### Evidence in Code
```typescript
export class BirthdayGreeter {
  constructor(
    private employeeRepository: EmployeeRepository,
    private clock: Clock
  ) {}  // ⚠️ No Sender dependency!

  sendGreetings(): void {
    employees.forEach((employee) => {
      const email = this.emailFor(employee);
      new EmailSender().send(email);  // ⚠️ Direct instantiation!
    });
  }
}
```

**This violates DIP because:**
- High-level module (`BirthdayGreeter`) depends on low-level module (`EmailSender`)
- The dependency is on a concrete class, not an abstraction
- Hard to test (cannot mock `EmailSender`)
- Cannot change sending mechanism without modifying `BirthdayGreeter`

## What the Solution Would Look Like

Introduce a **Sender abstraction** that both high-level and low-level modules depend on:

```typescript
// Abstraction
interface Sender {
  send(employee: Employee): void;
}

// High-level module depends on abstraction
class BirthdayGreeter {
  constructor(
    private employeeRepository: EmployeeRepository,
    private sender: Sender,  // ⚠️ Depends on abstraction
    private clock: Clock
  ) {}
}

// Low-level module implements abstraction
class EmailSender implements Sender { ... }
class SMSSender implements Sender { ... }  // Easy to add new senders!
```

## Solution Branch
```bash
git checkout dip-solution
```

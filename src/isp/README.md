# ISP - Interface Segregation Principle Violation

## Principle
> Clients should not be forced to depend on methods they do not use.

## The Violation

The `Animal` interface forces **all** animals to implement `fly()`, `run()`, AND `bark()` - even when these methods don't make sense for certain animals.

### Problem
- A `Dog` cannot fly - but MUST implement `fly()`
- A `Bird` cannot bark - but MUST implement `bark()`
- Clients are forced to depend on methods their implementations don't use
- Results in empty or meaningless method implementations

### Evidence in Code
```typescript
export interface Animal {
  fly(): void;
  run(): void;
  bark(): void;  // ⚠️ All animals forced to implement all methods
}
```

**This violates ISP because:**
- The interface is "fat" - too many methods bundled together
- Implementing classes are forced to provide meaningless implementations
- Clients depend on methods they never call
- Changes to one method affect all implementers

### Example Implementations
```typescript
// Dog - forced to implement fly() even though it can't fly
class Dog implements Animal {
  fly(): void {
    // Empty implementation - meaningless!
  }
  run(): void { ... }
  bark(): void { ... }
}

// Bird - forced to implement bark() even though it can't bark
class Bird implements Animal {
  fly(): void { ... }
  run(): void { ... }
  bark(): void {
    // Empty implementation - meaningless!
  }
}
```

## What the Solution Would Look Like

Split into **smaller, focused interfaces**:

- `Flyable` - `fly()`
- `Runnable` - `run()`
- `Barkable` - `bark()`

Each animal implements **only** the interfaces that apply to it.

```typescript
class Dog implements Runnable, Barkable { ... }
class Bird implements Runnable, Flyable { ... }
```

## Solution Branch
```bash
git checkout isp-solution
```

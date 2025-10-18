import { LessonContent } from '@/app/types/lesson';

export const lesson7: LessonContent = {
  id: '7',
  title: 'Generics & Type Parameters',
  description: 'Master generic programming: write reusable code that works with any type.',
  difficulty: 'advanced',
  xpReward: 250,
  order: 7,
  prerequisiteLessons: ['6'],

  narrative: {
    welcomeMessage: "Welcome to Generics & Type Parameters! 🎯 After mastering references and borrowing, you're ready to write reusable code that works with any type!",
    quizTransition: "Great work with generic programming! Let's test your understanding of type parameters and constraints...",
    practiceTransition: "Perfect! Now let's build a complete generic container library!",
    celebrationMessage: "🎉 Excellent! You've mastered generic programming in Move!",
    nextLessonTease: "You've completed the advanced lessons! Keep practicing to master Move! 🚀",
  },
  teachingSections: [
    {
      sectionTitle: 'Introduction',
      slides: [
        {
          title: 'Welcome to Generics!',
          emoji: '🎯',
          content: `# Welcome to Generics & Type Parameters

By now, you've written functions like:

\`\`\`move
fun swap_u64(a: u64, b: u64): (u64, u64) {
    (b, a)
}

fun swap_bool(a: bool, b: bool): (bool, bool) {
    (b, a)
}

fun swap_address(a: address, b: address): (address, address) {
    (b, a)
}
\`\`\`

See the pattern? **Same logic, different types.** This is repetitive and violates the DRY principle (Don't Repeat Yourself).

## What You'll Learn

In this lesson, you'll master **generic programming** - writing code once that works with **any type**:

1. **Generic Functions** - Write \`swap<T>()\` that works for u64, bool, address, and more
2. **Generic Structs** - Create \`Box<T>\`, \`Pair<T, U>\` that hold any types
3. **Type Constraints** - Specify required abilities like \`T: copy + drop\`
4. **Phantom Types** - Sui-specific pattern for type safety without storage

By the end, you'll write elegant, reusable code that the Rust and Move communities love!

\`\`\`move
// ❌ Before: Repetitive code
fun swap_u64(a: u64, b: u64): (u64, u64) { (b, a) }
fun swap_bool(a: bool, b: bool): (bool, bool) { (b, a) }

// ✅ After: One generic function
fun swap<T>(a: T, b: T): (T, T) {
    (b, a)
}

// Works with ANY type!
let (x, y) = swap(10, 20);        // u64
let (p, q) = swap(true, false);   // bool
\`\`\``,
        }
      ],
      exerciseId: 'cc-new-013',
    },

    {
      sectionTitle: 'Generic Functions',
      slides: [
        {
          title: 'What Are Generics?',
          emoji: '🧩',
          content: `# What Are Generics?

Generics let you write **one function** that works with **multiple types**.

## The Problem Without Generics

\`\`\`move
fun get_first_u64(v: &vector<u64>): u64 {
    *vector::borrow(v, 0)
}

fun get_first_bool(v: &vector<bool>): bool {
    *vector::borrow(v, 0)
}

// Ugh, same logic repeated for every type!
\`\`\`

## The Solution: Type Parameters

Use **\`<T>\`** as a placeholder for "any type":

\`\`\`move
fun get_first<T>(v: &vector<T>): T {
    *vector::borrow(v, 0)
}
\`\`\`

**T** is a **type parameter**. When you call the function, T gets replaced with the actual type.

\`\`\`move
// Generic function - works with ANY type
fun get_first<T>(v: &vector<T>): T {
    *vector::borrow(v, 0)
}

// Usage: T is inferred automatically
let nums = vector[10, 20, 30];
let first = get_first(&nums);  // T = u64

let flags = vector[true, false];
let first_flag = get_first(&flags);  // T = bool
\`\`\``,
        },
        {
          title: 'Type Parameter Syntax',
          emoji: '📝',
          content: `# Type Parameter Syntax

Type parameters are declared in **angle brackets \`<T>\`** after the function name.

## Basic Syntax

\`\`\`move
fun function_name<TypeParameter>(params) {
    // function body
}
\`\`\`

## Naming Conventions

- **T** - Single generic type (most common)
- **T, U, V** - Multiple generic types
- **Element, Key, Value** - Descriptive names for clarity

## Example: Identity Function

\`\`\`move
// Takes any value and returns it unchanged
fun identity<T>(value: T): T {
    value
}
\`\`\`

The type parameter **T** appears in:
1. Function signature: \`<T>\`
2. Parameter type: \`value: T\`
3. Return type: \`: T\`

\`\`\`move
// Single type parameter
fun identity<T>(value: T): T {
    value
}

// Multiple type parameters
fun pair<T, U>(first: T, second: U): (T, U) {
    (first, second)
}

// Descriptive names
fun map_get<Key, Value>(
    map: &Map<Key, Value>,
    key: Key
): Option<Value> {
    // ...
}
\`\`\``,
        },
        {
          title: 'Type Inference',
          emoji: '🧠',
          content: `# Type Inference - The Compiler is Smart!

You usually **don't need to specify** the type parameter - Move figures it out!

## Automatic Inference

\`\`\`move
fun wrap<T>(val: T): Box<T> {
    Box { value: val }
}

// Compiler infers T = u64 from the argument
let box = wrap(42);
\`\`\`

## When You Need Explicit Types

Sometimes the compiler can't infer the type:

\`\`\`move
// ❌ Ambiguous - what's T?
let empty = vector::empty();

// ✅ Explicit type annotation
let empty = vector::empty<u64>();

// ✅ Or use turbofish syntax
let empty = vector::empty::<u64>();
\`\`\`

## Best Practice

Let the compiler infer when possible - it makes code cleaner!

\`\`\`move
fun identity<T>(x: T): T { x }

// ✅ Type inferred automatically
let num = identity(100);      // T = u64
let flag = identity(true);    // T = bool

// ✅ Explicit when needed
let v: vector<u64> = vector::empty();

// ✅ Turbofish for generic functions
let v = vector::empty::<u64>();
let v = vector::singleton::<bool>(true);
\`\`\``,
        },
        {
          title: 'Multiple Type Parameters',
          emoji: '🔀',
          content: `# Multiple Type Parameters

Functions can have **multiple generic types** for different parameters.

## Two Type Parameters

\`\`\`move
fun pair<T, U>(first: T, second: U): (T, U) {
    (first, second)
}
\`\`\`

## Why Multiple Types?

Sometimes you need **different types** in the same function:

\`\`\`move
// T and U can be the same OR different
let p1 = pair(10, 20);         // T = u64, U = u64
let p2 = pair(10, true);       // T = u64, U = bool
let p3 = pair(@0x1, 42);       // T = address, U = u64
\`\`\`

## Real-World Example: Map Insert

\`\`\`move
public fun insert<Key, Value>(
    map: &mut Map<Key, Value>,
    key: Key,
    value: Value
) {
    // Store key-value pair
}
\`\`\`

\`\`\`move
// Swap values of same type
fun swap<T>(a: T, b: T): (T, T) {
    (b, a)
}

// Create pairs of different types
fun pair<T, U>(first: T, second: U): (T, U) {
    (first, second)
}

// Usage examples
let (x, y) = swap(10, 20);           // T = u64
let p = pair(100, true);             // T = u64, U = bool
let coord = pair(5, 10);             // T = u64, U = u64
\`\`\``,
        }
      ],
      exerciseId: 'cc-new-019'
    },

    {
      sectionTitle: 'Generic Structs',
      slides: [
        {
          title: 'Generic Struct Definition',
          emoji: '📦',
          content: `# Generic Struct Definition

Just like functions, **structs can be generic** over types.

## Basic Syntax

\`\`\`move
public struct StructName<T> {
    field: T
}
\`\`\`

## Example: Generic Box

\`\`\`move
public struct Box<T> has store, drop {
    value: T
}

// Create boxes of different types
let num_box = Box { value: 100 };      // Box<u64>
let bool_box = Box { value: true };    // Box<bool>
let addr_box = Box { value: @0x1 };    // Box<address>
\`\`\`

## Why Generic Structs?

Instead of creating \`BoxU64\`, \`BoxBool\`, \`BoxAddress\`... you write **one struct** that works with all types!

\`\`\`move
// Generic wrapper for any value
public struct Box<T> has store, drop {
    value: T
}

// Generic pair - two values of same type
public struct Pair<T> has store, drop {
    first: T,
    second: T
}

// Mixed types - different type parameters
public struct MixedPair<T, U> has store, drop {
    first: T,
    second: U
}
\`\`\``,
        },
        {
          title: 'Working with Generic Structs',
          emoji: '🛠️',
          content: `# Working with Generic Structs

Functions that create or use generic structs must also be generic.

## Creating Generic Values

\`\`\`move
public struct Box<T> has store, drop {
    value: T
}

// Constructor must be generic
public fun create<T>(val: T): Box<T> {
    Box { value: val }
}
\`\`\`

## Extracting Values

\`\`\`move
// Unwrap must also be generic
public fun unwrap<T>(box: Box<T>): T {
    let Box { value } = box;
    value
}
\`\`\`

## The Pattern

**If a struct is generic over T, functions using it must be too!**

\`\`\`move
public struct Box<T> has store, drop {
    value: T
}

// Create a box
public fun create<T>(val: T): Box<T> {
    Box { value: val }
}

// Get value without consuming box
public fun peek<T>(box: &Box<T>): &T {
    &box.value
}

// Consume box and return value
public fun unwrap<T>(box: Box<T>): T {
    let Box { value } = box;
    value
}
\`\`\``,
        },
        {
          title: 'Multiple Type Parameters in Structs',
          emoji: '🎭',
          content: `# Multiple Type Parameters in Structs

Structs can have **multiple generic types** for different fields.

## Two Type Parameters

\`\`\`move
public struct Pair<T, U> has store, drop {
    first: T,
    second: U
}
\`\`\`

## Real-World Example: Key-Value Store

\`\`\`move
public struct Entry<Key, Value> has store {
    key: Key,
    value: Value
}
\`\`\`

## Flexibility is Power!

\`\`\`move
// Same types
let p1 = Pair { first: 10, second: 20 };
// Type: Pair<u64, u64>

// Different types
let p2 = Pair { first: 10, second: true };
// Type: Pair<u64, bool>
\`\`\`

\`\`\`move
// Generic pair with different types
public struct Pair<T, U> has store, drop {
    first: T,
    second: U
}

// Create a pair
public fun make_pair<T, U>(a: T, b: U): Pair<T, U> {
    Pair { first: a, second: b }
}

// Swap the pair
public fun swap<T, U>(p: Pair<T, U>): Pair<U, T> {
    Pair { first: p.second, second: p.first }
}

// Usage
let p = make_pair(100, true);  // Pair<u64, bool>
let swapped = swap(p);         // Pair<bool, u64>
\`\`\``,
        },
        {
          title: 'Generic Collections Pattern',
          emoji: '📚',
          content: `# Generic Collections Pattern

Generic structs are **perfect for collections** - they work with any element type!

## Common Patterns

### 1. Optional Value

\`\`\`move
public struct Option<T> has store, drop {
    is_some: bool,
    value: T  // Only valid if is_some = true
}
\`\`\`

### 2. Result Type

\`\`\`move
public struct Result<T, E> has store, drop {
    is_ok: bool,
    value: T,    // If success
    error: E     // If failure
}
\`\`\`

### 3. Dynamic List

\`\`\`move
// Already exists in std::vector!
public struct Vector<Element> {
    // internal implementation
}
\`\`\`

These patterns make your code **reusable and type-safe**!

\`\`\`move
// Custom Option type (simplified)
public struct MyOption<T> has store, drop {
    is_some: bool,
    value: T
}

public fun some<T>(val: T): MyOption<T> {
    MyOption { is_some: true, value: val }
}

public fun none<T>(default: T): MyOption<T> {
    MyOption { is_some: false, value: default }
}

public fun is_some<T>(opt: &MyOption<T>): bool {
    opt.is_some
}

// Usage
let x = some(42);        // MyOption<u64>
let y = none(0);         // MyOption<u64> with default
\`\`\``,
        }
      ],
      exerciseId: 'op-new-021'
    },

    {
      sectionTitle: 'Type Constraints & Phantom Types',
      slides: [
        {
          title: 'Type Constraints - Requiring Abilities',
          emoji: '🔒',
          content: `# Type Constraints - Requiring Abilities

Sometimes your generic code needs the type to have **specific abilities**.

## The Problem

\`\`\`move
// ❌ Error: T might not have 'drop'
public fun discard<T>(x: T) {
    // x goes out of scope - needs drop!
}
\`\`\`

## The Solution: Constraints

Add **\`: ability\`** after the type parameter:

\`\`\`move
// ✅ Now T MUST have drop ability
public fun discard<T: drop>(x: T) {
    // Safe! T can be dropped
}
\`\`\`

## Common Constraints

- \`T: copy\` - Type can be copied
- \`T: drop\` - Type can be discarded
- \`T: store\` - Type can be stored in structs
- \`T: key\` - Type can be a top-level object

Remember Lesson 4? Constraints connect to the **abilities system**!

\`\`\`move
// Requires drop ability to discard value
public fun discard<T: drop>(x: T) {
    // x automatically dropped at end of scope
}

// Requires copy to duplicate
public fun duplicate<T: copy>(x: T): (T, T) {
    (x, x)  // Only works if T has 'copy'
}

// Multiple constraints with +
public fun clone_and_drop<T: copy + drop>(x: T) {
    let y = x;  // copy
    // both x and y dropped
}
\`\`\``,
        },
        {
          title: 'Multiple Constraints',
          emoji: '➕',
          content: `# Multiple Constraints - Combining Abilities

You can require **multiple abilities** using the **\`+\`** operator.

## Syntax

\`\`\`move
fun function_name<T: ability1 + ability2>(x: T) {
    // T must have BOTH abilities
}
\`\`\`

## Example: Copy and Drop

\`\`\`move
public fun duplicate_and_discard<T: copy + drop>(x: T): T {
    let y = x;    // Requires 'copy' to duplicate
    y            // Original x is dropped (requires 'drop')
}
\`\`\`

## Real-World Use Case

\`\`\`move
// Store a value in two places
public fun store_twice<T: copy + store>(
    container1: &mut Box<T>,
    container2: &mut Box<T>,
    value: T
) {
    container1.value = value;      // First store
    container2.value = value;      // Copy for second store
}
\`\`\`

\`\`\`move
// Needs both copy and drop
public fun safe_duplicate<T: copy + drop>(x: T): T {
    let _temp = x;  // Copy x
    x               // Return original (temp dropped)
}

// Vector of copyable, droppable items
public struct SafeVec<T: copy + drop> has store, drop {
    items: vector<T>
}

// Can only use with types that have both abilities
let v1 = SafeVec { items: vector[1, 2, 3] };      // ✅ u64 has copy + drop
// let v2 = SafeVec { items: vector[coin1, coin2] };  // ❌ Coin has no copy!
\`\`\``,
        },
        {
          title: 'Phantom Type Parameters (Sui-Specific)',
          emoji: '👻',
          content: `# Phantom Type Parameters

**Phantom types** are type parameters that **don't appear in struct fields** but provide **compile-time type safety**.

## Sui Coin Example

\`\`\`move
public struct Coin<phantom CoinType> has key, store {
    id: UID,
    balance: u64  // Notice: CoinType not used in fields!
}
\`\`\`

## Why Phantom Types?

They create **different types** without storing extra data:

\`\`\`move
// These are DIFFERENT types!
type SUI = Coin<SUI>;      // Sui native token
type USDC = Coin<USDC>;    // USD Coin
type DOGE = Coin<DOGE>;    // Doge coin

// ❌ Type error - cannot mix!
fun mix(sui: Coin<SUI>, usdc: Coin<USDC>) {
    // Cannot pass USDC where SUI is expected!
}
\`\`\`

**Phantom types** give you type safety without storage overhead!

\`\`\`move
// Phantom type for type-safe coins
public struct Coin<phantom T> has key, store {
    id: UID,
    balance: u64
}

// Type markers (zero-size types)
public struct SUI {}
public struct USDC {}

// These are DIFFERENT types at compile time
type SuiCoin = Coin<SUI>;
type UsdcCoin = Coin<USDC>;

// Cannot accidentally mix them!
public fun transfer_sui(coin: Coin<SUI>, to: address) {
    // ...
}

// transfer_sui(usdc_coin, addr);  // ❌ Type error!
\`\`\``,
        }
      ],
      exerciseId: 'mc-new-020'
    }
  ],
  quiz: [
    {
      question: 'What is the correct syntax to declare a generic function with one type parameter?',
      options: [
        'fun my_func(T)(x: T): T',
        'fun my_func<T>(x: T): T',
        'fun my_func[T](x: T): T',
        'fun my_func{T}(x: T): T'
      ],
      correctAnswer: 1,
      explanation: 'Generic type parameters are declared in angle brackets <T> after the function name.',
    },
    {
      question: 'When do you NEED to explicitly specify type parameters?',
      options: [
        'Always - the compiler cannot infer types',
        'Never - type inference always works',
        'When the compiler cannot infer from context (e.g., vector::empty())',
        'Only for function calls, not struct instantiation'
      ],
      correctAnswer: 2,
      explanation: 'Usually types are inferred automatically, but for functions like vector::empty() with no arguments, you must specify the type explicitly.',
    },
    {
      question: 'How do you require that a type parameter T has BOTH copy and drop abilities?',
      options: [
        'T: copy, drop',
        'T: copy + drop',
        'T: copy & drop',
        'T: copy | drop'
      ],
      correctAnswer: 1,
      explanation: 'Multiple ability constraints are combined with the + operator: T: copy + drop',
    },
    {
      question: 'What is a phantom type parameter?',
      options: [
        'A type parameter that can be any type',
        'A type parameter that is never used in the code',
        'A type parameter that does not appear in struct fields but provides type safety',
        'A type parameter that is automatically dropped'
      ],
      correctAnswer: 2,
      explanation: 'Phantom types provide compile-time type safety without storing the type in fields. Example: Coin<phantom T> creates different coin types without extra storage.',
    },
    {
      question: 'Which generic struct definition is VALID?',
      options: [
        'struct Box<T: copy> { value: T }',
        'struct Box(T) { value: T }',
        'struct Box[T] { value: T }',
        'struct Box<T> { value: U }'
      ],
      correctAnswer: 0,
      explanation: 'Correct syntax uses angle brackets <T> and can include constraints. The type parameter must be used in fields (unless phantom).',
    }
  ],
  quizPassThreshold: 0.8,

  starterCode: `module lesson7::container {
    // TODO: Define Box<T> struct with store and drop abilities
    public struct Box<___> has ___, ___ {
        value: ___
    }

    // TODO: Define Pair<T, U> struct
    public struct Pair<___, ___> has store, drop {
        first: ___,
        second: ___
    }

    // TODO: Create a box
    public fun create<___>(val: ___): Box<___> {
        ___
    }

    // TODO: Extract value from box
    public fun unwrap<___>(box: Box<___>): ___ {
        let Box { value } = box;
        ___
    }

    // TODO: View value without consuming box
    public fun peek<___>(box: &Box<___>): &___ {
        ___
    }

    // TODO: Create a pair
    public fun make_pair<___, ___>(a: ___, b: ___): Pair<___, ___> {
        ___
    }

    // TODO: Swap pair positions
    public fun swap<___, ___>(p: Pair<___, ___>): Pair<___, ___> {
        Pair { first: p.___, second: p.___ }
    }

    // TODO: Get first element
    public fun first<___, ___>(p: &Pair<___, ___>): &___ {
        ___
    }

    // TODO: Get second element
    public fun second<___, ___>(p: &Pair<___, ___>): &___ {
        ___
    }

    // USER REQUESTED: Type constraint function
    // TODO: This function takes ownership of a Box and destroys it.
    // This is only possible if the inner type T has the 'drop' ability.
    public fun drop_box<___: ___>(box: Box<___>) {
        let Box { value: _ } = box;
    }

    #[test]
    fun test_container() {
        // Test Box
        let box = create(100);
        assert!(*peek(&box) == 100, 0);
        let val = unwrap(box);
        assert!(val == 100, 1);

        // Test Pair
        let p = make_pair(42, true);
        assert!(*first(&p) == 42, 2);
        assert!(*second(&p) == true, 3);

        let swapped = swap(p);
        assert!(*first(&swapped) == true, 4);
        assert!(*second(&swapped) == 42, 5);

        // Test drop_box with droppable type
        let box2 = create(200);
        drop_box(box2);  // u64 has 'drop' - this works!
    }
}`,

  solution: `module lesson7::container {
    public struct Box<T> has store, drop {
        value: T
    }

    public struct Pair<T, U> has store, drop {
        first: T,
        second: U
    }

    public fun create<T>(val: T): Box<T> {
        Box { value: val }
    }

    public fun unwrap<T>(box: Box<T>): T {
        let Box { value } = box;
        value
    }

    public fun peek<T>(box: &Box<T>): &T {
        &box.value
    }

    public fun make_pair<T, U>(a: T, b: U): Pair<T, U> {
        Pair { first: a, second: b }
    }

    public fun swap<T, U>(p: Pair<T, U>): Pair<U, T> {
        Pair { first: p.second, second: p.first }
    }

    public fun first<T, U>(p: &Pair<T, U>): &T {
        &p.first
    }

    public fun second<T, U>(p: &Pair<T, U>): &U {
        &p.second
    }

    /// This function takes ownership of a Box and destroys it.
    /// This is only possible if the inner type T has the 'drop' ability.
    public fun drop_box<T: drop>(box: Box<T>) {
        let Box { value: _ } = box;
    }

    #[test]
    fun test_container() {
        // Test Box
        let box = create(100);
        assert!(*peek(&box) == 100, 0);
        let val = unwrap(box);
        assert!(val == 100, 1);

        // Test Pair
        let p = make_pair(42, true);
        assert!(*first(&p) == 42, 2);
        assert!(*second(&p) == true, 3);

        let swapped = swap(p);
        assert!(*first(&swapped) == true, 4);
        assert!(*second(&swapped) == 42, 5);

        // Test drop_box with droppable type
        let box2 = create(200);
        drop_box(box2);  // u64 has 'drop' - this works!
    }
}`,

  hints: [
    "Box<T> needs just one type parameter T, used in the value field",
    "Pair<T, U> needs TWO type parameters for different field types",
    "Type constraints come after type parameters with a colon: <T: drop>",
    "peek() returns a reference to the field: &box.value",
    "swap() creates new Pair with first and second reversed",
    "drop_box() must have constraint T: drop to discard the value"
  ],
};

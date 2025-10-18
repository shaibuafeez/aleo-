import { LessonContent } from '@/app/types/lesson';

export const lesson6: LessonContent = {
  id: '6',
  title: 'References & Borrowing Deep Dive',
  description: 'Master ownership, references, and the borrow checker in Move',
  difficulty: 'intermediate',
  xpReward: 200,
  order: 6,
  prerequisiteLessons: ['5'],

  narrative: {
    welcomeMessage: "Welcome to References & Borrowing! 🔗 After mastering vectors, you're ready to deeply understand Move's ownership system!",
    quizTransition: "Great work understanding ownership! Let's test your knowledge of the borrow checker...",
    practiceTransition: "Perfect! Now let's build a complete bank account system demonstrating all reference patterns!",
    celebrationMessage: "🎉 Excellent! You've mastered ownership, references, and the borrow checker in Move!",
    nextLessonTease: "Next up: Advanced error handling patterns! 🛡️",
  },
  teachingSections: [
    {
      sectionTitle: 'Ownership & Immutable References',
      slides: [
        {
          title: 'What is Ownership?',
          emoji: '🏷️',
          content: `# What is Ownership?

Every value in Move has exactly **one owner** at any given time.

## The Ownership Principle

\`\`\`move
struct Coin has drop {
    value: u64
}

fun give_coin(coin: Coin) {
    // 'coin' is now owned by this function
    // When function ends, coin is dropped (destroyed)
}

fun test() {
    let my_coin = Coin { value: 100 };
    give_coin(my_coin);  // Ownership transferred!
    // my_coin no longer accessible here!
}
\`\`\`

**What happened?**
1. \`test()\` creates \`my_coin\` - it owns the Coin
2. Passing to \`give_coin()\` **transfers ownership**
3. \`test()\` no longer owns the coin
4. When \`give_coin()\` ends, the coin is dropped

This is called **move semantics** - the coin literally moves from one owner to another.`,
        },
        {
          title: 'Why We Need References',
          emoji: '📚',
          content: `# The Problem with Ownership Transfer

If every function call transfers ownership, we can't use values multiple times:

\`\`\`move
fun calculate_score(player: Player): u64 {
    player.score * 2
}

fun test() {
    let player = Player { score: 100 };
    let double = calculate_score(player);  // player moved!
    // Can't use player again - it's gone!
}
\`\`\`

## The Solution: Borrowing

Instead of transferring ownership, we can **borrow** the value:

\`\`\`move
fun calculate_score(player: &Player): u64 {  // Borrow with &
    player.score * 2
}

fun test() {
    let player = Player { score: 100 };
    let double = calculate_score(&player);  // Lend it temporarily
    // player is still here! Can use it again!
}
\`\`\`

**Analogy**: Giving someone a book (ownership transfer) vs letting them read your book (borrowing).`,
        },
        {
          title: 'Immutable References (&)',
          emoji: '🔒',
          content: `# Immutable References: Read-Only Access

An immutable reference \`&T\` gives you **read-only** access to a value.

## Key Properties

1. **No Modification**: Can only read, not write
2. **Multiple Allowed**: Can have many \`&T\` references at once
3. **No Ownership Transfer**: Original owner keeps the value

\`\`\`move
fun read_score(player: &Player): u64 {
    player.score  // Can read
    // player.score = 200;  // ERROR: can't modify!
}
\`\`\`

## Dereferencing

For primitives, use \`*\` to get the value:

\`\`\`move
fun get_double(num: &u64): u64 {
    *num * 2  // Dereference with *
}
\`\`\`

For structs, field access is automatic:

\`\`\`move
fun get_balance(account: &Account): u64 {
    account.balance  // No * needed for field access!
}
\`\`\``,
        },
        {
          title: 'Multiple Immutable Borrows',
          emoji: '👥',
          content: `# Multiple Readers are Safe

You can have **unlimited** immutable references to the same value:

\`\`\`move
fun test() {
    let value = 100;

    let ref1 = &value;
    let ref2 = &value;
    let ref3 = &value;
    // All valid! Multiple readers, no writers.
}
\`\`\`

## Why This is Safe

All references are read-only - no one can change the value while others are reading it. No data races possible!

## Connecting to Lesson 5

Remember \`vector::borrow()\`?

\`\`\`move
let first = vector::borrow(&scores, 0);
let second = vector::borrow(&scores, 1);
// Both valid! Reading different elements
\`\`\`

You were creating multiple immutable references to vector elements!`,
        },
      ],
      exerciseId: 'mc-new-016',
    },
    {
      sectionTitle: 'Mutable References & Rules',
      slides: [
        {
          title: 'Mutable References (&mut)',
          emoji: '✍️',
          content: `# Mutable References: Exclusive Write Access

A mutable reference \`&mut T\` gives you **read and write** access to a value.

## Key Properties

1. **Can Modify**: Full read-write access
2. **Exclusive**: Only **ONE** \`&mut\` at a time
3. **No Sharing**: Can't coexist with \`&\` references

\`\`\`move
fun increase_score(player: &mut Player, points: u64) {
    player.score = player.score + points;  // Can modify!
}

fun test() {
    let mut player = Player { score: 100 };
    increase_score(&mut player, 50);
    // player.score is now 150
}
\`\`\`

**Why \`mut\` twice?**
- \`let mut player\`: Variable itself is mutable
- \`&mut player\`: Passing a mutable reference`,
        },
        {
          title: 'The Borrow Checker Rules',
          emoji: '⚖️',
          content: `# The Borrow Checker's Safety Rules

Move enforces these rules to prevent data races and bugs:

## Rule 1: Multiple \`&\` OR One \`&mut\`

You can have:
- **Many immutable references (\`&\`)**, OR
- **ONE mutable reference (\`&mut\`)**
- **But NEVER both at the same time**

\`\`\`move
let mut x = 10;

// ✅ Valid: Multiple immutable
let r1 = &x;
let r2 = &x;

// ✅ Valid: One mutable
let m1 = &mut x;

// ❌ Invalid: Mixing & and &mut
let r1 = &x;
let m1 = &mut x;  // ERROR!
\`\`\`

## Why This Matters

Prevents reading a value while someone else is modifying it!`,
        },
        {
          title: 'Dereferencing with *',
          emoji: '⭐',
          content: `# When to Use the Dereference Operator

The \`*\` operator **dereferences** a reference to get the value.

## With Primitives (u64, bool, etc.)

**Always use \`*\` when:**
- Reading the value
- Assigning a new value

\`\`\`move
fun increment(num: &mut u64) {
    *num = *num + 1;  // Need * for both read and write
}
\`\`\`

## With Structs

**Field access is automatic:**

\`\`\`move
fun update_score(player: &mut Player, points: u64) {
    player.score = player.score + points;  // No * needed!
}
\`\`\`

**But accessing the whole struct needs \`*\`:**

\`\`\`move
fun clone_player(player: &Player): Player {
    *player  // Returns a copy of the entire struct
}
\`\`\``,
        },
        {
          title: 'Common Compiler Errors',
          emoji: '🚨',
          content: `# Understanding Borrow Checker Errors

## Error 1: Multiple Mutable Borrows

\`\`\`move
let mut x = 10;
let m1 = &mut x;
let m2 = &mut x;  // ERROR!
\`\`\`

**Fix**: Use borrows sequentially, not simultaneously.

## Error 2: Mixing Immutable and Mutable

\`\`\`move
let mut x = 10;
let r = &x;
let m = &mut x;  // ERROR!
\`\`\`

**Fix**: Finish using immutable borrows before creating mutable ones.

## Error 3: Borrow After Move

\`\`\`move
let player = Player { score: 100 };
process(player);  // Ownership moved
let ref = &player;  // ERROR: player was moved!
\`\`\`

**Fix**: Borrow instead of moving: \`process(&player)\``,
        },
      ],
      exerciseId: 'cc-new-017',
    },
    {
      sectionTitle: 'Patterns & Best Practices',
      slides: [
        {
          title: 'When to Use References vs Ownership',
          emoji: '🎯',
          content: `# Choosing Between References and Ownership

## Use Immutable Reference (\`&T\`) When:
- **Reading data** without modification
- **Multiple accesses** to the same value
- **Keeping ownership** in the calling function

\`\`\`move
fun calculate_total(items: &vector<Item>): u64 {
    // Just reading - use &
}
\`\`\`

## Use Mutable Reference (\`&mut T\`) When:
- **Modifying in place**
- **Updating without transferring ownership**

\`\`\`move
fun increment_score(player: &mut Player, points: u64) {
    // Modifying - use &mut
    player.score = player.score + points;
}
\`\`\`

## Use Owned Value (\`T\`) When:
- **Transferring ownership**
- **Consuming/destroying** the value
- **Returning** a newly created value

\`\`\`move
fun destroy_item(item: Item) {
    // Takes ownership, item is dropped
}
\`\`\``,
        },
        {
          title: 'Reference Patterns in Move',
          emoji: '🔄',
          content: `# Common Patterns You'll Use

## Pattern 1: Borrow to Read, Return Owned

\`\`\`move
fun create_summary(player: &Player): PlayerSummary {
    PlayerSummary {
        total: player.wins + player.losses,
        ratio: player.wins / player.losses
    }
}
\`\`\`

## Pattern 2: Borrow Mut to Modify, Return Nothing

\`\`\`move
fun apply_damage(player: &mut Player, damage: u64) {
    player.health = player.health - damage;
    // No return - just modify in place
}
\`\`\`

## Pattern 3: Take Ownership, Transform, Return New

\`\`\`move
fun evolve_character(character: Character): EvolvedCharacter {
    // Takes ownership, creates new type
    EvolvedCharacter {
        level: character.level + 1,
        power: character.power * 2
    }
    // character is destroyed
}
\`\`\``,
        },
        {
          title: 'Connecting the Dots',
          emoji: '💡',
          content: `# Bringing It All Together

Remember all those times you used \`&\` and \`&mut\` in Lessons 4 and 5? Now you understand **why**!

## Vector Operations (Lesson 5)

\`\`\`move
vector::push_back(&mut scores, 100);
//                ^^^^
//                Modifying the vector - need &mut!

let first = vector::borrow(&scores, 0);
//                        ^
//                        Just reading - use &
\`\`\`

## Struct Modification (Lesson 4)

\`\`\`move
fun level_up(player: &mut Player) {
//                   ^^^^
//                   Modifying player - need &mut!
    player.level = player.level + 1;
}
\`\`\`

## Why These Rules Matter

Without the borrow checker, you could have:
- **Data races**: Reading while someone else writes
- **Use-after-free**: Using a value that was destroyed
- **Double-free**: Destroying the same value twice

Move's borrow checker **prevents all of these at compile time**!`,
        },
      ],
      exerciseId: 'op-new-018',
    },
  ],
  quiz: [
    {
      question: 'What happens to a value when you pass it to a function without using a reference?',
      options: [
        'The value is copied to the function',
        'Ownership is transferred to the function',
        'The value becomes immutable',
        'The function gets a temporary reference',
      ],
      correctAnswer: 1,
      explanation:
        'Ownership is transferred to the function. This is called "move semantics" - the value literally moves from the caller to the callee. After the call, the original owner can no longer use the value.',
    },
    {
      question: 'How many mutable references (&mut) can exist to the same value at the same time?',
      options: [
        'Unlimited',
        'Two',
        'Only one',
        'As many as there are scopes',
      ],
      correctAnswer: 2,
      explanation:
        'Only ONE mutable reference can exist at a time. This prevents data races and conflicting modifications. It\'s the "exclusive write access" rule.',
    },
    {
      question: 'Which statement about immutable references (&) is TRUE?',
      options: [
        'You can only have one immutable reference at a time',
        'Immutable references allow modifying the value',
        'You can have multiple immutable references simultaneously',
        'Immutable references transfer ownership',
      ],
      correctAnswer: 2,
      explanation:
        'You can have multiple immutable references at the same time. Since they\'re all read-only, there\'s no risk of data races. Many readers, no writers - perfectly safe!',
    },
    {
      question: 'When do you need to use the dereference operator (*) ?',
      options: [
        'Always when working with references',
        'Only when reading or writing primitive values through references',
        'Only with mutable references',
        'Never - Move does it automatically',
      ],
      correctAnswer: 1,
      explanation:
        'You need * when reading or writing primitives (u64, bool, etc.) through references. For structs, field access is automatic, but you still need * to access the whole struct value.',
    },
    {
      question: 'Why can\'t you have both & and &mut references to the same value simultaneously?',
      options: [
        'It\'s a limitation of the compiler',
        'To save memory',
        'To prevent reading a value while it\'s being modified',
        'Because &mut is more powerful',
      ],
      correctAnswer: 2,
      explanation:
        'Having both would allow reading while someone else is writing, causing a data race. If someone is reading with & and another is modifying with &mut, the reader might see inconsistent or corrupted data. The borrow checker prevents this!',
    },
  ],
  quizPassThreshold: 0.8,

  starterCode: `module lesson6::bank {
    // Define the Account struct
    // TODO: Add struct with balance: u64, owner: address, and store ability

    // Create a new account
    public fun create_account(owner: address): Account {
        // TODO: Return Account with balance 0 and given owner
    }

    // Get account balance (immutable borrow)
    public fun get_balance(account: &Account): u64 {
        // TODO: Return the balance
    }

    // Deposit funds (mutable borrow)
    public fun deposit(account: &mut Account, amount: u64) {
        // TODO: Add amount to account.balance
    }

    // Withdraw funds (mutable borrow, returns success)
    public fun withdraw(account: &mut Account, amount: u64): bool {
        // TODO: Check if balance >= amount
        // TODO: If yes, subtract amount and return true
        // TODO: If no, return false
    }

    // Check if user is owner (immutable borrow)
    public fun is_owner(account: &Account, user: address): bool {
        // TODO: Compare account.owner with user
    }
}`,

  solution: `module lesson6::bank {
    public struct Account has store {
        balance: u64,
        owner: address
    }

    public fun create_account(owner: address): Account {
        Account {
            balance: 0,
            owner
        }
    }

    public fun get_balance(account: &Account): u64 {
        account.balance
    }

    public fun deposit(account: &mut Account, amount: u64) {
        account.balance = account.balance + amount;
    }

    public fun withdraw(account: &mut Account, amount: u64): bool {
        if (account.balance >= amount) {
            account.balance = account.balance - amount;
            true
        } else {
            false
        }
    }

    public fun is_owner(account: &Account, user: address): bool {
        account.owner == user
    }
}`,

  hints: [
    "Remember: immutable references (&) are for reading, mutable references (&mut) are for modifying",
    "The Account struct needs the 'store' ability to be used in vectors and other storage",
    "For withdraw, check if balance >= amount before subtracting",
    "You can access struct fields directly through references without using the * operator",
  ],
};

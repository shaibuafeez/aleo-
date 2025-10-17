import { Lesson } from '@/app/types/lesson';

export const lesson6: Lesson = {
  id: 6,
  title: 'References & Borrowing Deep Dive',
  description: 'Master ownership, references, and the borrow checker in Move',
  estimatedTime: '35 min',
  sections: [
    {
      id: 'intro',
      title: 'Introduction',
      content: `# References & Borrowing Deep Dive

Welcome to Lesson 6! You've been using \`&\` and \`&mut\` in previous lessons - now it's time to deeply understand **why** they exist and **how** they keep your code safe.

## What You'll Learn

- What ownership means in Move
- Immutable references (\`&\`) for reading
- Mutable references (\`&mut\`) for writing
- The borrow checker rules that prevent bugs
- When to use references vs owned values

## Why This Matters

In Lessons 4 and 5, you used references with structs and vectors but may have wondered:
- Why do I need to pass \`&mut scores\` to \`vector::push_back\`?
- Why can't I have multiple \`&mut\` references?
- When do I need to use \`*\` to dereference?

**This lesson answers all those questions** and gives you a deep understanding of Move's most important safety feature!`,
    },
  ],
  teachingSections: [
    {
      title: 'Ownership & Immutable References',
      slides: [
        {
          title: 'What is Ownership?',
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
          codeBlocks: [
            {
              title: 'Ownership Transfer',
              code: `struct Player has drop {
    score: u64
}

fun process_player(player: Player) {
    // player is owned by this function
}

fun test() {
    let my_player = Player { score: 100 };
    process_player(my_player);  // Ownership transferred
    // ERROR: can't use my_player here anymore!
}`,
              highlights: [
                { line: 9, description: 'my_player created - test() owns it' },
                { line: 10, description: 'Ownership transferred to process_player()' },
                { line: 11, description: 'my_player no longer exists in test() scope!' },
              ],
            },
          ],
        },
        {
          title: 'Why We Need References',
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
          codeBlocks: [
            {
              title: 'Borrowing Keeps Ownership',
              code: `struct Account has drop {
    balance: u64
}

fun check_balance(account: &Account): u64 {
    account.balance
}

fun test() {
    let my_account = Account { balance: 500 };

    let balance1 = check_balance(&my_account);  // Borrow
    let balance2 = check_balance(&my_account);  // Can borrow again!
    let balance3 = check_balance(&my_account);  // Still works!

    // my_account is still owned by test()
}`,
              highlights: [
                { line: 9, description: 'Create account - test() owns it' },
                { line: 11, description: 'Borrow with & - ownership stays with test()' },
                { line: 12, description: 'Can borrow again!' },
                { line: 13, description: 'And again! Unlimited immutable borrows allowed' },
              ],
            },
          ],
        },
        {
          title: 'Immutable References (&)',
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
          codeBlocks: [
            {
              title: 'Immutable Reference Patterns',
              code: `struct Stats has drop {
    wins: u64,
    losses: u64
}

fun calculate_ratio(stats: &Stats): u64 {
    // Can read all fields
    if (stats.losses == 0) {
        return stats.wins
    };
    stats.wins / stats.losses
}

fun double_number(num: &u64): u64 {
    *num * 2  // Dereference primitive
}`,
              highlights: [
                { line: 6, description: 'Parameter is immutable reference - can only read' },
                { line: 7, description: 'Access fields directly (automatic dereferencing)' },
                { line: 14, description: 'For primitives, use * to dereference' },
              ],
            },
          ],
        },
        {
          title: 'Multiple Immutable Borrows',
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
          codeBlocks: [
            {
              title: 'Multiple Immutable References in Action',
              code: `struct GameState has drop {
    level: u8,
    score: u64,
    lives: u8
}

fun display_stats(state: &GameState) {
    let current_level = &state.level;
    let current_score = &state.score;
    let current_lives = &state.lives;

    // All three references valid simultaneously
    // All reading, none writing - perfectly safe!
}`,
              highlights: [
                { line: 8, description: 'First immutable reference' },
                { line: 9, description: 'Second immutable reference' },
                { line: 10, description: 'Third immutable reference' },
                { line: 12, description: 'All can coexist - multiple readers allowed!' },
              ],
            },
          ],
        },
      ],
      exerciseId: 'mc-new-016',
    },
    {
      title: 'Mutable References & Rules',
      slides: [
        {
          title: 'Mutable References (&mut)',
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
          codeBlocks: [
            {
              title: 'Modifying Through Mutable References',
              code: `struct Counter has drop {
    count: u64
}

fun increment(counter: &mut Counter) {
    counter.count = counter.count + 1;
}

fun test() {
    let mut c = Counter { count: 0 };

    increment(&mut c);  // count: 1
    increment(&mut c);  // count: 2
    increment(&mut c);  // count: 3

    // c.count is now 3
}`,
              highlights: [
                { line: 5, description: 'Mutable reference parameter - can modify' },
                { line: 6, description: 'Modify field directly' },
                { line: 10, description: 'Variable must be mutable' },
                { line: 12, description: 'Pass mutable reference with &mut' },
              ],
            },
          ],
        },
        {
          title: 'The Borrow Checker Rules',
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
          codeBlocks: [
            {
              title: 'Valid and Invalid Borrow Patterns',
              code: `fun test() {
    let mut value = 100;

    // ✅ VALID: Multiple immutable borrows
    let ref1 = &value;
    let ref2 = &value;
    let ref3 = &value;
    // All readers, no writers - safe!

    // ✅ VALID: Single mutable borrow (after above borrows end)
    let mut_ref = &mut value;
    *mut_ref = 200;
    // Only one writer - safe!

    // ❌ INVALID: Can't have & and &mut together
    // let read = &value;
    // let write = &mut value;  // ERROR! Can't mix!
}`,
              highlights: [
                { line: 5, description: 'Multiple immutable borrows - allowed' },
                { line: 11, description: 'Single mutable borrow - allowed (previous borrows ended)' },
                { line: 16, description: 'Mixing & and &mut - NOT allowed!' },
              ],
            },
          ],
        },
        {
          title: 'Dereferencing with *',
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
          codeBlocks: [
            {
              title: 'Dereferencing Patterns',
              code: `struct Point has copy, drop {
    x: u64,
    y: u64
}

fun double_number(num: &mut u64) {
    *num = *num * 2;  // * needed for primitives
}

fun update_point(p: &mut Point) {
    p.x = p.x + 10;  // No * for field access
    p.y = p.y + 20;  // Automatic dereferencing
}

fun distance_to_origin(p: &Point): u64 {
    p.x + p.y  // No * for field access
}`,
              highlights: [
                { line: 7, description: 'Primitives: use * to read and write' },
                { line: 11, description: 'Structs: field access automatic (no * needed)' },
                { line: 16, description: 'Reading struct fields - no * needed' },
              ],
            },
          ],
        },
        {
          title: 'Common Compiler Errors',
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
          codeBlocks: [
            {
              title: 'Fixing Borrow Errors',
              code: `fun test_errors() {
    let mut value = 100;

    // ❌ ERROR: Multiple mutable borrows
    // let m1 = &mut value;
    // let m2 = &mut value;  // Can't have two!

    // ✅ FIX: Use sequentially
    {
        let m1 = &mut value;
        *m1 = 200;
    } // m1 goes out of scope
    {
        let m2 = &mut value;  // Now OK
        *m2 = 300;
    }

    // ❌ ERROR: Mixing & and &mut
    // let r = &value;
    // let m = &mut value;  // Can't mix!

    // ✅ FIX: Use them in different scopes
    let read_val = {
        let r = &value;
        *r
    }; // r goes out of scope
    let m = &mut value;  // Now OK
}`,
              highlights: [
                { line: 9, description: 'Create scope to limit borrow lifetime' },
                { line: 12, description: 'First borrow ends - can create second' },
                { line: 23, description: 'Read finishes, borrow ends' },
                { line: 26, description: 'Now safe to create mutable borrow' },
              ],
            },
          ],
        },
      ],
      exerciseId: 'cc-new-017',
    },
    {
      title: 'Patterns & Best Practices',
      slides: [
        {
          title: 'When to Use References vs Ownership',
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
          codeBlocks: [
            {
              title: 'Choosing the Right Pattern',
              code: `// Reading: Use &
fun get_balance(account: &Account): u64 {
    account.balance
}

// Modifying: Use &mut
fun deposit(account: &mut Account, amount: u64) {
    account.balance = account.balance + amount;
}

// Consuming: Use owned value
fun close_account(account: Account): u64 {
    let final_balance = account.balance;
    // account is dropped here
    final_balance
}`,
              highlights: [
                { line: 2, description: 'Reading only - immutable reference' },
                { line: 7, description: 'Modifying - mutable reference' },
                { line: 12, description: 'Transferring ownership - owned value' },
              ],
            },
          ],
        },
        {
          title: 'Reference Patterns in Move',
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
          codeBlocks: [
            {
              title: 'Practical Reference Patterns',
              code: `struct Player has drop {
    health: u64,
    score: u64
}

// Pattern: Read and compute
fun is_alive(player: &Player): bool {
    player.health > 0
}

// Pattern: Modify in place
fun heal(player: &mut Player, amount: u64) {
    player.health = player.health + amount;
}

// Pattern: Transform by taking ownership
fun revive(player: Player): Player {
    Player {
        health: 100,
        score: player.score  // Keep score
    }
    // Original player dropped, new one returned
}`,
              highlights: [
                { line: 7, description: 'Read pattern: borrow & return bool' },
                { line: 12, description: 'Modify pattern: borrow &mut, no return' },
                { line: 17, description: 'Transform pattern: take ownership, return new' },
              ],
            },
          ],
        },
        {
          title: 'Connecting the Dots',
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
          codeBlocks: [
            {
              title: 'Why The Borrow Checker Saves You',
              code: `// ❌ WITHOUT borrow checker (other languages)
// let mut balance = 100;
// let reader = &balance;
// let writer = &mut balance;  // Reading and writing simultaneously!
// *writer = 200;  // What does reader see? 100 or 200? BUG!

// ✅ WITH borrow checker (Move)
fun safe_update() {
    let mut balance = 100;

    // Read phase
    let snapshot = {
        let reader = &balance;
        *reader  // Read while no writers exist
    }; // reader borrow ends

    // Write phase
    let writer = &mut balance;
    *writer = 200;  // Write while no readers exist

    // No confusion! Clear separation!
}`,
              highlights: [
                { line: 12, description: 'Reading phase - only immutable borrows' },
                { line: 15, description: 'Borrow ends - safe to create mutable borrow' },
                { line: 18, description: 'Writing phase - only mutable borrow exists' },
                { line: 21, description: 'Clean, safe, no data races!' },
              ],
            },
          ],
        },
      ],
      exerciseId: 'op-new-018',
    },
  ],
  quiz: {
    id: 'quiz-6',
    title: 'References & Borrowing Quiz',
    description: 'Test your understanding of ownership and references',
    questions: [
      {
        id: 'q6-1',
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
        id: 'q6-2',
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
        id: 'q6-3',
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
        id: 'q6-4',
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
        id: 'q6-5',
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
  },
  practice: {
    id: 'practice-6',
    title: 'Bank Account Manager',
    description: 'Build a complete bank account system demonstrating all reference patterns',
    instructions: `Create a bank account management module that demonstrates ownership and borrowing:

**Requirements:**

1. Define an \`Account\` struct with:
   - \`balance: u64\` - Current account balance
   - \`owner: address\` - Account owner's address

2. Implement \`create_account(owner: address): Account\`:
   - Creates and returns a new Account
   - Initial balance is 0
   - Returns owned value (caller owns the account)

3. Implement \`get_balance(account: &Account): u64\`:
   - Returns the current balance
   - Uses immutable reference (just reading)

4. Implement \`deposit(account: &mut Account, amount: u64)\`:
   - Adds amount to the balance
   - Uses mutable reference (modifying in place)

5. Implement \`withdraw(account: &mut Account, amount: u64): bool\`:
   - Subtracts amount from balance if sufficient funds
   - Returns true if successful, false if insufficient funds
   - Uses mutable reference

6. Implement \`is_owner(account: &Account, user: address): bool\`:
   - Checks if user is the account owner
   - Uses immutable reference (just reading)

**This exercise demonstrates:**
- Returning owned values (create_account)
- Reading with immutable references (get_balance, is_owner)
- Modifying with mutable references (deposit, withdraw)
- Multiple reads are allowed (can call get_balance multiple times)
- Practical use of the borrow checker`,
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
    testCases: [
      {
        input: 'create_account(@0x1)',
        expected: 'Account { balance: 0, owner: @0x1 }',
      },
      {
        input: 'get_balance(&account)',
        expected: '0',
      },
      {
        input: 'deposit(&mut account, 100); get_balance(&account)',
        expected: '100',
      },
      {
        input: 'withdraw(&mut account, 50); get_balance(&account)',
        expected: 'true, 50',
      },
      {
        input: 'withdraw(&mut account, 1000)',
        expected: 'false (insufficient funds)',
      },
      {
        input: 'is_owner(&account, @0x1)',
        expected: 'true',
      },
      {
        input: 'is_owner(&account, @0x2)',
        expected: 'false',
      },
    ],
  },
};

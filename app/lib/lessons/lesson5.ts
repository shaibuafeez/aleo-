import { Lesson } from '@/app/types/lesson';

export const lesson5: Lesson = {
  id: 5,
  title: 'Vectors & Collections',
  description: 'Master dynamic collections and search patterns in Move',
  estimatedTime: '35 min',
  sections: [
    {
      id: 'intro',
      title: 'Introduction',
      content: `# Vectors & Collections

Welcome to Lesson 5! After mastering structs and abilities, you're ready to learn about **vectors** - Move's dynamic collection type.

## What You'll Learn

- Creating and managing dynamic vectors
- Adding and removing elements safely
- Borrowing vs copying vector elements
- Search patterns for primitives vs structs
- Error handling with vectors

## Why Vectors Matter

Vectors let you store multiple values of the same type in a single variable. They're essential for:
- Managing lists of items (inventory, leaderboards)
- Storing multiple structs (players, tokens)
- Building real-world blockchain applications

Let's dive into Move's powerful vector system!`,
    },
  ],
  teachingSections: [
    {
      title: 'Vector Basics',
      slides: [
        {
          title: 'What Are Vectors?',
          content: `# What Are Vectors?

Vectors are **dynamic arrays** that can grow and shrink at runtime. Unlike fixed-size arrays, vectors can hold any number of elements.

## Key Characteristics

\`\`\`move
vector<u64>      // Vector of integers
vector<address>  // Vector of addresses
vector<Item>     // Vector of structs
\`\`\`

**Important**: All elements in a vector must be the same type.

## Vector Module

Move provides the \`std::vector\` module with functions for vector operations:

\`\`\`move
use std::vector;
\`\`\`

Let's learn how to create and use vectors!`,
        },
        {
          title: 'Creating Vectors',
          content: `# Creating Vectors

Use \`vector::empty<T>()\` to create a new empty vector:

\`\`\`move
use std::vector;

fun create_numbers(): vector<u64> {
    let mut numbers = vector::empty<u64>();
    numbers
}

fun create_addresses(): vector<address> {
    let mut addr_list = vector::empty<address>();
    addr_list
}
\`\`\`

**Syntax Breakdown:**
- \`vector::empty<T>()\` - Create empty vector of type T
- \`mut\` - Required since we'll modify the vector
- Type parameter \`<T>\` specifies what the vector holds`,
          codeBlocks: [
            {
              title: 'Creating Different Vector Types',
              code: `use std::vector;

fun create_score_list(): vector<u64> {
    let mut scores = vector::empty<u64>();
    scores
}

fun create_player_list(): vector<Player> {
    let mut players = vector::empty<Player>();
    players
}`,
              highlights: [
                { line: 3, description: 'Empty vector created' },
                { line: 4, description: 'Variable is mutable - we can add elements later' },
                { line: 5, description: 'Last expression returns the vector' },
              ],
            },
          ],
        },
        {
          title: 'Adding Elements',
          content: `# Adding Elements with push_back

Use \`vector::push_back\` to add elements to the end of a vector:

\`\`\`move
use std::vector;

fun build_scores(): vector<u64> {
    let mut scores = vector::empty<u64>();
    vector::push_back(&mut scores, 100);
    vector::push_back(&mut scores, 85);
    vector::push_back(&mut scores, 92);
    scores
}
// Returns: [100, 85, 92]
\`\`\`

**Important**:
- Pass \`&mut\` reference (we're modifying the vector)
- Elements are added to the **end**
- Vector grows automatically`,
          codeBlocks: [
            {
              title: 'Building a Vector Step by Step',
              code: `use std::vector;

fun create_leaderboard(): vector<u64> {
    let mut scores = vector::empty<u64>();

    vector::push_back(&mut scores, 1000);  // [1000]
    vector::push_back(&mut scores, 950);   // [1000, 950]
    vector::push_back(&mut scores, 875);   // [1000, 950, 875]

    scores
}`,
              highlights: [
                { line: 6, description: 'Add first element: [1000]' },
                { line: 7, description: 'Add second element: [1000, 950]' },
                { line: 8, description: 'Add third element: [1000, 950, 875]' },
              ],
            },
          ],
        },
        {
          title: 'Removing Elements',
          content: `# Removing Elements with pop_back

Use \`vector::pop_back\` to remove and return the last element:

\`\`\`move
use std::vector;

fun remove_last(): u64 {
    let mut scores = vector::empty<u64>();
    vector::push_back(&mut scores, 100);
    vector::push_back(&mut scores, 85);

    let last = vector::pop_back(&mut scores);
    // scores is now [100], last is 85
    last
}
\`\`\`

**Important**:
- Returns the removed element
- Vector shrinks by one
- **Aborts if vector is empty!**`,
          codeBlocks: [
            {
              title: 'Push and Pop Operations',
              code: `use std::vector;

fun demo_push_pop(): u64 {
    let mut nums = vector::empty<u64>();

    vector::push_back(&mut nums, 10);  // [10]
    vector::push_back(&mut nums, 20);  // [10, 20]
    vector::push_back(&mut nums, 30);  // [10, 20, 30]

    let removed = vector::pop_back(&mut nums);  // nums: [10, 20], removed: 30

    removed
}`,
              highlights: [
                { line: 6, description: 'Vector grows: [10]' },
                { line: 7, description: 'Vector grows: [10, 20]' },
                { line: 8, description: 'Vector grows: [10, 20, 30]' },
                { line: 10, description: 'Remove last element, returns 30, vector becomes [10, 20]' },
              ],
            },
          ],
        },
      ],
      exerciseId: 'cc-new-013',
    },
    {
      title: 'Accessing & Modifying',
      slides: [
        {
          title: 'Vector Length',
          content: `# Getting Vector Length

Use \`vector::length\` to get the number of elements:

\`\`\`move
use std::vector;

fun count_items(): u64 {
    let mut scores = vector::empty<u64>();
    vector::push_back(&mut scores, 100);
    vector::push_back(&mut scores, 85);
    vector::push_back(&mut scores, 92);

    let count = vector::length(&scores);
    count  // Returns 3
}
\`\`\`

**Note**: Pass \`&\` reference (read-only access).

This is essential for loops and bounds checking!`,
          codeBlocks: [
            {
              title: 'Using Length in Logic',
              code: `use std::vector;

fun is_leaderboard_full(max_size: u64): bool {
    let mut leaderboard = vector::empty<u64>();
    vector::push_back(&mut leaderboard, 1000);
    vector::push_back(&mut leaderboard, 950);

    let current_size = vector::length(&leaderboard);
    current_size >= max_size
}`,
              highlights: [
                { line: 8, description: 'Get current number of elements' },
                { line: 9, description: 'Check if full (2 >= max_size)' },
              ],
            },
          ],
        },
        {
          title: 'Borrowing Elements',
          content: `# Borrowing with vector::borrow

Use \`vector::borrow\` to get a **read-only reference** to an element:

\`\`\`move
use std::vector;

fun get_first_score(): u64 {
    let mut scores = vector::empty<u64>();
    vector::push_back(&mut scores, 100);
    vector::push_back(&mut scores, 85);

    let first = vector::borrow(&scores, 0);
    *first  // Dereference to get the value
}
\`\`\`

**Important**:
- Index starts at \`0\`
- Returns \`&T\` (reference to element)
- Use \`*\` to dereference and get the value
- **Aborts if index is out of bounds!**`,
          codeBlocks: [
            {
              title: 'Borrowing Elements at Different Indices',
              code: `use std::vector;

fun access_elements(): u64 {
    let mut nums = vector::empty<u64>();
    vector::push_back(&mut nums, 10);
    vector::push_back(&mut nums, 20);
    vector::push_back(&mut nums, 30);

    let first = vector::borrow(&nums, 0);   // &10
    let second = vector::borrow(&nums, 1);  // &20
    let third = vector::borrow(&nums, 2);   // &30

    *first + *second + *third  // 10 + 20 + 30 = 60
}`,
              highlights: [
                { line: 9, description: 'Borrow first element (index 0): reference to 10' },
                { line: 10, description: 'Borrow second element (index 1): reference to 20' },
                { line: 11, description: 'Borrow third element (index 2): reference to 30' },
                { line: 13, description: 'Dereference and sum: 10 + 20 + 30 = 60' },
              ],
            },
          ],
        },
        {
          title: 'Borrow vs Copy - Critical Concept',
          content: `# Understanding Borrow vs Copy

This is a **critical concept** that connects back to Lesson 4 (Abilities):

## For Primitives (have copy ability)
\`\`\`move
let mut nums = vector::empty<u64>();
vector::push_back(&mut nums, 100);

let value = *vector::borrow(&nums, 0);  // ✅ Can copy the value
// 'value' is now 100, original still in vector
\`\`\`

## For Structs (without copy ability)
\`\`\`move
struct Item has store {
    id: u64,
    quantity: u8
}

let mut items = vector::empty<Item>();
vector::push_back(&mut items, Item { id: 1, quantity: 5 });

let item_ref = vector::borrow(&items, 0);  // ✅ Get reference
// item_ref.id is valid access
// But you CANNOT copy the entire Item out of the vector!
\`\`\`

**Key Insight**: \`vector::borrow()\` gives you a **temporary, read-only reference** to an element **still in the vector**. If the struct doesn't have \`copy\`, you can't duplicate it - only reference it!`,
          codeBlocks: [
            {
              title: 'Accessing Struct Fields via Borrow',
              code: `struct Item has store {
    id: u64,
    quantity: u8
}

fun check_item_quantity(): u8 {
    let mut items = vector::empty<Item>();
    vector::push_back(&mut items, Item { id: 1, quantity: 5 });

    let item_ref = vector::borrow(&items, 0);
    // item_ref is &Item - a reference to the Item still in the vector

    item_ref.quantity  // Access field through reference: 5
}`,
              highlights: [
                { line: 1, description: 'Item has store (can be in vectors) but NOT copy' },
                { line: 10, description: 'Borrow returns &Item - reference to item in vector' },
                { line: 13, description: 'Access fields through reference (no * needed for field access)' },
              ],
            },
          ],
        },
        {
          title: 'Modifying Elements',
          content: `# Modifying with vector::borrow_mut

Use \`vector::borrow_mut\` to get a **mutable reference** and modify elements:

\`\`\`move
use std::vector;

fun double_first_score() {
    let mut scores = vector::empty<u64>();
    vector::push_back(&mut scores, 100);

    let first = vector::borrow_mut(&mut scores, 0);
    *first = *first * 2;  // Modify the value in place
    // scores is now [200]
}
\`\`\`

**Important**:
- Pass \`&mut\` to vector
- Returns \`&mut T\` (mutable reference)
- Modify the dereferenced value
- Changes the actual element in the vector`,
          codeBlocks: [
            {
              title: 'Updating Vector Elements',
              code: `use std::vector;

fun update_scores() {
    let mut scores = vector::empty<u64>();
    vector::push_back(&mut scores, 100);
    vector::push_back(&mut scores, 85);

    let first_mut = vector::borrow_mut(&mut scores, 0);
    *first_mut = 110;  // scores is now [110, 85]

    let second_mut = vector::borrow_mut(&mut scores, 1);
    *second_mut = 90;  // scores is now [110, 90]
}`,
              highlights: [
                { line: 8, description: 'Get mutable reference to first element' },
                { line: 9, description: 'Modify value in place: 100 → 110' },
                { line: 11, description: 'Get mutable reference to second element' },
                { line: 12, description: 'Modify value in place: 85 → 90' },
              ],
            },
          ],
        },
        {
          title: 'Vector Safety',
          content: `# Vector Safety & Error Handling

Vectors are **safe by default** - they protect against out-of-bounds access:

\`\`\`move
use std::vector;

fun unsafe_access() {
    let mut nums = vector::empty<u64>();
    vector::push_back(&mut nums, 10);

    let item = vector::borrow(&nums, 5);  // ❌ ABORTS!
    // Vector has 1 element (index 0), accessing index 5 aborts
}
\`\`\`

## Why This Matters

Move prevents memory corruption by aborting on invalid access. This connects to our error handling from Lesson 3!

**Best Practice**: Always check length before accessing:
\`\`\`move
let len = vector::length(&nums);
if (index < len) {
    let item = vector::borrow(&nums, index);
    // Safe access
}
\`\`\``,
          codeBlocks: [
            {
              title: 'Safe Vector Access Pattern',
              code: `use std::vector;

const E_INDEX_OUT_OF_BOUNDS: u64 = 1;

fun safe_get(index: u64): u64 {
    let mut nums = vector::empty<u64>();
    vector::push_back(&mut nums, 10);
    vector::push_back(&mut nums, 20);

    let len = vector::length(&nums);
    assert!(index < len, E_INDEX_OUT_OF_BOUNDS);

    let value = vector::borrow(&nums, index);
    *value
}`,
              highlights: [
                { line: 10, description: 'Get vector length first' },
                { line: 11, description: 'Check bounds before accessing (precondition)' },
                { line: 13, description: 'Safe to access now - index is valid' },
              ],
            },
          ],
        },
      ],
      exerciseId: 'mc-new-014',
    },
    {
      title: 'Advanced Operations',
      slides: [
        {
          title: 'Searching Primitives',
          content: `# Searching for Primitive Values

Move provides built-in search functions for primitive types:

## vector::contains
\`\`\`move
use std::vector;

fun has_score(): bool {
    let mut scores = vector::empty<u64>();
    vector::push_back(&mut scores, 100);
    vector::push_back(&mut scores, 85);

    vector::contains(&scores, &85)  // true
}
\`\`\`

## vector::index_of
\`\`\`move
fun find_position(): (bool, u64) {
    let mut scores = vector::empty<u64>();
    vector::push_back(&mut scores, 100);
    vector::push_back(&mut scores, 85);

    vector::index_of(&scores, &85)  // (true, 1)
}
\`\`\`

Returns \`(bool, u64)\` - found status and index.`,
          codeBlocks: [
            {
              title: 'Using Built-in Search Functions',
              code: `use std::vector;

fun search_primitive(): u64 {
    let mut nums = vector::empty<u64>();
    vector::push_back(&mut nums, 10);
    vector::push_back(&mut nums, 20);
    vector::push_back(&mut nums, 30);

    // Check if value exists
    let exists = vector::contains(&nums, &20);  // true

    // Get index of value
    let (found, index) = vector::index_of(&nums, &20);  // (true, 1)

    index
}`,
              highlights: [
                { line: 10, description: 'contains returns bool: true if 20 is in vector' },
                { line: 13, description: 'index_of returns (bool, u64): (true, 1) since 20 is at index 1' },
              ],
            },
          ],
        },
        {
          title: 'Searching Structs - The Loop Pattern',
          content: `# Searching for Structs (Critical Pattern!)

**Important**: \`vector::contains\` and \`vector::index_of\` only work for primitives. For structs, you must use a **while loop** pattern:

\`\`\`move
struct Item has store {
    id: u64,
    quantity: u8
}

fun find_item(items: &vector<Item>, target_id: u64): u64 {
    let len = vector::length(items);
    let mut i = 0;

    while (i < len) {
        let item = vector::borrow(items, i);
        if (item.id == target_id) {
            return i
        };
        i = i + 1;
    };

    // Not found - abort!
    abort E_ITEM_NOT_FOUND
}
\`\`\`

**This is a fundamental pattern** you'll use constantly in Move development!`,
          codeBlocks: [
            {
              title: 'Struct Search Pattern with Borrow',
              code: `struct Item has store {
    id: u64,
    quantity: u8
}

const E_ITEM_NOT_FOUND: u64 = 1;

fun find_item_index(items: &vector<Item>, target_id: u64): u64 {
    let len = vector::length(items);
    let mut i = 0;

    while (i < len) {
        let item = vector::borrow(items, i);
        if (item.id == target_id) {
            return i
        };
        i = i + 1;
    };

    abort E_ITEM_NOT_FOUND
}`,
              highlights: [
                { line: 9, description: 'Get total number of items to search' },
                { line: 12, description: 'Loop through each index' },
                { line: 13, description: 'Borrow reference to Item at index i (not copying!)' },
                { line: 14, description: 'Check if this is the item we want' },
                { line: 15, description: 'Found it! Return the index' },
                { line: 20, description: 'Loop finished without finding item - abort with error' },
              ],
            },
          ],
        },
        {
          title: 'Why Borrow Matters in Search',
          content: `# Why We Use Borrow in Search Loops

Remember from our "Borrow vs Copy" slide: structs often **don't have the copy ability**. This is why the search pattern uses \`vector::borrow()\`:

\`\`\`move
struct Item has store {  // No copy ability!
    id: u64,
    quantity: u8
}

fun search(items: &vector<Item>, id: u64): u8 {
    let mut i = 0;
    while (i < vector::length(items)) {
        // Borrow gives us a reference (&Item) to inspect
        let item_ref = vector::borrow(items, i);

        if (item_ref.id == id) {
            return item_ref.quantity  // Access field through reference
        };
        i = i + 1;
    };
    abort E_NOT_FOUND
}
\`\`\`

**Key Points**:
- We can't **copy** the Item out (no copy ability)
- We **can** borrow a reference to inspect it
- Reference stays valid during the loop iteration
- This pattern is memory-efficient!`,
          codeBlocks: [
            {
              title: 'Reading Struct Fields via Borrow',
              code: `struct Player has store {
    id: u64,
    score: u64,
    level: u8
}

const E_PLAYER_NOT_FOUND: u64 = 1;

fun get_player_score(players: &vector<Player>, player_id: u64): u64 {
    let len = vector::length(players);
    let mut i = 0;

    while (i < len) {
        let player_ref = vector::borrow(players, i);

        if (player_ref.id == player_id) {
            return player_ref.score  // Read field through reference
        };
        i = i + 1;
    };

    abort E_PLAYER_NOT_FOUND
}`,
              highlights: [
                { line: 1, description: 'Player has store but NOT copy - can\'t duplicate' },
                { line: 14, description: 'Borrow reference to Player at index i' },
                { line: 16, description: 'Check id field through reference' },
                { line: 17, description: 'Return score field through reference' },
              ],
            },
          ],
        },
        {
          title: 'Modifying Structs in Vectors',
          content: `# Updating Struct Fields with borrow_mut

To modify a struct in a vector, use \`vector::borrow_mut\`:

\`\`\`move
struct Item has store {
    id: u64,
    quantity: u8
}

fun update_quantity(items: &mut vector<Item>, id: u64, new_qty: u8) {
    let len = vector::length(items);
    let mut i = 0;

    while (i < len) {
        let item = vector::borrow_mut(items, i);
        if (item.id == id) {
            item.quantity = new_qty;  // Modify field directly!
            return
        };
        i = i + 1;
    };

    abort E_ITEM_NOT_FOUND
}
\`\`\`

**Pattern**: Search with loop + borrow_mut + modify fields + return when found + abort if not found.`,
          codeBlocks: [
            {
              title: 'Search and Update Pattern',
              code: `struct Item has store {
    id: u64,
    quantity: u8
}

const E_ITEM_NOT_FOUND: u64 = 1;

fun increase_quantity(items: &mut vector<Item>, id: u64, amount: u8) {
    let len = vector::length(items);
    let mut i = 0;

    while (i < len) {
        let item_mut = vector::borrow_mut(items, i);

        if (item_mut.id == id) {
            item_mut.quantity = item_mut.quantity + amount;
            return
        };
        i = i + 1;
    };

    abort E_ITEM_NOT_FOUND
}`,
              highlights: [
                { line: 13, description: 'Borrow mutable reference to Item at index i' },
                { line: 15, description: 'Found the item we want!' },
                { line: 16, description: 'Modify quantity field in place (item still in vector)' },
                { line: 17, description: 'Return early - no need to keep searching' },
                { line: 22, description: 'If we finish loop without returning, item wasn\'t found - abort' },
              ],
            },
          ],
        },
      ],
      exerciseId: 'op-new-015',
    },
  ],
  quiz: {
    id: 'quiz-5',
    title: 'Vectors Quiz',
    description: 'Test your understanding of vectors and collections',
    questions: [
      {
        id: 'q5-1',
        question: 'What happens when you call `vector::pop_back()` on an empty vector?',
        options: [
          'Returns 0',
          'Returns an empty value',
          'The transaction aborts',
          'Nothing happens',
        ],
        correctAnswer: 2,
        explanation:
          '`vector::pop_back()` aborts if called on an empty vector. This is Move\'s safety mechanism to prevent invalid operations.',
      },
      {
        id: 'q5-2',
        question: 'Why do we use `vector::borrow()` instead of copying elements when searching for structs?',
        options: [
          'It\'s faster',
          'Structs often don\'t have the copy ability',
          'It uses less gas',
          'It\'s required by the compiler',
        ],
        correctAnswer: 1,
        explanation:
          'Structs often don\'t have the `copy` ability, so we can\'t duplicate them. `vector::borrow()` gives us a reference to inspect the struct while it stays in the vector.',
      },
      {
        id: 'q5-3',
        question: 'What does `vector::index_of(&vec, &value)` return?',
        options: [
          'The index as u64',
          'A boolean',
          'A tuple (bool, u64) with found status and index',
          'An option type',
        ],
        correctAnswer: 2,
        explanation:
          '`vector::index_of()` returns `(bool, u64)` - the first value indicates if the element was found, and the second is the index (or 0 if not found).',
      },
      {
        id: 'q5-4',
        question: 'When modifying a vector element at index 3, what do you need?',
        options: [
          'vector::borrow(&vec, 3)',
          'vector::borrow_mut(&mut vec, 3)',
          'vector::get_mut(vec, 3)',
          'vector::update(&vec, 3)',
        ],
        correctAnswer: 1,
        explanation:
          '`vector::borrow_mut(&mut vec, index)` returns a mutable reference that lets you modify the element in place.',
      },
      {
        id: 'q5-5',
        question: 'Why can\'t we use `vector::contains()` to search for structs?',
        options: [
          'It\'s too slow for structs',
          'It only works with primitive types that have copy and drop abilities',
          'Structs are too large',
          'It\'s a compiler limitation',
        ],
        correctAnswer: 1,
        explanation:
          '`vector::contains()` only works with primitive types. For structs, you must implement your own search using a while loop and `vector::borrow()`.',
      },
    ],
  },
  practice: {
    id: 'practice-5',
    title: 'Inventory System',
    description: 'Build a complete inventory management system using vectors',
    instructions: `Create an inventory management module that demonstrates all vector operations:

**Requirements:**

1. Define an \`Item\` struct with:
   - \`id: u64\` - Unique item identifier
   - \`quantity: u8\` - How many of this item

2. Implement \`create_inventory()\`:
   - Returns an empty vector of Items

3. Implement \`add_item(inventory, id, quantity)\`:
   - Adds a new Item to the inventory
   - Takes mutable reference to vector

4. Implement \`get_item_quantity(inventory, id)\`:
   - Searches for item using while loop pattern
   - Uses \`vector::borrow()\` to inspect items
   - Returns the quantity if found
   - **Aborts with E_ITEM_NOT_FOUND if not found**

5. Implement \`update_quantity(inventory, id, new_quantity)\`:
   - Searches for item using while loop pattern
   - Uses \`vector::borrow_mut()\` to modify the item
   - Updates the quantity field
   - Aborts with E_ITEM_NOT_FOUND if not found

6. Implement \`remove_last_item(inventory)\`:
   - Removes and returns the last item using \`vector::pop_back()\`

7. Implement \`get_total_items(inventory)\`:
   - Returns the number of items in inventory using \`vector::length()\`

**This exercise combines:**
- Struct search patterns
- Borrow vs borrow_mut
- Error handling with abort
- All vector operations`,
    starterCode: `module lesson5::inventory {
    use std::vector;

    // Define error codes
    const E_ITEM_NOT_FOUND: u64 = 1;

    // Define the Item struct
    // TODO: Add struct with id: u64, quantity: u8, and store ability

    // Create an empty inventory
    public fun create_inventory(): vector<Item> {
        // TODO: Return empty vector of Items
    }

    // Add a new item to inventory
    public fun add_item(inventory: &mut vector<Item>, id: u64, quantity: u8) {
        // TODO: Create Item and push to inventory
    }

    // Get quantity of an item (search with while loop)
    public fun get_item_quantity(inventory: &vector<Item>, id: u64): u8 {
        // TODO: Loop through inventory
        // TODO: Use vector::borrow() to inspect each item
        // TODO: If item.id matches, return item.quantity
        // TODO: If loop completes, abort with E_ITEM_NOT_FOUND
    }

    // Update item quantity (search with while loop)
    public fun update_quantity(inventory: &mut vector<Item>, id: u64, new_quantity: u8) {
        // TODO: Loop through inventory
        // TODO: Use vector::borrow_mut() to get mutable reference
        // TODO: If item.id matches, update quantity and return
        // TODO: If loop completes, abort with E_ITEM_NOT_FOUND
    }

    // Remove and return the last item
    public fun remove_last_item(inventory: &mut vector<Item>): Item {
        // TODO: Use vector::pop_back()
    }

    // Get total number of items
    public fun get_total_items(inventory: &vector<Item>): u64 {
        // TODO: Use vector::length()
    }
}`,
    solution: `module lesson5::inventory {
    use std::vector;

    const E_ITEM_NOT_FOUND: u64 = 1;

    public struct Item has store {
        id: u64,
        quantity: u8
    }

    public fun create_inventory(): vector<Item> {
        vector::empty<Item>()
    }

    public fun add_item(inventory: &mut vector<Item>, id: u64, quantity: u8) {
        let item = Item { id, quantity };
        vector::push_back(inventory, item);
    }

    public fun get_item_quantity(inventory: &vector<Item>, id: u64): u8 {
        let len = vector::length(inventory);
        let mut i = 0;

        while (i < len) {
            let item = vector::borrow(inventory, i);
            if (item.id == id) {
                return item.quantity
            };
            i = i + 1;
        };

        abort E_ITEM_NOT_FOUND
    }

    public fun update_quantity(inventory: &mut vector<Item>, id: u64, new_quantity: u8) {
        let len = vector::length(inventory);
        let mut i = 0;

        while (i < len) {
            let item = vector::borrow_mut(inventory, i);
            if (item.id == id) {
                item.quantity = new_quantity;
                return
            };
            i = i + 1;
        };

        abort E_ITEM_NOT_FOUND
    }

    public fun remove_last_item(inventory: &mut vector<Item>): Item {
        vector::pop_back(inventory)
    }

    public fun get_total_items(inventory: &vector<Item>): u64 {
        vector::length(inventory)
    }
}`,
    testCases: [
      {
        input: 'create_inventory()',
        expected: 'Empty vector created successfully',
      },
      {
        input: 'add_item(&mut inv, 1, 5); add_item(&mut inv, 2, 10)',
        expected: 'Items added: [(1, 5), (2, 10)]',
      },
      {
        input: 'get_item_quantity(&inv, 1)',
        expected: '5',
      },
      {
        input: 'update_quantity(&mut inv, 1, 20); get_item_quantity(&inv, 1)',
        expected: '20',
      },
      {
        input: 'get_total_items(&inv)',
        expected: '2',
      },
      {
        input: 'remove_last_item(&mut inv); get_total_items(&inv)',
        expected: '1',
      },
      {
        input: 'get_item_quantity(&inv, 999)',
        expected: 'Aborts with E_ITEM_NOT_FOUND',
      },
    ],
  },
};

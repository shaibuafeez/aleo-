import { LessonContent } from '@/app/types/lesson';

export const lesson5: LessonContent = {
  id: '5',
  title: 'Vectors & Collections',
  description: 'Master dynamic collections and search patterns in Move',
  difficulty: 'intermediate',
  xpReward: 200,
  order: 5,
  prerequisiteLessons: ['4'],

  narrative: {
    welcomeMessage: "Welcome to Vectors! 📦 After mastering structs and abilities, you're ready to learn about Move's dynamic collection type!",
    quizTransition: "Great work with vectors! Let's test your understanding of borrowing and search patterns...",
    practiceTransition: "Perfect! Now let's build a complete inventory management system!",
    celebrationMessage: "🎉 Excellent! You've mastered vectors and collections in Move!",
    nextLessonTease: "Next up: Deep dive into ownership and references! 🔗",
  },
  teachingSections: [
    {
      sectionTitle: 'Vector Basics',
      slides: [
        {
          title: 'What Are Vectors?',
          emoji: '📦',
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
          emoji: '✨',
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
        },
        {
          title: 'Adding Elements',
          emoji: '➕',
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
        },
        {
          title: 'Removing Elements',
          emoji: '➖',
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
        },
      ],
      exerciseId: 'cc-new-013',
    },
    {
      sectionTitle: 'Accessing & Modifying',
      slides: [
        {
          title: 'Vector Length',
          emoji: '📏',
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
        },
        {
          title: 'Borrowing Elements',
          emoji: '🔍',
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
        },
        {
          title: 'Borrow vs Copy - Critical Concept',
          emoji: '⚠️',
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
        },
        {
          title: 'Modifying Elements',
          emoji: '✏️',
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
        },
        {
          title: 'Vector Safety',
          emoji: '🛡️',
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
        },
      ],
      exerciseId: 'mc-new-014',
    },
    {
      sectionTitle: 'Advanced Operations',
      slides: [
        {
          title: 'Searching Primitives',
          emoji: '🔎',
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
        },
        {
          title: 'Searching Structs - The Loop Pattern',
          emoji: '🔁',
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
        },
        {
          title: 'Why Borrow Matters in Search',
          emoji: '💡',
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
        },
        {
          title: 'Modifying Structs in Vectors',
          emoji: '🔧',
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
        },
      ],
      exerciseId: 'op-new-015',
    },
  ],
  quiz: [
    {
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
  quizPassThreshold: 0.8,

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

  hints: [
    "Remember to use vector::empty<T>() to create an empty vector",
    "Use vector::push_back(&mut vec, item) to add elements",
    "For searching structs, use a while loop with vector::borrow()",
    "Use vector::borrow_mut() when you need to modify elements in place",
  ],
};

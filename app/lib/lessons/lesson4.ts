import { LessonContent } from '@/app/types/lesson';

export const lesson4: LessonContent = {
  id: 'lesson-4',
  title: 'Structs & Custom Types',
  description: 'Create your own data types with structs and understand abilities - the foundation of digital assets',
  difficulty: 'beginner',
  xpReward: 200,
  order: 4,
  prerequisiteLessons: ['lesson-1', 'lesson-2', 'lesson-3'],

  // Narrative storytelling
  narrative: {
    welcomeMessage: "Ready to build your own types? Structs let you group data together and create digital assets! 📦",
    quizTransition: "Great! You understand structs and abilities. Let's verify your knowledge...",
    practiceTransition: "Perfect! Now build a complete player profile system with all the skills you learned!",
    celebrationMessage: "🎉 Fantastic! You can now create custom types - the building blocks of smart contracts!",
    nextLessonTease: "Next up: References and ownership - understanding how Move prevents bugs! 🔒",
  },

  // Phase 1: Interactive Teaching with interleaved exercises
  teachingSections: [
    // Section 1: Struct Basics
    {
      sectionTitle: "Struct Basics",
      slides: [
        {
          title: "What Are Structs?",
          content: "Structs are custom data types that group related values together. Like a container holding different pieces of information. Think of it like creating your own type!",
          emoji: "📦",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Built-in types
let age: u8 = 25;
let score: u64 = 1000;
let active: bool = true;

// Your custom type - groups all related data!
struct Player {
    id: u64,
    level: u8,
    score: u64,
    is_active: bool
}`,
              highlights: [
                {
                  line: 2,
                  explanation: "Built-in primitive types - we've been using these"
                },
                {
                  line: 6,
                  explanation: "Struct keyword creates a NEW custom type"
                },
                {
                  line: 7,
                  explanation: "Struct groups multiple fields of different types"
                },
                {
                  line: 11,
                  explanation: "Each field has a name and type - just like variables!"
                }
              ]
            }
          }
        },
        {
          title: "Defining Your First Struct",
          content: "Syntax: public struct Name has abilities { field: type, ... }. The 'public' keyword makes it accessible from other modules. Abilities (we'll learn these next!) control what you can do with the struct.",
          emoji: "✏️",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `module lesson4::player {
    public struct Player has key, store {
        id: u64,
        level: u8,
        score: u64,
        is_active: bool
    }
}`,
              highlights: [
                {
                  line: 2,
                  explanation: "'public' makes this struct usable from other modules"
                },
                {
                  line: 2,
                  explanation: "'struct Player' - name your struct (PascalCase convention)"
                },
                {
                  line: 2,
                  explanation: "'has key, store' - abilities (permissions for this type)"
                },
                {
                  line: 3,
                  explanation: "Fields: name: type, one per line"
                },
                {
                  line: 4,
                  explanation: "id is u64 - unique identifier for this player"
                },
                {
                  line: 7,
                  explanation: "Closing brace - don't forget it!"
                }
              ]
            }
          }
        },
        {
          title: "Creating Struct Instances",
          content: "After defining a struct, create instances (actual values) using struct_name { field: value, ... }. All fields must be provided!",
          emoji: "🏗️",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `fun create_new_player(id: u64): Player {
    Player {
        id: id,      // or just: id (shorthand)
        level: 1,    // Start at level 1
        score: 0,    // Start with 0 score
        is_active: true
    }
}

// Usage:
let player = create_new_player(101);`,
              highlights: [
                {
                  line: 2,
                  explanation: "Player { ... } creates a new instance"
                },
                {
                  line: 3,
                  explanation: "id: id assigns parameter to field (can use shorthand 'id')"
                },
                {
                  line: 4,
                  explanation: "Must provide ALL fields (compiler enforces this!)"
                },
                {
                  line: 10,
                  explanation: "Call function to get a Player instance"
                }
              ]
            }
          }
        },
        {
          title: "Accessing Fields",
          content: "Use dot notation (struct.field) to read or modify fields. You need a mutable reference (&mut) to modify fields.",
          emoji: "🎯",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Reading fields (immutable reference)
fun get_level(player: &Player): u8 {
    player.level  // Dot notation to access
}

// Modifying fields (mutable reference)
fun level_up(player: &mut Player) {
    player.level = player.level + 1;
}

// Usage:
let mut p = create_new_player(1);
level_up(&mut p);  // p.level is now 2`,
              highlights: [
                {
                  line: 2,
                  explanation: "&Player - immutable reference, can read but not modify"
                },
                {
                  line: 3,
                  explanation: "player.level - dot notation accesses the field"
                },
                {
                  line: 7,
                  explanation: "&mut Player - mutable reference, can modify fields"
                },
                {
                  line: 8,
                  explanation: "player.level = ... assigns new value to field"
                },
                {
                  line: 12,
                  explanation: "'mut' needed on variable to pass mutable reference"
                }
              ]
            }
          }
        },
      ],
      exerciseId: 'cc-new-010', // Struct definition and instantiation
    },

    // Section 2: Abilities - Move's Superpowers
    {
      sectionTitle: "Abilities - Move's Superpowers",
      slides: [
        {
          title: "What Are Abilities?",
          content: "Abilities are permissions that control what operations are allowed on a type. They're Move's way of enforcing safety rules. Think of them as superpowers you grant to your struct!",
          emoji: "🦸",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Different ability combinations for different purposes
struct Config has copy, drop {
    max_level: u8
}

struct Coin has key, store {
    value: u64
}

struct NFT has key {
    id: u64
}`,
              highlights: [
                {
                  line: 2,
                  explanation: "Config has copy, drop - simple data, can be copied and discarded"
                },
                {
                  line: 6,
                  explanation: "Coin has key, store - digital asset, NO copy/drop!"
                },
                {
                  line: 10,
                  explanation: "NFT has only key - unique asset, can't even be stored in other structs"
                }
              ]
            }
          }
        },
        {
          title: "The 'key' Ability",
          content: "The 'key' ability allows a struct to be stored as a top-level object. In Sui, this is what turns a struct into a Sui Object - something that can be owned by an address and transferred!",
          emoji: "🔑",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Without 'key' - just data, can't be owned
struct PlayerStats {
    wins: u64,
    losses: u64
}

// With 'key' - becomes a Sui Object that can be owned!
struct Player has key {
    id: UID,  // Special type for Sui Objects
    stats: PlayerStats
}`,
              highlights: [
                {
                  line: 2,
                  explanation: "NO key ability - this is just a data structure"
                },
                {
                  line: 7,
                  explanation: "'has key' - this becomes a Sui Object"
                },
                {
                  line: 7,
                  explanation: "Sui Objects can be owned, transferred, and stored globally"
                },
                {
                  line: 8,
                  explanation: "UID field required for all Sui Objects (unique identifier)"
                }
              ]
            }
          }
        },
        {
          title: "The 'store' Ability",
          content: "The 'store' ability allows a struct to be stored inside OTHER structs. Assets need 'store' to be held in wallets or other containers.",
          emoji: "📥",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Has 'store' - can be stored in other structs
struct Coin has key, store {
    value: u64
}

// Can contain 'store' structs
struct Wallet has key {
    coins: Coin  // OK! Coin has 'store'
}

// ERROR - can't store struct without 'store' ability
// struct NFT has key { ... }  // NO store!
// struct Inventory has key {
//     nft: NFT  // ERROR!
// }`,
              highlights: [
                {
                  line: 2,
                  explanation: "'store' ability allows Coin to be stored in other structs"
                },
                {
                  line: 8,
                  explanation: "Wallet can contain Coin because Coin has 'store'"
                },
                {
                  line: 12,
                  explanation: "Without 'store', struct can't be nested in other structs"
                }
              ]
            }
          }
        },
        {
          title: "The 'copy' Ability",
          content: "The 'copy' ability allows a struct to be copied (duplicated). NEVER use this for digital assets like money or NFTs - you'd be able to duplicate value!",
          emoji: "📋",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Safe to copy - just configuration data
struct GameConfig has copy, drop {
    max_players: u8,
    difficulty: u8
}

let config1 = GameConfig { max_players: 10, difficulty: 5 };
let config2 = config1;  // OK! Creates a copy

// NEVER do this with assets!
// struct Coin has copy {  // DANGER!
//     value: u64
// }
// let coin1 = Coin { value: 100 };
// let coin2 = coin1;  // Just duplicated money!`,
              highlights: [
                {
                  line: 2,
                  explanation: "'copy' ability - safe for plain data like config"
                },
                {
                  line: 8,
                  explanation: "Assignment creates a new independent copy"
                },
                {
                  line: 11,
                  explanation: "NEVER give assets 'copy' - would allow duplication!"
                },
                {
                  line: 15,
                  explanation: "This would let you create money out of thin air - huge bug!"
                }
              ]
            }
          }
        },
        {
          title: "The 'drop' Ability",
          content: "The 'drop' ability allows a struct to be discarded/destroyed without explicit handling. Assets should NOT have 'drop' - you'd be able to accidentally destroy value!",
          emoji: "🗑️",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Safe to drop - just temporary data
struct TempData has drop {
    cache: u64
}

fun process() {
    let temp = TempData { cache: 100 };
    // temp is automatically dropped when it goes out of scope
}

// NEVER do this with assets!
// struct Coin has drop {
//     value: u64
// }
// fun lose_money() {
//     let coin = Coin { value: 1000 };
//     // Oops! Just destroyed $1000 by accident
// }`,
              highlights: [
                {
                  line: 2,
                  explanation: "'drop' ability - safe for temporary data"
                },
                {
                  line: 7,
                  explanation: "Variable automatically cleaned up - no memory leak"
                },
                {
                  line: 11,
                  explanation: "NEVER give assets 'drop' - would allow accidental destruction!"
                },
                {
                  line: 16,
                  explanation: "Without explicit handling, valuable assets could vanish!"
                }
              ]
            }
          }
        },
        {
          title: "Choosing Abilities Wisely",
          content: "Rule of thumb: Regular data gets copy+drop. Digital assets get key+store (NO copy/drop). Choose abilities based on what the struct represents!",
          emoji: "🎯",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Simple data - can copy and drop freely
struct Point has copy, drop {
    x: u64,
    y: u64
}

// Digital asset - unique and valuable
struct GameItem has key, store {
    id: u64,
    rarity: u8,
    power: u64
}

// Ultra-rare asset - can't even store elsewhere
struct LegendaryNFT has key {
    id: u64,
    metadata: u64
}`,
              highlights: [
                {
                  line: 2,
                  explanation: "Plain data: copy+drop - easy to work with, no value"
                },
                {
                  line: 8,
                  explanation: "Regular asset: key+store - can own and trade, but not duplicate"
                },
                {
                  line: 14,
                  explanation: "Unique asset: only key - maximum protection, can't be nested"
                }
              ]
            }
          }
        },
      ],
      exerciseId: 'mc-new-011', // Choosing abilities multiple choice
    },

    // Section 3: Working with Structs
    {
      sectionTitle: "Working with Structs",
      slides: [
        {
          title: "Destructuring Structs",
          content: "Destructuring unpacks all fields from a struct at once. Useful when you need multiple fields or want to consume the struct.",
          emoji: "📦➡️",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `struct Player has drop {
    id: u64,
    level: u8,
    score: u64
}

fun get_info(player: Player): (u64, u8) {
    let Player { id, level, score } = player;
    // Now we have id, level, score as separate variables
    (id, level)  // Return tuple
}

// Ignore fields you don't need with ..
fun just_id(player: Player): u64 {
    let Player { id, .. } = player;
    id
}`,
              highlights: [
                {
                  line: 8,
                  explanation: "Destructuring syntax: let StructName { field1, field2, ... } = value"
                },
                {
                  line: 9,
                  explanation: "All fields are now separate variables"
                },
                {
                  line: 15,
                  explanation: ".. (dot dot) ignores remaining fields"
                }
              ]
            }
          }
        },
        {
          title: "Updating Struct Fields",
          content: "To modify struct fields, you need a mutable reference (&mut). This ensures ownership rules are followed and prevents accidental modifications.",
          emoji: "✏️",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Mutable reference - can modify fields
fun add_score(player: &mut Player, points: u64) {
    player.score = player.score + points;
}

// Immutable reference - can only read
fun get_score(player: &Player): u64 {
    player.score  // Can read, but can't modify
}

// Usage:
let mut p = create_player(1);
add_score(&mut p, 100);  // Mutable reference
let current = get_score(&p);  // Immutable reference`,
              highlights: [
                {
                  line: 2,
                  explanation: "&mut Player - mutable reference allows modification"
                },
                {
                  line: 3,
                  explanation: "Can assign to fields with mutable reference"
                },
                {
                  line: 7,
                  explanation: "&Player - immutable reference, read-only"
                },
                {
                  line: 12,
                  explanation: "&mut p - pass mutable reference to modify"
                },
                {
                  line: 13,
                  explanation: "&p - pass immutable reference to read"
                }
              ]
            }
          }
        },
        {
          title: "Constructor Pattern",
          content: "Common pattern: create a constructor function that returns initialized struct instances. This encapsulates creation logic and ensures valid initial state.",
          emoji: "🏗️",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Constructor function - standard pattern
public fun new_player(id: u64): Player {
    Player {
        id: id,
        level: 1,      // Always start at level 1
        score: 0,      // Always start at 0
        is_active: true
    }
}

// Prevents invalid states
// Can't create Player with level=0 or negative score!
let player = new_player(42);`,
              highlights: [
                {
                  line: 2,
                  explanation: "Constructor function - creates valid instances"
                },
                {
                  line: 5,
                  explanation: "Enforces business logic (level always starts at 1)"
                },
                {
                  line: 6,
                  explanation: "Guarantees valid initial state"
                },
                {
                  line: 13,
                  explanation: "Users call constructor, can't create invalid states"
                }
              ]
            }
          }
        },
      ],
      exerciseId: 'op-new-012', // Struct field access output prediction
    },
  ],

  // Phase 2: Quiz (diagnostic questions)
  quiz: [
    {
      question: "What keyword is used to define a custom data type in Move?",
      options: [
        "struct",
        "type",
        "class",
        "object",
      ],
      correctAnswer: 0,
      explanation: "The 'struct' keyword is used to define custom data types in Move.",
      weaknessTopic: 'structs',
    },
    {
      question: "Which abilities should a Coin (money) struct have?",
      options: [
        "key, store",
        "key, store, copy, drop",
        "copy, drop",
        "Only copy",
      ],
      correctAnswer: 0,
      explanation: "Digital assets like money should have 'key' and 'store' for ownership and transferability, but NEVER 'copy' or 'drop' (would allow duplication or accidental destruction).",
      weaknessTopic: 'structs',
      practiceHint: "Assets: key+store. Never copy/drop for money!",
    },
    {
      question: "What does the 'key' ability do in Sui?",
      options: [
        "Turns the struct into a Sui Object that can be owned and transferred",
        "Allows the struct to be copied",
        "Allows the struct to be dropped",
        "Makes the struct private",
      ],
      correctAnswer: 0,
      explanation: "The 'key' ability turns a struct into a Sui Object - something that can be owned by an address and transferred on the blockchain.",
      weaknessTopic: 'structs',
    },
    {
      question: "How do you access a field named 'level' from a struct variable 'player'?",
      options: [
        "player.level",
        "player->level",
        "player[level]",
        "player::level",
      ],
      correctAnswer: 0,
      explanation: "Use dot notation (struct.field) to access struct fields in Move.",
      weaknessTopic: 'structs',
    },
    {
      question: "What type of reference do you need to modify struct fields?",
      options: [
        "Mutable reference (&mut)",
        "Immutable reference (&)",
        "Owned value",
        "Any reference works",
      ],
      correctAnswer: 0,
      explanation: "You need a mutable reference (&mut) to modify struct fields. Immutable references (&) only allow reading.",
      weaknessTopic: 'structs',
    },
  ],

  quizPassThreshold: 0.8, // Need 4 out of 5 correct

  // Phase 3: Practice (IDE coding)
  hints: [
    'Define struct with: public struct Name has abilities { field: type, ... }',
    'Player should have abilities: key, store (it\'s an asset!)',
    'Create instances with: StructName { field: value, ... }',
    'Access fields with dot notation: player.level',
    'Modify fields with mutable reference: player.field = new_value',
    'Constructor pattern: fun new_name(...): StructName { ... }',
    'Return tuple with: (value1, value2)',
  ],

  starterCode: `module lesson4::player_profile {
    // TODO: Define a public struct called 'Player' with abilities: key, store
    // Fields:
    //   - id: u64
    //   - level: u8
    //   - score: u64
    //   - is_active: bool


    // TODO: Write a constructor function called 'create_player' that:
    // - Takes one u64 parameter (id)
    // - Returns a Player with:
    //   * id: the parameter value
    //   * level: 1 (starting level)
    //   * score: 0 (starting score)
    //   * is_active: true


    // TODO: Write a function called 'level_up' that:
    // - Takes a mutable reference to Player
    // - Increments the player's level by 1
    // - Hint: player.level = player.level + 1


    // TODO: Write a function called 'add_score' that:
    // - Takes a mutable reference to Player and a u64 (points)
    // - Adds the points to the player's score


    // TODO: Write a function called 'get_player_info' that:
    // - Takes an immutable reference to Player
    // - Returns a tuple: (level: u8, score: u64)
    // - Hint: (player.level, player.score)


    // TODO: Write a function called 'deactivate' that:
    // - Takes a mutable reference to Player
    // - Sets is_active to false


}`,

  solution: `module lesson4::player_profile {
    /// Player profile struct representing a game player
    /// Has 'key' and 'store' abilities - can be owned and stored
    public struct Player has key, store {
        id: u64,
        level: u8,
        score: u64,
        is_active: bool
    }

    /// Constructor: creates a new player with initial values
    /// Players always start at level 1 with 0 score
    public fun create_player(id: u64): Player {
        Player {
            id: id,
            level: 1,
            score: 0,
            is_active: true
        }
    }

    /// Increases the player's level by 1
    public fun level_up(player: &mut Player) {
        player.level = player.level + 1;
    }

    /// Adds points to the player's score
    public fun add_score(player: &mut Player, points: u64) {
        player.score = player.score + points;
    }

    /// Returns the player's current level and score as a tuple
    public fun get_player_info(player: &Player): (u8, u64) {
        (player.level, player.score)
    }

    /// Deactivates the player (sets is_active to false)
    public fun deactivate(player: &mut Player) {
        player.is_active = false;
    }
}`,
};

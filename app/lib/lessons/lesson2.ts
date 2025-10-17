import { LessonContent } from '@/app/types/lesson';

export const lesson2: LessonContent = {
  id: 'lesson-2',
  title: 'Mastering Move Types',
  description: 'Deep dive into primitive types, addresses, type casting, and overflow safety',
  difficulty: 'beginner',
  xpReward: 150,
  order: 2,
  prerequisiteLessons: ['lesson-1'],

  // Narrative storytelling
  narrative: {
    welcomeMessage: "Great progress! Now let's master Move's type system - the foundation of safe smart contracts! 🔢",
    quizTransition: "Excellent! You understand types deeply. Let's test your knowledge...",
    practiceTransition: "Perfect! Now build a type converter module to practice everything you learned!",
    celebrationMessage: "🎉 Amazing! You've mastered Move's type system - the key to writing safe code!",
    nextLessonTease: "Next up: Control flow with if/else and loops! 🔀",
  },

  // Phase 1: Interactive Teaching with interleaved exercises
  teachingSections: [
    // Section 1: Integer Types Deep Dive
    {
      sectionTitle: "Integer Types Deep Dive",
      slides: [
        {
          title: "The Full Integer Family",
          content: "Move has 5 unsigned integer types: u8, u16, u32, u64, u128. Each type can hold larger numbers but uses more memory. Choose the smallest type that fits your needs!",
          emoji: "🔢",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let tiny: u8 = 255;          // 0 to 255
let small: u16 = 65_535;     // 0 to 65,535
let medium: u32 = 4_294_967_295;  // 0 to ~4.3 billion
let large: u64 = 18_446_744_073_709_551_615;  // Huge!
let massive: u128 = 340_282_366_920_938_463_463_374_607_431_768_211_455;  // Astronomical!`,
              highlights: [
                {
                  line: 1,
                  explanation: "u8: 8 bits, max 255 - perfect for small counters, levels"
                },
                {
                  line: 2,
                  explanation: "u16: 16 bits, max 65,535 - good for larger counts"
                },
                {
                  line: 3,
                  explanation: "u32: 32 bits, max ~4.3 billion - suitable for big numbers"
                },
                {
                  line: 4,
                  explanation: "u64: 64 bits - most common, balances range and efficiency"
                },
                {
                  line: 5,
                  explanation: "u128: 128 bits - for extremely large values like token amounts"
                }
              ]
            }
          }
        },
        {
          title: "Choosing the Right Type",
          content: "Use the smallest type that safely fits your values. Smaller types save blockchain storage (which costs money!). But be careful - if a value might grow, choose a larger type.",
          emoji: "⚖️",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Good choices
let age: u8 = 25;           // Age never exceeds 255
let score: u64 = 1000;      // Scores can grow large
let balance: u128 = 1_000_000;  // Token balances need huge range

// Bad choices
let age: u128 = 25;         // Wastes storage!
let huge_score: u8 = 300;   // Won't fit! Causes error`,
              highlights: [
                {
                  line: 2,
                  explanation: "u8 is perfect for age - saves space, never overflows"
                },
                {
                  line: 3,
                  explanation: "u64 is versatile for most numeric needs"
                },
                {
                  line: 4,
                  explanation: "u128 for financial amounts that can grow very large"
                },
                {
                  line: 7,
                  explanation: "Don't waste storage with oversized types!"
                },
                {
                  line: 8,
                  explanation: "300 doesn't fit in u8 (max 255) - this will abort!"
                }
              ]
            }
          }
        },
        {
          title: "Overflow: The Silent Killer",
          content: "What happens when you exceed a type's maximum? In some languages, values \"wrap around\" silently (256 becomes 0). Move ABORTS instead - this prevents critical bugs in smart contracts!",
          emoji: "🚨",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let x: u8 = 255;
// x = x + 1;  // ABORT! Overflow detected
// let y: u8 = 256;  // ABORT! Can't store 256 in u8

// Safe approach
let x_safe: u16 = 255;
let result = x_safe + 1;  // OK! u16 can hold 256`,
              highlights: [
                {
                  line: 1,
                  explanation: "u8 max is 255"
                },
                {
                  line: 2,
                  explanation: "Adding 1 would make 256 - Move aborts to prevent silent bugs"
                },
                {
                  line: 3,
                  explanation: "Direct assignment also checked - Move protects you!"
                },
                {
                  line: 6,
                  explanation: "Use a larger type when values might grow"
                },
                {
                  line: 7,
                  explanation: "Now 256 fits safely in u16"
                }
              ]
            }
          }
        },
        {
          title: "Underflow Protection",
          content: "Underflow is when you subtract below zero. Since Move only has unsigned integers (no negatives), this also causes an abort. This prevents balance bugs in token contracts!",
          emoji: "⬇️",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let balance: u64 = 100;
// balance = balance - 200;  // ABORT! Would be negative

// Real-world: Always check before subtracting
fun withdraw(balance: u64, amount: u64): u64 {
    assert!(balance >= amount, 1);  // Ensure sufficient funds
    balance - amount  // Safe!
}`,
              highlights: [
                {
                  line: 1,
                  explanation: "Starting balance: 100"
                },
                {
                  line: 2,
                  explanation: "100 - 200 = -100, but u64 can't be negative! Aborts."
                },
                {
                  line: 5,
                  explanation: "In real contracts, check before subtracting"
                },
                {
                  line: 6,
                  explanation: "assert! ensures balance >= amount, or aborts with error code 1"
                },
                {
                  line: 7,
                  explanation: "Now subtraction is safe - we know it won't underflow"
                }
              ]
            }
          }
        },
      ],
      exerciseId: 'mc-new-004', // Integer overflow multiple choice
    },

    // Section 2: Addresses in Move
    {
      sectionTitle: "Addresses in Move",
      slides: [
        {
          title: "What is an Address?",
          content: "An address uniquely identifies an account on the blockchain. Think of it like a bank account number. In Move, addresses identify users, modules, and stored objects.",
          emoji: "📍",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Address literals start with 0x
let user: address = 0x1;
let contract: address = 0xCAFE;
let my_account: address = 0x123abc456def789;`,
              highlights: [
                {
                  line: 2,
                  explanation: "0x1 is a valid address (often used for system addresses)"
                },
                {
                  line: 3,
                  explanation: "Addresses are hexadecimal (0-9, a-f)"
                },
                {
                  line: 4,
                  explanation: "Real addresses are usually longer hex strings"
                }
              ]
            }
          }
        },
        {
          title: "Address Format",
          content: "Addresses must start with 0x followed by hexadecimal digits. They can be short (0x1) or long (0x123...). Leading zeros can be omitted: 0x1 and 0x01 are the same.",
          emoji: "✏️",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// All valid addresses
let addr1: address = 0x1;
let addr2: address = 0x01;      // Same as 0x1
let addr3: address = 0x0001;    // Also same as 0x1
let addr4: address = 0xDEADBEEF;
let addr5: address = 0x1234abcd5678ef90;`,
              highlights: [
                {
                  line: 2,
                  explanation: "Short form - most concise"
                },
                {
                  line: 3,
                  explanation: "Leading zeros optional"
                },
                {
                  line: 4,
                  explanation: "0x1, 0x01, 0x0001 all represent the same address"
                },
                {
                  line: 5,
                  explanation: "Hex can use both uppercase and lowercase (case insensitive)"
                }
              ]
            }
          }
        },
        {
          title: "Named Addresses",
          content: "Instead of hard-coding hex values, you can use named addresses (defined in Move.toml). This makes code more readable and portable across different networks.",
          emoji: "🏷️",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// In Move.toml:
// [addresses]
// std = "0x1"
// my_package = "0xCAFE"

module my_package::example {
    use std::vector;  // Uses named address 'std'

    fun get_admin(): address {
        @my_package  // References named address
    }
}`,
              highlights: [
                {
                  line: 7,
                  explanation: "'std' is a named address defined in Move.toml"
                },
                {
                  line: 10,
                  explanation: "@my_package returns the address value (0xCAFE)"
                },
                {
                  line: 11,
                  explanation: "Named addresses make code portable - change once in config"
                }
              ]
            }
          }
        },
        {
          title: "Working with Addresses",
          content: "You can compare addresses, store them in structs, and use them to check permissions. Common pattern: check if caller is authorized.",
          emoji: "🔐",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Check if sender is admin
fun is_admin(sender: address): bool {
    let admin = @my_package;
    sender == admin
}

// Compare two addresses
fun is_sender(user: address, expected: address): bool {
    user == expected
}`,
              highlights: [
                {
                  line: 2,
                  explanation: "Function takes an address parameter"
                },
                {
                  line: 3,
                  explanation: "Get the admin address using named address"
                },
                {
                  line: 4,
                  explanation: "Use == to compare addresses (returns true/false)"
                },
                {
                  line: 8,
                  explanation: "Common pattern: verify the sender matches expected address"
                }
              ]
            }
          }
        },
      ],
      exerciseId: 'cc-new-005', // Working with addresses code completion
    },

    // Section 3: Type Casting & Operations
    {
      sectionTitle: "Type Casting & Operations",
      slides: [
        {
          title: "What is Type Casting?",
          content: "Type casting converts a value from one type to another. Use the 'as' keyword. Move only allows safe casts - you can't accidentally lose data.",
          emoji: "🔄",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let small: u8 = 100;
let big = small as u64;  // u8 → u64 (safe, value preserved)

// You can cast to larger types
let x: u8 = 50;
let y: u16 = x as u16;
let z: u128 = x as u128;`,
              highlights: [
                {
                  line: 1,
                  explanation: "Start with a u8 value"
                },
                {
                  line: 2,
                  explanation: "'as' keyword casts from u8 to u64 - value 100 preserved"
                },
                {
                  line: 5,
                  explanation: "Casting to larger types is always safe"
                },
                {
                  line: 6,
                  explanation: "u8 → u16: no data loss possible"
                },
                {
                  line: 7,
                  explanation: "u8 → u128: safe, value fits comfortably"
                }
              ]
            }
          }
        },
        {
          title: "Casting from Larger to Smaller",
          content: "Casting to a smaller type is allowed but dangerous! If the value doesn't fit, Move aborts. Always ensure the value fits before casting down.",
          emoji: "⚠️",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let big: u64 = 100;
let small = big as u8;  // OK! 100 fits in u8

let too_big: u64 = 300;
// let fail = too_big as u8;  // ABORT! 300 > 255

// Safe approach: check before casting
if (too_big <= 255) {
    let safe = too_big as u8;  // Now it's safe!
}`,
              highlights: [
                {
                  line: 2,
                  explanation: "100 fits in u8 (max 255), cast succeeds"
                },
                {
                  line: 5,
                  explanation: "300 doesn't fit in u8 - Move aborts to prevent data loss"
                },
                {
                  line: 8,
                  explanation: "Check the value fits before casting down"
                },
                {
                  line: 9,
                  explanation: "Now cast is guaranteed safe"
                }
              ]
            }
          }
        },
        {
          title: "Why Casting Matters",
          content: "Different types can't be mixed in operations. You need to cast to the same type first. Common pattern: cast smaller type to larger, do math, result is larger type.",
          emoji: "➕",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let a: u8 = 100;
let b: u64 = 1000;
// let wrong = a + b;  // ERROR! Can't add u8 + u64

// Cast to same type first
let result = (a as u64) + b;  // Both u64 now, returns u64

// Prevents overflow in calculations
let x: u8 = 200;
let y: u8 = 100;
let sum = (x as u16) + (y as u16);  // 300 fits in u16, not u8!`,
              highlights: [
                {
                  line: 3,
                  explanation: "Can't mix types! Move requires matching types for operations"
                },
                {
                  line: 6,
                  explanation: "Cast a to u64, now both are u64, addition works"
                },
                {
                  line: 9,
                  explanation: "200 + 100 = 300, doesn't fit in u8"
                },
                {
                  line: 11,
                  explanation: "Cast both to u16 first, now 300 fits!"
                }
              ]
            }
          }
        },
        {
          title: "Type Annotations",
          content: "Sometimes you don't need 'as' - you can let Move infer the type or use type annotations. Explicit casting is clearer though!",
          emoji: "📝",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Explicit casting (clearest)
let x: u8 = 10;
let y: u64 = x as u64;

// Type annotation (Move infers the cast)
let z: u64 = 10;  // 10 is small enough for u64

// When calling functions
fun add(a: u64, b: u64): u64 { a + b }
let small: u8 = 5;
let result = add(small as u64, 10);  // Must cast to match parameter type`,
              highlights: [
                {
                  line: 3,
                  explanation: "Explicit 'as' makes the cast obvious"
                },
                {
                  line: 6,
                  explanation: "Type annotation tells Move what type we want"
                },
                {
                  line: 11,
                  explanation: "Function expects u64, must cast u8 to u64"
                }
              ]
            }
          }
        },
      ],
      exerciseId: 'op-new-006', // Type casting output prediction
    },
  ],

  // Phase 2: Quiz (diagnostic questions)
  quiz: [
    {
      question: "What happens when you try to add 1 to a u8 variable containing 255?",
      options: [
        "The program aborts with an overflow error",
        "The value wraps around to 0",
        "It automatically converts to u16",
        "The value stays at 255",
      ],
      correctAnswer: 0,
      explanation: "Move prevents overflow by aborting the program. This protects against silent bugs that could cause security issues in smart contracts.",
      weaknessTopic: 'types',
      practiceHint: "Remember: Move aborts on overflow rather than wrapping or converting.",
    },
    {
      question: "Which type would be most appropriate for storing a user's age?",
      options: [
        "u8",
        "u64",
        "u128",
        "address",
      ],
      correctAnswer: 0,
      explanation: "u8 is perfect for age (0-255 range). It saves blockchain storage costs while safely holding any realistic age value.",
      weaknessTopic: 'types',
      practiceHint: "Choose the smallest type that safely fits your values to save storage!",
    },
    {
      question: "How do you check if two addresses are equal?",
      options: [
        "address1 == address2",
        "address1.equals(address2)",
        "compare(address1, address2)",
        "address1 === address2",
      ],
      correctAnswer: 0,
      explanation: "Use the == operator to compare addresses in Move. It returns true if they're the same, false otherwise.",
      weaknessTopic: 'types',
    },
    {
      question: "What is the correct way to cast a u8 value to u64?",
      options: [
        "value as u64",
        "u64(value)",
        "value.to_u64()",
        "cast(value, u64)",
      ],
      correctAnswer: 0,
      explanation: "The 'as' keyword is used for type casting in Move. Syntax: value as target_type",
      weaknessTopic: 'types',
      practiceHint: "Remember: use 'as' for type casting!",
    },
    {
      question: "Which statement about casting from u64 to u8 is TRUE?",
      options: [
        "It's allowed but aborts if the value doesn't fit",
        "It's never allowed",
        "It always succeeds by truncating extra bits",
        "It automatically uses u16 if u8 is too small",
      ],
      correctAnswer: 0,
      explanation: "You can cast from larger to smaller types, but Move will abort if the value doesn't fit in the target type. This prevents data loss bugs.",
      weaknessTopic: 'types',
    },
  ],

  quizPassThreshold: 0.8, // Need 4 out of 5 correct

  // Phase 3: Practice (IDE coding)
  hints: [
    'Cast from smaller to larger types safely: value as u64',
    'For safe_add_u8: cast both u8 values to u16, add them, result is u16',
    'For is_sender: use == to compare two addresses',
    'Casting up (u8 → u64) is always safe',
    'Casting down (u64 → u8) requires checking the value fits',
  ],

  starterCode: `module lesson2::type_converter {
    // TODO: Write a function called 'convert_u8_to_u64' that:
    // - Takes one u8 parameter (value)
    // - Casts it to u64
    // - Returns the u64 result


    // TODO: Write a function called 'safe_add_u8' that:
    // - Takes two u8 parameters (a and b)
    // - Casts both to u16 to prevent overflow
    // - Returns their sum as u16
    // - Hint: (a as u16) + (b as u16)


    // TODO: Write a function called 'is_sender' that:
    // - Takes two address parameters (user and expected)
    // - Returns true if they are equal, false otherwise
    // - Hint: Use the == operator


    // TODO: Write a function called 'safe_downcast' that:
    // - Takes one u64 parameter (value)
    // - Returns value cast to u8 IF it's <= 255
    // - Otherwise returns 0
    // - Hint: Use an if expression


}`,

  solution: `module lesson2::type_converter {
    /// Converts a u8 value to u64
    fun convert_u8_to_u64(value: u8): u64 {
        value as u64
    }

    /// Safely adds two u8 values by using u16 to prevent overflow
    /// Example: 200 + 100 = 300, which fits in u16 but not u8
    fun safe_add_u8(a: u8, b: u8): u16 {
        (a as u16) + (b as u16)
    }

    /// Checks if the user address matches the expected address
    /// Common pattern for authorization checks in smart contracts
    fun is_sender(user: address, expected: address): bool {
        user == expected
    }

    /// Safely downcasts u64 to u8, returning 0 if value is too large
    /// This prevents abort by checking the value first
    fun safe_downcast(value: u64): u8 {
        if (value <= 255) {
            value as u8
        } else {
            0
        }
    }
}`,
};

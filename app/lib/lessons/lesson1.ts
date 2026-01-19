import { LessonContent } from '@/app/types/lesson';

export const lesson1: LessonContent = {
  id: 'lesson-1',
  title: 'Hello Move!',
  description: 'Learn the fundamental syntax of Move - modules, variables, types, and functions',
  difficulty: 'beginner',
  xpReward: 100,
  order: 1,
  prerequisiteLessons: [],

  // Narrative storytelling
  narrative: {
    welcomeMessage: "Welcome to Move! 🚀 Let's start with the basics - just like learning any programming language!",
    quizTransition: "Great job learning the basics! Let's test your understanding...",
    practiceTransition: "Perfect! Now let's put it all together and build a calculator module!",
    celebrationMessage: "🎉 Excellent! You've mastered the fundamentals of Move syntax!",
    nextLessonTease: "Next up: Create custom types with structs! 📦",
  },

  // Phase 1: Interactive Teaching with interleaved exercises
  teachingSections: [
    // Section 1: Introduction to Move & Modules
    {
      sectionTitle: "Welcome to Move",
      slides: [
        {
          title: "What is Move?",
          content: "Move is a programming language for blockchains. It's designed for digital assets and safety. Used by Sui blockchain. We'll start with basic syntax, just like learning any programming language!",
          emoji: "🚗",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `module sui::coin {
    struct Coin has key {
        id: UID,
        balance: u64
    }

    public fun transfer(coin: Coin, recipient: address) {
        // Move makes digital assets safe by design
        transfer::public_transfer(coin, recipient);
    }
}`,
              highlights: [
                {
                  line: 1,
                  explanation: "Move organizes code into modules - like packages"
                },
                {
                  line: 2,
                  explanation: "Structs define digital assets (like coins, NFTs)"
                },
                {
                  line: 7,
                  explanation: "Functions define what you can do with assets"
                }
              ]
            }
          }
        },
        {
          title: "Your First Module",
          content: "Everything in Move lives in a module. A module is like a container for your code. Syntax: module package_name::module_name { ... }",
          emoji: "📦",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `module my_package::calculator {
    // Your code goes here
}`,
              highlights: [
                {
                  line: 1,
                  explanation: "'module' keyword starts the module definition"
                },
                {
                  line: 1,
                  explanation: "'my_package::calculator' is the module path (package::module_name)"
                },
                {
                  line: 1,
                  explanation: "Curly braces {} contain all your code"
                }
              ]
            }
          }
        },
        {
          title: "Comments - Talking to Humans",
          content: "Comments help explain your code to other developers (and future you!). Move supports single-line (//) and multi-line (/* */) comments.",
          emoji: "💬",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// This is a single line comment
/* This is a
   multi-line comment */
/// This documents the code`,
              highlights: [
                {
                  line: 1,
                  explanation: "// for single line comments"
                },
                {
                  line: 2,
                  explanation: "/* */ for multi-line comments"
                },
                {
                  line: 4,
                  explanation: "/// for documentation comments"
                }
              ]
            }
          }
        },
      ],
      exerciseId: 'mc-new-001', // Test understanding of modules
    },

    // Section 2: Primitive Types & Variables
    {
      sectionTitle: "Types and Variables",
      slides: [
        {
          title: "Numbers in Move",
          content: "Move has integer types for different size numbers. u8 for small (0-255), u64 for large numbers, u128 for very large numbers. The 'u' means unsigned (no negative numbers).",
          emoji: "🔢",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let age: u8 = 25;
let balance: u64 = 1000000;
let huge_number: u128 = 999999999999999999;`,
              highlights: [
                {
                  line: 1,
                  explanation: "u8 holds values 0-255 (8 bits)"
                },
                {
                  line: 2,
                  explanation: "u64 holds values 0-18 quintillion (64 bits)"
                },
                {
                  line: 3,
                  explanation: "u128 holds very large numbers (128 bits)"
                }
              ]
            }
          }
        },
        {
          title: "Booleans - True or False",
          content: "Boolean type (bool) represents true or false values. Used for yes/no decisions in your code.",
          emoji: "✓✗",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let is_active: bool = true;
let has_permission: bool = false;`,
              highlights: [
                {
                  line: 1,
                  explanation: "bool can only be true or false"
                },
                {
                  line: 2,
                  explanation: "Perfect for representing on/off, yes/no states"
                }
              ]
            }
          }
        },
        {
          title: "Variables - Storing Values",
          content: "Use 'let' to create variables. You must specify the type. Syntax: let name: type = value;",
          emoji: "📝",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let score: u64 = 100;
let is_complete: bool = false;
let level: u8 = 5;`,
              highlights: [
                {
                  line: 1,
                  explanation: "'let' keyword declares a variable"
                },
                {
                  line: 1,
                  explanation: "Type comes after the colon (:)"
                },
                {
                  line: 1,
                  explanation: "Value is assigned with ="
                }
              ]
            }
          }
        },
        {
          title: "Changing Variables",
          content: "Variables are immutable by default (can't change). Use 'let mut' to make them mutable (changeable).",
          emoji: "🔄",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let x = 10;        // Can't change
let mut y = 20;    // Can change
y = 25;            // OK!
// x = 15;         // ERROR!`,
              highlights: [
                {
                  line: 1,
                  explanation: "Immutable by default - can't be changed"
                },
                {
                  line: 2,
                  explanation: "'mut' makes the variable mutable"
                },
                {
                  line: 3,
                  explanation: "Mutable variables can be reassigned"
                }
              ]
            }
          }
        },
      ],
      exerciseId: 'cc-new-002', // Practice declaring variables
    },

    // Section 3: Operations & Functions
    {
      sectionTitle: "Operations and Functions",
      slides: [
        {
          title: "Math Operations",
          content: "Move supports standard arithmetic: addition (+), subtraction (-), multiplication (*), division (/), and modulo (%).",
          emoji: "➕",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let sum = 10 + 5;       // 15
let product = 10 * 5;   // 50
let remainder = 10 % 3; // 1`,
              highlights: [
                {
                  line: 1,
                  explanation: "+ for addition"
                },
                {
                  line: 2,
                  explanation: "* for multiplication"
                },
                {
                  line: 3,
                  explanation: "% gives the remainder after division"
                }
              ]
            }
          }
        },
        {
          title: "Comparison Operations",
          content: "Compare values with: equal (==), not equal (!=), greater (>), greater/equal (>=), less (<), less/equal (<=). All return true or false.",
          emoji: "⚖️",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let is_equal = (10 == 10);    // true
let is_greater = (10 > 5);     // true
let is_less = (10 < 5);        // false`,
              highlights: [
                {
                  line: 1,
                  explanation: "== checks if values are equal"
                },
                {
                  line: 2,
                  explanation: "> checks if left is greater than right"
                },
                {
                  line: 3,
                  explanation: "Comparisons return bool (true/false)"
                }
              ]
            }
          }
        },
        {
          title: "Your First Function",
          content: "Functions do a specific task. Syntax: fun name(param: type): return_type { ... }. The last expression is returned automatically!",
          emoji: "⚙️",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `fun add(a: u64, b: u64): u64 {
    a + b  // This value is returned
}`,
              highlights: [
                {
                  line: 1,
                  explanation: "'fun' keyword defines a function"
                },
                {
                  line: 1,
                  explanation: "Parameters with their types in ()"
                },
                {
                  line: 1,
                  explanation: "Return type after :"
                },
                {
                  line: 2,
                  explanation: "Last expression is automatically returned (no 'return' needed!)"
                }
              ]
            }
          }
        },
        {
          title: "Calling Functions",
          content: "Call functions with function_name(arguments). Must provide all required parameters.",
          emoji: "📞",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `fun add(a: u64, b: u64): u64 {
    a + b
}

fun calculate() {
    let result = add(10, 20);  // result = 30
}`,
              highlights: [
                {
                  line: 6,
                  explanation: "Call function with actual values"
                },
                {
                  line: 6,
                  explanation: "Arguments must match parameter types"
                }
              ]
            }
          }
        },
      ],
      exerciseId: 'op-new-003', // Practice understanding functions
    },
  ],

  // Phase 2: Quiz (diagnostic questions)
  quiz: [
    {
      question: "What keyword is used to define a module in Move?",
      options: [
        "module",
        "package",
        "function",
        "struct",
      ],
      correctAnswer: 0,
      explanation: "The 'module' keyword is used to define a module in Move. Example: module lesson1::calculator { ... }",
      weaknessTopic: 'modules',
      practiceHint: "Remember: modules start with the 'module' keyword!",
    },
    {
      question: "Which type can store the largest number?",
      options: [
        "u8",
        "u64",
        "u128",
        "bool",
      ],
      correctAnswer: 2,
      explanation: "u128 can store the largest numbers (up to 340 undecillion). u8 is smallest (0-255), u64 is medium, bool is not for numbers.",
      weaknessTopic: 'types',
      practiceHint: "u128 has 128 bits - the most storage capacity!",
    },
    {
      question: "What does 'let mut' do?",
      options: [
        "Makes the variable changeable",
        "Makes the variable constant",
        "Deletes the variable",
        "Multiplies the variable",
      ],
      correctAnswer: 0,
      explanation: "'let mut' creates a mutable variable that can be changed later. Without 'mut', variables are immutable by default.",
      weaknessTopic: 'types',
    },
    {
      question: "What does '10 % 3' equal?",
      options: [
        "0",
        "1",
        "3",
        "10",
      ],
      correctAnswer: 1,
      explanation: "The modulo operator (%) returns the remainder after division. 10 divided by 3 is 3 with remainder 1.",
      weaknessTopic: 'types',
      practiceHint: "Modulo (%) gives you the remainder!",
    },
    {
      question: "How do you call a function named 'multiply' with arguments 5 and 6?",
      options: [
        "multiply(5, 6)",
        "multiply[5, 6]",
        "5.multiply(6)",
        "multiply{5, 6}",
      ],
      correctAnswer: 0,
      explanation: "Functions are called with parentheses: function_name(arg1, arg2). This is standard in most programming languages.",
      weaknessTopic: 'types',
    },
  ],

  quizPassThreshold: 0.8, // Need 4 out of 5 correct

  // Phase 3: Practice (IDE coding)
  hints: [
    'Functions are defined with: fun name(params): return_type { ... }',
    'The last expression in a function is automatically returned',
    'Use the + operator for addition',
    'Use the * operator for multiplication',
    'For even numbers: num % 2 == 0 (remainder is 0)',
  ],

  starterCode: `module lesson1::calculator {
    // TODO: Write a function called 'add' that:
    // - Takes two u64 parameters (a and b)
    // - Returns their sum


    // TODO: Write a function called 'multiply' that:
    // - Takes two u64 parameters (a and b)
    // - Returns their product


    // TODO: Write a function called 'is_even' that:
    // - Takes one u64 parameter (num)
    // - Returns true if num is even, false otherwise
    // - Hint: Use the modulo operator %

}`,

  solution: `module lesson1::calculator {
    /// Adds two numbers and returns the sum
    fun add(a: u64, b: u64): u64 {
        a + b
    }

    /// Multiplies two numbers and returns the product
    fun multiply(a: u64, b: u64): u64 {
        a * b
    }

    /// Checks if a number is even
    /// Returns true if even, false if odd
    fun is_even(num: u64): bool {
        num % 2 == 0
    }
}`,
};

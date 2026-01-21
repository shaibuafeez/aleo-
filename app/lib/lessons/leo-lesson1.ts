import { LessonContent } from '@/app/types/lesson';

export const leoLesson1: LessonContent = {
  id: 'leo-1',
  title: 'Hello Leo! - Your First Aleo Program',
  description: 'Learn the fundamentals of Leo programming: programs, types, variables, and transitions',
  difficulty: 'beginner',
  xpReward: 100,
  order: 1,
  prerequisiteLessons: [],

  narrative: {
    welcomeMessage: "Welcome to Leo! 🦁 Get ready to write your first zero-knowledge program on Aleo!",
    quizTransition: "Great work learning Leo basics! Let's test your understanding...",
    practiceTransition: "Perfect! Now let's build a real calculator program in Leo!",
    celebrationMessage: "🎉 Congratulations! You've written your first Leo program! You're now a Leo developer!",
    nextLessonTease: "Next up: Learn about Leo's powerful type system and operators! 🔢",
  },

  teachingSections: [
    {
      sectionTitle: 'Programs in Leo',
      slides: [
        {
          title: 'What is Leo?',
          emoji: '🦁',
          illustration: "/illustrations/leo-glass.png",
          image: "https://aleo.org/wp-content/uploads/2023/04/Aleo-Graphic-1.png",
          content: "Leo is Aleo's programming language for building zero-knowledge applications. It's privacy-first, blockchain-native, and designed for building apps where you can prove things without revealing secrets. Think private DeFi, voting, gaming, and identity systems - all while keeping your data private!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Privacy-First", content: "Build apps where you can prove things without revealing secrets!" },
                { label: "Zero-Knowledge", content: "Generate cryptographic proofs that verify computations without exposing data" },
                { label: "Blockchain-Native", content: "Designed specifically for decentralized applications on Aleo" },
                { label: "Use Cases", content: "Private DeFi, voting systems, gaming, identity - all with privacy!" }
              ]
            }
          }
        },
        {
          title: 'Your First Leo Program',
          emoji: '📝',
          content: "Every Leo program starts with a program declaration: program name.aleo { }. The program name must end with .aleo, and all your code goes inside the curly braces. Programs contain transitions (entry points users can call) and functions (helper code). Choose descriptive names like calculator.aleo or vote_system.aleo!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `program hello.aleo {\n    transition main(public a: u32) -> u32 {\n        return a + 1u32;\n    }\n}`,
              highlights: [
                { line: 1, explanation: "Program declaration - must end with .aleo" },
                { line: 2, explanation: "Transition is the entry point users can call" },
                { line: 3, explanation: "Return statement with type suffix u32" }
              ]
            }
          }
        },
        {
          title: 'Your First Transition',
          emoji: '⚡',
          content: "A transition is a function that users can call from outside your program. It's the entry point! Example: transition main(public a: u32) -> u32 { return a + 1; }. The 'transition' keyword marks it as callable, it takes parameters with types, and returns a value. Transitions generate zero-knowledge proofs when called!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `transition add(public a: u32, public b: u32) -> u32 {\n    let sum: u32 = a + b;\n    return sum;\n}`,
              highlights: [
                { line: 1, explanation: "'transition' keyword makes it externally callable" },
                { line: 1, explanation: "'public' visibility means data is visible on blockchain" },
                { line: 2, explanation: "Variables declared with 'let' - type can be inferred" },
                { line: 3, explanation: "Must return a value matching the declared type" }
              ]
            }
          }
        },
        {
          title: 'Public vs Private',
          emoji: '🔐',
          content: "Leo has three visibility modes: PUBLIC (visible to everyone on the blockchain, cheapest), PRIVATE (hidden using zero-knowledge proofs, most expensive), and CONSTANT (known at compile time, optimized). Use public for transparent data, private for sensitive information like balances, and constant for fixed values. Privacy is a feature, not a bug!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Public", content: "Visible to everyone on blockchain - cheapest option! Use for transparent data." },
                { label: "Private", content: "Hidden using zero-knowledge proofs - most expensive! Use for sensitive data like balances." },
                { label: "Constant", content: "Known at compile time - optimized! Use for fixed values that never change." }
              ]
            }
          }
        },
        {
          title: 'Comments in Leo',
          emoji: '💬',
          content: "Comments help explain your code. Use // for single-line comments and /* */ for multi-line comments. Good comments explain WHY you did something, not WHAT the code does (the code already shows that!). Example: '// Calculate compound interest for DeFi protocol' is better than '// This adds two numbers'.",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Single-line comment\ntransition calculate(public x: u32) -> u32 {\n    /* Multi-line comment\n       explains complex logic */\n    return x * 2u32;\n}`,
              highlights: [
                { line: 1, explanation: "Single-line comments start with //" },
                { line: 3, explanation: "Multi-line comments use /* */" },
                { line: 5, explanation: "Good comments explain WHY, not WHAT" }
              ]
            }
          }
        },
      ],
      exerciseId: 'mc-leo-001',
    },
    {
      sectionTitle: 'Types & Variables',
      slides: [
        {
          title: 'Leo\'s Type System',
          emoji: '🔢',
          content: "Leo has unsigned integers (u8, u16, u32, u64, u128 - positive numbers only) and signed integers (i8, i32, i64 - can be negative). u8 is for small values (0-255), u32/u64 for balances and IDs, u128 for very large numbers. Pick the smallest type that fits your data to save computation costs!",
          interactiveElement: {
            type: 'drag-drop',
            config: {
              items: [
                { id: 'u8', label: 'u8', emoji: '🔢' },
                { id: 'u64', label: 'u64', emoji: '💰' },
                { id: 'u128', label: 'u128', emoji: '🚀' },
                { id: 'i32', label: 'i32', emoji: '➖' }
              ],
              targets: [
                { id: 'small', label: 'Small Values (0-255)' },
                { id: 'balances', label: 'Token Balances' },
                { id: 'huge', label: 'Very Large Numbers' },
                { id: 'negative', label: 'Can Be Negative' }
              ],
              correctPairs: [
                { itemId: 'u8', targetId: 'small' },
                { itemId: 'u64', targetId: 'balances' },
                { itemId: 'u128', targetId: 'huge' },
                { itemId: 'i32', targetId: 'negative' }
              ]
            }
          }
        },
        {
          title: 'Boolean and Address Types',
          emoji: '✅',
          content: "Leo has three special types: BOOL (true or false for decisions), ADDRESS (Aleo wallet addresses like aleo1qnr4...s7pyjh9), and FIELD (Leo's native cryptographic type for zero-knowledge proofs). Fields are used for hashing, commitments, and cryptographic operations - they're optimized for ZK math!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "bool", content: "True or false values - perfect for conditional logic and flags" },
                { label: "address", content: "Aleo wallet addresses like aleo1qnr4...s7pyjh9 - identifies users" },
                { label: "field", content: "Native cryptographic type optimized for zero-knowledge proofs and hashing" }
              ]
            }
          }
        },
        {
          title: 'Declaring Variables',
          emoji: '📦',
          content: "Variables store data using the syntax: let variable_name: type = value. Leo can infer types from literals like 25u8 or 1000u64. Always specify type suffixes on integers (100u32, not just 100). Common suffixes: u8, u16, u32, u64, u128, i8, i32, i64, field. Variables are immutable by default!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let amount: u64 = 1000u64;\nlet price = 50u32;\nlet is_active: bool = true;\nlet owner: address = self.caller;`,
              highlights: [
                { line: 1, explanation: "Explicit type declaration with type suffix" },
                { line: 2, explanation: "Type can be inferred from suffix (u32)" },
                { line: 3, explanation: "Boolean type for true/false values" },
                { line: 4, explanation: "Address type for wallet addresses" }
              ]
            }
          }
        },
        {
          title: 'Variable Scope',
          emoji: '🎯',
          content: "Variables exist only within their { } block. Inner blocks can access outer variables, but outer blocks can't access inner variables. You can shadow variables by redeclaring with the same name - useful for transforming values step-by-step. Leo variables are immutable by default - you can't change their value, only create new variables!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let x: u32 = 10u32;\nif (x > 5u32) {\n    let y: u32 = x * 2u32;\n    // y is accessible here\n}\n// y is NOT accessible here`,
              highlights: [
                { line: 1, explanation: "Outer scope variable - accessible everywhere" },
                { line: 3, explanation: "Inner scope variable - only in this block" },
                { line: 6, explanation: "y is out of scope here - cannot be accessed" }
              ]
            }
          }
        },
        {
          title: 'Type Casting',
          emoji: '🔄',
          content: "Convert types using the 'as' keyword: let big: u64 = small as u64. Upcasting (small to large type) is always safe. Downcasting (large to small) might overflow! Golden rule: You can only do math on values of the SAME type. Cast them first: (a as u64) + (b as u64).",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let small: u8 = 10u8;\nlet big: u64 = small as u64;\nlet a: u32 = 100u32;\nlet b: u64 = 200u64;\nlet sum = (a as u64) + b;`,
              highlights: [
                { line: 2, explanation: "Upcasting u8 to u64 - always safe" },
                { line: 5, explanation: "Cast to same type before math operations" }
              ]
            }
          }
        },
        {
          title: 'Literals and Suffixes',
          emoji: '🏷️',
          content: "Leo requires type suffixes for clarity: 100u8, 1000u32, 1000000u64, -50i32. Booleans don't need suffixes (true, false). Fields use 'field' suffix (12345field). Always use the suffix - Leo won't guess! Pro tip: Use underscores for readability: 1_000_000u64 is much easier to read than 1000000u64.",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let count: u8 = 255u8;\nlet balance: u64 = 1_000_000u64;\nlet negative: i32 = -50i32;\nlet hash: field = 12345field;`,
              highlights: [
                { line: 1, explanation: "u8 suffix for small numbers (0-255)" },
                { line: 2, explanation: "Underscores improve readability!" },
                { line: 3, explanation: "i32 suffix for signed integers (negative ok)" },
                { line: 4, explanation: "field suffix for cryptographic types" }
              ]
            }
          }
        },
      ],
      exerciseId: 'cc-leo-002',
    },
    {
      sectionTitle: 'Transitions & Functions',
      slides: [
        {
          title: 'Transitions Deep Dive',
          emoji: '⚡',
          content: "Transitions are the public API of your Leo program. Syntax: transition name(visibility param: type) -> return_type { return value; }. You can have multiple parameters with different visibility (public/private/constant). When users call a transition, they create a zero-knowledge proof that the computation was done correctly!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `transition transfer(\n    public sender: address,\n    private amount: u64\n) -> u64 {\n    return amount;\n}`,
              highlights: [
                { line: 1, explanation: "'transition' makes this externally callable" },
                { line: 2, explanation: "public parameter - visible on blockchain" },
                { line: 3, explanation: "private parameter - hidden with ZK proofs" },
                { line: 5, explanation: "Must return value matching declared type (u64)" }
              ]
            }
          }
        },
        {
          title: 'Helper Functions',
          emoji: '🛠️',
          content: "Functions (not transitions) are for internal logic only. They can't be called from outside. Use functions for code reuse, organization, and readability. Example: write discount/tax calculation functions, then call them from a transition. Functions help break complex code into smaller, manageable pieces.",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `function calculate_tax(amount: u64) -> u64 {\n    return (amount * 10u64) / 100u64;\n}\n\ntransition buy(public price: u64) -> u64 {\n    let tax = calculate_tax(price);\n    return price + tax;\n}`,
              highlights: [
                { line: 1, explanation: "'function' keyword - internal use only" },
                { line: 2, explanation: "Helper logic for calculating 10% tax" },
                { line: 6, explanation: "Transitions can call helper functions" }
              ]
            }
          }
        },
        {
          title: 'Return Values',
          emoji: '↩️',
          content: "Every transition must return a value of its declared type. Leo supports returning multiple values as tuples: (u32, u32). You can use conditional returns (if/else) and early returns. Important: ALL code paths must return a value - the compiler will enforce this!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `transition divide(public a: u32, public b: u32) -> (u32, u32) {\n    let quotient = a / b;\n    let remainder = a % b;\n    return (quotient, remainder);\n}`,
              highlights: [
                { line: 1, explanation: "Return type is a tuple (u32, u32)" },
                { line: 4, explanation: "Return multiple values as tuple" }
              ]
            }
          }
        },
        {
          title: 'Calling Other Transitions',
          emoji: '🔗',
          content: "Transitions can call FUNCTIONS but NOT other transitions directly. Why? Each transition generates its own zero-knowledge proof - you can't nest proof generation (too complex and expensive). Solution: Put reusable logic in functions, then call those functions from multiple transitions.",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Can Do", content: "Transitions can call helper functions - share logic between transitions!" },
                { label: "Cannot Do", content: "Transitions CANNOT call other transitions - each generates its own ZK proof" },
                { label: "Solution", content: "Put shared logic in functions, then call from multiple transitions" }
              ]
            }
          }
        },
      ],
      exerciseId: 'op-leo-003',
    },
  ],

  quiz: [
    {
      question: 'What is the difference between a transition and a function in Leo?',
      options: [
        'Transitions are faster than functions',
        'Transitions can be called externally, functions are internal helpers',
        'Functions can use private data, transitions cannot',
        'There is no difference',
      ],
      correctAnswer: 1,
      explanation: 'Transitions are the public entry points of a Leo program - they can be called from outside and generate zero-knowledge proofs. Functions are internal helpers that can only be called from within the program.',
    },
    {
      question: 'Which type should you use for a token balance that could be very large?',
      options: [
        'u8',
        'u32',
        'u64 or u128',
        'i32',
      ],
      correctAnswer: 2,
      explanation: 'u64 or u128 are appropriate for large balances. u8 only goes up to 255, u32 up to ~4 billion. For token supplies in the billions or trillions, u64 or u128 are needed.',
    },
    {
      question: 'What does the "public" keyword mean in a transition parameter?',
      options: [
        'Anyone can modify this value',
        'The value is visible on the blockchain to everyone',
        'The parameter is optional',
        'The value is encrypted',
      ],
      correctAnswer: 1,
      explanation: 'The "public" visibility modifier means the value is visible to everyone on the blockchain. Use "private" if you want to keep data hidden using zero-knowledge proofs.',
    },
    {
      question: 'What is required when writing integer literals in Leo?',
      options: [
        'They must be in hexadecimal',
        'They must have a type suffix like u32 or u64',
        'They must be written in scientific notation',
        'They must be prime numbers',
      ],
      correctAnswer: 1,
      explanation: 'Leo requires type suffixes on integer literals for clarity. Write 100u32, not just 100. This prevents ambiguity about which type you intended.',
    },
    {
      question: 'Can a transition call another transition directly?',
      options: [
        'Yes, transitions can call each other freely',
        'Yes, but only private transitions',
        'No, transitions cannot call other transitions',
        'Yes, but only if they return the same type',
      ],
      correctAnswer: 2,
      explanation: 'No, transitions cannot call other transitions directly because each transition generates its own zero-knowledge proof. Use functions for shared logic between transitions.',
    },
  ],
  quizPassThreshold: 0.8,

  starterCode: `program calculator.aleo {
    // TODO: Create a transition named 'add' that:
    // - Takes two public u32 parameters: a and b
    // - Returns their sum as u32

    // TODO: Create a transition named 'subtract' that:
    // - Takes two public u32 parameters: a and b
    // - Returns a - b as u32

    // TODO: Create a transition named 'multiply' that:
    // - Takes two public u32 parameters: a and b
    // - Returns their product as u32

    // TODO: Create a function (not transition) named 'double' that:
    // - Takes one u32 parameter: x
    // - Returns x * 2

    // TODO: Create a transition named 'double_then_add' that:
    // - Takes two public u32 parameters: a and b
    // - Uses the double() function to double 'a'
    // - Returns the doubled value plus b
}`,

  solution: `program calculator.aleo {
    transition add(public a: u32, public b: u32) -> u32 {
        return a + b;
    }

    transition subtract(public a: u32, public b: u32) -> u32 {
        return a - b;
    }

    transition multiply(public a: u32, public b: u32) -> u32 {
        return a * b;
    }

    function double(x: u32) -> u32 {
        return x * 2u32;
    }

    transition double_then_add(public a: u32, public b: u32) -> u32 {
        let doubled = double(a);
        return doubled + b;
    }
}`,

  hints: [
    "Remember: transitions use the 'transition' keyword, functions use the 'function' keyword",
    "All parameters in transitions need visibility modifiers (public or private)",
    "Don't forget type suffixes on literals: use 2u32, not just 2",
    "The double() function should be a helper function, not a transition",
    "You can call functions from transitions, but not transitions from other transitions",
  ],
};

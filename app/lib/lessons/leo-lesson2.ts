import { LessonContent } from '@/app/types/lesson';

export const leoLesson2: LessonContent = {
  id: 'leo-2',
  title: 'Control Flow & Operators',
  description: 'Master conditional logic, loops, and operators in Leo for building dynamic zero-knowledge programs',
  difficulty: 'beginner',
  xpReward: 150,
  order: 2,
  prerequisiteLessons: ['leo-1'],

  narrative: {
    welcomeMessage: "Ready to add logic to your Leo programs? Let's master control flow! 🎯",
    quizTransition: "Excellent! Let's test your understanding of Leo control flow...",
    practiceTransition: "Perfect! Now build a token vesting program with time-based logic!",
    celebrationMessage: "🎉 Amazing! You can now write complex conditional logic in Leo!",
    nextLessonTease: "Next up: Learn about structs and records for custom data types! 📦",
  },

  teachingSections: [
    {
      sectionTitle: 'Operators in Leo',
      slides: [
        {
          title: 'Arithmetic Operators',
          emoji: '➕',
          content: "Leo supports all standard arithmetic: addition (+), subtraction (-), multiplication (*), division (/), modulo (%), and exponentiation (**). Critical: Both operands must be the SAME type - cast them if needed! Operator precedence: exponentiation first, then multiply/divide/modulo, then add/subtract. Use parentheses to be explicit!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let a: u32 = 10u32;\nlet b: u32 = 3u32;\nlet sum = a + b;      // 13\nlet product = a * b;  // 30\nlet remainder = a % b; // 1\nlet power = a ** 2u8;  // 100`,
              highlights: [
                { line: 3, explanation: "Addition: Both operands must be same type" },
                { line: 4, explanation: "Multiplication: 10 * 3 = 30" },
                { line: 5, explanation: "Modulo: Remainder after division (10 % 3 = 1)" },
                { line: 6, explanation: "Exponentiation: 10 to the power of 2 = 100" }
              ]
            }
          }
        },
        {
          title: 'Comparison Operators',
          emoji: '⚖️',
          content: "Comparison operators return boolean values (true/false): equal (==), not equal (!=), less than (<), less than or equal (<=), greater than (>), greater than or equal (>=). Use them to check ages, validate balances, or compare any values. Important: You cannot chain comparisons - use logical AND instead of writing x < y < z!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let age: u8 = 25u8;\nlet min_age: u8 = 18u8;\nlet is_adult = age >= min_age;\nlet balance: u64 = 1000u64;\nlet has_funds = balance > 0u64;`,
              highlights: [
                { line: 3, explanation: "Greater than or equal: Returns true if age >= 18" },
                { line: 5, explanation: "Greater than: Check if balance is positive" }
              ]
            }
          }
        },
        {
          title: 'Logical Operators',
          emoji: '🧠',
          content: "Combine conditions with three logical operators: AND (&&) - both must be true, OR (||) - at least one must be true, NOT (!) - flip true/false. Example: (is_admin || is_owner) && is_verified. Use parentheses to make complex logic readable! Perfect for permission checks and validation.",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "AND (&&)", content: "Both conditions must be true: (age >= 18) && (has_license)" },
                { label: "OR (||)", content: "At least one must be true: (is_admin || is_owner)" },
                { label: "NOT (!)", content: "Flip the boolean: !is_banned returns true if is_banned is false" }
              ]
            }
          }
        },
        {
          title: 'Bitwise Operators',
          emoji: '🔢',
          content: "For advanced use cases: bitwise AND (&), OR (|), XOR (^), NOT (!), left shift (<<), right shift (>>). Left shift by 1 = multiply by 2. Right shift by 1 = divide by 2. Use cases: compact storage, permission flags (READ=1, WRITE=2, EXECUTE=4), and cryptographic operations. Great for efficiency!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let x: u8 = 5u8;        // 0101 in binary\nlet doubled = x << 1u8; // 1010 = 10\nlet halved = x >> 1u8;  // 0010 = 2\nlet READ: u8 = 1u8;     // 0001\nlet WRITE: u8 = 2u8;    // 0010\nlet perms = READ | WRITE; // 0011 = 3`,
              highlights: [
                { line: 2, explanation: "Left shift by 1 = multiply by 2 (5 << 1 = 10)" },
                { line: 3, explanation: "Right shift by 1 = divide by 2 (5 >> 1 = 2)" },
                { line: 6, explanation: "Bitwise OR combines permission flags" }
              ]
            }
          }
        },
      ],
      exerciseId: 'op-leo-004',
    },
    {
      sectionTitle: 'Conditional Statements',
      slides: [
        {
          title: 'If Statements',
          emoji: '🔀',
          content: "Make decisions with if statements! Basic syntax: if (condition) { }. Chain with else and else if for multiple conditions. You can nest conditionals for complex logic. Important: Every branch must return the same type! Use if-else-if chains for grade scoring, validation logic, or any decision making.",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `transition check_age(public age: u8) -> bool {\n    if (age >= 18u8) {\n        return true;\n    } else {\n        return false;\n    }\n}`,
              highlights: [
                { line: 2, explanation: "if condition checks if age is 18 or more" },
                { line: 3, explanation: "Return true for adults" },
                { line: 5, explanation: "Return false for minors" }
              ]
            }
          }
        },
        {
          title: 'Ternary Operator',
          emoji: '❓',
          content: "Shorthand for simple if-else: condition ? value_if_true : value_if_false. Perfect for min/max operations, simple value selection, or boolean simplification. Example: let max = a > b ? a : b. Avoid for complex nested logic - use if-else instead. Rule of thumb: use ternary for one-liners, if-else for complex logic!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `transition get_max(public a: u32, public b: u32) -> u32 {\n    let max = a > b ? a : b;\n    return max;\n}`,
              highlights: [
                { line: 2, explanation: "Ternary: if a > b, return a, else return b" },
                { line: 2, explanation: "Shorthand for simple if-else logic" }
              ]
            }
          }
        },
        {
          title: 'Pattern Matching Mindset',
          emoji: '🎯',
          content: "Leo doesn't have switch/match statements - use if-else chains! Create switch-like patterns with if-else-if. Use constants for enum-like behavior (PENDING=0, APPROVED=1, REJECTED=2). Best practice: Use guard clauses (early returns) to fail fast and keep code clean. Check active account, validate amount, verify balance - return false immediately if checks fail!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `transition get_grade(public score: u8) -> u8 {\n    if (score >= 90u8) {\n        return 4u8; // A\n    } else if (score >= 80u8) {\n        return 3u8; // B\n    } else if (score >= 70u8) {\n        return 2u8; // C\n    } else {\n        return 1u8; // F\n    }\n}`,
              highlights: [
                { line: 2, explanation: "First check: score >= 90 gets grade A" },
                { line: 4, explanation: "else if chain for multiple conditions" },
                { line: 8, explanation: "Final else catches all remaining cases" }
              ]
            }
          }
        },
      ],
      exerciseId: 'cc-leo-005',
    },
    {
      sectionTitle: 'Loops in Leo',
      slides: [
        {
          title: 'For Loops',
          emoji: '🔁',
          content: "Leo supports for loops for bounded iteration. Syntax: for i: u32 in 0u32..10u32 { }. Use .. for exclusive range (0 to 9) or ..= for inclusive range (0 to 10). CRITICAL: Loop bounds must be compile-time constants! You can't use variables as upper bounds. Workaround: Use constant MAX with conditional logic inside. Why? Zero-knowledge circuits need fixed sizes!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `transition sum_range(public n: u32) -> u32 {\n    let total: u32 = 0u32;\n    for i: u32 in 0u32..10u32 {\n        if (i < n) {\n            total = total + i;\n        }\n    }\n    return total;\n}`,
              highlights: [
                { line: 3, explanation: "for loop with CONSTANT bounds (0..10)" },
                { line: 4, explanation: "Conditional logic inside handles dynamic limit" },
                { line: 5, explanation: "Accumulate sum inside loop" }
              ]
            }
          }
        },
        {
          title: 'Loop Patterns',
          emoji: '📊',
          content: "Master these patterns: ACCUMULATION (sum, factorial), COUNTING (count evens), SEARCH (find first match), TRANSFORMATION (sum of squares). Always use constant upper bound with conditional logic inside. Example: for i in 0..100 { if (i < n) { /* do work */ } }. Pro tip: Set a 'found' flag for early termination logic!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `transition count_evens(public n: u32) -> u32 {\n    let count: u32 = 0u32;\n    for i: u32 in 0u32..100u32 {\n        if (i < n && i % 2u32 == 0u32) {\n            count = count + 1u32;\n        }\n    }\n    return count;\n}`,
              highlights: [
                { line: 3, explanation: "Constant bound (100) with conditional inside" },
                { line: 4, explanation: "Check if within range AND if even" },
                { line: 5, explanation: "Count pattern: increment counter" }
              ]
            }
          }
        },
        {
          title: 'No While Loops',
          emoji: '⛔',
          content: "Leo does NOT support while or do-while loops! Why? Zero-knowledge circuits require fixed circuit size, deterministic execution, and bounded computation. While loops can't guarantee these. Solution: Convert while-loop logic to for-loops! Determine maximum iterations needed, use for-loop with constant bound, add conditional to stop early. Think bounded iteration, not indefinite loops!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Why No While?", content: "ZK circuits need FIXED size at compile time - while loops are unbounded!" },
                { label: "Solution", content: "Use for-loops with constant bounds + conditional logic inside" },
                { label: "Pattern", content: "for i in 0..MAX { if (condition) { work } else { break logic } }" }
              ]
            }
          }
        },
      ],
      exerciseId: 'bf-leo-006',
    },
  ],

  quiz: [
    {
      question: 'What happens if you try to add a u32 and a u64 in Leo?',
      options: [
        'Leo automatically converts them to the larger type',
        'You get a compile error - types must match',
        'The result is always u64',
        'Leo truncates the larger value',
      ],
      correctAnswer: 1,
      explanation: 'Leo requires exact type matching for operators. You must explicitly cast values to the same type before using operators on them.',
    },
    {
      question: 'Can you use a variable as the upper bound of a for loop in Leo?',
      options: [
        'Yes, any variable can be used',
        'Yes, but only if it\'s public',
        'No, loop bounds must be compile-time constants',
        'Yes, but only for small values',
      ],
      correctAnswer: 2,
      explanation: 'Leo requires loop bounds to be compile-time constants because zero-knowledge circuits need fixed sizes. Use a constant upper bound with conditional logic inside the loop instead.',
    },
    {
      question: 'What does the ternary operator look like in Leo?',
      options: [
        'if condition then a else b',
        'condition ? a : b',
        'condition && a || b',
        'select(condition, a, b)',
      ],
      correctAnswer: 1,
      explanation: 'Leo uses the standard ternary operator syntax: condition ? value_if_true : value_if_false',
    },
    {
      question: 'Why doesn\'t Leo support while loops?',
      options: [
        'They are too slow',
        'They are deprecated',
        'Zero-knowledge circuits require fixed, bounded iteration',
        'They are planned for future versions',
      ],
      correctAnswer: 2,
      explanation: 'While loops can\'t guarantee bounded execution, which is required for zero-knowledge circuits that need fixed sizes at compile time. Use for loops with constant bounds instead.',
    },
    {
      question: 'What is the result of 5u8 << 1u8 (left shift by 1)?',
      options: [
        '5',
        '10',
        '6',
        '4',
      ],
      correctAnswer: 1,
      explanation: 'Left shift by 1 is equivalent to multiplying by 2. So 5 << 1 = 10. Bitwise operations are useful for efficient arithmetic and compact storage.',
    },
  ],
  quizPassThreshold: 0.8,

  starterCode: `program token_vesting.aleo {
    // TODO: Create a transition named 'calculate_vested_amount' that:
    // - Takes public parameters: total_tokens (u64), months_passed (u8), vesting_months (u8)
    // - If months_passed >= vesting_months, return total_tokens (fully vested)
    // - Otherwise, calculate proportional amount: (total_tokens * months_passed) / vesting_months
    // - Return the vested amount as u64

    // TODO: Create a transition named 'check_cliff' that:
    // - Takes public parameters: months_passed (u8), cliff_months (u8)
    // - Returns true if cliff period has passed (months_passed >= cliff_months)
    // - Returns false otherwise

    // TODO: Create a function named 'calculate_bonus' that:
    // - Takes parameters: base_amount (u64), performance_score (u8)
    // - If performance_score >= 90, multiply base_amount by 120 and divide by 100 (20% bonus)
    // - Else if performance_score >= 75, multiply by 110 and divide by 100 (10% bonus)
    // - Else return base_amount (no bonus)
    // - Return u64

    // TODO: Create a transition named 'get_final_amount' that:
    // - Takes public parameters: base (u64), score (u8)
    // - Calls calculate_bonus(base, score)
    // - Returns the result
}`,

  solution: `program token_vesting.aleo {
    transition calculate_vested_amount(
        public total_tokens: u64,
        public months_passed: u8,
        public vesting_months: u8
    ) -> u64 {
        if (months_passed >= vesting_months) {
            return total_tokens;
        } else {
            let vested = (total_tokens * (months_passed as u64)) / (vesting_months as u64);
            return vested;
        }
    }

    transition check_cliff(
        public months_passed: u8,
        public cliff_months: u8
    ) -> bool {
        return months_passed >= cliff_months;
    }

    function calculate_bonus(base_amount: u64, performance_score: u8) -> u64 {
        if (performance_score >= 90u8) {
            return (base_amount * 120u64) / 100u64;
        } else if (performance_score >= 75u8) {
            return (base_amount * 110u64) / 100u64;
        } else {
            return base_amount;
        }
    }

    transition get_final_amount(public base: u64, public score: u8) -> u64 {
        return calculate_bonus(base, score);
    }
}`,

  hints: [
    "Remember to cast u8 to u64 when doing arithmetic with u64 values",
    "Use if-else statements to check the cliff and vesting conditions",
    "The calculate_bonus function is a helper function, not a transition",
    "For percentage calculations, multiply first, then divide to avoid precision loss",
    "Use >= for threshold checks (greater than or equal to)",
  ],
};

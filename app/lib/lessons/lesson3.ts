import { LessonContent } from '@/app/types/lesson';

export const lesson3: LessonContent = {
  id: 'lesson-3',
  title: 'Control Flow - Making Decisions',
  description: 'Master if expressions, loops, and error handling with assert and abort',
  difficulty: 'beginner',
  xpReward: 175,
  order: 3,
  prerequisiteLessons: ['lesson-1', 'lesson-2'],

  // Narrative storytelling
  narrative: {
    welcomeMessage: "Time to make your code smart! Learn to make decisions, repeat actions, and handle errors like a pro! 🔀",
    quizTransition: "Great! You can control the flow. Let's test your understanding...",
    practiceTransition: "Perfect! Now build a game logic module with all your new control flow skills!",
    celebrationMessage: "🎉 Awesome! You've mastered control flow - your code can think and decide!",
    nextLessonTease: "Next up: Structs - creating your own custom types! 📦",
  },

  // Phase 1: Interactive Teaching with interleaved exercises
  teachingSections: [
    // Section 1: If Expressions
    {
      sectionTitle: "If Expressions",
      slides: [
        {
          title: "If as an Expression",
          content: "In Move, 'if' is an expression that returns a value! Both branches must return the same type. This is different from many languages where if is just a statement.",
          emoji: "🔀",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `let score = 85;
let grade = if (score >= 90) {
    1  // Returns 1 (excellent)
} else {
    2  // Returns 2 (good)
};
// grade is now 2`,
              highlights: [
                {
                  line: 2,
                  explanation: "If is an expression - the whole thing evaluates to a value"
                },
                {
                  line: 3,
                  explanation: "If branch returns 1"
                },
                {
                  line: 5,
                  explanation: "Else branch returns 2"
                },
                {
                  line: 7,
                  explanation: "Since score=85 < 90, grade gets value 2"
                }
              ]
            }
          }
        },
        {
          title: "If-Else Syntax Rules",
          content: "When using if to return a value: 1) Condition in parentheses 2) Both branches in braces 3) Both must return SAME type 4) Else is required",
          emoji: "📋",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Correct: both branches return u64
let result = if (x > 10) {
    100
} else {
    50
};

// ERROR: type mismatch
// let bad = if (x > 10) {
//     100      // u64
// } else {
//     true     // bool - WRONG!
// };`,
              highlights: [
                {
                  line: 2,
                  explanation: "Condition in parentheses (x > 10)"
                },
                {
                  line: 3,
                  explanation: "If branch returns u64"
                },
                {
                  line: 5,
                  explanation: "Else branch also returns u64 - types match!"
                },
                {
                  line: 10,
                  explanation: "u64 and bool are different types - compiler error"
                }
              ]
            }
          }
        },
        {
          title: "Nested If for Complex Logic",
          content: "You can nest if expressions inside each other for complex decision trees. Each level can return different values based on multiple conditions.",
          emoji: "🌳",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `fun get_grade_code(score: u64): u64 {
    if (score >= 90) {
        1  // Excellent
    } else if (score >= 75) {
        2  // Good
    } else if (score >= 60) {
        3  // Pass
    } else {
        4  // Fail
    }
}`,
              highlights: [
                {
                  line: 2,
                  explanation: "First check: score >= 90?"
                },
                {
                  line: 4,
                  explanation: "Else if: only checked if first condition false"
                },
                {
                  line: 6,
                  explanation: "Another else if: checked if previous conditions false"
                },
                {
                  line: 8,
                  explanation: "Final else: catches everything else"
                }
              ]
            }
          }
        },
      ],
      exerciseId: 'mc-new-007', // If expression rules multiple choice
    },

    // Section 2: Loops & Iteration
    {
      sectionTitle: "Loops & Iteration",
      slides: [
        {
          title: "While Loops",
          content: "While loops repeat code as long as a condition is true. Great for counting, searching, or repeating until a goal is reached.",
          emoji: "🔁",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `fun count_to_ten(): u64 {
    let mut counter = 0;
    while (counter < 10) {
        counter = counter + 1;
    };
    counter  // Returns 10
}`,
              highlights: [
                {
                  line: 2,
                  explanation: "Must use 'mut' - counter will change"
                },
                {
                  line: 3,
                  explanation: "Loop runs while condition (counter < 10) is true"
                },
                {
                  line: 4,
                  explanation: "Increment counter each iteration"
                },
                {
                  line: 6,
                  explanation: "After loop exits, counter is 10"
                }
              ]
            }
          }
        },
        {
          title: "Infinite Loops & Break",
          content: "Use 'loop' for infinite loops. Use 'break' to exit when you're done. Useful when you don't know in advance how many iterations you need.",
          emoji: "🔄",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `fun find_first_even(start: u64): u64 {
    let mut num = start;
    loop {
        if (num % 2 == 0) {
            break  // Exit loop when even found
        };
        num = num + 1;
    };
    num
}`,
              highlights: [
                {
                  line: 3,
                  explanation: "'loop' runs forever unless you break"
                },
                {
                  line: 4,
                  explanation: "Check if num is even (remainder 0 when divided by 2)"
                },
                {
                  line: 5,
                  explanation: "'break' exits the loop immediately"
                },
                {
                  line: 7,
                  explanation: "If not even, increment and try next number"
                }
              ]
            }
          }
        },
        {
          title: "Continue Statement",
          content: "Use 'continue' to skip the rest of the current iteration and jump to the next one. Perfect for skipping unwanted values.",
          emoji: "⏭️",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `fun count_even(max: u64): u64 {
    let mut count = 0;
    let mut i = 0;
    while (i < max) {
        i = i + 1;
        if (i % 2 != 0) {
            continue;  // Skip odd numbers
        };
        count = count + 1;  // Only reached for even numbers
    };
    count
}`,
              highlights: [
                {
                  line: 6,
                  explanation: "If odd (remainder != 0), skip the rest"
                },
                {
                  line: 7,
                  explanation: "'continue' jumps back to while condition"
                },
                {
                  line: 9,
                  explanation: "This line only runs for even numbers"
                }
              ]
            }
          }
        },
        {
          title: "Loop Safety in Smart Contracts",
          content: "WARNING: Infinite loops can lock up blockchain transactions! Always ensure loops terminate. Smart contract platforms limit execution time (gas). Design loops carefully!",
          emoji: "⚠️",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// DANGEROUS: Could run forever!
// loop {
//     do_something();
//     // No break condition!
// }

// SAFE: Has maximum iterations
fun safe_loop(max_iterations: u64) {
    let mut i = 0;
    while (i < max_iterations) {
        do_something();
        i = i + 1;
    }
}`,
              highlights: [
                {
                  line: 2,
                  explanation: "Dangerous! No guaranteed exit condition"
                },
                {
                  line: 8,
                  explanation: "Safe! Loop guaranteed to terminate after max_iterations"
                },
                {
                  line: 10,
                  explanation: "Condition ensures loop exits eventually"
                },
                {
                  line: 12,
                  explanation: "Always increment counter to make progress toward exit"
                }
              ]
            }
          }
        },
      ],
      exerciseId: 'cc-new-008', // Loop with break/continue code completion
    },

    // Section 3: Error Handling
    {
      sectionTitle: "Error Handling",
      slides: [
        {
          title: "Assert for Safety Checks",
          content: "Use assert! to check preconditions - things that must be true for your function to work correctly. If the check fails, the program aborts with your error code.",
          emoji: "✅",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `fun withdraw(balance: u64, amount: u64): u64 {
    assert!(balance >= amount, 1);  // Error code 1
    balance - amount  // Safe! We know balance >= amount
}

// Example calls:
// withdraw(100, 50)  // OK! Returns 50
// withdraw(50, 100)  // ABORT with error code 1`,
              highlights: [
                {
                  line: 2,
                  explanation: "assert!(condition, error_code) - checks condition is true"
                },
                {
                  line: 2,
                  explanation: "If balance < amount, aborts with error code 1"
                },
                {
                  line: 3,
                  explanation: "This line only runs if assert passed"
                },
                {
                  line: 8,
                  explanation: "50 < 100, so balance < amount → assert fails → abort!"
                }
              ]
            }
          }
        },
        {
          title: "Abort for Explicit Failures",
          content: "Use 'abort' to explicitly fail with an error code. Unlike assert, you use abort in response to runtime conditions or invalid state, not just preconditions.",
          emoji: "🛑",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `fun divide(a: u64, b: u64): u64 {
    if (b == 0) {
        abort 2  // Error code 2: division by zero
    };
    a / b
}

// Example:
// divide(10, 2)  // OK! Returns 5
// divide(10, 0)  // ABORT with error code 2`,
              highlights: [
                {
                  line: 2,
                  explanation: "Check for invalid condition (division by zero)"
                },
                {
                  line: 3,
                  explanation: "abort <code> - explicitly fail with error code"
                },
                {
                  line: 5,
                  explanation: "Only execute if b != 0"
                },
                {
                  line: 10,
                  explanation: "b is 0 → abort 2"
                }
              ]
            }
          }
        },
        {
          title: "Assert vs Abort: When to Use Each",
          content: "ASSERT for programmer errors (preconditions): amount > 0, caller is admin. ABORT for user/state errors (expected failures): insufficient balance, item not found.",
          emoji: "🎯",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `// Use ASSERT for preconditions (should never fail if code is correct)
fun transfer(from: address, amount: u64) {
    assert!(amount > 0, E_INVALID_AMOUNT);  // Precondition check
}

// Use ABORT for expected failure cases (valid user actions that can fail)
fun find_item(items: &vector<u64>, target: u64): u64 {
    let mut i = 0;
    while (i < vector::length(items)) {
        if (*vector::borrow(items, i) == target) {
            return *vector::borrow(items, i)
        };
        i = i + 1;
    };
    abort E_NOT_FOUND  // Expected case: item not in list
}`,
              highlights: [
                {
                  line: 3,
                  explanation: "assert! - checks caller provided valid input (precondition)"
                },
                {
                  line: 3,
                  explanation: "Programmer should never call with amount=0"
                },
                {
                  line: 15,
                  explanation: "abort - handles valid case where item isn't found"
                },
                {
                  line: 15,
                  explanation: "User might legitimately search for item not in list"
                }
              ]
            }
          }
        },
        {
          title: "Error Codes Best Practices",
          content: "Use meaningful error codes (constants). Document what each code means. This helps debugging when things fail. Start from 0 or use descriptive names.",
          emoji: "📝",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `module lesson3::bank {
    // Define error codes as constants
    const E_INSUFFICIENT_BALANCE: u64 = 0;
    const E_INVALID_AMOUNT: u64 = 1;
    const E_NOT_AUTHORIZED: u64 = 2;

    fun withdraw(balance: u64, amount: u64, is_admin: bool): u64 {
        assert!(is_admin, E_NOT_AUTHORIZED);  // Clear what failed!
        assert!(amount > 0, E_INVALID_AMOUNT);
        if (balance < amount) {
            abort E_INSUFFICIENT_BALANCE
        };
        balance - amount
    }
}`,
              highlights: [
                {
                  line: 3,
                  explanation: "Define error codes as named constants - self-documenting"
                },
                {
                  line: 4,
                  explanation: "Each constant has a clear, descriptive name"
                },
                {
                  line: 8,
                  explanation: "Use named constant - easy to understand what check failed"
                },
                {
                  line: 11,
                  explanation: "When reading errors, constant names tell you what went wrong"
                }
              ]
            }
          }
        },
      ],
      exerciseId: 'op-new-009', // Assert/abort behavior output prediction
    },
  ],

  // Phase 2: Quiz (diagnostic questions)
  quiz: [
    {
      question: "What must be true when using an if expression to assign a value?",
      options: [
        "Both branches must return the same type",
        "The else branch is optional",
        "Only the if branch needs to return a value",
        "If expressions cannot return values",
      ],
      correctAnswer: 0,
      explanation: "When using if as an expression, both the if and else branches must return the same type. This ensures type safety.",
      weaknessTopic: 'types',
    },
    {
      question: "What does the 'continue' statement do in a loop?",
      options: [
        "Skip to the next iteration",
        "Exit the loop completely",
        "Restart the loop from the beginning",
        "Pause the loop",
      ],
      correctAnswer: 0,
      explanation: "'continue' skips the rest of the current iteration and jumps to the next iteration of the loop.",
      weaknessTopic: 'types',
    },
    {
      question: "When should you use 'assert!' vs 'abort'?",
      options: [
        "assert! for preconditions, abort for expected failures",
        "assert! for expected failures, abort for preconditions",
        "They are exactly the same",
        "Always use abort, never use assert!",
      ],
      correctAnswer: 0,
      explanation: "Use assert! for checking preconditions (programmer errors), and abort for handling expected failure cases (user/state errors).",
      weaknessTopic: 'types',
      practiceHint: "assert! = things that should never happen, abort = valid cases that can fail",
    },
    {
      question: "What happens when an assert! condition is false?",
      options: [
        "The program aborts with the specified error code",
        "The program continues with a warning",
        "The condition is ignored",
        "It returns false",
      ],
      correctAnswer: 0,
      explanation: "When an assert! condition is false, the program immediately aborts with the error code you provided.",
      weaknessTopic: 'types',
    },
    {
      question: "Why should you avoid infinite loops in smart contracts?",
      options: [
        "They can exceed gas limits and lock up transactions",
        "They are faster than while loops",
        "They use less memory",
        "They are considered bad style",
      ],
      correctAnswer: 0,
      explanation: "Infinite loops can run forever, exceeding gas limits and causing transactions to fail or lock up. Always ensure loops have a termination condition.",
      weaknessTopic: 'types',
    },
  ],

  quizPassThreshold: 0.8, // Need 4 out of 5 correct

  // Phase 3: Practice (IDE coding)
  hints: [
    'If expressions: both branches must return same type',
    'For get_difficulty_name: use if/else if/else to check level ranges',
    'For calculate_reward: use assert!(multiplier > 0, 1) before multiplying',
    'For count_to_target: use while loop, increment counter each iteration',
    'For find_first_even: use loop with break when found, abort E_NOT_FOUND if max_checks exceeded',
    'Remember: % 2 == 0 checks if a number is even',
  ],

  starterCode: `module lesson3::game_logic {
    // Error codes
    const E_INVALID_MULTIPLIER: u64 = 1;
    const E_NOT_FOUND: u64 = 2;

    // TODO: Write a function called 'get_difficulty_name' that:
    // - Takes one u8 parameter (level)
    // - Returns u64 difficulty code:
    //   * level 1-3: return 1 (Easy)
    //   * level 4-6: return 2 (Medium)
    //   * level 7+: return 3 (Hard)
    // - Use if/else if/else


    // TODO: Write a function called 'calculate_reward' that:
    // - Takes two parameters: score (u64) and multiplier (u8)
    // - Uses assert! to check that multiplier > 0 (error code E_INVALID_MULTIPLIER)
    // - Returns score * (multiplier as u64)
    // - Hint: Cast multiplier to u64 before multiplying


    // TODO: Write a function called 'count_to_target' that:
    // - Takes one u64 parameter (target)
    // - Uses a while loop to count from 0 to target
    // - Returns the number of iterations it took
    // - Hint: Should return target + 1 (counts 0, 1, 2, ..., target)


    // TODO: Write a function called 'find_first_even' that:
    // - Takes two parameters: start (u64) and max_checks (u64)
    // - Uses loop with break to find first even number >= start
    // - If found within max_checks iterations, return the even number
    // - If not found after max_checks, abort with E_NOT_FOUND
    // - Hint: Keep a counter of checks performed


}`,

  solution: `module lesson3::game_logic {
    // Error codes
    const E_INVALID_MULTIPLIER: u64 = 1;
    const E_NOT_FOUND: u64 = 2;

    /// Returns difficulty code based on level
    /// 1-3 = Easy (1), 4-6 = Medium (2), 7+ = Hard (3)
    fun get_difficulty_name(level: u8): u64 {
        if (level <= 3) {
            1  // Easy
        } else if (level <= 6) {
            2  // Medium
        } else {
            3  // Hard
        }
    }

    /// Calculates reward by multiplying score by multiplier
    /// Asserts that multiplier is valid (> 0)
    fun calculate_reward(score: u64, multiplier: u8): u64 {
        assert!(multiplier > 0, E_INVALID_MULTIPLIER);
        score * (multiplier as u64)
    }

    /// Counts from 0 to target using a while loop
    /// Returns the number of iterations (target + 1)
    fun count_to_target(target: u64): u64 {
        let mut counter = 0;
        let mut iterations = 0;
        while (counter <= target) {
            iterations = iterations + 1;
            counter = counter + 1;
        };
        iterations
    }

    /// Finds the first even number >= start within max_checks iterations
    /// Aborts with E_NOT_FOUND if no even number found
    fun find_first_even(start: u64, max_checks: u64): u64 {
        let mut num = start;
        let mut checks = 0;
        loop {
            if (num % 2 == 0) {
                break  // Found an even number!
            };
            checks = checks + 1;
            if (checks >= max_checks) {
                abort E_NOT_FOUND  // Exceeded max checks
            };
            num = num + 1;
        };
        num
    }
}`,
};

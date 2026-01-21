import { LessonContent } from '@/app/types/lesson';

export const leoLesson6: LessonContent = {
  id: 'leo-6',
  title: 'Advanced Leo Patterns',
  description: 'Master security best practices, optimization techniques, and advanced programming patterns',
  difficulty: 'advanced',
  xpReward: 350,
  order: 6,
  prerequisiteLessons: ['leo-1', 'leo-2', 'leo-3', 'leo-4', 'leo-5'],

  narrative: {
    welcomeMessage: "Time to level up! Master advanced Leo patterns and security! 🛡️",
    quizTransition: "Brilliant! Let's verify your expertise...",
    practiceTransition: "Outstanding! Build a production-ready token with all best practices!",
    celebrationMessage: "🎉 Phenomenal! You're now a Leo expert ready for production!",
    nextLessonTease: "Final lesson: Build a complete end-to-end DApp! 🚀",
  },

  teachingSections: [
    {
      sectionTitle: 'Security Best Practices',
      slides: [
        {
          title: 'Input Validation',
          emoji: '🔒',
          content: "Never trust external data - validate everything! Range checks: assert(fee_percent <= 100u8). Non-zero checks: assert(amount > 0u64). Authorization: Use capability records (AdminCap) as proof of permission. State validation: Check balance, account active, not paused. Overflow protection: assert(new_balance >= balance) after addition. Validate early, validate often!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `transition transfer(input: Coin, public amt: u64) -> Coin {\n    assert(amt > 0u64);\n    assert(input.amount >= amt);\n    return Coin { owner: input.owner, amount: input.amount - amt };\n}`,
              highlights: [
                { line: 2, explanation: "Non-zero check: amount must be positive" },
                { line: 3, explanation: "Balance check: prevent underflow" },
                { line: 4, explanation: "Safe subtraction after validation" }
              ]
            }
          }
        },
        {
          title: 'Access Control Patterns',
          emoji: '👮',
          content: "Capability-based: Use records like MinterCap, BurnerCap as proof of permission. Role-based: Store roles in mappings (0=user, 1=admin, 2=super_admin). Ownership verification: Only the owner of a record can use it (implicit). Multi-sig: Require multiple Approval records, verify unique approvers. Capability = possession proves permission!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `record AdminCap {\n    owner: address\n}\n\ntransition mint(cap: AdminCap, to: address, amt: u64) -> (AdminCap, Future) {\n    return (cap, finalize_mint(to, amt));\n}`,
              highlights: [
                { line: 1, explanation: "Capability record = proof of permission" },
                { line: 5, explanation: "Must possess AdminCap to call mint" },
                { line: 6, explanation: "Return cap so it can be reused" }
              ]
            }
          }
        },
        {
          title: 'Preventing Common Bugs',
          emoji: '🐛',
          content: "Integer underflow: Always assert(balance >= amount) before subtraction. Uninitialized mappings: Use get_or_use() with explicit defaults. Type confusion: Use descriptive names (sender/receiver, not a/b). Related state: Update all related mappings (balance AND total_supply). Prevention checklist: Check balances before subtraction, validate all inputs, use descriptive names, update all related state, test edge cases!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Underflow", content: "assert(balance >= amount) BEFORE subtraction!" },
                { label: "Uninitialized", content: "Use get_or_use(key, default) for safe defaults" },
                { label: "State Sync", content: "Update ALL related mappings together (atomic!)" }
              ]
            }
          }
        },
      ],
      exerciseId: 'mc-leo-016',
    },
    {
      sectionTitle: 'Optimization Techniques',
      slides: [
        {
          title: 'Gas Optimization',
          emoji: '⚡',
          content: "Minimize state reads/writes: Batch calculations instead of multiple mapping operations. Use appropriate types: u8 for counters (0-255), u64 for balances, u128 only for very large numbers. Combine operations: Single transition instead of multiple calls. Early returns: Check cheapest conditions first, exit before expensive operations. Avoid redundant checks: Each assertion costs gas!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Type Optimization", content: "Use smallest type: u8 (0-255), u16 (0-65K), u32, u64, u128 - smaller is cheaper!" },
                { label: "Batch Operations", content: "Read once, calculate multiple times, write once - don't repeat mapping ops" },
                { label: "Early Returns", content: "Check cheapest conditions first (amount > 0) before expensive ones (mapping reads)" }
              ]
            }
          }
        },
      ],
      exerciseId: 'cc-leo-017',
    },
    {
      sectionTitle: 'Production Patterns',
      slides: [
        {
          title: 'Upgradeable Contracts',
          emoji: '🔄',
          content: "Version control: Store contract_version in mapping, verify new version > old version. Circuit breaker (Pause): Emergency pause mechanism stops all operations, mapping paused: u8 => bool, check assert_eq(is_paused, false) in functions. Feature flags: Enable/disable features individually (transfers, minting, burning). Design for the future!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `mapping paused: u8 => bool;\n\nasync function finalize_transfer(from: address, to: address, amt: u64) {\n    let is_paused = Mapping::get_or_use(paused, 0u8, false);\n    assert_eq(is_paused, false);\n    // ... rest of transfer logic\n}`,
              highlights: [
                { line: 1, explanation: "Circuit breaker mapping - emergency pause control" },
                { line: 5, explanation: "Check if paused - stops all operations if true" },
                { line: 6, explanation: "Only proceed if contract is not paused" }
              ]
            }
          }
        },
        {
          title: 'Testing Strategy',
          emoji: '🧪',
          content: "Test categories: Unit tests (individual transitions), Integration tests (multi-step workflows), Security tests (overflow/underflow/auth). Checklist: Happy path (normal operations), Edge cases (zero amounts, max amounts, first/last), Error cases (insufficient balance, unauthorized, invalid inputs), State consistency (balances sum to total). Test before deploying!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Happy Path", content: "Test normal flows: create → mint → transfer → burn. Everything works as expected!" },
                { label: "Edge Cases", content: "Test boundaries: 0 amount, MAX amount, first user, last choice, empty state" },
                { label: "Security Tests", content: "Try to break it: overflow, underflow, unauthorized access, double spend" },
                { label: "State Consistency", content: "Verify invariants: total_supply == sum(balances), counts match, no orphans" }
              ]
            }
          }
        },
      ],
      exerciseId: 'bf-leo-018',
    },
  ],

  quiz: [
    {
      question: 'What is the most important security practice when subtracting from balances?',
      options: [
        'Use u128 instead of u64',
        'Always check that balance >= amount first',
        'Use private variables',
        'Multiply before dividing',
      ],
      correctAnswer: 1,
      explanation: 'Always assert that the balance is greater than or equal to the amount before subtraction to prevent underflow. This is critical for maintaining correct state.',
    },
    {
      question: 'What is a capability-based access control pattern?',
      options: [
        'Checking permissions in a mapping',
        'Using records as proof of permission',
        'Storing passwords on-chain',
        'Using public/private keywords',
      ],
      correctAnswer: 1,
      explanation: 'Capability-based access control uses special records (like AdminCap) as proof of permission. Only those who possess the capability record can perform the action.',
    },
    {
      question: 'Which type should you use for a simple counter (0-255)?',
      options: [
        'u128',
        'u64',
        'u32',
        'u8',
      ],
      correctAnswer: 3,
      explanation: 'Use the smallest type that fits your data. For values 0-255, u8 is most efficient. This reduces computation costs and storage requirements.',
    },
    {
      question: 'What is a circuit breaker pattern?',
      options: [
        'A way to close electrical circuits',
        'An emergency pause mechanism to stop all operations',
        'A method to break infinite loops',
        'A debugging tool',
      ],
      correctAnswer: 1,
      explanation: 'The circuit breaker (pause) pattern allows admins to emergency stop all contract operations in case of a security issue or bug. It\'s a critical safety mechanism.',
    },
    {
      question: 'Why should you avoid redundant assertions?',
      options: [
        'They make code harder to read',
        'They increase gas costs without adding value',
        'They can cause compile errors',
        'Leo doesn\'t allow multiple assertions',
      ],
      correctAnswer: 1,
      explanation: 'Redundant assertions waste computational resources and increase transaction costs. Each assertion has a cost, so eliminate duplicates while maintaining safety.',
    },
  ],
  quizPassThreshold: 0.8,

  starterCode: `program production_token.aleo {
    record AdminCap {
        owner: address,
    }

    mapping balances: address => u64;
    mapping total_supply: u8 => u64;
    mapping paused: u8 => bool;

    // TODO: Create async transition 'pause' that:
    // - Takes: admin_cap (AdminCap)
    // - Returns: (AdminCap, Future)
    // - Calls finalize_pause()

    // TODO: Create async function 'finalize_pause' that:
    // - Sets paused mapping to true

    // TODO: Create async transition 'mint' that:
    // - Takes: admin_cap (AdminCap), receiver (address), amount (u64)
    // - Validates amount > 0 and amount <= 1000000u64
    // - Returns: (AdminCap, Future)
    // - Calls finalize_mint

    // TODO: Create async function 'finalize_mint' that:
    // - Checks contract is not paused
    // - Gets receiver balance (default 0)
    // - Calculates new balance with overflow check
    // - Updates receiver balance
    // - Updates total supply with overflow check

    // TODO: Create async transition 'transfer' that:
    // - Takes: sender (address), receiver (address), amount (u64)
    // - Validates amount > 0
    // - Returns: Future
    // - Calls finalize_transfer

    // TODO: Create async function 'finalize_transfer' that:
    // - Checks contract is not paused
    // - Validates sender has sufficient balance
    // - Deducts from sender
    // - Adds to receiver
    // - (Total supply should remain unchanged)
}`,

  solution: `program production_token.aleo {
    record AdminCap {
        owner: address,
    }

    mapping balances: address => u64;
    mapping total_supply: u8 => u64;
    mapping paused: u8 => bool;

    async transition pause(admin_cap: AdminCap) -> (AdminCap, Future) {
        return (admin_cap, finalize_pause());
    }

    async function finalize_pause() {
        Mapping::set(paused, 0u8, true);
    }

    async transition mint(
        admin_cap: AdminCap,
        public receiver: address,
        public amount: u64
    ) -> (AdminCap, Future) {
        assert(amount > 0u64);
        assert(amount <= 1000000u64);

        return (admin_cap, finalize_mint(receiver, amount));
    }

    async function finalize_mint(receiver: address, amount: u64) {
        let is_paused = Mapping::get_or_use(paused, 0u8, false);
        assert_eq(is_paused, false);

        let balance = Mapping::get_or_use(balances, receiver, 0u64);
        let new_balance = balance + amount;
        assert(new_balance >= balance);
        Mapping::set(balances, receiver, new_balance);

        let supply = Mapping::get_or_use(total_supply, 0u8, 0u64);
        let new_supply = supply + amount;
        assert(new_supply >= supply);
        Mapping::set(total_supply, 0u8, new_supply);
    }

    async transition transfer(
        public sender: address,
        public receiver: address,
        public amount: u64
    ) -> Future {
        assert(amount > 0u64);

        return finalize_transfer(sender, receiver, amount);
    }

    async function finalize_transfer(
        sender: address,
        receiver: address,
        amount: u64
    ) {
        let is_paused = Mapping::get_or_use(paused, 0u8, false);
        assert_eq(is_paused, false);

        let sender_balance = Mapping::get(balances, sender);
        assert(sender_balance >= amount);
        Mapping::set(balances, sender, sender_balance - amount);

        let receiver_balance = Mapping::get_or_use(balances, receiver, 0u64);
        Mapping::set(balances, receiver, receiver_balance + amount);
    }
}`,

  hints: [
    "Check overflow by asserting new_value >= old_value after addition",
    "Use assert_eq(is_paused, false) to verify contract is not paused",
    "Validate amount > 0 in the transition before calling finalize",
    "Use Mapping::get_or_use() for balances that might not exist",
    "Always check sender balance >= amount before subtraction",
  ],
};

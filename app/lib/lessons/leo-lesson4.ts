import { LessonContent } from '@/app/types/lesson';

export const leoLesson4: LessonContent = {
  id: 'leo-4',
  title: 'Mappings & State Management',
  description: 'Learn how to manage public on-chain state using mappings in Leo programs',
  difficulty: 'intermediate',
  xpReward: 250,
  order: 4,
  prerequisiteLessons: ['leo-1', 'leo-2', 'leo-3'],

  narrative: {
    welcomeMessage: "Time to master on-chain state! Let's learn about mappings! 🗃️",
    quizTransition: "Great work with mappings! Let's verify your knowledge...",
    practiceTransition: "Perfect! Now build a reputation system with global state!",
    celebrationMessage: "🎉 Awesome! You can now manage complex on-chain state in Leo!",
    nextLessonTease: "Next up: Master finalize blocks and asynchronous operations! ⚡",
  },

  teachingSections: [
    {
      sectionTitle: 'Introduction to Mappings',
      slides: [
        {
          title: 'What are Mappings?',
          emoji: '🗺️',
          content: "Mappings are Leo's way of storing public, permanent data on the blockchain. Think of them as a global database! Syntax: mapping balances: address => u64. Records are private & ephemeral (like your wallet), mappings are public & permanent (like a public ledger). Use mappings for user balances, counters, whitelists, voting tallies, and NFT metadata!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `program token.aleo {\n    mapping balances: address => u64;\n    mapping total_supply: u8 => u64;\n}`,
              highlights: [
                { line: 2, explanation: "Mapping: key (address) → value (u64)" },
                { line: 3, explanation: "Public and permanent on blockchain" }
              ]
            }
          }
        },
        {
          title: 'Declaring Mappings',
          emoji: '📝',
          content: "Declare mappings at the program level: mapping balances: address => u64. Keys can be address, field, integers, or bool. Values can be all key types plus structs! You can have multiple mappings per program. Use descriptive names like 'balances', 'total_supply', 'user_scores' - they're on-chain forever!",
          interactiveElement: {
            type: 'drag-drop',
            config: {
              items: [
                { id: 'balances', label: 'balances', emoji: '💰' },
                { id: 'whitelist', label: 'whitelist', emoji: '✅' },
                { id: 'scores', label: 'scores', emoji: '🎯' },
                { id: 'metadata', label: 'nft_data', emoji: '🖼️' }
              ],
              targets: [
                { id: 'token', label: 'Token Balances' },
                { id: 'access', label: 'Access Control' },
                { id: 'game', label: 'Game Scores' },
                { id: 'nft', label: 'NFT Info' }
              ],
              correctPairs: [
                { itemId: 'balances', targetId: 'token' },
                { itemId: 'whitelist', targetId: 'access' },
                { itemId: 'scores', targetId: 'game' },
                { itemId: 'metadata', targetId: 'nft' }
              ]
            }
          }
        },
      ],
      exerciseId: 'mc-leo-010',
    },
    {
      sectionTitle: 'Working with Mappings',
      slides: [
        {
          title: 'Reading from Mappings',
          emoji: '👀',
          content: "Use Mapping::get() to read values, but ONLY in finalize blocks! Syntax: let balance = Mapping::get(balances, user). For missing keys, get() returns 0 for numbers. Use get_or_use() to specify a custom default. Check existence with Mapping::contains(). Remember: You can't read mappings in regular transitions, only in async finalize blocks!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `async function finalize_check(user: address) {\n    let balance = Mapping::get(balances, user);\n    let score = Mapping::get_or_use(scores, user, 0u32);\n}`,
              highlights: [
                { line: 2, explanation: "get() returns 0 if key doesn't exist" },
                { line: 3, explanation: "get_or_use() specifies custom default value" }
              ]
            }
          }
        },
        {
          title: 'Writing to Mappings',
          emoji: '✍️',
          content: "Use Mapping::set() to write values (only in finalize!). Update pattern: Read current value, calculate new value, write new value. Remove keys with Mapping::remove(). Example: let balance = Mapping::get(balances, user); Mapping::set(balances, user, balance + amount). All mapping operations happen in finalize blocks only!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `async function finalize_add(user: address, amount: u64) {\n    let balance = Mapping::get_or_use(balances, user, 0u64);\n    Mapping::set(balances, user, balance + amount);\n}`,
              highlights: [
                { line: 2, explanation: "Read current value (or default 0)" },
                { line: 3, explanation: "Set new value = old + amount" }
              ]
            }
          }
        },
        {
          title: 'Mapping Patterns',
          emoji: '🎯',
          content: "Common patterns: Counter (single key incrementing), Whitelist (address => bool), Token Balance (deduct from sender, add to receiver), NFT Ownership (token_id => owner + counts). Always validate before deducting! Use assert() to check balances. Update all related mappings together to keep state consistent!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Counter", content: "let count = get(counter, 0u8); set(counter, 0u8, count + 1u64);" },
                { label: "Whitelist", content: "mapping whitelist: address => bool; Check access control!" },
                { label: "Token Transfer", content: "Deduct from sender, add to receiver - atomic updates!" }
              ]
            }
          }
        },
      ],
      exerciseId: 'cc-leo-011',
    },
    {
      sectionTitle: 'Advanced State Management',
      slides: [
        {
          title: 'Complex Key Construction',
          emoji: '🔑',
          content: "Create composite keys using hashing for multi-dimensional mappings. Example: Store allowances (owner + spender) by hashing both together into a single field key. Use BHP256::hash_to_field() to combine multiple values. Pattern: let key = BHP256::hash_to_field(player) + (level as field). Perfect for game scores, nested permissions, and complex state!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `function create_key(owner: address, spender: address) -> field {\n    let owner_field = BHP256::hash_to_field(owner);\n    let spender_field = BHP256::hash_to_field(spender);\n    return owner_field + spender_field;\n}`,
              highlights: [
                { line: 2, explanation: "Hash address to field for combining" },
                { line: 4, explanation: "Composite key = owner + spender combined" }
              ]
            }
          }
        },
        {
          title: 'State Consistency Patterns',
          emoji: '⚖️',
          content: "Keep related mappings in sync! When minting, update both user balance AND total_supply. When transferring, update sender AND receiver. Finalize blocks are atomic - either all updates succeed or all fail. Check invariants: total supply should equal sum of balances. Use assertions to verify consistency!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Atomic Updates", content: "All mapping updates in finalize succeed together or fail together" },
                { label: "Mint Pattern", content: "Update user balance + total_supply together" },
                { label: "Transfer Pattern", content: "Deduct from sender + Add to receiver atomically" }
              ]
            }
          }
        },
      ],
      exerciseId: 'bf-leo-012',
    },
  ],

  quiz: [
    {
      question: 'What is the main difference between records and mappings?',
      options: [
        'Records are faster than mappings',
        'Mappings are always public and permanent, records are private and ephemeral',
        'Mappings can only store numbers',
        'Records cannot be used in transitions',
      ],
      correctAnswer: 1,
      explanation: 'Mappings store public, permanent on-chain state accessible to everyone. Records represent private, owned state that can be consumed and created. Use mappings for global state, records for private assets.',
    },
    {
      question: 'Where can you read from or write to a mapping?',
      options: [
        'Anywhere in your program',
        'Only in transitions',
        'Only in async finalize blocks',
        'Only in helper functions',
      ],
      correctAnswer: 2,
      explanation: 'Mapping operations (get, set, remove) can only be performed inside async finalize blocks. This ensures state changes happen after the transaction is validated.',
    },
    {
      question: 'What happens when you use Mapping::get() on a key that doesn\'t exist?',
      options: [
        'It throws an error',
        'It returns null',
        'It returns the default value for that type (e.g., 0 for numbers)',
        'The program crashes',
      ],
      correctAnswer: 2,
      explanation: 'Mapping::get() returns the default value for the type if the key doesn\'t exist. For numbers this is 0, for booleans it\'s false. Use Mapping::get_or_use() to specify a custom default.',
    },
    {
      question: 'Can you have multiple mappings in a single Leo program?',
      options: [
        'No, only one mapping per program',
        'Yes, you can declare multiple mappings',
        'Yes, but only if they have different value types',
        'No, you must use nested mappings instead',
      ],
      correctAnswer: 1,
      explanation: 'Yes! You can declare as many mappings as you need in a program. It\'s common to have multiple mappings for different aspects of state (balances, allowances, metadata, etc).',
    },
    {
      question: 'Why must mapping operations be in finalize blocks?',
      options: [
        'For better performance',
        'To ensure state changes only occur after validation',
        'Because of Leo syntax requirements',
        'To make code more readable',
      ],
      correctAnswer: 1,
      explanation: 'Finalize blocks execute after the transition is validated, ensuring that state changes only happen if the entire transaction is valid. This prevents inconsistent state.',
    },
  ],
  quizPassThreshold: 0.8,

  starterCode: `program reputation_system.aleo {
    // TODO: Declare a mapping 'scores' that maps address to u32

    // TODO: Declare a mapping 'total_users' that maps u8 to u64 (for counting)

    // TODO: Create an async transition 'register_user' that:
    // - Takes public parameter: user (address)
    // - Returns a Future for finalize_register

    // TODO: Create async function 'finalize_register' that:
    // - Sets the user's score to 0u32
    // - Increments total_users count

    // TODO: Create an async transition 'add_points' that:
    // - Takes public parameters: user (address), points (u32)
    // - Returns a Future for finalize_add_points

    // TODO: Create async function 'finalize_add_points' that:
    // - Gets current score for user (default 0)
    // - Adds points to current score
    // - Sets the new score

    // TODO: Create an async transition 'transfer_points' that:
    // - Takes public parameters: from (address), to (address), points (u32)
    // - Returns a Future for finalize_transfer

    // TODO: Create async function 'finalize_transfer' that:
    // - Deducts points from 'from' user (assert sufficient points)
    // - Adds points to 'to' user
}`,

  solution: `program reputation_system.aleo {
    mapping scores: address => u32;
    mapping total_users: u8 => u64;

    async transition register_user(public user: address) -> Future {
        return finalize_register(user);
    }

    async function finalize_register(user: address) {
        Mapping::set(scores, user, 0u32);

        let count = Mapping::get_or_use(total_users, 0u8, 0u64);
        Mapping::set(total_users, 0u8, count + 1u64);
    }

    async transition add_points(
        public user: address,
        public points: u32
    ) -> Future {
        return finalize_add_points(user, points);
    }

    async function finalize_add_points(user: address, points: u32) {
        let current_score = Mapping::get_or_use(scores, user, 0u32);
        Mapping::set(scores, user, current_score + points);
    }

    async transition transfer_points(
        public from: address,
        public to: address,
        public points: u32
    ) -> Future {
        return finalize_transfer(from, to, points);
    }

    async function finalize_transfer(
        from: address,
        to: address,
        points: u32
    ) {
        let from_score = Mapping::get(scores, from);
        assert(from_score >= points);
        Mapping::set(scores, from, from_score - points);

        let to_score = Mapping::get_or_use(scores, to, 0u32);
        Mapping::set(scores, to, to_score + points);
    }
}`,

  hints: [
    "Mapping declarations go at the program level, before transitions",
    "Use 'async transition' and return a Future for finalize functions",
    "Async finalize functions use 'async function' keyword",
    "Use Mapping::get_or_use() to provide a default value for missing keys",
    "Always assert conditions before deducting from balances",
  ],
};

import { LessonContent } from '@/app/types/lesson';

export const leoLesson5: LessonContent = {
  id: 'leo-5',
  title: 'Finalize Blocks & Async',
  description: 'Master asynchronous operations and finalize blocks for advanced Leo programming',
  difficulty: 'advanced',
  xpReward: 300,
  order: 5,
  prerequisiteLessons: ['leo-1', 'leo-2', 'leo-3', 'leo-4'],

  narrative: {
    welcomeMessage: "Ready for advanced Leo? Let's master async and finalize! ⚡",
    quizTransition: "Impressive! Let's test your async knowledge...",
    practiceTransition: "Perfect! Build a complex multi-step transaction system!",
    celebrationMessage: "🎉 Outstanding! You're now an advanced Leo developer!",
    nextLessonTease: "Next up: Master advanced Leo patterns and best practices! 🏆",
  },

  teachingSections: [
    {
      sectionTitle: 'Understanding Async',
      slides: [
        {
          title: 'The Two-Phase Model',
          emoji: '🎭',
          content: "Leo uses a two-phase execution model! Phase 1 (Execution): Private computation, generates zero-knowledge proofs, consumes/creates records. Phase 2 (Finalization): Updates on-chain state, executes after validation, guaranteed atomic. Flow: User calls transition → ZK proof generated → Submit to network → Validators check → Finalize updates state. Transitions handle private computation, finalize handles public state!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Phase 1: Execution", content: "Private computation, ZK proofs, records consumed/created" },
                { label: "Phase 2: Finalize", content: "Updates on-chain state AFTER validation - atomic!" },
                { label: "Flow", content: "Call transition → Prove → Validate → Finalize state" }
              ]
            }
          }
        },
        {
          title: 'Async Transitions',
          emoji: '🔄',
          content: "Use 'async transition' when you need to update on-chain state. Syntax: async transition mint() -> Future { return finalize_mint(args); }. Then define: async function finalize_mint() { Mapping::set(...); }. Use async for: updating mappings, reading mappings, modifying on-chain state. Don't use async for: pure computation, only creating/consuming records.",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `async transition mint(public to: address, public amt: u64) -> Future {\n    return finalize_mint(to, amt);\n}\n\nasync function finalize_mint(to: address, amt: u64) {\n    let bal = Mapping::get_or_use(balances, to, 0u64);\n    Mapping::set(balances, to, bal + amt);\n}`,
              highlights: [
                { line: 1, explanation: "'async transition' for state updates" },
                { line: 2, explanation: "Return Future - promise of finalization" },
                { line: 5, explanation: "'async function' for finalize logic" },
                { line: 6, explanation: "Mapping operations ONLY in finalize" }
              ]
            }
          }
        },
        {
          title: 'Future Type',
          emoji: '🔮',
          content: "Future represents work that will be done in the finalize phase. Think of it as a 'promise of finalization'. You don't manually execute futures - Leo does it automatically! Return types: Future (only finalize), (MyRecord, Future) (record + finalize), or multiple records + Future. Futures can't be stored in structs or records!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "What is Future?", content: "Promise of work to be done in finalize phase after validation" },
                { label: "Return Types", content: "Future | (Record, Future) | (Record, Record, Future)" },
                { label: "Auto-Execution", content: "Leo automatically executes futures - you don't call them!" }
              ]
            }
          }
        },
      ],
      exerciseId: 'mc-leo-013',
    },
    {
      sectionTitle: 'Finalize Blocks',
      slides: [
        {
          title: 'Finalize Function Rules',
          emoji: '📜',
          content: "Allowed in finalize: Mapping operations (get/set/remove), arithmetic, assertions, control flow (if/else), and loops with constant bounds. NOT allowed: Creating records, accessing record fields, calling other transitions, or private parameters. All finalize parameters are implicitly public. Finalize functions return nothing!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Allowed", content: "Mapping ops, arithmetic, assertions, if/else, loops (constant bounds)" },
                { label: "NOT Allowed", content: "Creating records, accessing record fields, private parameters" },
                { label: "Returns", content: "Finalize functions return NOTHING - they update state only" }
              ]
            }
          }
        },
        {
          title: 'Atomic Finalization',
          emoji: '⚛️',
          content: "Finalize blocks are atomic - all or nothing execution! If any assertion fails, the ENTIRE transaction is rolled back. No partial updates! This ensures state is always consistent. Use assertions to protect invariants. Example: If balance check fails, neither sender nor receiver balances are updated. State is always valid!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `async function finalize_transfer(from: address, to: address, amt: u64) {\n    let from_bal = Mapping::get(balances, from);\n    assert(from_bal >= amt);\n    Mapping::set(balances, from, from_bal - amt);\n    let to_bal = Mapping::get_or_use(balances, to, 0u64);\n    Mapping::set(balances, to, to_bal + amt);\n}`,
              highlights: [
                { line: 3, explanation: "Assert checks - if fails, ALL is rolled back" },
                { line: 4, explanation: "Deduct from sender" },
                { line: 6, explanation: "Add to receiver - atomic with deduction!" }
              ]
            }
          }
        },
      ],
      exerciseId: 'cc-leo-014',
    },
    {
      sectionTitle: 'Advanced Patterns',
      slides: [
        {
          title: 'Multi-Step Workflows',
          emoji: '🔗',
          content: "Build complex workflows with async functions! Sequential updates: Get reward amount → Get stake → Calculate new reward → Reset rewards to 0 → Add to stake → Update total. Conditional branches: Check score, assign tier (Gold/Silver/Bronze), set discount rate. Batch operations: Distribute rewards to multiple users in loops. All steps are atomic!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `async function finalize_claim_rewards(user: address) {\n    let rewards = Mapping::get(pending_rewards, user);\n    let stake = Mapping::get_or_use(staked, user, 0u64);\n    Mapping::set(pending_rewards, user, 0u64);\n    Mapping::set(staked, user, stake + rewards);\n}`,
              highlights: [
                { line: 2, explanation: "Step 1: Get pending rewards" },
                { line: 3, explanation: "Step 2: Get current stake" },
                { line: 4, explanation: "Step 3: Reset rewards to 0" },
                { line: 5, explanation: "Step 4: Add rewards to stake - all atomic!" }
              ]
            }
          }
        },
      ],
      exerciseId: 'bf-leo-015',
    },
  ],

  quiz: [
    {
      question: 'What are the two phases of Leo transaction execution?',
      options: [
        'Compile and run',
        'Execution (transition) and finalization',
        'Private and public',
        'Input and output',
      ],
      correctAnswer: 1,
      explanation: 'Leo uses a two-phase model: Execution (transition) handles private computation and generates zero-knowledge proofs, while finalization handles on-chain state updates after validation.',
    },
    {
      question: 'Can you access record fields inside a finalize function?',
      options: [
        'Yes, all record fields are accessible',
        'Yes, but only public fields',
        'No, finalize functions cannot work with records',
        'Yes, but only if the record is passed as a parameter',
      ],
      correctAnswer: 2,
      explanation: 'Finalize functions cannot work with records at all. They can only access public parameters and mapping data. Records are handled in the execution phase (transitions).',
    },
    {
      question: 'What happens if an assertion fails in a finalize block?',
      options: [
        'Only that assertion is skipped',
        'The program continues with a warning',
        'The entire transaction is rolled back - nothing happens',
        'The mapping updates before the assertion are kept',
      ],
      correctAnswer: 2,
      explanation: 'Finalize blocks are atomic. If any assertion fails, the entire transaction is invalid and rolled back. This ensures state consistency - you never get partial updates.',
    },
    {
      question: 'What does the Future type represent in Leo?',
      options: [
        'A delay timer',
        'A promise of finalization work to be done after validation',
        'An asynchronous callback',
        'A scheduled task',
      ],
      correctAnswer: 1,
      explanation: 'Future represents work that will be executed in the finalize phase after the transaction is validated. It\'s Leo\'s way of scheduling on-chain state updates.',
    },
    {
      question: 'Can finalize function parameters be marked as private?',
      options: [
        'Yes, all privacy modifiers work',
        'Yes, but only for address types',
        'No, all finalize parameters are implicitly public',
        'Yes, if the transition is async',
      ],
      correctAnswer: 2,
      explanation: 'Finalize functions work with public data only. All parameters are implicitly public because finalize operates on on-chain state that must be publicly verifiable.',
    },
  ],
  quizPassThreshold: 0.8,

  starterCode: `program escrow.aleo {
    record EscrowDeposit {
        owner: address,
        amount: u64,
        public escrow_id: field,
    }

    mapping escrow_status: field => bool;  // true = completed
    mapping escrow_amounts: field => u64;

    // TODO: Create async transition 'create_escrow' that:
    // - Takes: buyer (address), amount (u64), escrow_id (field)
    // - Returns: (EscrowDeposit record, Future)
    // - Creates a deposit record for the buyer
    // - Calls finalize_create to set escrow status to false and store amount

    // TODO: Create async function 'finalize_create' that:
    // - Takes: escrow_id (field), amount (u64)
    // - Sets escrow_status[escrow_id] = false (not completed)
    // - Sets escrow_amounts[escrow_id] = amount

    // TODO: Create async transition 'complete_escrow' that:
    // - Takes: deposit (EscrowDeposit), seller (address)
    // - Returns: (new EscrowDeposit record for seller, Future)
    // - Transfers ownership to seller
    // - Calls finalize_complete to mark as completed

    // TODO: Create async function 'finalize_complete' that:
    // - Takes: escrow_id (field)
    // - Asserts escrow is not already completed
    // - Sets escrow_status[escrow_id] = true
}`,

  solution: `program escrow.aleo {
    record EscrowDeposit {
        owner: address,
        amount: u64,
        public escrow_id: field,
    }

    mapping escrow_status: field => bool;
    mapping escrow_amounts: field => u64;

    async transition create_escrow(
        public buyer: address,
        public amount: u64,
        public escrow_id: field
    ) -> (EscrowDeposit, Future) {
        let deposit = EscrowDeposit {
            owner: buyer,
            amount: amount,
            escrow_id: escrow_id,
        };

        return (deposit, finalize_create(escrow_id, amount));
    }

    async function finalize_create(escrow_id: field, amount: u64) {
        Mapping::set(escrow_status, escrow_id, false);
        Mapping::set(escrow_amounts, escrow_id, amount);
    }

    async transition complete_escrow(
        deposit: EscrowDeposit,
        public seller: address
    ) -> (EscrowDeposit, Future) {
        let seller_deposit = EscrowDeposit {
            owner: seller,
            amount: deposit.amount,
            escrow_id: deposit.escrow_id,
        };

        return (seller_deposit, finalize_complete(deposit.escrow_id));
    }

    async function finalize_complete(escrow_id: field) {
        let is_completed = Mapping::get_or_use(escrow_status, escrow_id, false);
        assert_eq(is_completed, false);

        Mapping::set(escrow_status, escrow_id, true);
    }
}`,

  hints: [
    "Async transitions return a tuple: (record outputs, Future)",
    "Async functions use 'async function' keyword",
    "Finalize functions cannot access record fields",
    "Use assert_eq() to check that escrow is not already completed",
    "Pass the escrow_id as a public field in the record so finalize can access it",
  ],
};

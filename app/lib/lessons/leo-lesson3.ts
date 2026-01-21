import { LessonContent } from '@/app/types/lesson';

export const leoLesson3: LessonContent = {
  id: 'leo-3',
  title: 'Structs & Records',
  description: 'Build custom data types with structs and create private state with records in Leo',
  difficulty: 'intermediate',
  xpReward: 200,
  order: 3,
  prerequisiteLessons: ['leo-1', 'leo-2'],

  narrative: {
    welcomeMessage: "Time to create custom data types! Let's master structs and records! 📦",
    quizTransition: "Excellent understanding of data structures! Let's test it...",
    practiceTransition: "Perfect! Now build a private token system with records!",
    celebrationMessage: "🎉 Incredible! You can now build complex private data structures in Leo!",
    nextLessonTease: "Next up: Learn about mappings and on-chain state management! 🗃️",
  },

  teachingSections: [
    {
      sectionTitle: 'Structs in Leo',
      slides: [
        {
          title: 'What are Structs?',
          emoji: '📦',
          content: "Structs let you group related data together into a single type. Think of them as custom containers! Syntax: struct Token { name: field, symbol: field, decimals: u8, total_supply: u64 }. Structs are perfect for organizing data (like token info), while records are for private ownership. Structs = data grouping, Records = private assets!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `struct Token {\n    name: field,\n    symbol: field,\n    decimals: u8,\n    total_supply: u64\n}`,
              highlights: [
                { line: 1, explanation: "struct keyword defines a custom data type" },
                { line: 2, explanation: "Fields can be any Leo type (field, integers, etc)" },
                { line: 5, explanation: "Group related data into a single container" }
              ]
            }
          }
        },
        {
          title: 'Working with Structs',
          emoji: '🔧',
          content: "Create structs with curly braces: Point { x: 10, y: 20 }. Access fields using dot notation: point.x. Important: Leo structs are immutable, so you can't modify them directly - create new instances instead! You can nest structs too: Rectangle { top_left: Point {...}, bottom_right: Point {...} }. Access nested fields: rect.top_left.x.",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `struct Point {\n    x: u32,\n    y: u32\n}\n\ntransition create_point(public x: u32, public y: u32) -> Point {\n    return Point { x: x, y: y };\n}`,
              highlights: [
                { line: 7, explanation: "Create struct instance with field values" },
                { line: 7, explanation: "Access: point.x returns the x field value" }
              ]
            }
          }
        },
        {
          title: 'Advanced Struct Patterns',
          emoji: '🎯',
          content: "Use structs for configuration objects (SwapConfig with fee settings), result types (Result with success/value/error), and user profiles (UserProfile with reputation/trades/tier). Structs make complex data easy to manage and pass around. They're self-documenting and type-safe - the compiler catches mistakes before deployment!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Config Objects", content: "struct SwapConfig { fee_percent: u8, slippage: u8, deadline: u64 }" },
                { label: "User Profiles", content: "struct UserProfile { reputation: u32, total_trades: u64, tier: u8 }" },
                { label: "Nested Structs", content: "struct NFT { metadata: Metadata, owner_info: OwnerData }" }
              ]
            }
          }
        },
      ],
      exerciseId: 'mc-leo-007',
    },
    {
      sectionTitle: 'Records - Private State',
      slides: [
        {
          title: 'Introduction to Records',
          emoji: '🔐',
          content: "Records are Leo's secret weapon for private ownership! They're like private digital assets - data is encrypted, only the owner can see it. Every record MUST have an 'owner: address' field. Records use the UTXO model (like Bitcoin) where they're consumed and created, not modified. Privacy is the default - your balances, trades, and positions stay completely private!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `record Coin {\n    owner: address,\n    amount: u64\n}`,
              highlights: [
                { line: 1, explanation: "'record' keyword - represents private ownership" },
                { line: 2, explanation: "owner field is REQUIRED in every record" },
                { line: 3, explanation: "Private by default - only owner can see amount" }
              ]
            }
          }
        },
        {
          title: 'Creating Records',
          emoji: '✨',
          content: "Create records by returning them from transitions: return Coin { owner: receiver, amount: 100u64 }. Records are CONSUMED when used as inputs - they can't be reused! Think of it like spending cash: you give your $100 bill (consumed), get $60 for Bob (new record) and $40 change (another new record). Records are never modified, only consumed and recreated!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `transition transfer(\n    input: Coin,\n    public receiver: address,\n    public amount: u64\n) -> (Coin, Coin) {\n    let change = Coin { owner: input.owner, amount: input.amount - amount };\n    let output = Coin { owner: receiver, amount: amount };\n    return (change, output);\n}`,
              highlights: [
                { line: 2, explanation: "Input record is CONSUMED (can't be reused)" },
                { line: 6, explanation: "Create change record for sender" },
                { line: 7, explanation: "Create output record for receiver" },
                { line: 8, explanation: "Return two new records (UTXO model)" }
              ]
            }
          }
        },
        {
          title: 'Record Privacy Levels',
          emoji: '🎭',
          content: "Record fields are private by default. Want something public? Mark it with the 'public' keyword: public transaction_id: field. Mix and match for power! Example: Vote record with private choice (secret ballot) but public vote_id (proves you voted). Keep amounts/balances private, make IDs/timestamps public for verification. Privacy by default, publicity by choice!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `record Vote {\n    owner: address,\n    choice: u8,              // PRIVATE\n    public vote_id: field    // PUBLIC\n}`,
              highlights: [
                { line: 3, explanation: "Private field - only owner knows their choice" },
                { line: 4, explanation: "Public field - everyone can see vote_id" }
              ]
            }
          }
        },
        {
          title: 'Advanced Record Patterns',
          emoji: '🏗️',
          content: "Private NFTs: public token_id + collection, but private rarity (reveal later if you want!). Vesting tokens: private amount with public unlock_time so everyone can verify it's locked. Multi-token portfolios: one record holding multiple balances for atomic swaps. Design records like real-world valuables - they represent assets you own and control!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Private NFT", content: "record NFT { owner: address, public token_id: u64, rarity: u8 }" },
                { label: "Vesting Token", content: "record VestToken { owner: address, amount: u64, public unlock_time: u64 }" },
                { label: "Portfolio", content: "record Portfolio { owner: address, token_a: u64, token_b: u64 }" }
              ]
            }
          }
        },
      ],
      exerciseId: 'cc-leo-008',
    },
    {
      sectionTitle: 'Practical Applications',
      slides: [
        {
          title: 'Building a Private Token',
          emoji: '🪙',
          content: "Let's build a complete private token! Mint creates new tokens. Transfer consumes input, creates two outputs (recipient + change). Join combines multiple tokens into one. Burn consumes a token without returning anything (destroyed!). Privacy features: only you know your balance, transfers don't reveal amounts, and zero-knowledge proofs verify everything's legit!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Mint", content: "Creates new token records from nothing (admin only)" },
                { label: "Transfer", content: "Consumes 1 input → creates 2 outputs (recipient + change)" },
                { label: "Join", content: "Consumes 2 inputs → creates 1 combined output" },
                { label: "Burn", content: "Consumes token without creating output (destroyed!)" }
              ]
            }
          }
        },
        {
          title: 'Struct + Record Combo',
          emoji: '🤝',
          content: "Power combo: Use structs for public config (NFTMetadata with collection/royalty/creator) and records for private ownership (NFT record with owner). Structs go inside records! When you purchase an NFT, automatically split payment between seller and creator (royalties). Design pattern: Struct for configuration, Record for value!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `struct Metadata {\n    collection: field,\n    royalty_percent: u8\n}\n\nrecord NFT {\n    owner: address,\n    public token_id: u64,\n    metadata: Metadata\n}`,
              highlights: [
                { line: 1, explanation: "Struct for public configuration data" },
                { line: 6, explanation: "Record for private ownership" },
                { line: 9, explanation: "Embed struct inside record for power combo!" }
              ]
            }
          }
        },
      ],
      exerciseId: 'bf-leo-009',
    },
  ],

  quiz: [
    {
      question: 'What is the key difference between a struct and a record in Leo?',
      options: [
        'Structs are faster than records',
        'Records have an owner field and represent private, owned state',
        'Structs can only hold public data',
        'Records cannot be used as function parameters',
      ],
      correctAnswer: 1,
      explanation: 'Records are special types that represent private, owned state on the blockchain. They must have an owner field and follow the UTXO model where records are consumed and created.',
    },
    {
      question: 'What happens to a record when it\'s used as input to a transition?',
      options: [
        'It is modified in place',
        'It is copied for reuse',
        'It is consumed (destroyed) and cannot be used again',
        'It is locked until the transition completes',
      ],
      correctAnswer: 2,
      explanation: 'Records follow the UTXO model - when used as input, they are consumed/spent and cannot be reused. You must create new records as outputs.',
    },
    {
      question: 'Can you modify a struct field after creating it?',
      options: [
        'Yes, using dot notation',
        'Yes, but only in transitions',
        'No, structs are immutable - create a new one instead',
        'Yes, if you use the mut keyword',
      ],
      correctAnswer: 2,
      explanation: 'Leo structs are immutable. To "update" a struct, you create a new instance with the changed values. This is consistent with Leo\'s functional programming approach.',
    },
    {
      question: 'How do you make a record field visible to everyone on the blockchain?',
      options: [
        'All record fields are public by default',
        'Use the public keyword before the field name',
        'Records cannot have public fields',
        'Set the visibility property',
      ],
      correctAnswer: 1,
      explanation: 'Record fields are private by default. To make them public (visible to everyone), use the "public" keyword before the field name, like: public token_id: u64',
    },
    {
      question: 'Why is the owner field required in every record?',
      options: [
        'For authentication purposes',
        'To enable the UTXO ownership model',
        'For backwards compatibility',
        'It\'s not actually required',
      ],
      correctAnswer: 1,
      explanation: 'The owner field is required because records represent owned assets in Leo\'s UTXO model. The owner field determines who has the authority to spend/consume the record.',
    },
  ],
  quizPassThreshold: 0.8,

  starterCode: `program private_bank.aleo {
    // TODO: Define a record named 'BankAccount' with:
    // - owner: address
    // - balance: u64
    // - public account_id: field

    // TODO: Create a transition 'open_account' that:
    // - Takes parameters: receiver (address), initial_deposit (u64), account_id (field)
    // - Returns a new BankAccount record

    // TODO: Create a transition 'deposit' that:
    // - Takes parameters: account (BankAccount), amount (u64)
    // - Returns a new BankAccount with increased balance

    // TODO: Create a transition 'withdraw' that:
    // - Takes parameters: account (BankAccount), amount (u64)
    // - Asserts balance >= amount
    // - Returns a new BankAccount with decreased balance

    // TODO: Create a transition 'transfer' that:
    // - Takes parameters: sender_account (BankAccount), receiver_address (address), amount (u64)
    // - Returns two BankAccounts: updated sender account and new receiver account
}`,

  solution: `program private_bank.aleo {
    record BankAccount {
        owner: address,
        balance: u64,
        public account_id: field,
    }

    transition open_account(
        public receiver: address,
        public initial_deposit: u64,
        public account_id: field
    ) -> BankAccount {
        return BankAccount {
            owner: receiver,
            balance: initial_deposit,
            account_id: account_id,
        };
    }

    transition deposit(
        account: BankAccount,
        public amount: u64
    ) -> BankAccount {
        return BankAccount {
            owner: account.owner,
            balance: account.balance + amount,
            account_id: account.account_id,
        };
    }

    transition withdraw(
        account: BankAccount,
        public amount: u64
    ) -> BankAccount {
        assert(account.balance >= amount);

        return BankAccount {
            owner: account.owner,
            balance: account.balance - amount,
            account_id: account.account_id,
        };
    }

    transition transfer(
        sender_account: BankAccount,
        public receiver_address: address,
        public amount: u64
    ) -> (BankAccount, BankAccount) {
        assert(sender_account.balance >= amount);

        let updated_sender = BankAccount {
            owner: sender_account.owner,
            balance: sender_account.balance - amount,
            account_id: sender_account.account_id,
        };

        let new_receiver = BankAccount {
            owner: receiver_address,
            balance: amount,
            account_id: sender_account.account_id,
        };

        return (updated_sender, new_receiver);
    }
}`,

  hints: [
    "The owner field is always required in records",
    "Use the 'public' keyword to make record fields visible to everyone",
    "Records are immutable - create new instances instead of modifying",
    "Use assert() to check conditions before proceeding",
    "Transfer creates two outputs: updated sender account and new receiver account",
  ],
};

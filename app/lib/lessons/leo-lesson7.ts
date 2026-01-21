import { LessonContent } from '@/app/types/lesson';

export const leoLesson7: LessonContent = {
  id: 'leo-7',
  title: 'Building a Complete DApp',
  description: 'Build a full-featured decentralized voting system from scratch',
  difficulty: 'advanced',
  xpReward: 500,
  order: 7,
  prerequisiteLessons: ['leo-1', 'leo-2', 'leo-3', 'leo-4', 'leo-5', 'leo-6'],

  narrative: {
    welcomeMessage: "Final challenge! Build a complete private voting DApp! 🗳️",
    quizTransition: "Amazing work! Let's verify your full-stack Leo knowledge...",
    practiceTransition: "Perfect! Now build the complete voting system!",
    celebrationMessage: "🎉🎉🎉 CONGRATULATIONS! You're now a certified Leo developer! Deploy your first ZK DApp!",
    nextLessonTease: "You've completed all lessons! Time to build your own projects! 🚀",
  },

  teachingSections: [
    {
      sectionTitle: 'DApp Architecture',
      slides: [
        {
          title: 'Project Overview',
          emoji: '🏗️',
          content: "Build a private voting system with these features: Private voting (your choice is hidden), Public tallying (results are transparent), One person one vote (prevent double voting), Multi-proposal support (multiple elections). Architecture: VoteToken record (proves eligibility), VoteReceipt record (proves you voted), Mappings for vote counts, voter tracking, and proposal status. Privacy guarantees: Your vote choice is private, but everyone knows you voted!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Private Voting", content: "Your vote choice stays secret using private fields - only YOU know!" },
                { label: "Public Tallying", content: "Results are transparent - everyone can verify vote counts on-chain" },
                { label: "Double Vote Prevention", content: "VoteToken consumed + has_voted mapping = ironclad protection" },
                { label: "Multi-Proposal", content: "Run multiple elections simultaneously with unique proposal_ids" }
              ]
            }
          }
        },
        {
          title: 'Data Structures',
          emoji: '📊',
          content: "Records: VoteToken (owner + public proposal_id), VoteReceipt (owner + public proposal_id + private choice). Mappings: proposal_votes (field => u64 for counts), has_voted (field => bool to prevent duplicates), total_voters (field => u64 for turnout), is_active (field => bool for status). Composite keys: Use BHP256::hash_to_field() to combine proposal_id + choice for vote counts, or voter + proposal_id for tracking!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `record VoteToken {\n    owner: address,\n    public proposal_id: field\n}\n\nrecord VoteReceipt {\n    owner: address,\n    public proposal_id: field,\n    choice: u8  // PRIVATE!\n}\n\nmapping proposal_votes: field => u64;\nmapping has_voted: field => bool;`,
              highlights: [
                { line: 1, explanation: "VoteToken = eligibility proof, consumed when voting" },
                { line: 9, explanation: "Private choice field = secret ballot!" },
                { line: 12, explanation: "Composite key: hash(proposal_id + choice) for counts" },
                { line: 13, explanation: "Composite key: hash(voter + proposal_id) prevents double voting" }
              ]
            }
          }
        },
      ],
      exerciseId: 'mc-leo-019',
    },
    {
      sectionTitle: 'Implementation',
      slides: [
        {
          title: 'Admin Functions',
          emoji: '👑',
          content: "AdminCap record proves admin permission. create_proposal: Takes proposal_id and num_choices (2-10), activates proposal, initializes vote counts to 0. distribute_tokens: Creates VoteToken for eligible voters. end_voting: Deactivates proposal to stop accepting votes. All admin functions consume and return AdminCap!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "create_proposal", content: "Initialize election: set is_active=true, init vote counts to 0, setup proposal" },
                { label: "distribute_tokens", content: "Give VoteToken to eligible voters - possession = permission to vote!" },
                { label: "end_voting", content: "Close election: set is_active=false, no more votes accepted" }
              ]
            }
          }
        },
        {
          title: 'Voting Function',
          emoji: '🗳️',
          content: "cast_vote consumes VoteToken (prevents double voting!), takes private choice parameter, creates VoteReceipt (proof you voted). Finalize checks: Proposal is active, voter hasn't voted before, marks as voted, increments vote count, increments total voters. Privacy magic: Blockchain sees proof of valid vote and updated tallies, but NOT your actual choice!",
          interactiveElement: {
            type: 'code-highlight',
            config: {
              code: `async transition cast_vote(\n    vote_token: VoteToken,\n    private choice: u8\n) -> (VoteReceipt, Future) {\n    let receipt = VoteReceipt {\n        owner: vote_token.owner,\n        proposal_id: vote_token.proposal_id,\n        choice: choice\n    };\n    return (receipt, finalize_cast_vote(...));\n}`,
              highlights: [
                { line: 2, explanation: "VoteToken CONSUMED - can't vote twice!" },
                { line: 3, explanation: "PRIVATE choice - secret ballot!" },
                { line: 5, explanation: "Create VoteReceipt as proof you voted" },
                { line: 10, explanation: "Finalize updates public vote counts" }
              ]
            }
          }
        },
        {
          title: 'Query Functions',
          emoji: '📊',
          content: "get_votes: Returns count for specific proposal + choice. get_turnout: Returns total voters for proposal. check_voted: Returns whether address voted. get_all_results: Iterates through all choices to aggregate results. All query functions use finalize blocks to read from mappings!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "get_votes", content: "Read vote count for (proposal_id, choice) - how many voted for option X?" },
                { label: "get_turnout", content: "Total voters for proposal - participation rate!" },
                { label: "check_voted", content: "Has this address voted? Check has_voted mapping" },
                { label: "get_all_results", content: "Loop through all choices, aggregate final results" }
              ]
            }
          }
        },
      ],
      exerciseId: 'cc-leo-020',
    },
    {
      sectionTitle: 'Testing & Deployment',
      slides: [
        {
          title: 'Testing Strategy',
          emoji: '🧪',
          content: "Happy path: Create proposal → Distribute tokens → Vote → Check results. Edge cases: Vote with first option (0), last option (num_choices-1), many users same option. Error cases: Invalid choice, vote twice, vote after closed, duplicate proposal. Security tests: Cannot vote without token, token is consumed, choices stay private, no double voting. Test everything before deploying!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Happy Path", content: "Create proposal → Distribute 3 tokens → All 3 vote → Verify counts match" },
                { label: "Edge Cases", content: "Vote 0, vote (max-1), 100 voters pick same choice, single voter" },
                { label: "Error Cases", content: "Try voting twice, invalid choice (>max), vote after closed, no token" },
                { label: "Security", content: "Verify: token consumed, choice stays private, no double vote, counts accurate" }
              ]
            }
          }
        },
        {
          title: 'Deployment Guide',
          emoji: '🚀',
          content: "Pre-deployment checklist: Code reviewed, security patterns applied, all tests passed, documentation complete. Deployment steps: leo build, leo deploy --network testnet, save Program ID, initialize with first proposal. Post-deployment: Verify on explorer, test with real transactions, monitor for issues, share program ID with frontend. Remember: Leo programs are immutable once deployed!",
          interactiveElement: {
            type: 'click-reveal',
            config: {
              reveals: [
                { label: "Pre-Deployment", content: "✅ Code reviewed ✅ Security audit ✅ All tests pass ✅ Docs complete" },
                { label: "Deploy Steps", content: "1. leo build → 2. leo deploy --network testnet → 3. Save Program ID!" },
                { label: "Post-Deployment", content: "Verify on explorer → Test with real txns → Monitor → Share Program ID" },
                { label: "⚠️ Critical", content: "Leo programs are IMMUTABLE once deployed - no updates or fixes possible!" }
              ]
            }
          }
        },
      ],
      exerciseId: 'bf-leo-021',
    },
  ],

  quiz: [
    {
      question: 'Why do we use a record for VoteToken instead of just checking a mapping?',
      options: [
        'Records are faster than mappings',
        'Records can be consumed, preventing double voting at the protocol level',
        'Mappings cannot store boolean values',
        'Records are cheaper to use',
      ],
      correctAnswer: 1,
      explanation: 'Using a record that gets consumed when voting provides built-in double-voting prevention. Once the VoteToken is consumed in cast_vote, it cannot be used again.',
    },
    {
      question: 'How does the voting system maintain privacy?',
      options: [
        'All data is encrypted on-chain',
        'The choice field in VoteReceipt is private, only the voter can see it',
        'Votes are not stored on-chain',
        'The blockchain is private',
      ],
      correctAnswer: 1,
      explanation: 'The choice field in VoteReceipt is private, meaning only the record owner can see their vote. The blockchain only sees zero-knowledge proofs and updated vote tallies, not individual choices.',
    },
    {
      question: 'What prevents someone from voting twice in this system?',
      options: [
        'Two mechanisms: VoteToken consumption + has_voted mapping check',
        'Only the has_voted mapping',
        'Only the VoteToken consumption',
        'Time-based locks',
      ],
      correctAnswer: 0,
      explanation: 'Double voting is prevented by TWO mechanisms: (1) VoteToken is consumed and cannot be reused, (2) has_voted mapping tracks who voted. This provides defense in depth.',
    },
    {
      question: 'Why do we use composite keys like BHP256::hash_to_field(proposal_id + choice)?',
      options: [
        'For better security',
        'To create unique keys for multi-dimensional mappings',
        'To save gas costs',
        'To make data private',
      ],
      correctAnswer: 1,
      explanation: 'Composite keys allow us to use a single mapping for multi-dimensional data. We combine proposal_id + choice into one key to store votes for each (proposal, choice) pair.',
    },
    {
      question: 'What happens if someone tries to vote after end_voting() is called?',
      options: [
        'The vote is queued for next election',
        'The vote is accepted but not counted',
        'The transaction fails with assertion error',
        'The vote is counted in a special category',
      ],
      correctAnswer: 2,
      explanation: 'In finalize_cast_vote, we assert that is_active is true. After end_voting sets it to false, any vote attempt will fail the assertion and the entire transaction will be rejected.',
    },
  ],
  quizPassThreshold: 0.8,

  starterCode: `program voting_system.aleo {
    record AdminCap {
        owner: address,
    }

    // TODO: Define record 'VoteToken' with:
    // - owner: address
    // - public proposal_id: field

    // TODO: Define record 'VoteReceipt' with:
    // - owner: address
    // - public proposal_id: field
    // - choice: u8 (private!)

    // TODO: Define mappings:
    // - proposal_votes: field => u64 (vote counts)
    // - has_voted: field => bool (track voters)
    // - is_active: field => bool (proposal status)
    // - total_voters: field => u64 (turnout)

    // TODO: Helper function 'create_vote_key':
    // - Takes: proposal_id (field), choice (u8)
    // - Returns: field (combined hash)

    // TODO: Helper function 'create_voter_key':
    // - Takes: voter (address), proposal_id (field)
    // - Returns: field (combined hash)

    // TODO: Async transition 'create_proposal':
    // - Takes: admin_cap, proposal_id, num_choices (2-10)
    // - Returns: (AdminCap, Future)

    // TODO: Async function 'finalize_create_proposal':
    // - Checks proposal doesn't exist
    // - Sets is_active to true
    // - Initializes vote counts to 0
    // - Sets total_voters to 0

    // TODO: Transition 'distribute_token':
    // - Takes: admin_cap, voter, proposal_id
    // - Returns: (AdminCap, VoteToken)

    // TODO: Async transition 'cast_vote':
    // - Takes: vote_token, choice (private)
    // - Validates choice < 10
    // - Returns: (VoteReceipt, Future)

    // TODO: Async function 'finalize_cast_vote':
    // - Checks proposal is active
    // - Checks voter hasn't voted
    // - Marks voter as voted
    // - Increments vote count
    // - Increments total voters
}`,

  solution: `program voting_system.aleo {
    record AdminCap {
        owner: address,
    }

    record VoteToken {
        owner: address,
        public proposal_id: field,
    }

    record VoteReceipt {
        owner: address,
        public proposal_id: field,
        choice: u8,
    }

    mapping proposal_votes: field => u64;
    mapping has_voted: field => bool;
    mapping is_active: field => bool;
    mapping total_voters: field => u64;

    function create_vote_key(proposal_id: field, choice: u8) -> field {
        let choice_field = choice as field;
        return BHP256::hash_to_field(proposal_id + choice_field);
    }

    function create_voter_key(voter: address, proposal_id: field) -> field {
        let voter_field = BHP256::hash_to_field(voter);
        return BHP256::hash_to_field(voter_field + proposal_id);
    }

    async transition create_proposal(
        admin_cap: AdminCap,
        public proposal_id: field,
        public num_choices: u8
    ) -> (AdminCap, Future) {
        assert(num_choices >= 2u8);
        assert(num_choices <= 10u8);

        return (admin_cap, finalize_create_proposal(proposal_id, num_choices));
    }

    async function finalize_create_proposal(
        proposal_id: field,
        num_choices: u8
    ) {
        let exists = Mapping::get_or_use(is_active, proposal_id, false);
        assert_eq(exists, false);

        Mapping::set(is_active, proposal_id, true);

        for i: u8 in 0u8..10u8 {
            if (i < num_choices) {
                let vote_key = create_vote_key(proposal_id, i);
                Mapping::set(proposal_votes, vote_key, 0u64);
            }
        }

        Mapping::set(total_voters, proposal_id, 0u64);
    }

    transition distribute_token(
        admin_cap: AdminCap,
        public voter: address,
        public proposal_id: field
    ) -> (AdminCap, VoteToken) {
        let token = VoteToken {
            owner: voter,
            proposal_id: proposal_id,
        };

        return (admin_cap, token);
    }

    async transition cast_vote(
        vote_token: VoteToken,
        private choice: u8
    ) -> (VoteReceipt, Future) {
        assert(choice < 10u8);

        let receipt = VoteReceipt {
            owner: vote_token.owner,
            proposal_id: vote_token.proposal_id,
            choice: choice,
        };

        return (receipt, finalize_cast_vote(
            vote_token.owner,
            vote_token.proposal_id,
            choice
        ));
    }

    async function finalize_cast_vote(
        voter: address,
        proposal_id: field,
        choice: u8
    ) {
        let active = Mapping::get_or_use(is_active, proposal_id, false);
        assert(active);

        let voter_key = create_voter_key(voter, proposal_id);
        let already_voted = Mapping::get_or_use(has_voted, voter_key, false);
        assert_eq(already_voted, false);

        Mapping::set(has_voted, voter_key, true);

        let vote_key = create_vote_key(proposal_id, choice);
        let current_votes = Mapping::get_or_use(proposal_votes, vote_key, 0u64);
        Mapping::set(proposal_votes, vote_key, current_votes + 1u64);

        let total = Mapping::get_or_use(total_voters, proposal_id, 0u64);
        Mapping::set(total_voters, proposal_id, total + 1u64);
    }
}`,

  hints: [
    "Use BHP256::hash_to_field() to create composite keys",
    "VoteToken is consumed in cast_vote, preventing reuse",
    "Private choice field keeps votes confidential",
    "has_voted mapping provides secondary double-vote protection",
    "Use loops with constant bounds (0u8..10u8) and conditionals",
  ],
};

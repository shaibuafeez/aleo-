import {
  Exercise,
  CodeCompletionExercise,
  BugFixExercise,
  MultipleChoiceExercise,
  OutputPredictionExercise
} from '../types/exercises';

// ============================================================================
// CODE COMPLETION EXERCISES
// ============================================================================

const codeCompletionExercises: CodeCompletionExercise[] = [
  {
    id: 'cc-new-017',
    type: 'code_completion',
    difficulty: 'intermediate',
    topic: 'references',
    title: 'Using Mutable References Correctly',
    description: 'Fill in the blanks to use mutable references to modify values in place.',
    learningObjective: 'Learn when to use &mut for modifying values.',
    estimatedTime: 4,
    baseXP: 50,
    perfectScoreXP: 20,
    hints: [
      'Modifying a value requires &mut (mutable reference).',
      'Reading a value only requires & (immutable reference).',
      'Use * to dereference when assigning to primitives.'
    ],
    explanation: 'In Move, &mut T allows you to modify the value while & T only allows reading. When modifying primitives through references, you need to dereference with * on the left side of assignment.',
    codeTemplate: `struct Account has store {
    balance: u64,
    owner: address
}

fun deposit(account: {blank:ref_type1} Account, amount: u64) {
    account.balance = account.balance + amount;
}

fun check_balance(account: {blank:ref_type2} Account): u64 {
    account.balance
}

fun double_value(num: &mut u64) {
    {blank:deref_op}num = *num * 2;
}`,
    blanks: [
      {
        id: 'ref_type1',
        placeholder: '___',
        correctAnswer: '&mut',
        hint: 'We are modifying the balance - need mutable reference'
      },
      {
        id: 'ref_type2',
        placeholder: '___',
        correctAnswer: '&',
        hint: 'We are only reading the balance - immutable reference is enough'
      },
      {
        id: 'deref_op',
        placeholder: '___',
        correctAnswer: '*',
        hint: 'Need to dereference the mutable reference to assign a new value'
      }
    ],
    strictMode: false,
    caseSensitive: false,
    language: 'move'
  },
  {
    id: 'cc-new-013',
    type: 'code_completion',
    difficulty: 'beginner',
    topic: 'vectors',
    title: 'Creating and Adding to Vectors',
    description: 'Fill in the blanks to create a vector and add elements to it.',
    learningObjective: 'Learn how to create vectors and use push_back to add elements.',
    estimatedTime: 4,
    baseXP: 45,
    perfectScoreXP: 20,
    hints: [
      'Use vector::empty<T>() to create an empty vector.',
      'Type parameter goes in angle brackets <T>.',
      'Use vector::push_back() to add elements to the end.'
    ],
    explanation: 'Vectors are dynamic arrays in Move. Create them with vector::empty<Type>(), and add elements with vector::push_back(vector_ref, value). The vector grows automatically as you add elements.',
    codeTemplate: `use std::vector;

fun create_score_list(): vector<u64> {
    let mut scores = vector::{blank:create_function}<{blank:type}>();
    vector::{blank:add_function}(&mut scores, 100);
    vector::push_back(&mut scores, 200);
    scores
}`,
    blanks: [
      {
        id: 'create_function',
        placeholder: '___',
        correctAnswer: 'empty',
        hint: 'Which function creates an empty vector?'
      },
      {
        id: 'type',
        placeholder: '___',
        correctAnswer: 'u64',
        hint: 'What type are we storing in the vector? (look at return type)'
      },
      {
        id: 'add_function',
        placeholder: '___',
        correctAnswer: 'push_back',
        hint: 'Which function adds an element to the end of a vector?'
      }
    ],
    strictMode: false,
    caseSensitive: false,
    language: 'move'
  },
  {
    id: 'cc-new-010',
    type: 'code_completion',
    difficulty: 'beginner',
    topic: 'structs',
    title: 'Define and Create a Struct',
    description: 'Fill in the blanks to define a struct and create an instance of it.',
    learningObjective: 'Learn how to define structs and instantiate them with values.',
    estimatedTime: 4,
    baseXP: 45,
    perfectScoreXP: 20,
    hints: [
      'Structs are defined with the "struct" keyword.',
      'Abilities come after "has".',
      'Create instances with struct_name { field: value }.'
    ],
    explanation: 'Structs in Move define custom types by grouping related data. After defining the struct, you create instances by providing values for all fields.',
    codeTemplate: `module lesson4::player {
    public {blank:keyword1} Player {blank:abilities_keyword} key, store {
        id: u64,
        level: u8,
        score: u64
    }

    fun create_player(id: u64): Player {
        {blank:struct_name} {
            {blank:field1}: id,
            level: 1,
            score: 0
        }
    }
}`,
    blanks: [
      {
        id: 'keyword1',
        placeholder: '___',
        correctAnswer: 'struct',
        hint: 'What keyword defines a custom type?'
      },
      {
        id: 'abilities_keyword',
        placeholder: '___',
        correctAnswer: 'has',
        hint: 'Which keyword comes before listing abilities?'
      },
      {
        id: 'struct_name',
        placeholder: '___',
        correctAnswer: 'Player',
        hint: 'What is the name of the struct we are creating?'
      },
      {
        id: 'field1',
        placeholder: '___',
        correctAnswer: 'id',
        hint: 'What is the name of the first field in Player?'
      }
    ],
    strictMode: false,
    caseSensitive: true,
    language: 'move'
  },
  {
    id: 'cc-new-008',
    type: 'code_completion',
    difficulty: 'beginner',
    topic: 'control_flow',
    title: 'Loop with Break and Continue',
    description: 'Fill in the blanks to create a loop that skips odd numbers and stops at a target.',
    learningObjective: 'Learn how to use break and continue statements in loops.',
    estimatedTime: 4,
    baseXP: 45,
    perfectScoreXP: 20,
    hints: [
      'Use "continue" to skip the rest of the current iteration.',
      'Use "break" to exit the loop completely.',
      'The modulo operator % can check if a number is even or odd.'
    ],
    explanation: 'In Move, "continue" skips to the next iteration of a loop, while "break" exits the loop entirely. These control flow statements are essential for implementing complex iteration logic.',
    codeTemplate: `module lesson3::loop_demo {
    fun count_even_numbers(target: u64): u64 {
        let mut count = 0;
        let mut i = 0;
        loop {
            if (i >= target) {
                {blank:exit_keyword};  // Exit when we reach the target
            };
            if (i % 2 != 0) {
                i = i + 1;
                {blank:skip_keyword};  // Skip odd numbers
            };
            count = count + 1;
            i = i + 1;
        };
        count
    }
}`,
    blanks: [
      {
        id: 'exit_keyword',
        placeholder: '___',
        correctAnswer: 'break',
        hint: 'Which keyword exits the loop completely?'
      },
      {
        id: 'skip_keyword',
        placeholder: '___',
        correctAnswer: 'continue',
        hint: 'Which keyword skips to the next iteration?'
      }
    ],
    strictMode: false,
    caseSensitive: false,
    language: 'move'
  },
  {
    id: 'cc-new-005',
    type: 'code_completion',
    difficulty: 'beginner',
    topic: 'primitives',
    title: 'Working with Addresses',
    description: 'Fill in the blanks to correctly declare and use address types.',
    learningObjective: 'Learn how to declare and work with address types in Move.',
    estimatedTime: 3,
    baseXP: 40,
    perfectScoreXP: 15,
    hints: [
      'Addresses in Move start with 0x followed by hex digits.',
      'The address type is called "address".',
      'Use == to compare addresses.'
    ],
    explanation: 'In Move, addresses represent account identifiers on the blockchain. They are written with 0x prefix followed by hexadecimal digits. The address type is used to identify accounts and modules.',
    codeTemplate: `module lesson2::address_demo {
    fun check_sender(user: {blank:type1}): bool {
        let admin: address = {blank:address_value};
        user {blank:operator} admin
    }
}`,
    blanks: [
      {
        id: 'type1',
        placeholder: '___',
        correctAnswer: 'address',
        hint: 'What type is used for blockchain account identifiers?'
      },
      {
        id: 'address_value',
        placeholder: '___',
        correctAnswer: '0x1',
        acceptableAnswers: ['0x01', '0x0001'],
        hint: 'Addresses start with 0x. The simplest address is 0x1.'
      },
      {
        id: 'operator',
        placeholder: '___',
        correctAnswer: '==',
        hint: 'Which operator compares if two values are equal?'
      }
    ],
    strictMode: false,
    caseSensitive: false,
    language: 'move'
  },
  {
    id: 'cc-new-002',
    type: 'code_completion',
    difficulty: 'beginner',
    topic: 'primitives',
    title: 'Declare Variables',
    description: 'Fill in the blanks to correctly declare variables with different types.',
    learningObjective: 'Learn how to declare variables with proper types in Move.',
    estimatedTime: 3,
    baseXP: 40,
    perfectScoreXP: 15,
    hints: [
      'Use "let" to declare a variable.',
      'Type for whole numbers: u8, u64, u128.',
      'Use "mut" after "let" to make a variable changeable.'
    ],
    explanation: 'In Move, variables are declared with "let name: type = value;". Variables are immutable by default. Use "let mut" to make them mutable (changeable).',
    codeTemplate: `module lesson1::variables {
    fun example() {
        // Declare an immutable variable
        {blank:keyword1} score: {blank:type1} = 100;

        // Declare a mutable variable
        let {blank:keyword2} level: u8 = 1;
    }
}`,
    blanks: [
      {
        id: 'keyword1',
        placeholder: '___',
        correctAnswer: 'let',
        hint: 'Use this keyword to declare variables.'
      },
      {
        id: 'type1',
        placeholder: '___',
        correctAnswer: 'u64',
        acceptableAnswers: ['u8', 'u128', 'u16', 'u32'],
        hint: 'What type can store the number 100?'
      },
      {
        id: 'keyword2',
        placeholder: '___',
        correctAnswer: 'mut',
        hint: 'This keyword makes the variable changeable.'
      }
    ],
    strictMode: false,
    caseSensitive: false,
    language: 'move'
  },
  {
    id: 'cc-001',
    type: 'code_completion',
    difficulty: 'beginner',
    topic: 'functions',
    title: 'Complete the Add Function',
    description: 'Fill in the blanks to create a function that adds two numbers.',
    learningObjective: 'Understand basic function syntax and return types in Move.',
    estimatedTime: 3,
    baseXP: 50,
    perfectScoreXP: 20,
    hints: [
      'Functions in Move use the "fun" keyword.',
      'The return type comes after a colon.',
      'Use the + operator for addition.'
    ],
    explanation: 'In Move, functions are defined with the "fun" keyword, followed by the function name, parameters in parentheses, and an optional return type after a colon. The function body contains the logic.',
    codeTemplate: `module math::calculator {
    {blank:keyword} fun add(a: u64, b: u64): {blank:returnType} {
        a {blank:operator} b
    }
}`,
    blanks: [
      {
        id: 'keyword',
        placeholder: '___',
        correctAnswer: 'public',
        acceptableAnswers: ['pub'],
        hint: 'This keyword makes the function accessible from outside the module.'
      },
      {
        id: 'returnType',
        placeholder: '___',
        correctAnswer: 'u64',
        hint: 'The return type should match the input parameter types.'
      },
      {
        id: 'operator',
        placeholder: '___',
        correctAnswer: '+',
        hint: 'Use the addition operator.'
      }
    ],
    strictMode: false,
    caseSensitive: false,
    language: 'move'
  },

  {
    id: 'cc-002',
    type: 'code_completion',
    difficulty: 'intermediate',
    topic: 'structs',
    title: 'Define a Coin Struct',
    description: 'Complete the struct definition by filling in: (1) the visibility keyword, (2) the keyword before abilities, and (3) the field name for storing the coin amount.',
    learningObjective: 'Learn how to define structs with abilities in Move.',
    estimatedTime: 5,
    baseXP: 75,
    perfectScoreXP: 25,
    hints: [
      'Blank 1: Use "public" to make the struct accessible from other modules.',
      'Blank 2: Use "has" before listing abilities like store and drop.',
      'Blank 3: Name the field that stores the coin amount (like "value", "amount", or "balance").'
    ],
    explanation: 'Structs in Move define custom types. They can have abilities like "key" (can be used as storage), "store" (can be stored), "copy" (can be copied), and "drop" (can be dropped).',
    codeTemplate: `module currency::coin {
    {blank:keyword} struct Coin {blank:hasKeyword} store, drop {
        {blank:field}: u64
    }
}`,
    blanks: [
      {
        id: 'keyword',
        placeholder: '___',
        correctAnswer: 'public',
        acceptableAnswers: ['pub']
      },
      {
        id: 'hasKeyword',
        placeholder: '___',
        correctAnswer: 'has',
        hint: 'This keyword precedes the list of abilities.'
      },
      {
        id: 'field',
        placeholder: '___',
        correctAnswer: 'value',
        acceptableAnswers: ['amount', 'balance'],
        hint: 'Name the field that stores the coin amount.'
      }
    ],
    strictMode: false,
    caseSensitive: false,
    language: 'move'
  },

  {
    id: 'cc-003',
    type: 'code_completion',
    difficulty: 'intermediate',
    topic: 'vectors',
    title: 'Vector Operations',
    description: 'Complete the vector manipulation functions.',
    learningObjective: 'Master basic vector operations in Move.',
    estimatedTime: 4,
    baseXP: 70,
    perfectScoreXP: 30,
    hints: [
      'Use vector::push_back to add elements.',
      'vector::length returns the size.',
      'vector::borrow gets a reference to an element.'
    ],
    explanation: 'Vectors in Move are dynamic arrays. Common operations include push_back, pop_back, length, and borrow for element access.',
    codeTemplate: `use std::vector;

public fun add_element(v: &mut vector<u64>, item: u64) {
    vector::{blank:addFunc}(v, item);
}

public fun get_size(v: &vector<u64>): u64 {
    vector::{blank:sizeFunc}(v)
}`,
    blanks: [
      {
        id: 'addFunc',
        placeholder: '___',
        correctAnswer: 'push_back',
        hint: 'This function adds an element to the end of a vector.'
      },
      {
        id: 'sizeFunc',
        placeholder: '___',
        correctAnswer: 'length',
        acceptableAnswers: ['len'],
        hint: 'This function returns the number of elements in a vector.'
      }
    ],
    strictMode: false,
    caseSensitive: false,
    language: 'move'
  },

  {
    id: 'cc-004',
    type: 'code_completion',
    difficulty: 'advanced',
    topic: 'generics',
    title: 'Generic Container',
    description: 'Create a generic container struct that can hold any type.',
    learningObjective: 'Understand generics and type parameters in Move.',
    estimatedTime: 6,
    baseXP: 100,
    perfectScoreXP: 40,
    hints: [
      'Generic types are declared with angle brackets.',
      'Use the type parameter name in the struct fields.',
      'Generic functions use the same syntax.'
    ],
    explanation: 'Generics allow you to write code that works with any type. The type parameter is declared in angle brackets and can be used throughout the struct or function definition.',
    codeTemplate: `module container::box {
    public struct Box{blank:typeParam} has store, drop {
        value: {blank:typeUse}
    }

    public fun create{blank:funcTypeParam}(val: T): Box<T> {
        Box { value: val }
    }
}`,
    blanks: [
      {
        id: 'typeParam',
        placeholder: '___',
        correctAnswer: '<T>',
        hint: 'Declare a type parameter using angle brackets.'
      },
      {
        id: 'typeUse',
        placeholder: '___',
        correctAnswer: 'T',
        hint: 'Use the type parameter name you declared.'
      },
      {
        id: 'funcTypeParam',
        placeholder: '___',
        correctAnswer: '<T>',
        hint: 'Generic functions also need type parameters.'
      }
    ],
    strictMode: false,
    caseSensitive: true,
    language: 'move'
  },

  {
    id: 'cc-005',
    type: 'code_completion',
    difficulty: 'beginner',
    topic: 'options',
    title: 'Working with Option Types',
    description: 'Complete the code to work with optional values.',
    learningObjective: 'Learn how to use Option types for nullable values.',
    estimatedTime: 4,
    baseXP: 60,
    perfectScoreXP: 25,
    hints: [
      'Use option::some to create a Some value.',
      'Use option::is_some to check if a value exists.',
      'Use option::borrow to access the value.'
    ],
    explanation: 'Option<T> represents a value that may or may not exist. It can be Some(value) or None. This is Move\'s way of handling nullable values safely.',
    codeTemplate: `use std::option::{Self, Option};

public fun create_some(value: u64): Option<u64> {
    option::{blank:someFunc}(value)
}

public fun has_value(opt: &Option<u64>): bool {
    option::{blank:checkFunc}(opt)
}`,
    blanks: [
      {
        id: 'someFunc',
        placeholder: '___',
        correctAnswer: 'some',
        hint: 'This function creates an Option with a value.'
      },
      {
        id: 'checkFunc',
        placeholder: '___',
        correctAnswer: 'is_some',
        hint: 'This function checks if an Option contains a value.'
      }
    ],
    strictMode: false,
    caseSensitive: false,
    language: 'move'
  }
];

// ============================================================================
// BUG FIX EXERCISES
// ============================================================================

const bugFixExercises: BugFixExercise[] = [
  {
    id: 'bf-001',
    type: 'bug_fix',
    difficulty: 'beginner',
    topic: 'functions',
    title: 'Fix the Function Visibility',
    description: 'This function should be callable from other modules but has a visibility bug.',
    learningObjective: 'Understand function visibility modifiers in Move.',
    estimatedTime: 3,
    baseXP: 50,
    perfectScoreXP: 20,
    hints: [
      'Check the visibility modifier.',
      'Functions need "public" to be called from outside.',
      'The syntax is "public fun".'
    ],
    explanation: 'Functions in Move default to private (module-only) visibility. Add "public" before "fun" to make them accessible from other modules.',
    buggyCode: `module math::ops {
    fun multiply(a: u64, b: u64): u64 {
        a * b
    }
}`,
    correctCode: `module math::ops {
    public fun multiply(a: u64, b: u64): u64 {
        a * b
    }
}`,
    bugs: [
      {
        lineNumber: 2,
        bugType: 'logic',
        description: 'Function is missing the "public" visibility modifier.',
        hint: 'Add "public" before "fun".'
      }
    ],
    allowPartialCredit: false,
    mustFixAll: true,
    language: 'move'
  },

  {
    id: 'bf-002',
    type: 'bug_fix',
    difficulty: 'intermediate',
    topic: 'structs',
    title: 'Fix the Struct Abilities',
    description: 'This struct needs proper abilities to work with storage.',
    learningObjective: 'Learn about Move abilities and when to use them.',
    estimatedTime: 5,
    baseXP: 75,
    perfectScoreXP: 30,
    hints: [
      'Structs that will be stored need the "store" ability.',
      'If you want to use it as a top-level object, add "key".',
      'Abilities go after "has".'
    ],
    explanation: 'Abilities define what operations can be performed on a type. "key" allows storage as a top-level object, "store" allows storage inside other structs, "copy" allows copying, and "drop" allows dropping.',
    buggyCode: `module game::player {
    public struct Player {
        health: u64,
        score: u64
    }
}`,
    correctCode: `module game::player {
    public struct Player has key, store {
        health: u64,
        score: u64
    }
}`,
    bugs: [
      {
        lineNumber: 2,
        bugType: 'type',
        description: 'Struct is missing required abilities for storage.',
        hint: 'Add "has key, store" after the struct name.'
      }
    ],
    allowPartialCredit: false,
    mustFixAll: true,
    language: 'move'
  },

  {
    id: 'bf-003',
    type: 'bug_fix',
    difficulty: 'intermediate',
    topic: 'references',
    title: 'Fix the Reference Types',
    description: 'The function parameters have incorrect reference types.',
    learningObjective: 'Understand mutable vs immutable references.',
    estimatedTime: 4,
    baseXP: 70,
    perfectScoreXP: 25,
    hints: [
      'Modifying a value requires a mutable reference (&mut).',
      'Reading only requires an immutable reference (&).',
      'Check which parameters are being modified.'
    ],
    explanation: 'In Move, &T is an immutable reference (read-only) and &mut T is a mutable reference (read-write). Use mutable references only when you need to modify the value.',
    buggyCode: `public fun increment_value(x: &u64) {
    *x = *x + 1;
}

public fun read_value(x: &mut u64): u64 {
    *x
}`,
    correctCode: `public fun increment_value(x: &mut u64) {
    *x = *x + 1;
}

public fun read_value(x: &u64): u64 {
    *x
}`,
    bugs: [
      {
        lineNumber: 1,
        bugType: 'type',
        description: 'Parameter needs mutable reference to be modified.',
        hint: 'Change &u64 to &mut u64 in the first function.'
      },
      {
        lineNumber: 5,
        bugType: 'logic',
        description: 'Parameter should be immutable since it\'s only being read.',
        hint: 'Change &mut u64 to &u64 in the second function.'
      }
    ],
    allowPartialCredit: true,
    mustFixAll: false,
    language: 'move'
  },

  {
    id: 'bf-004',
    type: 'bug_fix',
    difficulty: 'advanced',
    topic: 'vectors',
    title: 'Fix Vector Out of Bounds',
    description: 'This code has a potential out-of-bounds error.',
    learningObjective: 'Learn safe vector access patterns.',
    estimatedTime: 6,
    baseXP: 90,
    perfectScoreXP: 35,
    hints: [
      'Always check vector length before accessing.',
      'Use vector::length to get the size.',
      'Index should be less than length.'
    ],
    explanation: 'Accessing a vector index that doesn\'t exist causes an abort. Always check the length first or use safe access methods.',
    buggyCode: `use std::vector;

public fun get_first(v: &vector<u64>): u64 {
    *vector::borrow(v, 0)
}`,
    correctCode: `use std::vector;

public fun get_first(v: &vector<u64>): u64 {
    assert!(vector::length(v) > 0, 1);
    *vector::borrow(v, 0)
}`,
    bugs: [
      {
        lineNumber: 3,
        bugType: 'runtime',
        description: 'No check for empty vector before accessing index 0.',
        hint: 'Add an assertion to check if the vector is not empty.'
      }
    ],
    testCases: [
      {
        expectedOutput: 'assertion failure',
        description: 'Empty vector should abort'
      }
    ],
    allowPartialCredit: false,
    mustFixAll: true,
    language: 'move'
  },

  {
    id: 'bf-005',
    type: 'bug_fix',
    difficulty: 'beginner',
    topic: 'primitives',
    title: 'Fix Type Mismatch',
    description: 'The function has a type mismatch error.',
    learningObjective: 'Understand Move\'s type system and integer types.',
    estimatedTime: 3,
    baseXP: 55,
    perfectScoreXP: 20,
    hints: [
      'Check the return type.',
      'The function returns u64 but declares u8.',
      'Return type should match the actual value.'
    ],
    explanation: 'Move is strongly typed. The return type in the function signature must match the actual return value\'s type.',
    buggyCode: `public fun get_max_value(): u8 {
    1000
}`,
    correctCode: `public fun get_max_value(): u64 {
    1000
}`,
    bugs: [
      {
        lineNumber: 1,
        bugType: 'type',
        description: 'Return type u8 cannot hold value 1000 (max 255).',
        hint: 'Change return type to u64 or u128.'
      }
    ],
    allowPartialCredit: false,
    mustFixAll: true,
    language: 'move'
  }
];

// ============================================================================
// MULTIPLE CHOICE EXERCISES
// ============================================================================

const multipleChoiceExercises: MultipleChoiceExercise[] = [
  {
    id: 'mc-new-016',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    topic: 'references',
    title: 'Valid Borrow Scenarios',
    description: 'Understanding which borrowing patterns are allowed in Move.',
    learningObjective: 'Master the borrow checker rules for references.',
    estimatedTime: 4,
    baseXP: 50,
    perfectScoreXP: 20,
    hints: [
      'You can have multiple immutable references (&) at once.',
      'You can have ONE mutable reference (&mut) at a time.',
      'You cannot mix & and &mut - it\'s one or the other.'
    ],
    explanation: 'Move\'s borrow checker enforces safety rules: (1) Multiple immutable references are OK - many readers, no writers. (2) ONE mutable reference at a time - exclusive write access. (3) Cannot have both & and &mut active simultaneously - prevents reading while someone is writing.',
    question: 'Which of these borrowing scenarios is VALID in Move?',
    options: [
      {
        id: 'opt1',
        text: 'let ref1 = &x; let ref2 = &x; let ref3 = &x;',
        isCorrect: true,
        explanation: 'Correct! Multiple immutable references are allowed. All readers, no writers - perfectly safe.'
      },
      {
        id: 'opt2',
        text: 'let ref1 = &mut x; let ref2 = &mut x;',
        isCorrect: false,
        explanation: 'Invalid! You can only have ONE mutable reference at a time. Two would allow conflicting modifications.'
      },
      {
        id: 'opt3',
        text: 'let ref1 = &x; let ref2 = &mut x;',
        isCorrect: false,
        explanation: 'Invalid! Cannot mix immutable and mutable references. Someone is reading while someone else is writing - data race!'
      },
      {
        id: 'opt4',
        text: 'let ref1 = &mut x; let ref2 = &x;',
        isCorrect: false,
        explanation: 'Invalid! Cannot have a mutable reference alongside an immutable one. Value is being modified while being read.'
      }
    ],
    allowMultipleAnswers: false,
    shuffleOptions: true,
    showExplanationOnWrong: true
  },
  {
    id: 'mc-new-014',
    type: 'multiple_choice',
    difficulty: 'beginner',
    topic: 'vectors',
    title: 'Vector Safety and Bounds Checking',
    description: 'Understanding what happens when accessing vector elements.',
    learningObjective: 'Learn about vector bounds checking and safe access patterns.',
    estimatedTime: 3,
    baseXP: 40,
    perfectScoreXP: 15,
    hints: [
      'Vectors have a length - number of elements.',
      'Valid indices are 0 to length-1.',
      'What happens if you try to access index 5 in a vector with length 3?'
    ],
    explanation: 'In Move, accessing a vector index that doesn\'t exist causes an ABORT (runtime error). This prevents silent bugs. Always check the vector length before accessing an index, or use vector::contains() to check if an element exists.',
    question: 'What happens if you try to access index 10 in a vector with length 5?',
    options: [
      {
        id: 'opt1',
        text: 'The program aborts with an error',
        isCorrect: true,
        explanation: 'Correct! Out-of-bounds access causes an abort. Valid indices for length 5 are 0-4. Always check vector::length() first!'
      },
      {
        id: 'opt2',
        text: 'It returns a default value (like 0)',
        isCorrect: false,
        explanation: 'Incorrect. Move never returns default values silently - that would hide bugs! It aborts instead.'
      },
      {
        id: 'opt3',
        text: 'The vector automatically grows to size 11',
        isCorrect: false,
        explanation: 'Incorrect. Vectors only grow when you explicitly push_back(). Reading doesn\'t auto-grow.'
      },
      {
        id: 'opt4',
        text: 'It wraps around and returns index 0',
        isCorrect: false,
        explanation: 'Incorrect. Move doesn\'t do wraparound - that would be unpredictable and dangerous!'
      }
    ],
    allowMultipleAnswers: false,
    shuffleOptions: true,
    showExplanationOnWrong: true
  },
  {
    id: 'mc-new-011',
    type: 'multiple_choice',
    difficulty: 'beginner',
    topic: 'structs',
    title: 'Choosing Abilities for Digital Assets',
    description: 'Understanding which abilities should be used for different types of structs.',
    learningObjective: 'Learn which abilities are appropriate for digital assets vs regular data.',
    estimatedTime: 3,
    baseXP: 40,
    perfectScoreXP: 15,
    hints: [
      'Digital assets like money or NFTs should not be copyable.',
      'Being able to drop something means it can be discarded.',
      'What happens if you can duplicate money?'
    ],
    explanation: 'Digital assets representing value (coins, NFTs, game items) should NEVER have the "copy" or "drop" abilities. This prevents bugs where assets could be duplicated or accidentally destroyed. Use "key" and "store" for assets that need to be owned and transferred.',
    question: 'Which abilities should a Coin struct (representing money) have?',
    options: [
      {
        id: 'opt1',
        text: 'key, store',
        isCorrect: true,
        explanation: 'Correct! Assets need "key" (can be owned) and "store" (can be stored), but NOT copy/drop (would allow duplication/destruction of money).'
      },
      {
        id: 'opt2',
        text: 'key, store, copy, drop',
        isCorrect: false,
        explanation: 'Dangerous! With "copy", you could duplicate money. With "drop", coins could be accidentally destroyed. Never give assets these abilities.'
      },
      {
        id: 'opt3',
        text: 'copy, drop',
        isCorrect: false,
        explanation: 'Very wrong! This would let you duplicate money (copy) and destroy it accidentally (drop). Assets must never have these.'
      },
      {
        id: 'opt4',
        text: 'Only key',
        isCorrect: false,
        explanation: 'Incomplete. While "key" is needed, you also need "store" to allow the asset to be stored in other structures or transferred.'
      }
    ],
    allowMultipleAnswers: false,
    shuffleOptions: true,
    showExplanationOnWrong: true
  },
  {
    id: 'mc-new-007',
    type: 'multiple_choice',
    difficulty: 'beginner',
    topic: 'control_flow',
    title: 'If Expression Rules',
    description: 'Understanding how if expressions return values in Move.',
    learningObjective: 'Learn the rules for using if as an expression that returns a value.',
    estimatedTime: 3,
    baseXP: 35,
    perfectScoreXP: 15,
    hints: [
      'If expressions can return values in Move.',
      'Both branches must be consistent.',
      'What happens if the types differ?'
    ],
    explanation: 'In Move, if is an expression that can return values. When used this way, both the if and else branches must return the same type. This ensures type safety and predictable behavior.',
    question: 'What must be true when using an if-else expression to assign a value?',
    options: [
      {
        id: 'opt1',
        text: 'Both branches must return the same type',
        isCorrect: true,
        explanation: 'Correct! For type safety, both the if and else branches must return the same type when the result is used.'
      },
      {
        id: 'opt2',
        text: 'The else branch is optional',
        isCorrect: false,
        explanation: 'Incorrect. When returning a value, the else branch is required - otherwise what value would be returned if the condition is false?'
      },
      {
        id: 'opt3',
        text: 'Only the if branch needs to return a value',
        isCorrect: false,
        explanation: 'Incorrect. Both branches must return a value of the same type.'
      },
      {
        id: 'opt4',
        text: 'If expressions cannot return values',
        isCorrect: false,
        explanation: 'Incorrect. If expressions absolutely can return values - this is a key feature of Move!'
      }
    ],
    allowMultipleAnswers: false,
    shuffleOptions: true,
    showExplanationOnWrong: true
  },
  {
    id: 'mc-new-004',
    type: 'multiple_choice',
    difficulty: 'beginner',
    topic: 'primitives',
    title: 'Integer Overflow',
    description: 'Understanding what happens when integers exceed their maximum values.',
    learningObjective: 'Learn about integer overflow behavior in Move.',
    estimatedTime: 3,
    baseXP: 35,
    perfectScoreXP: 15,
    hints: [
      'u8 can only hold values 0-255.',
      'What happens when you add 1 to the maximum value?',
      'Move protects you from silent errors.'
    ],
    explanation: 'In Move, integer overflow causes an abort (runtime error) rather than wrapping around. This prevents silent bugs that could lead to security vulnerabilities in smart contracts. For example, adding 1 to a u8 value of 255 will abort the program.',
    question: 'What happens when you try to store 256 in a u8 variable?',
    options: [
      {
        id: 'opt1',
        text: 'The program aborts with an error',
        isCorrect: true,
        explanation: 'Correct! Move prevents overflow by aborting the program. u8 max is 255, so 256 causes an abort.'
      },
      {
        id: 'opt2',
        text: 'The value wraps around to 0',
        isCorrect: false,
        explanation: 'Incorrect. Unlike some languages, Move does not wrap around. It aborts to prevent bugs.'
      },
      {
        id: 'opt3',
        text: 'It automatically converts to u16',
        isCorrect: false,
        explanation: 'Incorrect. Move is strongly typed and does not automatically convert types.'
      },
      {
        id: 'opt4',
        text: 'The value is silently truncated',
        isCorrect: false,
        explanation: 'Incorrect. Move never silently truncates values, as this could cause security bugs.'
      }
    ],
    allowMultipleAnswers: false,
    shuffleOptions: true,
    showExplanationOnWrong: true
  },
  {
    id: 'mc-new-001',
    type: 'multiple_choice',
    difficulty: 'beginner',
    topic: 'modules',
    title: 'Module Basics',
    description: 'Test your understanding of Move modules.',
    learningObjective: 'Understand what keyword starts a module definition.',
    estimatedTime: 2,
    baseXP: 30,
    perfectScoreXP: 10,
    hints: [
      'Modules are containers for code.',
      'The keyword comes before the package and module name.',
      'It\'s the first word in a module declaration.'
    ],
    explanation: 'In Move, modules are defined using the "module" keyword, followed by the package name, double colons (::), and the module name. For example: module lesson1::calculator { ... }',
    question: 'What keyword is used to define a module in Move?',
    options: [
      {
        id: 'opt1',
        text: 'module',
        isCorrect: true,
        explanation: 'Correct! The "module" keyword is used to define a module in Move.'
      },
      {
        id: 'opt2',
        text: 'package',
        isCorrect: false,
        explanation: 'Incorrect. "package" is part of the module path, not the defining keyword.'
      },
      {
        id: 'opt3',
        text: 'function',
        isCorrect: false,
        explanation: 'Incorrect. "function" or "fun" is used to define functions, not modules.'
      },
      {
        id: 'opt4',
        text: 'struct',
        isCorrect: false,
        explanation: 'Incorrect. "struct" is used to define custom types, not modules.'
      }
    ],
    allowMultipleAnswers: false,
    shuffleOptions: true,
    showExplanationOnWrong: true
  },
  {
    id: 'mc-001',
    type: 'multiple_choice',
    difficulty: 'beginner',
    topic: 'primitives',
    title: 'Integer Types Range',
    description: 'Test your knowledge of integer type ranges in Move.',
    learningObjective: 'Understand the different integer types and their ranges.',
    estimatedTime: 2,
    baseXP: 40,
    perfectScoreXP: 15,
    hints: [
      'u8 can hold values from 0 to 255.',
      'Each increase in bit size doubles the range.',
      'The "u" means unsigned (no negative numbers).'
    ],
    explanation: 'Move has several unsigned integer types: u8 (0-255), u16 (0-65535), u32 (0-4.3B), u64 (0-18.4 quintillion), u128 (0-340 undecillion), and u256.',
    question: 'What is the maximum value that can be stored in a u8 type?',
    options: [
      {
        id: 'opt1',
        text: '127',
        isCorrect: false,
        explanation: 'This is the max for a signed 8-bit integer (i8), not u8.'
      },
      {
        id: 'opt2',
        text: '255',
        isCorrect: true,
        explanation: 'Correct! u8 is an 8-bit unsigned integer, so it ranges from 0 to 2^8 - 1 = 255.'
      },
      {
        id: 'opt3',
        text: '256',
        isCorrect: false,
        explanation: 'This is one more than the maximum. Remember, counting starts at 0.'
      },
      {
        id: 'opt4',
        text: '65535',
        isCorrect: false,
        explanation: 'This is the maximum value for u16, not u8.'
      }
    ],
    allowMultipleAnswers: false,
    shuffleOptions: true,
    showExplanationOnWrong: true
  },

  {
    id: 'mc-002',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    topic: 'abilities',
    title: 'Understanding Abilities',
    description: 'Which abilities does a struct need for different operations?',
    learningObjective: 'Master the Move ability system.',
    estimatedTime: 4,
    baseXP: 60,
    perfectScoreXP: 25,
    hints: [
      '"key" is needed for global storage.',
      '"store" allows storage in other structs.',
      '"copy" enables value copying.',
      '"drop" allows automatic cleanup.'
    ],
    explanation: 'Move abilities control what operations are allowed on types. Key abilities are: key (global storage), store (nested storage), copy (duplication), and drop (automatic cleanup).',
    question: 'Which abilities must a struct have to be stored as a top-level global resource? (Select all that apply)',
    options: [
      {
        id: 'opt1',
        text: 'key',
        isCorrect: true,
        explanation: 'Correct! The "key" ability is required for global storage.'
      },
      {
        id: 'opt2',
        text: 'store',
        isCorrect: false,
        explanation: 'Store is needed for nested storage, not required for top-level.'
      },
      {
        id: 'opt3',
        text: 'copy',
        isCorrect: false,
        explanation: 'Copy is optional and allows duplicating the value.'
      },
      {
        id: 'opt4',
        text: 'drop',
        isCorrect: false,
        explanation: 'Drop is optional and allows automatic cleanup.'
      }
    ],
    allowMultipleAnswers: false,
    shuffleOptions: true,
    showExplanationOnWrong: true
  },

  {
    id: 'mc-003',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    topic: 'references',
    title: 'Reference Types',
    description: 'Understanding when to use mutable vs immutable references.',
    learningObjective: 'Master reference types in Move.',
    estimatedTime: 3,
    baseXP: 55,
    perfectScoreXP: 20,
    hints: [
      'Immutable references are read-only.',
      'Mutable references allow modification.',
      'You can have multiple immutable or one mutable reference.'
    ],
    explanation: 'In Move, &T is an immutable reference (read-only) and &mut T is a mutable reference (can modify). You can have many &T references but only one &mut T at a time.',
    question: 'Which statement about references in Move is TRUE?',
    options: [
      {
        id: 'opt1',
        text: 'You can have multiple mutable references to the same value at once',
        isCorrect: false,
        explanation: 'False. You can only have ONE mutable reference at a time to prevent data races.'
      },
      {
        id: 'opt2',
        text: 'Immutable references (&T) allow modifying the value',
        isCorrect: false,
        explanation: 'False. Immutable references are read-only. You need &mut T to modify.'
      },
      {
        id: 'opt3',
        text: 'You can have multiple immutable references at the same time',
        isCorrect: true,
        explanation: 'Correct! Multiple immutable references are safe because none can modify the value.'
      },
      {
        id: 'opt4',
        text: 'References in Move can outlive the value they point to',
        isCorrect: false,
        explanation: 'False. Move ensures references never outlive the values they point to (no dangling references).'
      }
    ],
    allowMultipleAnswers: false,
    shuffleOptions: true,
    showExplanationOnWrong: true
  },

  {
    id: 'mc-004',
    type: 'multiple_choice',
    difficulty: 'beginner',
    topic: 'control_flow',
    title: 'If Expressions',
    description: 'How do if expressions work in Move?',
    learningObjective: 'Understand if expressions and their return values.',
    estimatedTime: 3,
    baseXP: 45,
    perfectScoreXP: 18,
    hints: [
      'If expressions can return values.',
      'Both branches must return the same type.',
      'The last expression in a block is returned.'
    ],
    explanation: 'In Move, if is an expression that can return values. Both branches must return the same type if the result is used.',
    question: 'What must be true about if-else expressions in Move when used as a value?',
    options: [
      {
        id: 'opt1',
        text: 'Only the if branch needs to return a value',
        isCorrect: false,
        explanation: 'False. Both branches must return a value of the same type.'
      },
      {
        id: 'opt2',
        text: 'Both branches must return the same type',
        isCorrect: true,
        explanation: 'Correct! For type safety, both branches must return the same type.'
      },
      {
        id: 'opt3',
        text: 'If expressions cannot return values',
        isCorrect: false,
        explanation: 'False. If expressions can and often do return values in Move.'
      },
      {
        id: 'opt4',
        text: 'The else branch is optional when returning a value',
        isCorrect: false,
        explanation: 'False. When returning a value, the else branch is required.'
      }
    ],
    allowMultipleAnswers: false,
    shuffleOptions: true,
    showExplanationOnWrong: true
  },

  {
    id: 'mc-005',
    type: 'multiple_choice',
    difficulty: 'advanced',
    topic: 'generics',
    title: 'Generic Type Constraints',
    description: 'Understanding constraints on generic types.',
    learningObjective: 'Learn about type parameter constraints in generics.',
    estimatedTime: 5,
    baseXP: 80,
    perfectScoreXP: 30,
    hints: [
      'Constraints specify required abilities.',
      'They come after the type parameter.',
      'Multiple constraints are separated by +'
    ],
    explanation: 'Generic type parameters can have constraints that specify which abilities the type must have. This ensures the generic code can perform required operations.',
    question: 'How do you constrain a generic type parameter T to have both copy and drop abilities?',
    codeSnippet: `public fun example<T>(item: T) {
    // function body
}`,
    options: [
      {
        id: 'opt1',
        text: 'public fun example<T: copy, drop>(item: T)',
        isCorrect: false,
        explanation: 'Incorrect syntax. Abilities are separated by +, not commas.'
      },
      {
        id: 'opt2',
        text: 'public fun example<T: copy + drop>(item: T)',
        isCorrect: true,
        explanation: 'Correct! Use + to separate multiple ability constraints.'
      },
      {
        id: 'opt3',
        text: 'public fun example<T has copy, drop>(item: T)',
        isCorrect: false,
        explanation: 'Incorrect. Use : not "has" for constraints.'
      },
      {
        id: 'opt4',
        text: 'public fun example<T>(item: T: copy + drop)',
        isCorrect: false,
        explanation: 'Incorrect. Constraints go on the type parameter, not the parameter itself.'
      }
    ],
    allowMultipleAnswers: false,
    shuffleOptions: true,
    showExplanationOnWrong: true
  }
];

// ============================================================================
// OUTPUT PREDICTION EXERCISES
// ============================================================================

const outputPredictionExercises: OutputPredictionExercise[] = [
  {
    id: 'op-new-018',
    type: 'output_prediction',
    difficulty: 'intermediate',
    topic: 'references',
    title: 'Complex Borrow and Modify',
    description: 'Predict the final value after multiple borrow and modify operations.',
    learningObjective: 'Understand how references work with sequential modifications.',
    estimatedTime: 4,
    baseXP: 55,
    perfectScoreXP: 20,
    hints: [
      'Follow each step carefully.',
      'Immutable borrows return the current value.',
      'Mutable borrows allow changing the value.',
      'All operations affect the same underlying variable.'
    ],
    explanation: 'References in Move allow you to access and modify values without transferring ownership. Immutable references (&) let you read, mutable references (&mut) let you modify. Multiple operations through different references all affect the same underlying value.',
    code: `fun test_references(): u64 {
    let mut balance = 100;

    let read_ref = &balance;
    let initial = *read_ref;  // Read: 100

    let mut_ref = &mut balance;
    *mut_ref = *mut_ref + 50;  // Modify: 100 + 50 = 150

    let read_ref2 = &balance;
    let current = *read_ref2;  // Read: 150

    current
}`,
    language: 'move',
    correctOutput: '150',
    outputType: 'value',
    answerFormat: 'multiple_choice',
    multipleChoiceOptions: ['100', '150', '200', '250'],
    showLineNumbers: true,
    executionSteps: [
      {
        step: 1,
        description: 'Initialize balance = 100',
        variables: { balance: 100 }
      },
      {
        step: 2,
        description: 'Create immutable reference, read value: 100',
        variables: { initial: 100 }
      },
      {
        step: 3,
        description: 'Create mutable reference, modify: 100 + 50 = 150',
        variables: { balance: 150 }
      },
      {
        step: 4,
        description: 'Create new immutable reference, read new value: 150',
        variables: { current: 150 }
      },
      {
        step: 5,
        description: 'Return current value',
        variables: { result: 150 }
      }
    ]
  },
  {
    id: 'op-new-015',
    type: 'output_prediction',
    difficulty: 'beginner',
    topic: 'vectors',
    title: 'Vector Length After Operations',
    description: 'Predict the vector length after push and pop operations.',
    learningObjective: 'Understand how push_back and pop_back affect vector length.',
    estimatedTime: 3,
    baseXP: 40,
    perfectScoreXP: 15,
    hints: [
      'push_back adds one element (length increases by 1)',
      'pop_back removes one element (length decreases by 1)',
      'Count the operations carefully'
    ],
    explanation: 'vector::push_back() adds an element to the end and increases length by 1. vector::pop_back() removes the last element and decreases length by 1. vector::length() returns the current number of elements.',
    code: `use std::vector;

fun test_vector(): u64 {
    let mut v = vector::empty<u64>();
    vector::push_back(&mut v, 10);
    vector::push_back(&mut v, 20);
    vector::push_back(&mut v, 30);
    vector::pop_back(&mut v);
    vector::length(&v)
}`,
    language: 'move',
    correctOutput: '2',
    outputType: 'value',
    answerFormat: 'multiple_choice',
    multipleChoiceOptions: ['0', '1', '2', '3'],
    showLineNumbers: true,
    executionSteps: [
      {
        step: 1,
        description: 'Create empty vector',
        variables: { 'length': 0 }
      },
      {
        step: 2,
        description: 'push_back(10) - length is now 1',
        variables: { 'length': 1 }
      },
      {
        step: 3,
        description: 'push_back(20) - length is now 2',
        variables: { 'length': 2 }
      },
      {
        step: 4,
        description: 'push_back(30) - length is now 3',
        variables: { 'length': 3 }
      },
      {
        step: 5,
        description: 'pop_back() - length is now 2',
        variables: { 'length': 2 }
      }
    ]
  },
  {
    id: 'op-new-012',
    type: 'output_prediction',
    difficulty: 'beginner',
    topic: 'structs',
    title: 'Struct Field Access',
    description: 'Predict the output after accessing and modifying struct fields.',
    learningObjective: 'Understand how to access struct fields and destructure structs.',
    estimatedTime: 3,
    baseXP: 40,
    perfectScoreXP: 15,
    hints: [
      'Use dot notation to access fields: player.score',
      'Mutable references (&mut) allow modifying fields.',
      'After incrementing level by 1, what is the new level?'
    ],
    explanation: 'Struct fields are accessed with dot notation (struct.field). You can read fields from immutable references (&), and modify them with mutable references (&mut). Destructuring unpacks all fields at once.',
    code: `struct Player has drop {
    id: u64,
    level: u8,
    score: u64
}

fun level_up(player: &mut Player) {
    player.level = player.level + 1;
}

fun test(): u8 {
    let mut p = Player { id: 1, level: 5, score: 100 };
    level_up(&mut p);
    p.level
}`,
    language: 'move',
    correctOutput: '6',
    outputType: 'value',
    answerFormat: 'multiple_choice',
    multipleChoiceOptions: ['5', '6', '7', '100'],
    showLineNumbers: true,
    executionSteps: [
      {
        step: 1,
        description: 'Create Player with id=1, level=5, score=100',
        variables: { 'p.level': 5 }
      },
      {
        step: 2,
        description: 'Call level_up with mutable reference to p',
        variables: { 'p.level': 5 }
      },
      {
        step: 3,
        description: 'Increment level: 5 + 1 = 6',
        variables: { 'p.level': 6 }
      },
      {
        step: 4,
        description: 'Return p.level which is now 6',
        variables: { result: 6 }
      }
    ]
  },
  {
    id: 'op-new-009',
    type: 'output_prediction',
    difficulty: 'beginner',
    topic: 'control_flow',
    title: 'Assert Behavior',
    description: 'Predict what happens when an assert condition fails.',
    learningObjective: 'Understand how assert! checks preconditions and aborts on failure.',
    estimatedTime: 3,
    baseXP: 40,
    perfectScoreXP: 15,
    hints: [
      'assert! checks if a condition is true.',
      'If the condition is false, it aborts with an error code.',
      'What is 5 compared to 10?'
    ],
    explanation: 'The assert! macro checks a condition. If true, execution continues. If false, the program aborts with the specified error code. This is essential for validating preconditions in smart contracts.',
    code: `fun withdraw(balance: u64, amount: u64): u64 {
    assert!(balance >= amount, 1);  // Error code 1
    balance - amount
}

fun test(): u64 {
    withdraw(5, 10)  // Try to withdraw 10 from balance of 5
}`,
    language: 'move',
    correctOutput: 'abort',
    outputType: 'error',
    answerFormat: 'multiple_choice',
    multipleChoiceOptions: ['0', '5', '10', 'abort with error code 1'],
    showLineNumbers: true,
    executionSteps: [
      {
        step: 1,
        description: 'Call withdraw with balance=5, amount=10',
        variables: { balance: 5, amount: 10 }
      },
      {
        step: 2,
        description: 'Check: balance >= amount? (5 >= 10? false)',
        variables: { 'balance >= amount': false }
      },
      {
        step: 3,
        description: 'Condition false → abort with error code 1',
        variables: { error: 'abort(1)' }
      }
    ]
  },
  {
    id: 'op-new-006',
    type: 'output_prediction',
    difficulty: 'beginner',
    topic: 'primitives',
    title: 'Type Casting Result',
    description: 'Predict the output after type casting operations.',
    learningObjective: 'Understand how type casting works with the "as" keyword.',
    estimatedTime: 3,
    baseXP: 40,
    perfectScoreXP: 15,
    hints: [
      'Start with a u8 value of 100.',
      'Cast it to u64 using "as".',
      'Then add 1000 to the result.'
    ],
    explanation: 'In Move, the "as" keyword is used for type casting between compatible types. When casting from a smaller type (u8) to a larger type (u64), the value is preserved. You can then perform operations with the new type.',
    code: `fun convert_and_add(): u64 {
    let small: u8 = 100;
    let big = (small as u64) + 1000;
    big
}`,
    language: 'move',
    correctOutput: '1100',
    outputType: 'value',
    answerFormat: 'multiple_choice',
    multipleChoiceOptions: ['100', '1000', '1100', '10000'],
    showLineNumbers: true,
    executionSteps: [
      {
        step: 1,
        description: 'Initialize small with u8 value 100',
        variables: { small: 100 }
      },
      {
        step: 2,
        description: 'Cast small from u8 to u64',
        variables: { 'small as u64': 100 }
      },
      {
        step: 3,
        description: 'Add 1000: 100 + 1000 = 1100',
        variables: { big: 1100 }
      }
    ]
  },
  {
    id: 'op-new-003',
    type: 'output_prediction',
    difficulty: 'beginner',
    topic: 'functions',
    title: 'Function Call Result',
    description: 'Predict what value this function returns.',
    learningObjective: 'Understand how functions return values in Move.',
    estimatedTime: 2,
    baseXP: 35,
    perfectScoreXP: 15,
    hints: [
      'The function multiplies two numbers.',
      '6 * 7 = ?',
      'The last expression is returned automatically.'
    ],
    explanation: 'In Move, the last expression in a function (without a semicolon) is automatically returned. No "return" keyword is needed.',
    code: `fun multiply(a: u64, b: u64): u64 {
    a * b
}

fun test(): u64 {
    multiply(6, 7)
}`,
    language: 'move',
    correctOutput: '42',
    outputType: 'value',
    answerFormat: 'multiple_choice',
    multipleChoiceOptions: ['13', '42', '67', '76'],
    showLineNumbers: true,
    executionSteps: [
      {
        step: 1,
        description: 'Call multiply with 6 and 7',
        variables: { a: 6, b: 7 }
      },
      {
        step: 2,
        description: 'Multiply: 6 * 7 = 42',
        variables: { result: 42 }
      }
    ]
  },
  {
    id: 'op-001',
    type: 'output_prediction',
    difficulty: 'beginner',
    topic: 'primitives',
    title: 'Simple Arithmetic',
    description: 'Predict the output of this arithmetic operation.',
    learningObjective: 'Understand basic arithmetic operations in Move.',
    estimatedTime: 2,
    baseXP: 40,
    perfectScoreXP: 15,
    hints: [
      'Follow the order of operations.',
      'Multiplication happens before addition.',
      'Calculate step by step.'
    ],
    explanation: 'Move follows standard mathematical order of operations: parentheses, multiplication/division, then addition/subtraction.',
    code: `public fun calculate(): u64 {
    let x = 5 + 3 * 2;
    x
}`,
    language: 'move',
    correctOutput: '11',
    outputType: 'value',
    answerFormat: 'multiple_choice',
    multipleChoiceOptions: ['8', '11', '16', '13'],
    showLineNumbers: true,
    executionSteps: [
      {
        step: 1,
        description: 'Multiply 3 * 2 = 6',
        variables: { '3 * 2': 6 }
      },
      {
        step: 2,
        description: 'Add 5 + 6 = 11',
        variables: { x: 11 }
      }
    ]
  },

  {
    id: 'op-002',
    type: 'output_prediction',
    difficulty: 'intermediate',
    topic: 'control_flow',
    title: 'If Expression Result',
    description: 'What will this if expression return?',
    learningObjective: 'Understand how if expressions return values.',
    estimatedTime: 3,
    baseXP: 55,
    perfectScoreXP: 20,
    hints: [
      'Check the condition (10 > 5).',
      'The true branch returns 100.',
      'If expressions return the last expression in the chosen branch.'
    ],
    explanation: 'If expressions in Move can return values. The result is the last expression in the executed branch.',
    code: `public fun check_value(): u64 {
    let result = if (10 > 5) {
        100
    } else {
        50
    };
    result
}`,
    language: 'move',
    correctOutput: '100',
    outputType: 'value',
    answerFormat: 'text',
    showLineNumbers: true,
    allowableAnswers: ['100'],
    executionSteps: [
      {
        step: 1,
        description: 'Evaluate condition: 10 > 5 is true',
        variables: { '10 > 5': true }
      },
      {
        step: 2,
        description: 'Execute true branch, return 100',
        variables: { result: 100 }
      }
    ]
  },

  {
    id: 'op-003',
    type: 'output_prediction',
    difficulty: 'intermediate',
    topic: 'vectors',
    title: 'Vector Length',
    description: 'Predict the length of this vector after operations.',
    learningObjective: 'Understand vector operations and their effects.',
    estimatedTime: 4,
    baseXP: 60,
    perfectScoreXP: 25,
    hints: [
      'Start with an empty vector (length 0).',
      'push_back adds one element.',
      'Count how many push_back calls there are.'
    ],
    explanation: 'Vectors start empty and grow with each push_back operation. The length equals the number of elements added.',
    code: `use std::vector;

public fun vector_ops(): u64 {
    let v = vector::empty<u64>();
    vector::push_back(&mut v, 10);
    vector::push_back(&mut v, 20);
    vector::push_back(&mut v, 30);
    vector::length(&v)
}`,
    language: 'move',
    correctOutput: '3',
    outputType: 'value',
    answerFormat: 'multiple_choice',
    multipleChoiceOptions: ['0', '1', '3', '60'],
    showLineNumbers: true,
    executionSteps: [
      {
        step: 1,
        description: 'Create empty vector',
        variables: { 'v.length': 0 }
      },
      {
        step: 2,
        description: 'Push 10 to vector',
        variables: { 'v.length': 1 }
      },
      {
        step: 3,
        description: 'Push 20 to vector',
        variables: { 'v.length': 2 }
      },
      {
        step: 4,
        description: 'Push 30 to vector',
        variables: { 'v.length': 3 }
      }
    ]
  },

  {
    id: 'op-004',
    type: 'output_prediction',
    difficulty: 'advanced',
    topic: 'references',
    title: 'Reference Modification',
    description: 'Predict the final value after reference operations.',
    learningObjective: 'Master how references work with modifications.',
    estimatedTime: 5,
    baseXP: 75,
    perfectScoreXP: 30,
    hints: [
      'Follow each modification step.',
      'Mutable references allow changing the value.',
      'Both operations affect the same underlying value.'
    ],
    explanation: 'Mutable references allow modifying the original value. Multiple operations on the same reference compound.',
    code: `public fun modify_value(): u64 {
    let mut x = 10;
    let ref = &mut x;
    *ref = *ref + 5;
    *ref = *ref * 2;
    x
}`,
    language: 'move',
    correctOutput: '30',
    outputType: 'value',
    answerFormat: 'text',
    showLineNumbers: true,
    allowableAnswers: ['30'],
    executionSteps: [
      {
        step: 1,
        description: 'Initialize x = 10',
        variables: { x: 10 }
      },
      {
        step: 2,
        description: 'Create mutable reference to x',
        variables: { x: 10, ref: '&mut x' }
      },
      {
        step: 3,
        description: 'Add 5: x = 10 + 5 = 15',
        variables: { x: 15 }
      },
      {
        step: 4,
        description: 'Multiply by 2: x = 15 * 2 = 30',
        variables: { x: 30 }
      }
    ]
  },

  {
    id: 'op-005',
    type: 'output_prediction',
    difficulty: 'beginner',
    topic: 'functions',
    title: 'Function Return Value',
    description: 'What does this function return?',
    learningObjective: 'Understand implicit returns in Move.',
    estimatedTime: 2,
    baseXP: 45,
    perfectScoreXP: 18,
    hints: [
      'The last expression without semicolon is returned.',
      'Calculate a + b where a=7 and b=3.',
      'No explicit return keyword needed.'
    ],
    explanation: 'In Move, the last expression in a function (without a semicolon) is implicitly returned.',
    code: `public fun add_numbers(): u64 {
    let a = 7;
    let b = 3;
    a + b
}`,
    language: 'move',
    correctOutput: '10',
    outputType: 'value',
    answerFormat: 'multiple_choice',
    multipleChoiceOptions: ['7', '3', '10', '73'],
    showLineNumbers: true
  }
];

// ============================================================================
// EXPORT ALL EXERCISES
// ============================================================================

export const allExercises: Exercise[] = [
  ...codeCompletionExercises,
  ...bugFixExercises,
  ...multipleChoiceExercises,
  ...outputPredictionExercises
];

// Helper functions
export function getExerciseById(id: string): Exercise | undefined {
  return allExercises.find(ex => ex.id === id);
}

export function getExercisesByType(type: string): Exercise[] {
  return allExercises.filter(ex => ex.type === type);
}

export function getExercisesByTopic(topic: string): Exercise[] {
  return allExercises.filter(ex => ex.topic === topic);
}

export function getExercisesByDifficulty(difficulty: string): Exercise[] {
  return allExercises.filter(ex => ex.difficulty === difficulty);
}

export function getRandomExercise(): Exercise {
  return allExercises[Math.floor(Math.random() * allExercises.length)];
}

export function getRandomExerciseByType(type: string): Exercise | undefined {
  const filtered = getExercisesByType(type);
  return filtered.length > 0
    ? filtered[Math.floor(Math.random() * filtered.length)]
    : undefined;
}

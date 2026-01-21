/**
 * Leo Language Definition for Monaco Editor
 * Provides syntax highlighting and IntelliSense for Leo (Aleo programming language)
 */

import type * as Monaco from 'monaco-editor';

export const leoLanguageConfig: Monaco.languages.IMonarchLanguage = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  defaultToken: 'invalid',
  tokenPostfix: '.leo',

  keywords: [
    'program',
    'import',
    'transition',
    'function',
    'inline',
    'struct',
    'record',
    'mapping',
    'finalize',
    'async',
    'let',
    'const',
    'return',
    'if',
    'else',
    'for',
    'in',
    'public',
    'private',
    'constant',
    'self',
    'block',
    'assert',
    'assert_eq',
    'assert_neq',
    'true',
    'false',
  ],

  typeKeywords: [
    'field',
    'group',
    'scalar',
    'address',
    'boolean',
    'u8',
    'u16',
    'u32',
    'u64',
    'u128',
    'i8',
    'i16',
    'i32',
    'i64',
    'i128',
  ],

  operators: [
    '=',
    '>',
    '<',
    '!',
    '~',
    '?',
    ':',
    '==',
    '<=',
    '>=',
    '!=',
    '&&',
    '||',
    '++',
    '--',
    '+',
    '-',
    '*',
    '/',
    '&',
    '|',
    '^',
    '%',
    '<<',
    '>>',
    '>>>',
    '+=',
    '-=',
    '*=',
    '/=',
    '&=',
    '|=',
    '^=',
    '%=',
    '<<=',
    '>>=',
    '>>>=',
    '**',
  ],

  // Common regular expressions
  symbols: /[=><!~?:&|+\-*/^%]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  digits: /\d+(_+\d+)*/,
  octaldigits: /[0-7]+(_+[0-7]+)*/,
  binarydigits: /[0-1]+(_+[0-1]+)*/,
  hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

  // The main tokenizer for Leo
  tokenizer: {
    root: [
      // Identifiers and keywords
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            '@typeKeywords': 'keyword.type',
            '@keywords': 'keyword',
            '@default': 'identifier',
          },
        },
      ],
      [/[A-Z][\w$]*/, 'type.identifier'], // PascalCase types

      // Whitespace
      { include: '@whitespace' },

      // Delimiters and operators
      [/[{}()[\]]/, '@brackets'],
      [/[<>](?!@symbols)/, '@brackets'],
      [
        /@symbols/,
        {
          cases: {
            '@operators': 'operator',
            '@default': '',
          },
        },
      ],

      // Numbers
      [/(@digits)[eE]([-+]?(@digits))?/, 'number.float'],
      [/(@digits)\.(@digits)([eE][-+]?(@digits))?/, 'number.float'],
      [/0[xX](@hexdigits)/, 'number.hex'],
      [/0[oO]?(@octaldigits)/, 'number.octal'],
      [/0[bB](@binarydigits)/, 'number.binary'],
      [/(@digits)/, 'number'],

      // Delimiter: after number because of .\d floats
      [/[;,.]/, 'delimiter'],

      // Strings
      [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-terminated string
      [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

      // Characters
      [/'[^\\']'/, 'string'],
      [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
      [/'/, 'string.invalid'],
    ],

    comment: [
      [/[^/*]+/, 'comment'],
      [/\/\*/, 'comment', '@push'], // nested comment
      ['\\*/', 'comment', '@pop'],
      [/[/*]/, 'comment'],
    ],

    string: [
      [/[^\\"]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
    ],

    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/\/\*/, 'comment', '@comment'],
      [/\/\/.*$/, 'comment'],
    ],
  },
};

/**
 * Configuration for Leo language
 */
export const leoLanguageConfiguration: Monaco.languages.LanguageConfiguration = {
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/'],
  },
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
  ],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"', notIn: ['string'] },
    { open: "'", close: "'", notIn: ['string', 'comment'] },
  ],
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
  folding: {
    markers: {
      start: new RegExp('^\\s*//\\s*#?region\\b'),
      end: new RegExp('^\\s*//\\s*#?endregion\\b'),
    },
  },
};

/**
 * Register Leo language with Monaco
 * @param monaco - Monaco instance from the editor
 */
export function registerLeoLanguage(monaco: typeof Monaco) {
  // Register a new language
  monaco.languages.register({ id: 'leo' });

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider('leo', leoLanguageConfig);

  // Register language configuration
  monaco.languages.setLanguageConfiguration('leo', leoLanguageConfiguration);

  // Register completion item provider
  monaco.languages.registerCompletionItemProvider('leo', {
    provideCompletionItems: (model, position) => {
      const suggestions: Monaco.languages.CompletionItem[] = [
        // Keywords
        ...leoLanguageConfig.keywords.map((keyword: string) => ({
          label: keyword,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: keyword,
          range: {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: position.column,
            endColumn: position.column,
          },
        })),
        // Types
        ...leoLanguageConfig.typeKeywords.map((type: string) => ({
          label: type,
          kind: monaco.languages.CompletionItemKind.TypeParameter,
          insertText: type,
          range: {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: position.column,
            endColumn: position.column,
          },
        })),
        // Snippets
        {
          label: 'program',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'program ${1:name}.aleo {\n\t$0\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Create a new Leo program',
          range: {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: position.column,
            endColumn: position.column,
          },
        },
        {
          label: 'transition',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'transition ${1:name}(${2:params}) -> ${3:u32} {\n\t$0\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Create a transition function',
          range: {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: position.column,
            endColumn: position.column,
          },
        },
        {
          label: 'record',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'record ${1:Name} {\n\towner: address,\n\t$0\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Create a record (private state)',
          range: {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: position.column,
            endColumn: position.column,
          },
        },
        {
          label: 'mapping',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'mapping ${1:name}: ${2:key} => ${3:value};',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Create a mapping (public state)',
          range: {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: position.column,
            endColumn: position.column,
          },
        },
      ];

      return { suggestions };
    },
  });
}

/**
 * Leo theme configuration (Dark)
 */
export const leoTheme: Monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'keyword', foreground: 'C586C0' }, // Purple for keywords
    { token: 'keyword.type', foreground: '4EC9B0' }, // Teal for types
    { token: 'identifier', foreground: '9CDCFE' }, // Light blue for identifiers
    { token: 'type.identifier', foreground: '4EC9B0' }, // Teal for type identifiers
    { token: 'number', foreground: 'B5CEA8' }, // Light green for numbers
    { token: 'string', foreground: 'CE9178' }, // Orange for strings
    { token: 'comment', foreground: '6A9955' }, // Green for comments
    { token: 'operator', foreground: 'D4D4D4' }, // White for operators
    { token: 'delimiter', foreground: 'D4D4D4' },
  ],
  colors: {
    'editor.background': '#0F1419',
    'editor.foreground': '#D4D4D4',
    'editor.lineHighlightBackground': '#1E1E1E',
    'editorCursor.foreground': '#00D4AA',
    'editor.selectionBackground': '#264F78',
  },
};

/**
 * Leo theme configuration (Light)
 */
export const leoLightTheme: Monaco.editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'keyword', foreground: '7E22CE', fontStyle: 'bold' }, // Purple-700
    { token: 'keyword.type', foreground: '059669' }, // Emerald-600
    { token: 'identifier', foreground: '111827' }, // Gray-900
    { token: 'type.identifier', foreground: '059669' }, // Emerald-600
    { token: 'number', foreground: '2563EB' }, // Blue-600
    { token: 'string', foreground: 'DC2626' }, // Red-600
    { token: 'comment', foreground: '6B7280', fontStyle: 'italic' }, // Gray-500
    { token: 'operator', foreground: '374151' }, // Gray-700
    { token: 'delimiter', foreground: '374151' },
  ],
  colors: {
    'editor.background': '#FFFFFF',
    'editor.foreground': '#111827',
    'editor.lineHighlightBackground': '#F3F4F6',
    'editorCursor.foreground': '#00D4AA',
    'editor.selectionBackground': '#E0F2FE',
  },
};

export default {
  registerLeoLanguage,
  leoTheme,
  leoLightTheme,
  leoLanguageConfig,
  leoLanguageConfiguration,
};

'use client';

import { Editor, OnMount } from '@monaco-editor/react';
import { useState } from 'react';
import * as monaco from 'monaco-editor';

interface MoveEditorProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  onRun?: (code: string) => void;
  height?: string;
}

export default function MoveEditor({
  defaultValue = '',
  onChange,
  onRun,
  height = '500px',
}: MoveEditorProps) {
  const [code, setCode] = useState(defaultValue);
  const [isRunning, setIsRunning] = useState(false);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Register Move language
    monaco.languages.register({ id: 'move' });

    // Define Move syntax highlighting
    monaco.languages.setMonarchTokensProvider('move', {
      keywords: [
        'module', 'struct', 'fun', 'public', 'entry', 'has', 'key', 'store',
        'copy', 'drop', 'let', 'mut', 'return', 'if', 'else', 'while', 'loop',
        'break', 'continue', 'use', 'as', 'move', 'abort', 'assert', 'acquires',
        'friend', 'native', 'const', 'spec', 'schema', 'invariant', 'requires',
        'ensures', 'apply', 'to', 'except', 'global', 'exists', 'old',
      ],
      typeKeywords: [
        'address', 'bool', 'u8', 'u16', 'u32', 'u64', 'u128', 'u256',
        'vector', 'Self', 'signer',
      ],
      operators: [
        '=', '>', '<', '!', '~', '?', '::', ':',
        '==', '<=', '>=', '!=', '&&', '||', '++', '--',
        '+', '-', '*', '/', '&', '|', '^', '%', '<<',
        '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=',
        '^=', '%=', '<<=', '>>=', '>>>=',
      ],
      symbols: /[=><!~?:&|+\-*\/\^%]+/,
      escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

      tokenizer: {
        root: [
          [/[a-z_$][\w$]*/, {
            cases: {
              '@typeKeywords': 'keyword.type',
              '@keywords': 'keyword',
              '@default': 'identifier',
            },
          }],
          [/[A-Z][\w\$]*/, 'type.identifier'],
          { include: '@whitespace' },
          [/[{}()\[\]]/, '@brackets'],
          [/[<>](?!@symbols)/, '@brackets'],
          [/@symbols/, {
            cases: {
              '@operators': 'operator',
              '@default': '',
            },
          }],
          [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
          [/0[xX][0-9a-fA-F]+/, 'number.hex'],
          [/\d+/, 'number'],
          [/[;,.]/, 'delimiter'],
          [/"([^"\\]|\\.)*$/, 'string.invalid'],
          [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
          [/'[^\\']'/, 'string'],
          [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
          [/'/, 'string.invalid'],
        ],

        comment: [
          [/[^\/*]+/, 'comment'],
          [/\/\*/, 'comment', '@push'],
          ['\\*/', 'comment', '@pop'],
          [/[\/*]/, 'comment'],
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
    });

    // Set Move language configuration
    monaco.languages.setLanguageConfiguration('move', {
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
        { open: '/*', close: ' */', notIn: ['string'] },
      ],
      surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '<', close: '>' },
      ],
    });
  };

  const handleChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onChange?.(newCode);
  };

  const handleRun = async () => {
    if (!onRun) return;

    setIsRunning(true);
    try {
      await onRun(code);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 border border-gray-700 rounded-lg overflow-hidden">
        <Editor
          height={height}
          defaultLanguage="move"
          defaultValue={defaultValue}
          onChange={handleChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
          }}
        />
      </div>

      {onRun && (
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="mt-4 w-full px-6 py-4 bg-gradient-to-r from-sui-ocean to-sui-ocean-dark text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-sui-ocean/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
        >
          {isRunning ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Compiling...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2 text-lg">
              ▶ Run Code
            </span>
          )}
        </button>
      )}
    </div>
  );
}

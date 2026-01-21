'use client';

import { Editor, OnMount } from '@monaco-editor/react';
import { useState } from 'react';
import { registerLeoLanguage, leoTheme, leoLightTheme } from '@/app/lib/monaco/leoLanguage';
import DeployButton from '@/app/components/aleo/DeployButton';

interface LeoEditorProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  onRun?: (code: string) => void;
  height?: string;
}

export default function LeoEditor({
  defaultValue = '',
  onChange,
  onRun,
  height = '500px',
}: LeoEditorProps) {
  const [code, setCode] = useState(defaultValue);
  const [isRunning, setIsRunning] = useState(false);

  const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
    // Register Leo language and theme using the monacoInstance from the callback
    registerLeoLanguage(monacoInstance);
    monacoInstance.editor.defineTheme('leo-theme', leoTheme);
    monacoInstance.editor.defineTheme('leo-light-theme', leoLightTheme);
    monacoInstance.editor.setTheme('leo-light-theme');
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
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 rounded-lg overflow-hidden relative">
        <Editor
          height="100%"
          defaultLanguage="leo"
          defaultValue={defaultValue}
          onChange={handleChange}
          onMount={handleEditorDidMount}
          theme="leo-light-theme"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            renderLineHighlight: 'none',
          }}
        />
      </div>

      {onRun && (
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="mt-4 w-full px-4 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Compiling...
            </span>
          ) : (
            'Compile & Run'
          )}
        </button>
      )}

      <div className="mt-2">
        <DeployButton sourceCode={code} />
      </div>
    </div>
  );
}

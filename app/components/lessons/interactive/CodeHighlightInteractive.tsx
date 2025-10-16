'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CodeHighlightConfig {
  code?: string;
  highlights?: { line: number; explanation: string }[];
}

interface CodeHighlightInteractiveProps {
  config: CodeHighlightConfig;
}

export default function CodeHighlightInteractive({ config }: CodeHighlightInteractiveProps) {
  const { code = '', highlights = [] } = config;
  const [selectedLine, setSelectedLine] = useState<number | null>(null);

  const codeLines = code.split('\n');

  const getHighlightForLine = (lineNumber: number) => {
    return highlights.find((h) => h.line === lineNumber);
  };

  const selectedHighlight = selectedLine !== null ? getHighlightForLine(selectedLine) : null;

  return (
    <div className="space-y-4">
      <p className="text-center text-sui-gray-600 font-medium mb-4">
        Click on the highlighted lines to learn what they do! 💡
      </p>

      <div className="bg-sui-navy rounded-2xl p-6 font-mono text-sm overflow-x-auto">
        {codeLines.map((line, index) => {
          const lineNumber = index + 1;
          const highlight = getHighlightForLine(lineNumber);
          const isHighlighted = !!highlight;
          const isSelected = selectedLine === lineNumber;

          return (
            <motion.div
              key={index}
              onClick={() => isHighlighted && setSelectedLine(isSelected ? null : lineNumber)}
              whileHover={isHighlighted ? { scale: 1.01 } : {}}
              className={`flex items-start gap-4 py-1 px-2 -mx-2 rounded-lg transition-all ${
                isHighlighted ? 'cursor-pointer' : ''
              } ${
                isSelected
                  ? 'bg-sui-ocean/30 border-l-4 border-sui-ocean'
                  : isHighlighted
                  ? 'bg-sui-ocean/10 hover:bg-sui-ocean/20'
                  : ''
              }`}
            >
              <span className="text-sui-gray-400 select-none min-w-[2rem] text-right">
                {lineNumber}
              </span>
              <code className="text-white flex-1">{line || ' '}</code>
              {isHighlighted && (
                <span className="text-sui-ocean text-xs">
                  {isSelected ? '◀' : '●'}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Explanation Panel */}
      {selectedHighlight && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-sui-ocean/10 to-sui-sky border-2 border-sui-ocean rounded-2xl p-6"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-bold text-sui-navy mb-2">Line {selectedLine} Explanation:</h4>
              <p className="text-sui-gray-700 leading-relaxed">{selectedHighlight.explanation}</p>
            </div>
          </div>
        </motion.div>
      )}

      {!selectedHighlight && highlights.length > 0 && (
        <div className="text-center text-sm text-sui-gray-500">
          Click on a highlighted line to see what it does
        </div>
      )}
    </div>
  );
}

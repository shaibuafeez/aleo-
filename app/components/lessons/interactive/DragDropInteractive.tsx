'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface DragDropConfig {
  items?: { id: string; label: string; emoji: string }[];
  targets?: { id: string; label: string }[];
  correctPairs?: { itemId: string; targetId: string }[];
}

interface DragDropInteractiveProps {
  config: DragDropConfig;
}

export default function DragDropInteractive({ config }: DragDropInteractiveProps) {
  const { items = [], targets = [], correctPairs = [] } = config;
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string>('');

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => {
    if (!draggedItem) return;

    const newPlacements = { ...placements, [draggedItem]: targetId };
    setPlacements(newPlacements);

    // Check if correct
    const correctPair = correctPairs.find((pair) => pair.itemId === draggedItem);
    if (correctPair?.targetId === targetId) {
      setFeedback('✅ Perfect! That\'s exactly right!');
    } else {
      setFeedback('❌ Not quite! Try again.');
    }

    setDraggedItem(null);

    // Clear feedback after 2 seconds
    setTimeout(() => setFeedback(''), 2000);
  };

  const isItemPlaced = (itemId: string) => !!placements[itemId];
  const getItemInTarget = (targetId: string) => {
    const entry = Object.entries(placements).find(([_, target]) => target === targetId);
    return entry ? items.find((item) => item.id === entry[0]) : null;
  };

  return (
    <div className="space-y-6">
      <p className="text-center text-sui-gray-600 font-medium">
        Drag the items to the correct boxes! 👇
      </p>

      {/* Items to drag */}
      <div className="flex gap-4 justify-center flex-wrap">
        {items.map((item) => (
          <motion.div
            key={item.id}
            draggable={!isItemPlaced(item.id)}
            onDragStart={() => handleDragStart(item.id)}
            whileHover={{ scale: isItemPlaced(item.id) ? 1 : 1.05 }}
            className={`px-6 py-4 rounded-2xl border-2 cursor-move transition-all ${
              isItemPlaced(item.id)
                ? 'bg-sui-gray-100 border-sui-gray-300 opacity-50 cursor-not-allowed'
                : 'bg-white border-sui-ocean shadow-md hover:shadow-lg'
            }`}
          >
            <span className="text-2xl mr-2">{item.emoji}</span>
            <span className="font-semibold text-sui-navy">{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Drop targets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {targets.map((target) => {
          const placedItem = getItemInTarget(target.id);
          return (
            <div
              key={target.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(target.id)}
              className={`min-h-32 p-6 rounded-2xl border-2 border-dashed transition-all ${
                draggedItem
                  ? 'border-sui-ocean bg-sui-sky/30'
                  : 'border-sui-gray-300 bg-sui-gray-50'
              }`}
            >
              <h4 className="text-sm font-bold text-sui-gray-600 uppercase tracking-wider mb-3">
                {target.label}
              </h4>
              {placedItem ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border-2 border-sui-ocean"
                >
                  <span className="text-2xl">{placedItem.emoji}</span>
                  <span className="font-semibold text-sui-navy">{placedItem.label}</span>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-16 text-sui-gray-400">
                  Drop here
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Feedback */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center font-bold text-lg ${
            feedback.includes('✅') ? 'text-green-600' : 'text-orange-600'
          }`}
        >
          {feedback}
        </motion.div>
      )}
    </div>
  );
}

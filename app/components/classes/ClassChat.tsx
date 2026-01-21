'use client';

import { useState, useMemo } from 'react';
import {
  ReceivedChatMessage,
  useChat,
  useLocalParticipant,
  useRoomInfo,
} from '@livekit/components-react';
import { ClassMetadata } from '@/app/lib/livekit/controller';

function ChatMessage({ message }: { message: ReceivedChatMessage }) {
  const { localParticipant } = useLocalParticipant();
  const isOwnMessage = localParticipant.identity === message.from?.identity;

  return (
    <div className={`flex gap-2 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-aleo-green text-sm font-bold border border-aleo-green/20">
          {message.from?.identity[0]?.toUpperCase() || '?'}
        </div>
      </div>
      <div className={`flex flex-col max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'}`}>
        <span className="text-xs text-gray-400 mb-1">
          {message.from?.identity || 'Unknown'}
        </span>
        <div
          className={`px-3 py-2 rounded-lg ${isOwnMessage
              ? 'bg-aleo-green text-zinc-900 font-medium rounded-br-none'
              : 'bg-zinc-800 text-white rounded-bl-none'
            }`}
        >
          <p className="text-sm break-words">{message.message}</p>
        </div>
      </div>
    </div>
  );
}

export function ClassChat() {
  const [draft, setDraft] = useState('');
  const { chatMessages, send } = useChat();
  const { metadata } = useRoomInfo();

  const { chat_enabled } = (metadata ? JSON.parse(metadata) : {}) as ClassMetadata;

  // Deduplicate messages by timestamp
  const messages = useMemo(() => {
    const timestamps = chatMessages.map((msg) => msg.timestamp);
    const filtered = chatMessages.filter(
      (msg, i) => !timestamps.includes(msg.timestamp, i + 1)
    );
    return filtered;
  }, [chatMessages]);

  const onSend = async () => {
    if (draft.trim().length && send) {
      setDraft('');
      await send(draft);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Chat</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p>No messages yet</p>
            <p className="text-sm">Be the first to say something!</p>
          </div>
        ) : (
          messages.map((msg) => <ChatMessage message={msg} key={msg.timestamp} />)
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        {chat_enabled ? (
          <div className="flex gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-zinc-800 text-white rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-aleo-green/50 placeholder:text-zinc-500"
              rows={1}
              disabled={!chat_enabled}
            />
            <button
              onClick={onSend}
              disabled={!draft.trim().length}
              className="px-4 py-2 bg-aleo-green hover:bg-aleo-green-dim disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-zinc-900 rounded-lg font-bold transition-colors"
            >
              Send
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm">Chat is disabled</p>
        )}
      </div>
    </div>
  );
}

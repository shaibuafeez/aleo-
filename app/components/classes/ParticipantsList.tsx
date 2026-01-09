'use client';

import { useParticipants, useLocalParticipant } from '@livekit/components-react';
import { ParticipantMetadata } from '@/app/lib/livekit/controller';

interface ParticipantsListProps {
  isInstructor?: boolean;
  onInviteToSpeak?: (userId: string) => void;
}

export function ParticipantsList({
  isInstructor = false,
  onInviteToSpeak,
}: ParticipantsListProps) {
  const participants = useParticipants();
  const { localParticipant } = useLocalParticipant();

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">
          Participants ({participants.length})
        </h3>
      </div>

      {/* Participants list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {participants.map((participant) => {
          const metadata = (participant.metadata &&
            JSON.parse(participant.metadata)) as ParticipantMetadata;
          const isLocal = participant.identity === localParticipant.identity;
          const canPublish = participant.permissions?.canPublish;

          return (
            <div
              key={participant.identity}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  {metadata?.username?.[0]?.toUpperCase() || participant.identity[0]?.toUpperCase() || '?'}
                </div>

                {/* Name and status */}
                <div className="flex flex-col">
                  <span className="text-white font-medium">
                    {metadata?.username || participant.identity}
                    {isLocal && ' (you)'}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    {metadata?.is_instructor && (
                      <span className="px-2 py-0.5 bg-purple-600 text-white rounded">
                        Instructor
                      </span>
                    )}
                    {canPublish && !metadata?.is_instructor && (
                      <span className="px-2 py-0.5 bg-green-600 text-white rounded">
                        Speaking
                      </span>
                    )}
                    {metadata?.hand_raised && (
                      <span className="flex items-center gap-1">
                        ✋ Hand raised
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions (instructor only) */}
              {isInstructor && !metadata?.is_instructor && (
                <div className="flex gap-2">
                  {metadata?.hand_raised && !canPublish && onInviteToSpeak && (
                    <button
                      onClick={() => onInviteToSpeak(participant.identity)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                    >
                      Invite to Speak
                    </button>
                  )}
                  {canPublish && (
                    <button
                      onClick={() => {
                        // TODO: Implement remove from speaking
                      }}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                    >
                      Mute
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

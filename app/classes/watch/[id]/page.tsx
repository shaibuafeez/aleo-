'use client';

import { use, useEffect, useState } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import { ClassPlayer } from '@/app/components/classes/ClassPlayer';
import { ClassChat } from '@/app/components/classes/ClassChat';
import { QuestionsPanel } from '@/app/components/classes/QuestionsPanel';
import { ParticipantsList } from '@/app/components/classes/ParticipantsList';
import { createClient } from '@/app/lib/supabase/client';
import '@livekit/components-styles';

export default function WatchClassPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: classId } = use(params);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'qa' | 'participants'>('chat');
  const supabase = createClient();

  useEffect(() => {
    joinClass();
  }, [classId]);

  const joinClass = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call join API
      const response = await fetch(`/api/classes/${classId}/join`, {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to join class');
      }

      const data = await response.json();
      setToken(data.connection_details.token);
    } catch (err: any) {
      console.error('Error joining class:', err);
      setError(err.message || 'Failed to join class');
    } finally {
      setLoading(false);
    }
  };

  const raiseHand = async () => {
    try {
      const response = await fetch(`/api/classes/${classId}/raise-hand`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to raise hand');
      }
    } catch (err) {
      console.error('Error raising hand:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Joining class...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-white mb-2">Unable to Join Class</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={joinClass}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <LiveKitRoom
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={token}
        connect={true}
      >
        <div className="h-screen flex flex-col">
          {/* Main content area */}
          <div className="flex-1 flex gap-4 p-4 overflow-hidden">
            {/* Video player */}
            <div className="flex-1 min-w-0">
              <ClassPlayer isInstructor={false} />
            </div>

            {/* Right sidebar */}
            <div className="w-96 flex-shrink-0 flex flex-col gap-4">
              {/* Tabs */}
              <div className="bg-gray-900 rounded-lg p-1 flex gap-1">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 px-4 py-2 rounded transition-colors ${
                    activeTab === 'chat'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`flex-1 px-4 py-2 rounded transition-colors ${
                    activeTab === 'qa'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Q&A
                </button>
                <button
                  onClick={() => setActiveTab('participants')}
                  className={`flex-1 px-4 py-2 rounded transition-colors ${
                    activeTab === 'participants'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  People
                </button>
              </div>

              {/* Tab content */}
              <div className="flex-1 min-h-0">
                {activeTab === 'chat' && <ClassChat />}
                {activeTab === 'qa' && (
                  <QuestionsPanel classId={classId} isInstructor={false} />
                )}
                {activeTab === 'participants' && (
                  <ParticipantsList isInstructor={false} />
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={raiseHand}
                  className="flex-1 px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors"
                >
                  ✋ Raise Hand
                </button>
              </div>
            </div>
          </div>
        </div>
      </LiveKitRoom>
    </div>
  );
}

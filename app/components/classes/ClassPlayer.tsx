'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AudioTrack,
  VideoTrack,
  useLocalParticipant,
  useParticipants,
  useRoomContext,
  useTracks,
  useMediaDeviceSelect,
} from '@livekit/components-react';
import {
  ConnectionState,
  LocalVideoTrack,
  Track,
  createLocalTracks,
} from 'livekit-client';
import { ParticipantMetadata } from '@/app/lib/livekit/controller';

interface ClassPlayerProps {
  isInstructor?: boolean;
  onEndClass?: () => void;
}

export function ClassPlayer({ isInstructor = false, onEndClass }: ClassPlayerProps) {
  const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack>();
  const localVideoEl = useRef<HTMLVideoElement>(null);

  const { metadata, name: roomName, state: roomState } = useRoomContext();
  const { localParticipant } = useLocalParticipant();
  const participants = useParticipants();

  const localMetadata = (localParticipant.metadata &&
    JSON.parse(localParticipant.metadata)) as ParticipantMetadata;
  const canPublish = isInstructor || localMetadata?.is_instructor;

  // Create local video track for instructor
  useEffect(() => {
    if (canPublish) {
      const createTracks = async () => {
        const tracks = await createLocalTracks({ audio: true, video: true });
        const camTrack = tracks.find((t) => t.kind === Track.Kind.Video);
        if (camTrack && localVideoEl?.current) {
          camTrack.attach(localVideoEl.current);
        }
        setLocalVideoTrack(camTrack as LocalVideoTrack);
      };
      void createTracks();
    }
  }, [canPublish]);

  // Handle camera device selection
  const { activeDeviceId: activeCameraDeviceId } = useMediaDeviceSelect({
    kind: 'videoinput',
  });

  useEffect(() => {
    if (localVideoTrack) {
      void localVideoTrack.setDeviceId(activeCameraDeviceId);
    }
  }, [localVideoTrack, activeCameraDeviceId]);

  // Get remote video and audio tracks
  const remoteVideoTracks = useTracks([Track.Source.Camera]).filter(
    (t) => t.participant.identity !== localParticipant.identity
  );

  const remoteAudioTracks = useTracks([Track.Source.Microphone]).filter(
    (t) => t.participant.identity !== localParticipant.identity
  );

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {/* Main video grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-full">
        {/* Local participant video (instructor) */}
        {canPublish && (
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
            <video
              ref={localVideoEl}
              className="absolute w-full h-full object-cover -scale-x-100"
              autoPlay
              playsInline
              muted
            />
            <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-sm">
              {localParticipant.identity} (you)
            </div>
          </div>
        )}

        {/* Remote participants video */}
        {remoteVideoTracks.map((track) => {
          const metadata = (track.participant.metadata &&
            JSON.parse(track.participant.metadata)) as ParticipantMetadata;
          return (
            <div
              key={track.participant.identity}
              className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video"
            >
              <VideoTrack trackRef={track} className="absolute w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-sm flex items-center gap-2">
                {metadata?.hand_raised && <span>✋</span>}
                {track.participant.identity}
              </div>
            </div>
          );
        })}
      </div>

      {/* Audio tracks (not visible) */}
      {remoteAudioTracks.map((track) => (
        <AudioTrack trackRef={track} key={track.participant.identity} />
      ))}

      {/* Header with class info */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {roomState === ConnectionState.Connected ? (
              <>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white font-semibold">LIVE</span>
              </>
            ) : (
              <span className="text-white/70">Connecting...</span>
            )}
            <span className="text-white/70">·</span>
            <span className="text-white/70">{participants.length} participants</span>
          </div>

          {isInstructor && onEndClass && (
            <button
              onClick={onEndClass}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
            >
              End Class
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useRef, useCallback } from 'react';

export function useVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      videoRef.current.muted = true;
    } else {
      videoRef.current.play();
      videoRef.current.muted = false;
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const play = useCallback(() => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.play();
      videoRef.current.muted = false;
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const pause = useCallback(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      videoRef.current.muted = true;
      setIsPlaying(false);
    }
  }, [isPlaying]);

  return {
    videoRef,
    isPlaying,
    togglePlayback,
    play,
    pause,
  };
}

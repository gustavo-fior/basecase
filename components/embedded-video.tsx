'use client';

import { useEffect, useRef } from 'react';

type VideoProps = {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  width?: string | number;
};

export default function EmbeddedVideo({
  src,
  autoPlay,
  loop,
  muted,
  playsInline,
  width = '100%',
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video && autoPlay) {
      video.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
  }, [autoPlay]);

  return (
    <div className="my-4">
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        width={width}
      />
    </div>
  );
}

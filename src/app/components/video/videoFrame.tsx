import React from 'react';

interface VideoProps {
  videoUrl: string;
  title?: string;
  width: number;
  height: number;
}

// Video component to display a video iframe - using Youtube embed specifications
export default function Video({ videoUrl, title, width, height }: VideoProps) {
  return (
    <div className='videoFrame'>
      <iframe
        width={width}
        height={height}
        src={videoUrl}
        title={title}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
      ></iframe>
    </div>
  );
}

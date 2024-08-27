import React from 'react';

interface VideoProps {
  videoUrl: string;
  title?: string;
}

export default function Video({ videoUrl, title }: VideoProps) {
  return (
    <div className='videoFrame'>
      <iframe
        width='560'
        height='315'
        src={videoUrl}
        title={title}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
      ></iframe>
    </div>
  );
}

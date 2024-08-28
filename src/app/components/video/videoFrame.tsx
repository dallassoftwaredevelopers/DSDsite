import useMediaQuery from '@/app/hooks/useMediaQuery';
import React, { use } from 'react';

interface VideoProps {
  videoUrl: string;
  title?: string;
}

// Video component to display a video iframe - using Youtube embed specifications
export default function Video({ videoUrl, title }: VideoProps) {

  let width = 560;
  let height = 315;

  if (useMediaQuery('(max-width: 1050px)')) {
    width = 480;
    height = 270;
  }
  if (useMediaQuery('(max-width: 850px)')) {
    width = 320;
    height = 180;
  }

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

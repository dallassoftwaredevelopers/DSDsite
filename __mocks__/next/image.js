import React from 'react';

const Image = ({ 
  src, 
  alt, 
  width, 
  height, 
  fill,
  priority,
  placeholder,
  blurDataURL,
  quality,
  sizes,
  ...props 
}) => {
  // Filter out Next.js specific props that shouldn't be passed to DOM img element
  const filteredProps = Object.keys(props).reduce((acc, key) => {
    if (!['onLoad', 'onError', 'onLoadingComplete'].includes(key)) {
      acc[key] = props[key];
    }
    return acc;
  }, {});

  return <img src={src} alt={alt} width={width} height={height} {...filteredProps} />;
};

export default Image;

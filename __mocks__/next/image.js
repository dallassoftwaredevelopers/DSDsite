export default function Image({ src, alt, width, height }) {
  // The test renderer exposes the underlying image to jsdom.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === 'string' ? src : src.src}
      alt={alt}
      width={width}
      height={height}
    />
  );
}

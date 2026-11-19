import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  quality?: number;
  fill?: boolean;
  /**
   * How wide the image is displayed, as a CSS `sizes` value. Leave it out for
   * fixed-size images (logos, avatars) so the browser picks from 1x/2x files
   * instead of downloading a full-width one.
   */
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  priority = false,
  className,
  quality = 90,
  fill = false,
  sizes,
}: OptimizedImageProps) {
  const blurDataUrl =
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABgDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAECBf/EAB4QAAICAwEBAQEAAAAAAAAAAAABAgMEERIhMUFR/8QAFgEBAQEAAAAAAAAAAAAAAAAAAwQF/8QAHhEAAgICAwEBAAAAAAAAAAAAAAERAhIDITFBUWH/2gAMAwEAAhEDEQA/AIGJq1t2H7VdBiN7mhqRGNTEYeOSt2DdPl8lhHKnkp7fZcT0kkf1k4HGVOvOT9RiYTNJeNFmYeTbhFLj+n0fkqw2b4uF7lFdNfFVl/H/2Q==';

  if (fill || (width === 0 && height === 0)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        className={className}
        placeholder='blur'
        blurDataURL={blurDataUrl}
        sizes={sizes ?? '100vw'}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={quality}
      className={className}
      placeholder='blur'
      blurDataURL={blurDataUrl}
      sizes={sizes}
    />
  );
}

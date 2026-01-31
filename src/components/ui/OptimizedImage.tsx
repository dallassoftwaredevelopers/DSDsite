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
}: OptimizedImageProps) {
  const blurDataUrl =
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABgDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAECBf/EAB4QAAICAwEBAQEAAAAAAAAAAAABAgMEERIhMUFR/8QAFgEBAQEAAAAAAAAAAAAAAAAAAwQF/8QAHhEAAgICAwEBAAAAAAAAAAAAAAERAhIDITFBUWH/2gAMAwEAAhEDEQA/AIGJq1t2H7VdBiN7mhqRGNTEYeOSt2DdPl8lhHKnkp7fZcT0kkf1k4HGVOvOT9RiYTNJeNFmYeTbhFLj+n0fkqw2b4uF7lFdNfFVl/H/2Q==';

  // Skip Next.js Image optimization for API routes - they don't work well in production
  const isApiRoute = src.startsWith('/api/');

  if (fill || (width === 0 && height === 0)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        className={className}
        placeholder={isApiRoute ? 'empty' : 'blur'}
        blurDataURL={isApiRoute ? undefined : blurDataUrl}
        unoptimized={isApiRoute}
        sizes='(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1200px) 70vw, 1450px'
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
      placeholder={isApiRoute ? 'empty' : 'blur'}
      blurDataURL={isApiRoute ? undefined : blurDataUrl}
      unoptimized={isApiRoute}
      sizes='(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1200px) 70vw, 1450px'
    />
  );
}

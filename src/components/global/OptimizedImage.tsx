import { useState, useRef, useEffect, memo } from 'react';
import './styles/optimized-image.css';

interface ImageSource {
  src: string;
  width?: number;
  height?: number;
  media?: string; // CSS media query
  type?: string; // MIME type like 'image/webp'
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  
  // Responsive image options
  sources?: ImageSource[];
  sizes?: string;
  
  // Fallback and placeholder
  fallbackSrc?: string;
  placeholder?: React.ReactNode | 'blur' | 'skeleton';
  blurDataURL?: string;
  
  // Styling
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: string;
  
  // Performance
  priority?: boolean; // For above-the-fold images
  
  // Callbacks
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Optimized image component with responsive images, lazy loading, and modern formats
 */
function OptimizedImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  sources = [],
  sizes,
  fallbackSrc,
  placeholder = 'skeleton',
  blurDataURL,
  objectFit = 'cover',
  aspectRatio,
  priority = false,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before entering viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate srcSet from sources
  const generateSrcSet = (sources: ImageSource[]) => {
    return sources
      .filter(source => !source.type || source.type === 'image/jpeg' || source.type === 'image/png')
      .map(source => `${source.src}${source.width ? ` ${source.width}w` : ''}`)
      .join(', ');
  };

  // Render placeholder
  const renderPlaceholder = () => {
    if (placeholder === 'blur' && blurDataURL) {
      return (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm"
          aria-hidden="true"
        />
      );
    }

    if (placeholder === 'skeleton') {
      return (
        <div 
          className="skeleton-placeholder absolute inset-0 w-full h-full"
          aria-hidden="true"
        />
      );
    }

    return placeholder;
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'block',
    overflow: 'hidden',
    ...(aspectRatio && { aspectRatio })
  };

  const imageStyle: React.CSSProperties = {
    objectFit,
    transition: 'opacity 0.3s ease',
    opacity: isLoaded ? 1 : 0
  };

  return (
    <div 
      ref={containerRef}
      className={`optimized-image-container ${className}`}
      style={containerStyle}
    >
      {(!isLoaded || hasError) && renderPlaceholder()}
      
      {isInView && (
        <picture>
          {/* Modern format sources (WebP, AVIF) */}
          {sources
            .filter(source => source.type && source.type !== 'image/jpeg' && source.type !== 'image/png')
            .map((source, index) => (
              <source
                key={index}
                srcSet={source.src}
                type={source.type}
                media={source.media}
                sizes={sizes}
              />
            ))}
          
          {/* Fallback sources (JPEG, PNG) */}
          {sources.length > 0 && (
            <source
              srcSet={generateSrcSet(sources)}
              sizes={sizes}
            />
          )}
          
          <img
            ref={imgRef}
            src={hasError && fallbackSrc ? fallbackSrc : src}
            alt={alt}
            className="w-full h-full"
            style={imageStyle}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            decoding="async"
          />
        </picture>
      )}
    </div>
  );
}

export default memo(OptimizedImage);

// Helper function to create image sources for different formats and sizes
export function createImageSources(
  basePath: string,
  sizes: number[] = [400, 800, 1200, 1600], // Default: covers mobile to desktop
  formats: string[] = ['webp', 'jpeg']
): ImageSource[] {
  const sources: ImageSource[] = [];
  
  formats.forEach(format => {
    sizes.forEach(size => {
      const extension = format === 'webp' ? 'webp' : 'jpg';
      sources.push({
        src: `${basePath}-${size}w.${extension}`,
        width: size,
        type: `image/${format}`
      });
    });
  });
  
  return sources;
}

// Preset size configurations for different use cases
export const imageSizePresets = {
  // For portfolio/project images (your main use case)
  portfolio: [400, 800, 1200, 1600],
  
  // For smaller images like avatars, icons
  thumbnails: [100, 200, 400],
  
  // For hero images that need extra large sizes
  hero: [600, 1200, 1920, 2560],
  
  // For card/grid images
  cards: [300, 600, 900, 1200],
  
  // Minimal set for performance
  minimal: [400, 800, 1200]
} as const;

// Helper for responsive image sizes attribute
// Using your design system breakpoints: 40em, 48em, 64em, 90em, 120em
export const imageSizes = {
  hero: '(max-width: 40em) 100vw, (max-width: 64em) 90vw, (max-width: 90em) 80vw, 1200px',
  card: '(max-width: 40em) 100vw, (max-width: 48em) 90vw, (max-width: 64em) 50vw, 400px',
  thumbnail: '(max-width: 40em) 150px, (max-width: 48em) 180px, 200px',
  full: '100vw',
  project: '(max-width: 40em) 100vw, (max-width: 64em) 80vw, (max-width: 90em) 70vw, 800px'
} as const;
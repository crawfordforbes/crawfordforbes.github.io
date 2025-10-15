import { useState } from 'react';
import './styles/optimized-image.css';

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  aspectRatio?: string;
  fallbackSrc?: string;
}

/**
 * Simplified image component with loading states and error handling
 * Replaces the over-engineered OptimizedImage component
 */
export default function SimpleImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  objectFit = 'cover',
  priority = false,
  aspectRatio,
  fallbackSrc
}: SimpleImageProps) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    ...(aspectRatio && { aspectRatio })
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit,
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease'
  };
  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={`image-container ${className}`} style={containerStyle}>
      {!isLoaded && !hasError && (
        <div className="image-loading" aria-hidden="true">
          <div className="loading-skeleton" />
        </div>
      )}
      
      <img
        src={hasError && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        loading={priority ? 'eager' : loading}
        style={imageStyle}
        onLoad={handleLoad}
        onError={handleError}
        decoding="async"
      />
      
      {hasError && !fallbackSrc && (
        <div className="image-error" aria-hidden="true">
          <span>Image failed to load</span>
        </div>
      )}
    </div>
  );
}

// Export for backward compatibility
export const imageSizes = {
  hero: '100vw',
  card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  thumbnail: '150px',
  full: '100vw',
  project: '(max-width: 40em) 100vw, (max-width: 64em) 80vw, 800px'
} as const;

// Legacy export
export { SimpleImage as OptimizedImage };
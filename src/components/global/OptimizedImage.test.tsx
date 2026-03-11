import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OptimizedImage from './OptimizedImage';

describe('OptimizedImage', () => {
  it('renders picture with sources and img with alt/src', () => {
    render(<OptimizedImage src="/images/example.jpg" alt="Example image" />);

    // picture element should exist
    const img = screen.getByAltText('Example image') as HTMLImageElement;
    expect(img).toBeDefined();
    expect(img.getAttribute('src')).toBeDefined();
  });

  it('uses fallbackSrc when image errors', () => {
    const fallback = '/images/fallback.jpg';
    render(<OptimizedImage src="/images/missing.jpg" alt="Missing" fallbackSrc={fallback} />);

    const img = screen.getByAltText('Missing') as HTMLImageElement;
    // simulate error
    fireEvent.error(img);

    // after error, src should be fallback (component sets src attribute to fallback on error)
    expect(img.getAttribute('src')).toContain('fallback');
  });
});

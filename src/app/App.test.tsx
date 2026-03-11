import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

// Mock analytics to avoid side effects during mount
vi.mock('@/utils/analytics', () => ({
  trackPageView: vi.fn(),
}));

describe('App', () => {
  it('mounts without throwing', () => {
    const { container } = render(<App />);
    expect(container).toBeDefined();
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div>Ok</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Ok')).toBeDefined();
  });

  it('renders fallback UI when a child throws', () => {
    const Bomb = () => {
      throw new Error('boom');
    };

    render(
      <ErrorBoundary fallback={<div>Fallback</div>}>
        <Bomb />
      </ErrorBoundary>
    );

    expect(screen.getByText('Fallback')).toBeDefined();
  });
});

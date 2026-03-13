import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Nav from './Nav'
import { createMatchMedia } from '@/test/utils/matchMediaMock'

describe('Nav prefers-reduced-motion', () => {
  const origMatchMedia: typeof window.matchMedia | undefined = window.matchMedia

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: createMatchMedia(true),
    })
  })

  afterEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: origMatchMedia,
    })
  })

  it('renders and toggles menu without animations', () => {
    render(<Nav />)

    const toggle = screen.getByRole('button', { name: /Open navigation menu/i })
    expect(toggle).toBeDefined()
    expect(toggle.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(toggle)
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
  })
})

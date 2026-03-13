import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hex from './Hex'
import { createMatchMedia } from '@/test/utils/matchMediaMock'

describe('Hex prefers-reduced-motion', () => {
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

  it('renders hex content under reduced-motion', () => {
    render(<Hex content={'X'} contentType={'text'} />)
    expect(screen.getByText('X')).toBeDefined()
  })
})

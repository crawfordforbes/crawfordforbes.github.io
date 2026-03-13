import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectResult from './ProjectResult'
import { createMatchMedia } from '@/test/utils/matchMediaMock'
import type { ProjectType } from '@/data/projects/projects'

describe('ProjectResult prefers-reduced-motion', () => {
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

  it('renders project result without errors under reduced-motion', () => {
    const project: ProjectType = {
      id: 'p1',
      title: 'Test Project',
      imageIds: [],
      short_description: 'Short',
      roleIds: [],
      techIds: [],
      featured: false,
    }

    render(
      <ProjectResult
        project={project}
        selectProjectClick={() => {}}
        selectRoleFilterClick={() => {}}
        selectTechFilterClick={() => {}}
        highlightFilterHover={() => {}}
      />
    )

    expect(screen.getByText('Test Project')).toBeDefined()
    expect(screen.getByText('Learn More')).toBeDefined()
  })
})

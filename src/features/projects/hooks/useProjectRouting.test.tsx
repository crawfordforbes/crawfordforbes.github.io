import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { createMemoryRouter, RouterProvider, Outlet, useLocation } from 'react-router'

// Mock scrolling util to avoid DOM interactions during tests
vi.mock('@/utils/site', () => ({ scrollToTarget: vi.fn() }))

import { useProjectRouting } from './useProjectRouting'

function SelectedDisplay() {
  const { selectedProjectId } = useProjectRouting()
  return <div data-testid="selected">{selectedProjectId ?? ''}</div>
}

function TriggerHook() {
  useProjectRouting()
  return <div data-testid="trigger" />
}

function ProjectsRoot() {
  return <div data-testid="projects-root">projects</div>
}

function LocationDisplay() {
  const loc = useLocation()
  return <div data-testid="location">{loc.pathname + loc.search}</div>
}

function AppLayout() {
  return (
    <>
      <Outlet />
      <LocationDisplay />
    </>
  )
}

describe('useProjectRouting hook', () => {
  it('valid project ID in URL sets selectedProjectId', async () => {
    const routes = [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          { path: 'projects/:projectId', element: <SelectedDisplay /> },
        ],
      },
    ]

    const router = createMemoryRouter(routes, { initialEntries: ['/projects/sunshine-nights'] })
    render(<RouterProvider router={router} />)

    expect((await screen.findByTestId('selected')).textContent).toBe('sunshine-nights')
  })

  it('invalid project ID navigates to /projects?error=project-not-found', async () => {
    const routes = [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          { path: 'projects', element: <ProjectsRoot /> },
          { path: 'projects/:projectId', element: <TriggerHook /> },
        ],
      },
    ]

    const router = createMemoryRouter(routes, { initialEntries: ['/projects/no-such-project'] })
    render(<RouterProvider router={router} />)

    expect((await screen.findByTestId('location')).textContent).toBe('/projects?error=project-not-found')
    expect(screen.getByTestId('projects-root')).toBeTruthy()
  })
})

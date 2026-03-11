import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { useProjectFilters } from './useProjectFilters'

function HookTester({ initialRoleIds = [], initialTechIds = [] }: { initialRoleIds?: string[]; initialTechIds?: string[] }) {
  const {
    selectedRoleIds,
    selectedTechIds,
    toggleRoleFilter,
    toggleTechFilter,
    setSelectedRoleIds,
    setSelectedTechIds,
  } = useProjectFilters(initialRoleIds, initialTechIds)

  return (
    <div>
      <div data-testid="roles">{JSON.stringify(selectedRoleIds)}</div>
      <div data-testid="techs">{JSON.stringify(selectedTechIds)}</div>

      <button data-testid="toggle-role" onClick={() => toggleRoleFilter('role-a')}>toggle-role-a</button>
      <button data-testid="toggle-tech" onClick={() => toggleTechFilter('tech-x')}>toggle-tech-x</button>
      <button data-testid="clear" onClick={() => { setSelectedRoleIds([]); setSelectedTechIds([]) }}>clear</button>
    </div>
  )
}

describe('useProjectFilters hook', () => {
  it('default state has no selected tags', () => {
    render(<HookTester />)

    expect(screen.getByTestId('roles').textContent).toBe('[]')
    expect(screen.getByTestId('techs').textContent).toBe('[]')
  })

  it('selecting a tag updates filter state to include that tag', async () => {
    render(<HookTester />)
    const user = userEvent.setup()

    await user.click(screen.getByTestId('toggle-role'))
    await user.click(screen.getByTestId('toggle-tech'))

    expect(screen.getByTestId('roles').textContent).toBe('["role-a"]')
    expect(screen.getByTestId('techs').textContent).toBe('["tech-x"]')
  })

  it('clearing tags resets state back to the default (no selected tags)', async () => {
    render(<HookTester initialRoleIds={[ 'role-a' ]} initialTechIds={[ 'tech-x' ]} />)
    const user = userEvent.setup()

    // confirm initial non-empty state
    expect(screen.getByTestId('roles').textContent).toBe('["role-a"]')
    expect(screen.getByTestId('techs').textContent).toBe('["tech-x"]')

    await user.click(screen.getByTestId('clear'))

    expect(screen.getByTestId('roles').textContent).toBe('[]')
    expect(screen.getByTestId('techs').textContent).toBe('[]')
  })
})

import { describe, it, expect } from 'vitest'
import { isValidProjectId, generateImageAlt, filterProjects, getAllProjectsSorted } from './projects'
import { imageData } from '@/data/global/images'

describe('projects utils', () => {
  it('isValidProjectId: returns true for a known project ID', () => {
    expect(isValidProjectId('sunshine-nights')).toBe(true)
  })

  it('isValidProjectId: returns false for an unknown string', () => {
    expect(isValidProjectId('no-such-project')).toBe(false)
  })

  it('isValidProjectId: returns false for non-string values', () => {
    expect(isValidProjectId(123)).toBe(false)
    expect(isValidProjectId(null)).toBe(false)
  })

  it('generateImageAlt: returns alt from imageData for known imageId', () => {
    const alt = generateImageAlt('Sunshine Nights', 'sunshine-nights-desktop')
    expect(alt).toBe(imageData['sunshine-nights-desktop'].alt)
  })

  it('generateImageAlt: returns fallback when imageId is empty', () => {
    const alt = generateImageAlt('My Project', '')
    expect(alt).toBe('My Project - Project Image')
  })

  it('filterProjects: returns only projects matching selected tech', () => {
    const projects = getAllProjectsSorted()
    const filtered = filterProjects(projects, [], ['react'])
    expect(filtered.length).toBeGreaterThan(0)
    filtered.forEach(p => expect(p.techIds?.includes('react')).toBe(true))
  })

  it('filterProjects: returns all projects when filters are empty', () => {
    const projects = getAllProjectsSorted()
    const filtered = filterProjects(projects, [], [])
    expect(filtered).toHaveLength(projects.length)
  })
})

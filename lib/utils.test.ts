import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
  })

  it('handles conditional classes', () => {
    expect(cn('base', true && 'is-true', false && 'is-false')).toBe('base is-true')
  })

  it('merges tailwind classes correctly (using twMerge)', () => {
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4')
  })
})

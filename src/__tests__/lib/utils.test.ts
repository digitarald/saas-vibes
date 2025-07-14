import { cn } from '@/lib/utils'
import { describe, expect, it } from 'vitest'

describe('cn utility function', () => {
  it('should merge classes correctly', () => {
    expect(cn('text-blue-500', 'text-red-500')).toBe('text-red-500')
  })

  it('should handle conditional classes', () => {
    expect(cn('base-class', true && 'conditional-class')).toBe(
      'base-class conditional-class'
    )
    expect(cn('base-class', false && 'conditional-class')).toBe('base-class')
  })

  it('should handle tailwind conflicts', () => {
    expect(cn('px-4 py-2', 'px-8')).toBe('py-2 px-8')
  })

  it('should handle undefined and null values', () => {
    expect(cn('base-class', undefined, null, 'other-class')).toBe(
      'base-class other-class'
    )
  })

  it('should handle empty string', () => {
    expect(cn('base-class', '', 'other-class')).toBe('base-class other-class')
  })

  it('should handle arrays', () => {
    expect(cn(['base-class', 'array-class'], 'string-class')).toBe(
      'base-class array-class string-class'
    )
  })

  it('should handle objects', () => {
    expect(
      cn({
        'base-class': true,
        'excluded-class': false,
        'included-class': true,
      })
    ).toBe('base-class included-class')
  })

  it('should return empty string for no arguments', () => {
    expect(cn()).toBe('')
  })
})

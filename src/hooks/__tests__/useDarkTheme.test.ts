import { renderHook } from '@testing-library/react'

import { useDarkTheme } from '../useDarkTheme'

describe('useDarkTheme', () => {
  it('should return correct states', () => {
    jest.mock('next-themes', () => {
      return {
        useTheme: () => ({
          theme: 'light',
          resolvedTheme: 'light',
          setTheme: jest.fn(),
        }),
      }
    })

    const { result } = renderHook(() => useDarkTheme())

    expect(result.current.isDark).toBe(false)
    expect(result.current.mounted).toBe(true)
  })
})

import { renderHook, waitFor } from '@testing-library/react'

import { useTheme } from '../use-theme'

describe('useDarkTheme', () => {
  it('should return correct states', async () => {
    jest.mock('next-themes', () => {
      return {
        useTheme: () => ({
          theme: 'light',
          resolvedTheme: 'light',
          setTheme: jest.fn(),
        }),
      }
    })

    const { result } = renderHook(() => useTheme())

    await waitFor(() => {
      const { theme } = result.current
      expect(theme).toBe(undefined)
    })

    expect(result.current.mounted).toBe(true)
  })
})

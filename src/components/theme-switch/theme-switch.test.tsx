import { render } from '@testing-library/react'

import ThemeSwitch from './theme-switch'

jest.mock('../../hooks/use-theme', () => {
  return {
    useTheme: () => ({
      theme: 'light',
      mounted: true,
      setTheme: jest.fn(),
    }),
  }
})

describe('ThemeSwitch', () => {
  it('should renders without crashing', () => {
    expect(() => {
      render(<ThemeSwitch />)
    }).not.toThrow()
  })
})

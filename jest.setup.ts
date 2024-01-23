/**
 * Optional: configure or set up a testing framework before each test.
 * If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`
 *
 * Used for __tests__/testing-library.js
 * Learn more: https://github.com/testing-library/jest-dom
 */
import '@testing-library/jest-dom'

window.scrollTo = () => {}

if (typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: (matchesOrMapOfMatches: any) => (qs: any) => ({
        matches:
          typeof matchesOrMapOfMatches === 'object'
            ? matchesOrMapOfMatches[qs]
            : matchesOrMapOfMatches,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }),
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

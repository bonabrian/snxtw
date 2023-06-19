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

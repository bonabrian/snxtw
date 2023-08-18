const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

/** @type {import('jest').Config} */
const jestConfig = {
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
    '<rootDir>/__mocks__/matchMedia.ts',
  ],
  // If using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  // Absolute imports and Module Path Aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/public/$1',
  },
  collectCoverageFrom: [
    './src/**/*.{js,jsx,ts,tsx}',
    '!./src/**/_*.{js,jsx,ts,tsx}',
    '!./src/**/*.stories.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!./src/**/index*.{js,jsx,ts,tsx}',
    // For now unable to test page components using metadata API with Jest
    // https://github.com/vercel/next.js/issues/47299
    '!./src/**/layout*.{js,jsx,ts,tsx}',
    '!./src/**/page*.{js,jsx,ts,tsx}',
    '!./src/components/analytics/**.{ts,tsx}',
    // For now api will skipped from coverage
    '!./src/**/route.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(jestConfig)

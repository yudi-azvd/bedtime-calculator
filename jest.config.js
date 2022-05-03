/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  bail: false,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: [
    "text-summary",
    "lcov",
  ],
  collectCoverageFrom: [
    '<rootDir>/src/services/*.ts'
  ],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  watchPathIgnorePatterns: [
    "node_modules",
    '<rootDir>/dist'
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/dist'
  ]
}

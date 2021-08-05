module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: ['<rootDir>/__tests__/**/?(*.)+(spec|test).js'],
  testEnvironment: 'jest-environment-node'
};

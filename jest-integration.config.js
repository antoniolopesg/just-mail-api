const config = require('./jest.config');
config.testMatch = ['<rootDir>/__tests__/integration/**/*.test.js'];
module.exports = config;

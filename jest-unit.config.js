const config = require('./jest.config');
config.testMatch = ['<rootDir>/__tests__/integration/**/*.spec.js'];
module.exports = config;

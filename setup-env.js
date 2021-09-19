const { join } = require('path');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';

const variants = {
  development: '.env.development',
  production: '.env',
  test: '.env.test'
};

if (!env || !variants[env]) {
  throw new Error('You must set a valid environment variable');
}

dotenv.config({ path: join(__dirname, variants[env]) });

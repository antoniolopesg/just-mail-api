const { resolve } = require('path');
const Sequelize = require('sequelize');
const fg = require('fast-glob');

const env = process.env.NODE_ENV;

const config = require('./config')[env];

const sequelize = new Sequelize(process.env[config.use_env_variable], config);

sequelize.authenticate().catch((err) => {
  console.error('Unable to connect to the database:', err);
  process.exit(1);
});

const models = fg.sync(resolve(__dirname, '..', 'src', '**', 'models', '*.js'));

models.forEach((definer) => {
  require(definer).default(sequelize);
});

module.exports = sequelize;

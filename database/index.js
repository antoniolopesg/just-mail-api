const { resolve } = require('path');
const Sequelize = require('sequelize');
const fg = require('fast-glob');

const config = require('./config');

const connection = new Sequelize(config[process.env.NODE_ENV]);

const models = fg.sync(resolve(__dirname, '..', 'src', '**', 'models', '*.js'));

models.forEach((definer) => {
  require(definer).default(connection);
});

module.exports = connection;

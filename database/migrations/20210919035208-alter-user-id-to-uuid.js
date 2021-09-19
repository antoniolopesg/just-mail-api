'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );

    await queryInterface.removeColumn('users', 'id');

    await queryInterface.addColumn('users', 'id', {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropColumn('users', 'id');

    await queryInterface.addColumn('users', 'id', {
      type: Sequelize.STRING,
      primaryKey: true
    });

    await queryInterface.sequelize.query(
      'DROP EXTENSION IF EXISTS "uuid-ossp";'
    );
  }
};

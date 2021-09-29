'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'first_name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('users', 'last_name', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropColumn('users', 'last_name');

    await queryInterface.dropColumn('users', 'first_name');
  }
};

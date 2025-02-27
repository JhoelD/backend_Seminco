'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('usuarios', 'area', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('usuarios', 'clasificacion', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('usuarios', 'area');
    await queryInterface.removeColumn('usuarios', 'clasificacion');
  }
};

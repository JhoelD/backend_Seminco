'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('planmetraje', 'anio', {
      type: Sequelize.INTEGER,
      allowNull: true,  // O false si quieres que no sea nullable
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('planmetraje', 'anio');
  }
};

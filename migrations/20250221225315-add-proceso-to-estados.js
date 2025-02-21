'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('estados', 'proceso', {
      type: Sequelize.STRING,
      allowNull: true // Puedes cambiarlo a false si quieres que sea obligatorio
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('estados', 'proceso');
  }
};

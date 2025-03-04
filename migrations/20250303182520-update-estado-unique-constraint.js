'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('estados', 'codigo'); // Elimina la restricción
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('estados', {
      fields: ['codigo'],
      type: 'unique',
      name: 'codigo_unique_constraint' // Nombre de la restricción
    });
  }
};

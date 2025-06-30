'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'nube_datos_trabajo_exploraciones', // nombre de la tabla
      'medicion', // nombre del nuevo campo
      {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'nube_datos_trabajo_exploraciones',
      'medicion'
    );
  }
};
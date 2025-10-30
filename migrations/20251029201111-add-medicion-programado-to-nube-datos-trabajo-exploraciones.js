'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'nube_datos_trabajo_exploraciones', // nombre de la tabla
      'medicion_programado', // nombre de la nueva columna
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Valor programado de medición'
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'nube_datos_trabajo_exploraciones',
      'medicion_programado'
    );
  }
};

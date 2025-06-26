'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'nube_datos_trabajo_exploraciones', // nombre de la tabla
      'seccion', // nombre del nuevo campo
      {
        type: Sequelize.STRING,
        allowNull: true // o false si es requerido
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'nube_datos_trabajo_exploraciones', // nombre de la tabla
      'seccion' // nombre del campo a eliminar
    );
  }
};
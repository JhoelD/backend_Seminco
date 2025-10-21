'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Primero agregar la columna codigo
    await queryInterface.addColumn('procesos_acero', 'codigo', {
      type: Sequelize.STRING,
      allowNull: true, // Temporalmente permitir null para datos existentes
      after: 'id' // Opcional: especificar posición de la columna
    });

    // Actualizar los registros existentes con un código temporal
    await queryInterface.sequelize.query(`
      UPDATE procesos_acero 
      SET codigo = CONCAT('ACERO-', id)
      WHERE codigo IS NULL
    `);

    // Ahora hacer que la columna sea NOT NULL
    await queryInterface.changeColumn('procesos_acero', 'codigo', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Revertir los cambios
    await queryInterface.removeColumn('procesos_acero', 'codigo');
  }
};
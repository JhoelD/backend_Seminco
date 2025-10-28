'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('procesos_acero', 'rendimiento', {
      type: Sequelize.DECIMAL(10, 4),
      allowNull: true,
      comment: 'Rendimiento del proceso de acero (puede tener decimales)'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('procesos_acero', 'rendimiento');
  }
};

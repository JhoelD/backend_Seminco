'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('pdfs', 'tipo_labor', {
      type: Sequelize.TEXT,
      allowNull: true // Puedes cambiar a false si es requerido
    });

    await queryInterface.addColumn('pdfs', 'labor', {
      type: Sequelize.TEXT,
      allowNull: true // Puedes cambiar a false si es requerido
    });

    await queryInterface.addColumn('pdfs', 'ala', {
      type: Sequelize.TEXT,
      allowNull: true // Puedes cambiar a false si es requerido
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('pdfs', 'tipo_labor');
    await queryInterface.removeColumn('pdfs', 'labor');
    await queryInterface.removeColumn('pdfs', 'ala');
  }
};
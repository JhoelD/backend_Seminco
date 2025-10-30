'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tipo_acero', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      proceso: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Nombre o tipo de proceso asociado al acero'
      },
      tipo_acero: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Tipo o clasificación del acero'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tipo_acero');
  }
};

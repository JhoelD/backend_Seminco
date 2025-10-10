'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('procesos_acero', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      proceso: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo_acero: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      precio: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: 'Precio en $'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('procesos_acero');
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ingreso_Aceros', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      turno: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mes: {
        type: Sequelize.STRING,
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
      cantidad: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      envio: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ingreso_Aceros');
  }
};

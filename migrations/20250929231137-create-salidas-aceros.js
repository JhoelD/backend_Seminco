'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Salidas_Aceros', {
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
      equipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codigo_equipo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operador: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jefe_guardia: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('Salidas_Aceros');
  }
};

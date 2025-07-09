'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('toneladas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      turno: {
        type: Sequelize.STRING,
        allowNull: true
      },
      zona: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      labor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      toneladas: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('toneladas');
  }
};

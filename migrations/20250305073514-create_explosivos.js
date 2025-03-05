'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('explosivos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      tipo_explosivo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cantidad_por_caja: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      peso_unitario: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      costo_por_kg: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('explosivos');
  }
};

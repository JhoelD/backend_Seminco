'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accesorios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      tipo_accesorio: {
        type: Sequelize.STRING,
        allowNull: false
      },
      costo: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: 'Costo en $/pieza o $/m'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accesorios');
  }
};

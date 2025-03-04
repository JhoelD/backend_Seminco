'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modificar columnas 1A - 28B a TEXT
    for (let i = 1; i <= 28; i++) {
      await queryInterface.changeColumn('plan_mensual', `col_${i}A`, {
        type: Sequelize.TEXT, // Cambiar de STRING a TEXT
        allowNull: true,
      });
      await queryInterface.changeColumn('plan_mensual', `col_${i}B`, {
        type: Sequelize.TEXT, // Cambiar de STRING a TEXT
        allowNull: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir cambios a FLOAT en caso de rollback
    for (let i = 1; i <= 28; i++) {
      await queryInterface.changeColumn('plan_mensual', `col_${i}A`, {
        type: Sequelize.FLOAT,
        allowNull: true,
      });
      await queryInterface.changeColumn('plan_mensual', `col_${i}B`, {
        type: Sequelize.FLOAT,
        allowNull: true,
      });
    }
  }
};

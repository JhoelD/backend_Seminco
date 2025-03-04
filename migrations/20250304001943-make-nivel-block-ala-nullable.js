'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('PlanProduccions', 'nivel', {
      type: Sequelize.STRING(20),
      allowNull: true, // Permitimos que sea null
    });
    await queryInterface.changeColumn('PlanProduccions', 'block', {
      type: Sequelize.STRING(20),
      allowNull: true, // Permitimos que sea null
    });
    await queryInterface.changeColumn('PlanProduccions', 'ala', {
      type: Sequelize.STRING(20),
      allowNull: true, // Permitimos que sea null
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('PlanProduccions', 'nivel', {
      type: Sequelize.STRING(20),
      allowNull: false, // Volver a hacer que no sea null en caso de reversión
    });
    await queryInterface.changeColumn('PlanProduccions', 'block', {
      type: Sequelize.STRING(20),
      allowNull: false, // Volver a hacer que no sea null en caso de reversión
    });
    await queryInterface.changeColumn('PlanProduccions', 'ala', {
      type: Sequelize.STRING(20),
      allowNull: false, // Volver a hacer que no sea null en caso de reversión
    });
  },
};

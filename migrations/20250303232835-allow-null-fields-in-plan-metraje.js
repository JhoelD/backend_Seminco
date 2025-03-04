'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('planmetraje', 'nivel', {
      type: Sequelize.STRING,
      allowNull: true, // Permitir que sea nulo
    });
    await queryInterface.changeColumn('planmetraje', 'block', {
      type: Sequelize.STRING,
      allowNull: true, // Permitir que sea nulo
    });
    await queryInterface.changeColumn('planmetraje', 'ala', {
      type: Sequelize.STRING,
      allowNull: true, // Permitir que sea nulo
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Si deseas revertir la migración, puedes usar `allowNull: false`
    await queryInterface.changeColumn('planmetraje', 'nivel', {
      type: Sequelize.STRING,
      allowNull: false, // Restaurar a no nulo
    });
    await queryInterface.changeColumn('planmetraje', 'block', {
      type: Sequelize.STRING,
      allowNull: false, // Restaurar a no nulo
    });
    await queryInterface.changeColumn('planmetraje', 'ala', {
      type: Sequelize.STRING,
      allowNull: false, // Restaurar a no nulo
    });
  }
};

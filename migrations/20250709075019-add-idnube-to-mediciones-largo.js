'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('mediciones_largo', 'idnube', {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: true // ✅ agrega restricción de unicidad
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('mediciones_largo', 'idnube');
  }
};

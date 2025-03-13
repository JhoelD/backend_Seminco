module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.addColumn('explosivos', 'unidad_medida', {
          type: Sequelize.STRING,
          allowNull: false
      });
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('explosivos', 'unidad_medida');
  }
};

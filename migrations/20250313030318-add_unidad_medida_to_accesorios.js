module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.addColumn('accesorios', 'unidad_medida', {
          type: Sequelize.STRING,
          allowNull: false
      });
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('accesorios', 'unidad_medida');
  }
};

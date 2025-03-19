module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tipoperforacions', 'proceso', {
      type: Sequelize.STRING,
      allowNull: true // Permitir nulos para no afectar datos existentes
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tipoperforacions', 'proceso');
  }
};

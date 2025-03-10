module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('equipos', 'anioFabricacion', {
          type: Sequelize.INTEGER,
          allowNull: true
      });
      await queryInterface.changeColumn('equipos', 'capacidadYd3', {
          type: Sequelize.FLOAT,
          allowNull: true
      });
      await queryInterface.changeColumn('equipos', 'capacidadM3', {
          type: Sequelize.FLOAT,
          allowNull: true
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('equipos', 'anioFabricacion', {
          type: Sequelize.INTEGER,
          allowNull: false
      });
      await queryInterface.changeColumn('equipos', 'capacidadYd3', {
          type: Sequelize.FLOAT,
          allowNull: false
      });
      await queryInterface.changeColumn('equipos', 'capacidadM3', {
          type: Sequelize.FLOAT,
          allowNull: false
      });
  }
};

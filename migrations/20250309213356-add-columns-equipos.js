module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('equipos', 'fechaIngreso', {
          type: Sequelize.DATEONLY, // ⚠️ Solo fecha (sin hora)
          allowNull: true // ⚠️ Permitir valores NULL en caso de datos faltantes
      }).then(() => {
          return queryInterface.changeColumn('equipos', 'capacidadYd3', {
              type: Sequelize.FLOAT,
              allowNull: true
          });
      }).then(() => {
          return queryInterface.changeColumn('equipos', 'capacidadM3', {
              type: Sequelize.FLOAT,
              allowNull: true
          });
      });
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('equipos', 'fechaIngreso', {
          type: Sequelize.DATEONLY,
          allowNull: false
      }).then(() => {
          return queryInterface.changeColumn('equipos', 'capacidadYd3', {
              type: Sequelize.FLOAT,
              allowNull: false
          });
      }).then(() => {
          return queryInterface.changeColumn('equipos', 'capacidadM3', {
              type: Sequelize.FLOAT,
              allowNull: false
          });
      });
  }
};

// migration-create-perforaciones-mediciones.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('perforaciones_mediciones', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      mes: {
        type: Sequelize.STRING,
        allowNull: false
      },
      semana: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo_perforacion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      envio: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('perforaciones_mediciones');
  }
};

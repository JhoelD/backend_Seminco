'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('usuarios', 'cargo', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('usuarios', 'empresa', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('usuarios', 'guardia', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('usuarios', 'autorizado_equipo', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('usuarios', 'area', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('usuarios', 'clasificacion', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('usuarios', 'correo', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('usuarios', 'cargo', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('usuarios', 'empresa', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('usuarios', 'guardia', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('usuarios', 'autorizado_equipo', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('usuarios', 'area', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('usuarios', 'clasificacion', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('usuarios', 'correo', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  }
};

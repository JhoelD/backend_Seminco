'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // NubePerforacionTaladroLargo
    await queryInterface.addColumn('nube_perforacion_taladro_largo', 'ala', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // NubePerforacionHorizontal
    await queryInterface.addColumn('nube_perforacion_horizontal', 'ala', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // NubeSostenimiento
    await queryInterface.addColumn('nube_sostenimiento', 'ala', {
      type: Sequelize.STRING,
      allowNull: true,
    });

  },

  async down(queryInterface, Sequelize) {

    // revert changes

    await queryInterface.removeColumn('nube_perforacion_taladro_largo', 'ala');
    await queryInterface.removeColumn('nube_perforacion_horizontal', 'ala');
    await queryInterface.removeColumn('nube_sostenimiento', 'ala');
  }
};

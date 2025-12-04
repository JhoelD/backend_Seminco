'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // 1. nube_inter_perforacion_taladro_largo
    await queryInterface.addColumn(
      'nube_inter_perforacion_taladro_largo',
      'completo',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    );

    // 2. nube_inter_perforacion_horizontal
    await queryInterface.addColumn(
      'nube_inter_perforacion_horizontal',
      'completo',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    );

    // 3. nube_inter_sostenimiento
    await queryInterface.addColumn(
      'nube_inter_sostenimiento',
      'completo',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    );

  },

  async down(queryInterface, Sequelize) {

    // Revert changes

    await queryInterface.removeColumn(
      'nube_inter_perforacion_taladro_largo',
      'completo'
    );

    await queryInterface.removeColumn(
      'nube_inter_perforacion_horizontal',
      'completo'
    );

    await queryInterface.removeColumn(
      'nube_inter_sostenimiento',
      'completo'
    );
  }
};

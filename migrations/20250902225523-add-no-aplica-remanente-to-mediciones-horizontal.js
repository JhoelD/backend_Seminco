'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('mediciones_horizontal', 'no_aplica', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn('mediciones_horizontal', 'remanente', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('mediciones_horizontal', 'no_aplica');
    await queryInterface.removeColumn('mediciones_horizontal', 'remanente');
  }
};

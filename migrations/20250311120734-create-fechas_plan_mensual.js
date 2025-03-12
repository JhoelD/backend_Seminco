'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Fechas_plan_mensual", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      mes: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_ingreso: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Establece la fecha actual por defecto
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Fechas_plan_mensual");
  }
};

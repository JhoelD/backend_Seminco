'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE fechas_plan_mensual
      MODIFY COLUMN anio INT
      GENERATED ALWAYS AS (YEAR(fecha_ingreso)) STORED;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE fechas_plan_mensual
      MODIFY COLUMN anio INT NOT NULL;
    `);
  }
};
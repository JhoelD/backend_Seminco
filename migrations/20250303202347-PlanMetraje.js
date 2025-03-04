'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PlanMetraje', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      mes: { type: Sequelize.STRING(20), allowNull: false },
      semana: { type: Sequelize.STRING(20), allowNull: false },
      mina: { type: Sequelize.STRING(50), allowNull: false },
      zona: { type: Sequelize.STRING(50), allowNull: false },
      area: { type: Sequelize.STRING(50), allowNull: false },
      fase: { type: Sequelize.STRING(50), allowNull: false },
      minado_tipo: { type: Sequelize.STRING(50), allowNull: false },
      tipo_labor: { type: Sequelize.STRING(50), allowNull: false },
      tipo_mineral: { type: Sequelize.STRING(50), allowNull: false },
      estructura_veta: { type: Sequelize.STRING(50), allowNull: false },
      nivel: { type: Sequelize.STRING(20), allowNull: false },
      block: { type: Sequelize.STRING(20), allowNull: false },
      labor: { type: Sequelize.STRING(20), allowNull: false },
      ala: { type: Sequelize.STRING(20), allowNull: false },
      
      ancho_veta: { type: Sequelize.FLOAT, allowNull: true },
      ancho_minado_sem: { type: Sequelize.FLOAT, allowNull: true },
      ancho_minado_mes: { type: Sequelize.FLOAT, allowNull: true },
      burden: { type: Sequelize.FLOAT, allowNull: true },
      espaciamiento: { type: Sequelize.FLOAT, allowNull: true },
      longitud_perforacion: { type: Sequelize.FLOAT, allowNull: true },

      // Columnas dinámicas optimizadas con TEXT
      ...Object.fromEntries(
        Array.from({ length: 28 }, (_, i) => [
          `columna_${i + 1}A`,
          { type: Sequelize.TEXT, allowNull: true },
        ])
      ),
      ...Object.fromEntries(
        Array.from({ length: 28 }, (_, i) => [
          `columna_${i + 1}B`,
          { type: Sequelize.TEXT, allowNull: true },
        ])
      ),

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PlanMetraje');
  },
};

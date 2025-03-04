"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PlanProduccions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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

      // Valores numéricos de producción
      ancho_veta: { type: Sequelize.FLOAT, allowNull: true },
      ancho_minado_sem: { type: Sequelize.FLOAT, allowNull: true },
      ancho_minado_mes: { type: Sequelize.FLOAT, allowNull: true },
      ag_gr: { type: Sequelize.FLOAT, allowNull: true },
      porcentaje_cu: { type: Sequelize.FLOAT, allowNull: true },
      porcentaje_pb: { type: Sequelize.FLOAT, allowNull: true },
      porcentaje_zn: { type: Sequelize.FLOAT, allowNull: true },
      vpt_act: { type: Sequelize.FLOAT, allowNull: true },
      vpt_final: { type: Sequelize.FLOAT, allowNull: true },
      cut_off_1: { type: Sequelize.FLOAT, allowNull: true },
      cut_off_2: { type: Sequelize.FLOAT, allowNull: true },

      // Columnas dinámicas 1A-28B
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
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PlanProduccions");
  },
};

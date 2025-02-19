'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla Taladros
    await queryInterface.createTable('taladros', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      formatoPlanMineralId: { // Clave foránea
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'formato_plan_mineral', // Nombre de la tabla principal
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      nTaladro: { type: Sequelize.INTEGER, allowNull: false },
      estado: { type: Sequelize.STRING, allowNull: false, defaultValue: 'PROGRAMADO' },
      longitud_perforacion: { type: Sequelize.FLOAT, allowNull: false },
      nBarras: { type: Sequelize.INTEGER, allowNull: false },
      angulo: { type: Sequelize.FLOAT, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar la tabla en caso de revertir la migración
    await queryInterface.dropTable('taladros');
  }
};

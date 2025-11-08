'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('plan_mantenimiento', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      zona: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cod_equipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      equipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('sub_plan_mantenimiento', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      plan_mantenimiento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'plan_mantenimiento',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      sistema: {
        type: Sequelize.STRING,
        allowNull: false
      },
      frecuencia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      h_parada: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      lunes: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      martes: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      miercoles: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      jueves: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      viernes: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      sabado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      domingo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      actividades: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cumplimiento: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sub_plan_mantenimiento');
    await queryInterface.dropTable('plan_mantenimiento');
  }
};

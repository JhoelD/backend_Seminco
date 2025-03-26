'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nube_datos_trabajo_exploraciones', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fecha: { type: Sequelize.STRING, allowNull: false },
      turno: { type: Sequelize.STRING, allowNull: false },
      taladro: { type: Sequelize.STRING, allowNull: false },
      pies_por_taladro: { type: Sequelize.STRING, allowNull: false },
      zona: { type: Sequelize.STRING, allowNull: false },
      tipo_labor: { type: Sequelize.STRING, allowNull: false },
      labor: { type: Sequelize.STRING, allowNull: false },
      veta: { type: Sequelize.STRING, allowNull: false },
      nivel: { type: Sequelize.STRING, allowNull: false },
      tipo_perforacion: { type: Sequelize.STRING, allowNull: false },
      estado: { type: Sequelize.STRING, defaultValue: 'Creado' },
      cerrado: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('nube_despacho', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      datos_trabajo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nube_datos_trabajo_exploraciones',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      mili_segundo: { type: Sequelize.FLOAT, allowNull: false },
      medio_segundo: { type: Sequelize.FLOAT, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('nube_despacho_detalle', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      despacho_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nube_despacho',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      nombre_material: { type: Sequelize.STRING, allowNull: false },
      cantidad: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('nube_devoluciones', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      datos_trabajo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nube_datos_trabajo_exploraciones',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      mili_segundo: { type: Sequelize.FLOAT, allowNull: false },
      medio_segundo: { type: Sequelize.FLOAT, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('nube_devolucion_detalle', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      devolucion_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nube_devoluciones',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      nombre_material: { type: Sequelize.STRING, allowNull: false },
      cantidad: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('nube_detalle_despacho_explosivos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_despacho: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nube_despacho',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      numero: { type: Sequelize.INTEGER, allowNull: false },
      ms_cant1: { type: Sequelize.STRING, allowNull: false },
      lp_cant1: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('nube_detalle_devoluciones_explosivos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_devolucion: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nube_devoluciones',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      numero: { type: Sequelize.INTEGER, allowNull: false },
      ms_cant1: { type: Sequelize.STRING, allowNull: false },
      lp_cant1: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nube_detalle_devoluciones_explosivos');
    await queryInterface.dropTable('nube_detalle_despacho_explosivos');
    await queryInterface.dropTable('nube_devolucion_detalle');
    await queryInterface.dropTable('nube_devoluciones');
    await queryInterface.dropTable('nube_despacho_detalle');
    await queryInterface.dropTable('nube_despacho');
    await queryInterface.dropTable('nube_datos_trabajo_exploraciones');
  }
};
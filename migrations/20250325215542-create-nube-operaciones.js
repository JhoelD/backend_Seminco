'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('nube_operacion', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      turno: {
        type: Sequelize.STRING,
        allowNull: false
      },
      equipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codigo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      empresa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fecha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo_operacion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: 'activo'
      },
      envio: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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

    await queryInterface.createTable('nube_horometros', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      operacion_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nube_operacion',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      inicial: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      final: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      EstaOP: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      EstaINOP: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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

    await queryInterface.createTable('nube_estado', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      operacion_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nube_operacion',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codigo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hora_inicio: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hora_final: {
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

    await queryInterface.createTable('nube_perforacion_taladro_largo', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      zona: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo_labor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      labor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      veta: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nivel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo_perforacion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      operacion_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nube_operacion',
          key: 'id'
        },
        onDelete: 'CASCADE'
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

    await queryInterface.createTable('nube_inter_perforacion_taladro_largo', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      codigo_actividad: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nivel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tajo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nbroca: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ntaladro: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nbarras: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      longitud_perforacion: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      angulo_perforacion: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      nfilas_de_hasta: {
        type: Sequelize.STRING,
        allowNull: false
      },
      detalles_trabajo_realizado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      perforaciontaladrolargo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nube_perforacion_taladro_largo',
          key: 'id'
        },
        onDelete: 'CASCADE'
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

    await queryInterface.createTable('nube_perforacion_horizontal', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      zona: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo_labor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      labor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      veta: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nivel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo_perforacion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      operacion_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nube_operacion',
          key: 'id'
        },
        onDelete: 'CASCADE'
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

    await queryInterface.createTable('nube_inter_perforacion_horizontal', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      codigo_actividad: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nivel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      labor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      seccion_la_labor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nbroca: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ntaladro: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ntaladros_rimados: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      longitud_perforacion: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      detalles_trabajo_realizado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      perforacionhorizontal_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nube_perforacion_horizontal',
          key: 'id'
        },
        onDelete: 'CASCADE'
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

    await queryInterface.createTable('nube_sostenimiento', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      zona: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo_labor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      labor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      veta: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nivel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo_perforacion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      operacion_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nube_operacion',
          key: 'id'
        },
        onDelete: 'CASCADE'
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

    await queryInterface.createTable('nube_inter_sostenimiento', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      codigo_actividad: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nivel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      labor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      seccion_de_labor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nbroca: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ntaladro: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      longitud_perforacion: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      malla_instalada: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sostenimiento_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'nube_sostenimiento',
          key: 'id'
        },
        onDelete: 'CASCADE'
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

  down: async (queryInterface, Sequelize) => {
    // Eliminar en orden inverso para evitar problemas con las claves foráneas
    await queryInterface.dropTable('nube_inter_sostenimiento');
    await queryInterface.dropTable('nube_sostenimiento');
    await queryInterface.dropTable('nube_inter_perforacion_horizontal');
    await queryInterface.dropTable('nube_perforacion_horizontal');
    await queryInterface.dropTable('nube_inter_perforacion_taladro_largo');
    await queryInterface.dropTable('nube_perforacion_taladro_largo');
    await queryInterface.dropTable('nube_estado');
    await queryInterface.dropTable('nube_horometros');
    await queryInterface.dropTable('nube_operacion');
  }
};
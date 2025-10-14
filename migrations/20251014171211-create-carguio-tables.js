'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('operacion_carguio', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      idNube: Sequelize.INTEGER,
      turno: Sequelize.STRING,
      equipo: Sequelize.STRING,
      codigo: Sequelize.STRING,
      empresa: Sequelize.STRING,
      fecha: Sequelize.STRING,
      tipo_operacion: Sequelize.STRING,
      estado: { type: Sequelize.STRING, defaultValue: 'activo' },
      envio: { type: Sequelize.INTEGER, defaultValue: 0 }
    });

    await queryInterface.createTable('horometros_carguio', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      operacion_id: {
        type: Sequelize.INTEGER,
        references: { model: 'operacion_carguio', key: 'id' },
        onDelete: 'CASCADE'
      },
      nombre: Sequelize.STRING,
      inicial: Sequelize.FLOAT,
      final: Sequelize.FLOAT,
      EstaOP: { type: Sequelize.INTEGER, defaultValue: 0 },
      EstaINOP: { type: Sequelize.INTEGER, defaultValue: 0 }
    });

    await queryInterface.createTable('estado_carguio', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      operacion_id: {
        type: Sequelize.INTEGER,
        references: { model: 'operacion_carguio', key: 'id' },
        onDelete: 'CASCADE'
      },
      numero: Sequelize.INTEGER,
      estado: Sequelize.STRING,
      codigo: Sequelize.STRING,
      hora_inicio: Sequelize.STRING,
      hora_final: Sequelize.STRING
    });

    await queryInterface.createTable('carguio_carguio', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      operacion_id: {
        type: Sequelize.INTEGER,
        references: { model: 'operacion_carguio', key: 'id' },
        onDelete: 'CASCADE'
      },
      nivel: Sequelize.STRING,
      labor_origen: Sequelize.STRING,
      material: Sequelize.STRING,
      labor_destino: Sequelize.STRING,
      num_cucharas: Sequelize.INTEGER,
      observaciones: Sequelize.TEXT
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carguio_carguio');
    await queryInterface.dropTable('estado_carguio');
    await queryInterface.dropTable('horometros_carguio');
    await queryInterface.dropTable('operacion_carguio');
  }
};

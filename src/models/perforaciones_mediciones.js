const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const DetallePerforacionMedicion = require('./detalles_perforacion_mediciones');

const PerforacionMedicion = sequelize.define('PerforacionMedicion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  mes: {
    type: DataTypes.STRING,
    allowNull: false
  },
  semana: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo_perforacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  envio: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'perforaciones_mediciones',
  timestamps: false
});

PerforacionMedicion.hasMany(DetallePerforacionMedicion, {
  foreignKey: 'perforacion_id',
  as: 'detalles',
  onDelete: 'CASCADE'
});

module.exports = PerforacionMedicion;

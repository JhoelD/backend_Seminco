const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const DetallePerforacionMedicion = sequelize.define('DetallePerforacionMedicion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  perforacion_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  labor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cant_regis: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  kg_explo: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  avance: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  ancho: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  alto: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'detalles_perforacion_mediciones',
  timestamps: false
});

module.exports = DetallePerforacionMedicion;

// models/TipoAcero.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const TipoAcero = sequelize.define('TipoAcero', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  proceso: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nombre o tipo de proceso asociado al acero'
  },
  tipo_acero: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Tipo o clasificación del acero'
  }
}, {
  tableName: 'tipo_acero',
  timestamps: false
});

module.exports = TipoAcero;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Toneladas = sequelize.define('Toneladas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  turno: {
    type: DataTypes.STRING,
    allowNull: true // está vacío en algunos registros según tu ejemplo
  },
  zona: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  labor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  toneladas: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'toneladas',
  timestamps: false
});

module.exports = Toneladas;

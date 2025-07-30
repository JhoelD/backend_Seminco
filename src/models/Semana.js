const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Semana = sequelize.define('Semana', {
  numero_semana: { type: DataTypes.INTEGER, allowNull: false },
  anio: { type: DataTypes.INTEGER, allowNull: false },
  fecha_inicio: { type: DataTypes.DATEONLY, allowNull: false },
  fecha_fin: { type: DataTypes.DATEONLY, allowNull: false },
  empresa_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'empresas', // Nombre de la tabla en la base de datos
      key: 'id'
    }
  }
}, {
  tableName: 'semanas',
  timestamps: true,
});

module.exports = Semana;
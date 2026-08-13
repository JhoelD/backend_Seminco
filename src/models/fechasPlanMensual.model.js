const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const FechasPlanMensual = sequelize.define("Fechas_plan_mensual", {
  mes: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [[
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
        "JULIO", "AGOSTO", "SEPTIEMBRE", "SETIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
      ]],
    },
  },
  fecha_ingreso: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Guarda la fecha actual por defecto
  },
  anio: {
  type: DataTypes.INTEGER,
  allowNull: true,
  defaultValue: undefined
}
  
}, {
  timestamps: false, // No agrega 'createdAt' ni 'updatedAt'
  tableName: "fechas_plan_mensual",
});

module.exports = FechasPlanMensual;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const FechaPlanMensual = sequelize.define('FechaPlanMensual', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'fecha_plan_mensual',
    timestamps: true
});

module.exports = FechaPlanMensual;

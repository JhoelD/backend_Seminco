const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const OperadorAcero = sequelize.define('OperadorAcero', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    operador: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    turno: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'OPERADOR_Acero',
    timestamps: false
});

module.exports = OperadorAcero;

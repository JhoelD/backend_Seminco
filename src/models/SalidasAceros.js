const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const SalidasAceros = sequelize.define('SalidasAceros', {
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
        allowNull: false
    },
    mes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    proceso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    equipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo_equipo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    operador: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jefe_guardia: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tipo_acero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    cantidad: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    envio: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'Salidas_Aceros',
    timestamps: false
});

module.exports = SalidasAceros;

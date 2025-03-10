const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Equipo = sequelize.define('Equipo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    proceso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serie: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    anioFabricacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaIngreso: {
        type: DataTypes.DATEONLY, // ⚠️ Cambiado a `DATEONLY` porque solo necesitas la fecha, no la hora.
        allowNull: true // ⚠️ Permitir `NULL` en caso de datos faltantes
    },
    capacidadYd3: {
        type: DataTypes.FLOAT,
        allowNull: true // ⚠️ Hacer opcional
    },
    capacidadM3: {
        type: DataTypes.FLOAT,
        allowNull: true // ⚠️ Hacer opcional
    }
}, {
    tableName: 'equipos',
    timestamps: false
});

module.exports = Equipo;

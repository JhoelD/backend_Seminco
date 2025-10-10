const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const IngresoAceros = sequelize.define('IngresoAceros', {
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
    tableName: 'Ingreso_Aceros',
    timestamps: false
});

module.exports = IngresoAceros;

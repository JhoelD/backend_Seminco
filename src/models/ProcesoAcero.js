const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ProcesoAcero = sequelize.define('ProcesoAcero', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: 'Precio en $'
    }
}, {
    tableName: 'procesos_acero',
    timestamps: false
});

module.exports = ProcesoAcero;

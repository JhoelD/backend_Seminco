const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ProcesoAcero = sequelize.define('ProcesoAcero', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Código único del proceso de acero'
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
    },
    rendimiento: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
        comment: 'Rendimiento del proceso de acero (puede tener decimales)'
    }
}, {
    tableName: 'procesos_acero',
    timestamps: false
});

module.exports = ProcesoAcero;
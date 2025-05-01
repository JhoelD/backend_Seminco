const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Meta = sequelize.define('MetaSostenimiento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    grafico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    objetivo: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'Meta-sostenimiento',  // <-- Cambio aquí
    timestamps: false
});

module.exports = Meta;

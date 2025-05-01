const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const MetaLargo = sequelize.define('MetaLargo', {
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
    tableName: '`Meta-Largo`', // ¡Importante escaparlo con backticks!
    timestamps: false
});

module.exports = MetaLargo;

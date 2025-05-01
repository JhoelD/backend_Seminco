const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Meta = sequelize.define('Meta', {
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
        type: DataTypes.FLOAT,  // o INTEGER si siempre serán números enteros
        allowNull: false
    }
}, {
    tableName: 'metas',
    timestamps: false
});

module.exports = Meta;

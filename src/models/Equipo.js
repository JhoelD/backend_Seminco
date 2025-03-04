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
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'equipos',
    timestamps: false
});

module.exports = Equipo;
 
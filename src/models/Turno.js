const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Turno = sequelize.define('Turno', {
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
    tableName: 'turnos',
    timestamps: false
});

module.exports = Turno;

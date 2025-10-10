const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const JefeGuardiaAcero = sequelize.define('JefeGuardiaAcero', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    jefe_de_guardia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    turno: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'JEFE_DE_GUARDIA_Acero',
    timestamps: false
});

module.exports = JefeGuardiaAcero;

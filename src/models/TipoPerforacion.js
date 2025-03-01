const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const TipoPerforacion = sequelize.define('TipoPerforacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tipoperforacions',
    timestamps: false
});

module.exports = TipoPerforacion;

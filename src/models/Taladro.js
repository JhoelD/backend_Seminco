const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Taladro = sequelize.define('Taladro', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    formatoPlanMineralId: { // Clave foránea
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'formato_plan_mineral', // Nombre de la tabla
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    nTaladro: { type: DataTypes.INTEGER, allowNull: false },  // Número del taladro
    estado: { type: DataTypes.STRING, allowNull: false, defaultValue: 'PROGRAMADO' }, // Estado fijo como "PROGRAMADO"
    longitud_perforacion: { type: DataTypes.FLOAT, allowNull: false }, // Longitud de perforación
    nBarras: { type: DataTypes.INTEGER, allowNull: false }, // Número de barras
    angulo: { type: DataTypes.FLOAT, allowNull: false } // Ángulo
}, {
    tableName: 'taladros',
    timestamps: true
});

module.exports = Taladro;

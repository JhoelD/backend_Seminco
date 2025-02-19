const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Taladro = require('./Taladro');

const Slot = sequelize.define('Slot', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: { type: DataTypes.STRING, allowNull: false },
    imagen: { type: DataTypes.STRING, allowNull: true } // URL o path de la imagen
}, {
    tableName: 'slots',
    timestamps: true,
});

// Relación: Un Slot tiene muchos Taladros
Slot.hasMany(Taladro, { foreignKey: 'slotId', as: 'taladros' });
Taladro.belongsTo(Slot, { foreignKey: 'slotId', as: 'slot' });

module.exports = Slot;

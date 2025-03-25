const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const DestinatarioCorreo = sequelize.define('DestinatarioCorreo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
}, {
    tableName: 'destinatariocorreo',
    timestamps: false
});

module.exports = DestinatarioCorreo;

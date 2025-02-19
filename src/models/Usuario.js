const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo_dni: {  
        type: DataTypes.STRING, 
        allowNull: false
    },
    apellidos: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    nombres: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    cargo: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    empresa: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    guardia: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    autorizado_equipo: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {  
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            isEmail: {
                msg: 'Debe ingresar un correo electrónico válido.'
            }
        }
    },
    password: {  
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            
            is: {
                args: /^(?=.*[a-zA-Z0-9@#$%^&+=]).{6,}$/, 
                msg: 'La contraseña debe tener al menos 6 caracteres, incluyendo letras, números y símbolos.'
            }
        }
    }
}, {
    tableName: 'usuarios',  
    timestamps: true,        
});

module.exports = Usuario;

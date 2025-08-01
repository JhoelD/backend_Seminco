const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Pdf = sequelize.define('Pdf', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    proceso: {
        type: DataTypes.STRING(100), // Longitud adecuada para nombres de procesos
        allowNull: false
    },
    mes: {
        type: DataTypes.ENUM(
            'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
            'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
        ),
        allowNull: false
    },
    url_pdf: {
        type: DataTypes.STRING(255), // Longitud estándar para URLs
        allowNull: false
    },
    tipo_labor: {
        type: DataTypes.TEXT,
        allowNull: true // Cambia a false si es requerido
    },
    labor: {
        type: DataTypes.TEXT,
        allowNull: true // Cambia a false si es requerido
    },
    ala: {
        type: DataTypes.TEXT,
        allowNull: true // Cambia a false si es requerido
    }
}, {
    tableName: 'pdfs',
    timestamps: true // Añade createdAt y updatedAt
});

module.exports = Pdf;
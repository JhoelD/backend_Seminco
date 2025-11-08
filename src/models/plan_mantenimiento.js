// models/plan_mantenimiento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const PlanMantenimiento = sequelize.define('PlanMantenimiento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    zona: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cod_equipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    equipo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'plan_mantenimiento',
    timestamps: true
});

const SubPlanMantenimiento = sequelize.define('SubPlanMantenimiento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sistema: {
        type: DataTypes.STRING,
        allowNull: false
    },
    frecuencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    h_parada: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    lunes: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    martes: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    miercoles: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    jueves: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    viernes: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    sabado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    domingo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    actividades: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cumplimiento: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    tableName: 'sub_plan_mantenimiento',
    timestamps: true
});

PlanMantenimiento.hasMany(SubPlanMantenimiento, {
    foreignKey: 'plan_mantenimiento_id',
    as: 'subplanes',
    onDelete: 'CASCADE'
});

SubPlanMantenimiento.belongsTo(PlanMantenimiento, {
    foreignKey: 'plan_mantenimiento_id',
    as: 'plan'
});

module.exports = { PlanMantenimiento, SubPlanMantenimiento };

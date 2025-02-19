const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Taladro = require('./Taladro'); // Importamos el modelo Taladro

const FormatoPlanMineral = sequelize.define('FormatoPlanMineral', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mina: { type: DataTypes.STRING, allowNull: false },
    zona: { type: DataTypes.STRING, allowNull: false },
    estructura: { type: DataTypes.STRING, allowNull: false },
    tipo_material: { type: DataTypes.STRING, allowNull: false },
    nivel: { type: DataTypes.STRING, allowNull: false },
    block: { type: DataTypes.STRING, allowNull: false },
    labor: { type: DataTypes.STRING, allowNull: false },
    metodo_minado: { type: DataTypes.STRING, allowNull: false },
    metros: { type: DataTypes.FLOAT, allowNull: false },
    densidad: { type: DataTypes.FLOAT, allowNull: false },
    toneladas: { type: DataTypes.FLOAT, allowNull: false },
    ag: { type: DataTypes.FLOAT, allowNull: false },
    au: { type: DataTypes.FLOAT, allowNull: false },
    pb: { type: DataTypes.FLOAT, allowNull: false },
    zn: { type: DataTypes.FLOAT, allowNull: false },
    cu: { type: DataTypes.FLOAT, allowNull: false },
    vpt: { type: DataTypes.FLOAT, allowNull: false }
}, {
    tableName: 'formato_plan_mineral',
    timestamps: true,
});

// Relación con Taladro (Un FormatoPlanMineral tiene muchos Taladros)
FormatoPlanMineral.hasMany(Taladro, { foreignKey: 'formatoPlanMineralId', as: 'taladros' });
Taladro.belongsTo(FormatoPlanMineral, { foreignKey: 'formatoPlanMineralId', as: 'formatoPlan' });

module.exports = FormatoPlanMineral;

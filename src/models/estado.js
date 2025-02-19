module.exports = (sequelize, DataTypes) => {
    const Estado = sequelize.define("Estado", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      estado_principal: {
        type: DataTypes.STRING,
        allowNull: false
      },
      codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      tipo_estado: {
        type: DataTypes.STRING,
        allowNull: false
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: "estados",
      timestamps: false
    });
  
    return Estado;
  };
  
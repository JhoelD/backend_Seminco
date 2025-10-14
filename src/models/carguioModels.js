const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// 🟩 Operacion_Carguio
const Operacion_Carguio = sequelize.define('Operacion_Carguio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idNube: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  turno: {
    type: DataTypes.STRING,
    allowNull: true
  },
  equipo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fecha: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tipo_operacion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'activo'
  },
  envio: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'operacion_carguio',
  timestamps: false
});


// 🟨 Horometros_Carguio
const Horometros_Carguio = sequelize.define('Horometros_Carguio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  operacion_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Operacion_Carguio,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  inicial: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  final: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  EstaOP: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  EstaINOP: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'horometros_carguio',
  timestamps: false
});


// 🟦 Estado_Carguio
const Estado_Carguio = sequelize.define('Estado_Carguio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  operacion_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Operacion_Carguio,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: true
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hora_inicio: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hora_final: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'estado_carguio',
  timestamps: false
});


// 🟥 Carguio_Carguio
const Carguio_Carguio = sequelize.define('Carguio_Carguio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  operacion_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Operacion_Carguio,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  nivel: {
    type: DataTypes.STRING,
    allowNull: true
  },
  labor_origen: {
    type: DataTypes.STRING,
    allowNull: true
  },
  material: {
    type: DataTypes.STRING,
    allowNull: true
  },
  labor_destino: {
    type: DataTypes.STRING,
    allowNull: true
  },
  num_cucharas: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'carguio_carguio',
  timestamps: false
});


// 🔗 Relaciones
Operacion_Carguio.hasMany(Horometros_Carguio, { foreignKey: 'operacion_id', onDelete: 'CASCADE' });
Operacion_Carguio.hasMany(Estado_Carguio, { foreignKey: 'operacion_id', onDelete: 'CASCADE' });
Operacion_Carguio.hasMany(Carguio_Carguio, { foreignKey: 'operacion_id', onDelete: 'CASCADE' });

Horometros_Carguio.belongsTo(Operacion_Carguio, { foreignKey: 'operacion_id' });
Estado_Carguio.belongsTo(Operacion_Carguio, { foreignKey: 'operacion_id' });
Carguio_Carguio.belongsTo(Operacion_Carguio, { foreignKey: 'operacion_id' });


module.exports = {
  Operacion_Carguio,
  Horometros_Carguio,
  Estado_Carguio,
  Carguio_Carguio
};

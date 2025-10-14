const { 
  Operacion_Carguio, 
  Horometros_Carguio, 
  Estado_Carguio, 
  Carguio_Carguio 
} = require('../models/carguioModels');
const sequelize = require('../config/sequelize');


// 🟢 POST: Registrar operaciones con sus relaciones
exports.createCarguioData = async (req, res) => {
  const dataList = req.body; // Puede ser una lista de operaciones (como en Flutter)

  if (!Array.isArray(dataList) || dataList.length === 0) {
    return res.status(400).json({ message: 'No se recibieron datos válidos.' });
  }

  const transaction = await sequelize.transaction();

  try {
    const results = [];

    for (const data of dataList) {
      const { operacion, estados, horometros, carguios, local_id } = data;

      // 🟩 Crear Operación
      const nuevaOperacion = await Operacion_Carguio.create({
        turno: operacion.turno,
        equipo: operacion.equipo,
        codigo: operacion.codigo,
        empresa: operacion.empresa,
        fecha: operacion.fecha,
        tipo_operacion: operacion.tipo_operacion,
        estado: operacion.estado
      }, { transaction });

      const operacion_id = nuevaOperacion.id;

      // 🟦 Crear Estados
      if (Array.isArray(estados) && estados.length > 0) {
        for (const estado of estados) {
          await Estado_Carguio.create({
            operacion_id,
            numero: estado.numero,
            estado: estado.estado,
            codigo: estado.codigo,
            hora_inicio: estado.hora_inicio,
            hora_final: estado.hora_final
          }, { transaction });
        }
      }

      // 🟨 Crear Horómetros
      if (Array.isArray(horometros) && horometros.length > 0) {
        for (const h of horometros) {
          await Horometros_Carguio.create({
            operacion_id,
            nombre: h.nombre,
            inicial: h.inicial,
            final: h.final
          }, { transaction });
        }
      }

      // 🟥 Crear Carguíos
      if (Array.isArray(carguios) && carguios.length > 0) {
        for (const c of carguios) {
          await Carguio_Carguio.create({
            operacion_id,
            nivel: c.nivel,
            labor_origen: c.labor_origen,
            material: c.material,
            labor_destino: c.labor_destino,
            num_cucharas: c.num_cucharas,
            observaciones: c.observaciones || ''
          }, { transaction });
        }
      }

      results.push({
        local_id,
        idNube: operacion_id
      });
    }

    await transaction.commit();
    return res.status(201).json({
      message: 'Datos de Carguío registrados correctamente.',
      resultados: results
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Error al guardar datos de carguío:', error);
    return res.status(500).json({
      message: 'Error al guardar datos de carguío.',
      error: error.message
    });
  }
};


// 🔵 GET: Traer todas las operaciones con sus relaciones
exports.getAllCarguioData = async (req, res) => {
  try {
    const operaciones = await Operacion_Carguio.findAll({
      include: [
        { model: Estado_Carguio, as: 'Estado_Carguio' },
        { model: Horometros_Carguio, as: 'Horometros_Carguio' },
        { model: Carguio_Carguio, as: 'Carguio_Carguio' }
      ]
    });

    return res.status(200).json(operaciones);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return res.status(500).json({ message: 'Error al obtener los datos.', error: error.message });
  }
};

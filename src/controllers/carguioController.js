const { 
  Operacion_Carguio, 
  Horometros_Carguio, 
  Estado_Carguio, 
  Carguio_Carguio 
} = require('../models/carguioModels');
const sequelize = require('../config/sequelize');


// 🟢 POST: Registrar operaciones con sus relaciones
exports.createCarguioData = async (req, res) => {
  let dataList = req.body; // Puede ser un objeto o una lista de operaciones

  // ✅ Permitir que llegue un solo objeto o una lista
  if (!Array.isArray(dataList)) {
    dataList = [dataList];
  }

  // ⚠️ Validar que no venga vacío
  if (dataList.length === 0) {
    return res.status(400).json({ message: 'No se recibieron datos válidos.' });
  }

  const transaction = await sequelize.transaction();

  try {
    const idsOperacionesCreadas = [];

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
      idsOperacionesCreadas.push(operacion_id);

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
    }

    await transaction.commit();

    return res.status(201).json({
      operaciones_ids: idsOperacionesCreadas
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Error al guardar datos de carguío:', error);
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.actualizarCarguioData = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    let dataList = Array.isArray(req.body) ? req.body : [req.body];
    const resultados = [];

    for (const data of dataList) {
      const { operacion, estados, horometros, carguios } = data;
      const operacionId = operacion?.id;

      const resultadoOperacion = {
        id: operacionId,
        success: true,
        message: 'Operación actualizada correctamente'
      };

      try {
        // 🟩 1. Verificar que exista la operación
        const operacionExistente = await Operacion_Carguio.findByPk(operacionId, { transaction });
        if (!operacionExistente) {
          throw new Error(`Operación con ID ${operacionId} no encontrada`);
        }

        // 🟨 2. Actualizar operación principal
        await Operacion_Carguio.update({
          turno: operacion.turno,
          equipo: operacion.equipo,
          codigo: operacion.codigo,
          empresa: operacion.empresa,
          fecha: operacion.fecha,
          tipo_operacion: operacion.tipo_operacion,
          estado: operacion.estado
        }, {
          where: { id: operacionId },
          transaction
        });

        // 🟦 3. Eliminar registros antiguos y recrear
        // Estados
        await Estado_Carguio.destroy({ where: { operacion_id: operacionId }, transaction });
        if (Array.isArray(estados) && estados.length > 0) {
          await Estado_Carguio.bulkCreate(
            estados.map(e => ({
              ...e,
              operacion_id: operacionId
            })),
            { transaction }
          );
        }

        // Horómetros
        await Horometros_Carguio.destroy({ where: { operacion_id: operacionId }, transaction });
        if (Array.isArray(horometros) && horometros.length > 0) {
          await Horometros_Carguio.bulkCreate(
            horometros.map(h => ({
              ...h,
              operacion_id: operacionId
            })),
            { transaction }
          );
        }

        // Carguíos
        await Carguio_Carguio.destroy({ where: { operacion_id: operacionId }, transaction });
        if (Array.isArray(carguios) && carguios.length > 0) {
          await Carguio_Carguio.bulkCreate(
            carguios.map(c => ({
              ...c,
              operacion_id: operacionId
            })),
            { transaction }
          );
        }

        resultados.push(resultadoOperacion);
      } catch (error) {
        resultadoOperacion.success = false;
        resultadoOperacion.message = `Error al actualizar operación ${operacionId}: ${error.message}`;
        resultados.push(resultadoOperacion);
      }
    }

    // Verificar si hubo errores
    const errores = resultados.filter(r => !r.success);
    if (errores.length > 0) {
      await transaction.rollback();
      return res.status(207).json({
        message: 'Algunas operaciones no se actualizaron correctamente',
        resultados,
        errores: errores.map(e => e.message)
      });
    }

    await transaction.commit();
    return res.status(200).json({
      message: 'Todas las operaciones actualizadas correctamente',
      resultados
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Error general al actualizar Carguío:', error);
    return res.status(500).json({
      message: 'Error general en la transacción',
      error: error.message
    });
  }
};



// 🔵 GET: Traer todas las operaciones con sus relaciones
exports.getAllCarguioData = async (req, res) => {
  try {
    const operaciones = await Operacion_Carguio.findAll({
      include: [
        { model: Estado_Carguio },       // Sequelize usará alias automático: Estado_Carguios
        { model: Horometros_Carguio },   // Alias: Horometros_Carguios
        { model: Carguio_Carguio }       // Alias: Carguio_Carguios
      ]
    });

    return res.status(200).json(operaciones);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return res.status(500).json({ message: 'Error al obtener los datos.', error: error.message });
  }
};

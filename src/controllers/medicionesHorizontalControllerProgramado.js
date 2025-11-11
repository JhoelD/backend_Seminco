const MedicionesHorizontal = require('../models/MedicionesHorizontalProgramado');
const sequelize = require('../config/sequelize'); // o la ruta correcta a tu config
const { Op } = require('sequelize');

// Obtener todas las mediciones horizontales
const getAllMedicionesHorizontal = async (req, res) => {
  try {
    const mediciones = await MedicionesHorizontal.findAll();
    res.status(200).json(mediciones);
  } catch (error) {
    console.error("Error en getAllMedicionesHorizontal:", error);
    res.status(500).json({ message: 'Error al obtener las mediciones horizontales', error: error.message });
  }
};

const getMedicionesConRemanente = async (req, res) => {
  try {
    const mediciones = await MedicionesHorizontal.findAll({
      where: { remanente: 1 }
    });
    res.status(200).json(mediciones);
  } catch (error) {
    console.error("Error en getMedicionesConRemanente:", error);
    res.status(500).json({
      message: 'Error al obtener las mediciones con remanente',
      error: error.message
    });
  }
};

// Obtener una medición horizontal por ID
const getMedicionHorizontalById = async (req, res) => {
  try {
    const { id } = req.params;
    const medicion = await MedicionesHorizontal.findByPk(id);
    if (!medicion) {
      return res.status(404).json({ message: 'Medición horizontal no encontrada' });
    }
    res.status(200).json(medicion);
  } catch (error) {
    console.error("Error en getMedicionHorizontalById:", error);
    res.status(500).json({ message: 'Error al obtener la medición horizontal', error: error.message });
  }
};

const createMedicionHorizontal = async (req, res) => {
  try {
    const data = req.body;

    // ✅ Si es un array de mediciones
    if (Array.isArray(data)) {
      // Validar duplicados antes de insertar
      for (const medicion of data) {
        if (medicion.idnube) {
          const existente = await MedicionesHorizontal.findOne({
            where: { idnube: medicion.idnube }
          });
          if (existente) {
            return res.status(409).json({
              message: `Ya existe una medición horizontal con idnube ${medicion.idnube}`
            });
          }
        }
      }

      // ✅ Eliminar "id" pero mantener "idnube"
      const cleanData = data.map(m => {
        const { id, ...rest } = m;
        return rest;
      });

      const nuevasMediciones = await MedicionesHorizontal.bulkCreate(cleanData);
      return res.status(201).json(nuevasMediciones);
    }

    // ✅ Si es un solo objeto
    const { id, ...restData } = data; // quitamos id si viene
    if (restData.idnube) {
      const existente = await MedicionesHorizontal.findOne({
        where: { idnube: restData.idnube }
      });
      if (existente) {
        return res.status(409).json({
          message: `Ya existe una medición horizontal con idnube ${restData.idnube}`
        });
      }
    }

    const nuevaMedicion = await MedicionesHorizontal.create(restData);
    res.status(201).json(nuevaMedicion);

  } catch (error) {
    console.error("Error en createMedicionHorizontal:", error);
    res.status(500).json({
      message: 'Error al crear la medición horizontal',
      error: error.message
    });
  }
};

 
// Actualizar una medición horizontal
const updateMedicionHorizontal = async (req, res) => {
  try {
    const { id } = req.params;
    const medicion = await MedicionesHorizontal.findByPk(id);
    if (!medicion) {
      return res.status(404).json({ message: 'Medición horizontal no encontrada' });
    }

    await medicion.update(req.body);
    res.status(200).json(medicion);
  } catch (error) {
    console.error("Error en updateMedicionHorizontal:", error);
    res.status(500).json({ message: 'Error al actualizar la medición horizontal', error: error.message });
  }
};

const bulkUpdateMediciones = async (req, res) => {
  try {
    // Espera algo como: [{id:1, campo1:'a'}, {id:2, campo1:'b'}]
    const items = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: 'Se esperaba un array de registros' });
    }

    const results = [];

    for (const item of items) {
      if (!item.id) continue; // si no hay id, lo saltamos
      const medicion = await MedicionesHorizontal.findByPk(item.id);
      if (!medicion) continue;

      await medicion.update(item); // item puede traer varios campos
      results.push(medicion);
    }

    res.status(200).json({ updated: results.length, registros: results });
  } catch (error) {
    console.error('Error en bulkUpdateMediciones:', error);
    res.status(500).json({ message: 'Error al actualizar mediciones', error: error.message });
  }
};

// Eliminar una medición horizontal
const deleteMedicionHorizontal = async (req, res) => {
  try {
    const { id } = req.params;
    const medicion = await MedicionesHorizontal.findByPk(id);
    if (!medicion) {
      return res.status(404).json({ message: 'Medición horizontal no encontrada' });
    }

    await medicion.destroy();
    res.status(200).json({ message: 'Medición horizontal eliminada correctamente' });
  } catch (error) {
    console.error("Error en deleteMedicionHorizontal:", error);
    res.status(500).json({ message: 'Error al eliminar la medición horizontal', error: error.message });
  }
};

const getMedicionesPorLabor = async (req, res) => {
  try {
    const { labor } = req.params;
    const { mes, anio } = req.query;

    if (!labor) {
      return res.status(400).json({ message: 'Debe proporcionar una labor' });
    }

    const mesesMap = {
      ENERO: 1, FEBRERO: 2, MARZO: 3, ABRIL: 4, MAYO: 5, JUNIO: 6,
      JULIO: 7, AGOSTO: 8, SEPTIEMBRE: 9, SETIEMBRE: 9, OCTUBRE: 10, NOVIEMBRE: 11, DICIEMBRE: 12
    };

    let whereClause = { labor };

    if (anio) {
      whereClause = { ...whereClause, fecha: sequelize.where(sequelize.fn('YEAR', sequelize.col('fecha')), anio) };
    }

    if (mes) {
      const mesNum = mesesMap[mes.toUpperCase()];
      if (mesNum) {
        if (anio) {
          // combinamos año y mes
          whereClause = {
            ...whereClause,
            [Op.and]: [
              sequelize.where(sequelize.fn('YEAR', sequelize.col('fecha')), anio),
              sequelize.where(sequelize.fn('MONTH', sequelize.col('fecha')), mesNum)
            ]
          };
        } else {
          whereClause = {
            ...whereClause,
            fecha: sequelize.where(sequelize.fn('MONTH', sequelize.col('fecha')), mesNum)
          };
        }
      }
    }

    const mediciones = await MedicionesHorizontal.findAll({ where: whereClause });

    if (!mediciones.length) {
      return res.status(404).json({ message: `No se encontraron mediciones para la labor "${labor}"` });
    }

    res.status(200).json(mediciones);
  } catch (error) {
    console.error("Error en getMedicionesPorLabor:", error);
    res.status(500).json({ message: 'Error al obtener las mediciones por labor', error: error.message });
  }
};



module.exports = {
  getAllMedicionesHorizontal,
  getMedicionHorizontalById,
  createMedicionHorizontal,
  updateMedicionHorizontal,
  deleteMedicionHorizontal,
  getMedicionesConRemanente,
  bulkUpdateMediciones,
  getMedicionesPorLabor
};

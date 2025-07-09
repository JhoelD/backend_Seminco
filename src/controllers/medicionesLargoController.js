const MedicionesLargo = require('../models/MedicionesLargo');

// Obtener todas las mediciones largo
const getAllMedicionesLargo = async (req, res) => {
  try {
    const mediciones = await MedicionesLargo.findAll();
    res.status(200).json(mediciones);
  } catch (error) {
    console.error("Error en getAllMedicionesLargo:", error);
    res.status(500).json({ message: 'Error al obtener las mediciones largo', error: error.message });
  }
};

// Obtener una medición largo por ID
const getMedicionLargoById = async (req, res) => {
  try {
    const { id } = req.params;
    const medicion = await MedicionesLargo.findByPk(id);
    if (!medicion) {
      return res.status(404).json({ message: 'Medición largo no encontrada' });
    }
    res.status(200).json(medicion);
  } catch (error) {
    console.error("Error en getMedicionLargoById:", error);
    res.status(500).json({ message: 'Error al obtener la medición largo', error: error.message });
  }
};

// Crear una medición largo
const createMedicionLargo = async (req, res) => {
  try {
    const { idnube } = req.body;

    // Verificar si ya existe un registro con ese idnube
    if (idnube) {
      const existente = await MedicionesLargo.findOne({ where: { idnube } });
      if (existente) {
        return res.status(409).json({ 
          message: `Ya existe una medición largo con idnube ${idnube}` 
        });
      }
    }

    const nuevaMedicion = await MedicionesLargo.create(req.body);
    res.status(201).json(nuevaMedicion);
  } catch (error) {
    console.error("Error en createMedicionLargo:", error);
    res.status(500).json({ 
      message: 'Error al crear la medición largo', 
      error: error.message 
    });
  }
};


// Actualizar una medición largo
const updateMedicionLargo = async (req, res) => {
  try {
    const { id } = req.params;
    const medicion = await MedicionesLargo.findByPk(id);
    if (!medicion) {
      return res.status(404).json({ message: 'Medición largo no encontrada' });
    }

    await medicion.update(req.body);
    res.status(200).json(medicion);
  } catch (error) {
    console.error("Error en updateMedicionLargo:", error);
    res.status(500).json({ message: 'Error al actualizar la medición largo', error: error.message });
  }
};

// Eliminar una medición largo
const deleteMedicionLargo = async (req, res) => {
  try {
    const { id } = req.params;
    const medicion = await MedicionesLargo.findByPk(id);
    if (!medicion) {
      return res.status(404).json({ message: 'Medición largo no encontrada' });
    }

    await medicion.destroy();
    res.status(200).json({ message: 'Medición largo eliminada correctamente' });
  } catch (error) {
    console.error("Error en deleteMedicionLargo:", error);
    res.status(500).json({ message: 'Error al eliminar la medición largo', error: error.message });
  }
};

module.exports = {
  getAllMedicionesLargo,
  getMedicionLargoById,
  createMedicionLargo,
  updateMedicionLargo,
  deleteMedicionLargo
};

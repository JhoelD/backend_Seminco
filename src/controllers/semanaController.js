const Semana = require("../models/Semana");
const Empresa = require("../models/Empresa");

// Obtener todas las semanas de una empresa específica
const getAllSemanas = async (req, res) => {
  try {
    const { empresa_id } = req.params;
    
    // Verificar si la empresa existe
    const empresa = await Empresa.findByPk(empresa_id);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    const semanas = await Semana.findAll({ 
      where: { empresa_id },
      order: [['anio', 'ASC'], ['numero_semana', 'ASC']]
    });
    
    res.status(200).json(semanas);
  } catch (error) {
    console.error("Error en getAllSemanas:", error);
    res.status(500).json({ 
      message: 'Error al obtener semanas', 
      error: error.message 
    });
  }
};

// Obtener una semana específica de una empresa
const getSemanaById = async (req, res) => {
  try {
    const { id, empresa_id } = req.params;
    
    const semana = await Semana.findOne({ 
      where: { id, empresa_id },
      include: [{ model: Empresa, attributes: ['nombre'] }]
    });
    
    if (!semana) {
      return res.status(404).json({ 
        message: "Semana no encontrada en esta empresa" 
      });
    }
    
    res.status(200).json(semana);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener la semana", 
      error: error.message 
    });
  }
};

// Crear una nueva semana para una empresa
const createSemana = async (req, res) => {
  try {
    const { empresa_id } = req.params;
    const { numero_semana, anio, fecha_inicio, fecha_fin } = req.body;

    // Validar que la empresa exista
    const empresa = await Empresa.findByPk(empresa_id);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    // Validar que no exista ya la misma semana para el mismo año y empresa
    const semanaExistente = await Semana.findOne({ 
      where: { 
        empresa_id, 
        numero_semana, 
        anio 
      } 
    });

    if (semanaExistente) {
      return res.status(400).json({ 
        message: "Esta semana ya está registrada para esta empresa y año" 
      });
    }

    const newSemana = await Semana.create({
      numero_semana,
      anio,
      fecha_inicio,
      fecha_fin,
      empresa_id
    });

    res.status(201).json(newSemana);
  } catch (error) {
    console.error("Error en createSemana:", error);
    res.status(500).json({ 
      message: "Error al crear la semana", 
      error: error.message 
    });
  }
};

// Actualizar una semana de una empresa específica
const updateSemana = async (req, res) => {
  try {
    const { id, empresa_id } = req.params;
    
    // Verificar que la semana pertenezca a la empresa
    const semana = await Semana.findOne({ where: { id, empresa_id } });
    if (!semana) {
      return res.status(404).json({ 
        message: "Semana no encontrada en esta empresa" 
      });
    }

    // Evitar que se cambie la empresa_id
    if (req.body.empresa_id && req.body.empresa_id !== empresa_id) {
      return res.status(400).json({ 
        message: "No puedes cambiar la empresa asociada a esta semana" 
      });
    }

    const [updated] = await Semana.update(req.body, { 
      where: { id, empresa_id } 
    });

    if (updated) {
      const updatedSemana = await Semana.findByPk(id);
      return res.status(200).json(updatedSemana);
    }

    res.status(400).json({ message: "No se pudo actualizar la semana" });
  } catch (error) {
    res.status(500).json({ 
      message: "Error al actualizar la semana", 
      error: error.message 
    });
  }
};

// Eliminar una semana de una empresa específica
const deleteSemana = async (req, res) => {
  try {
    const { id, empresa_id } = req.params;
    
    // Verificar que la semana pertenezca a la empresa
    const semana = await Semana.findOne({ where: { id, empresa_id } });
    if (!semana) {
      return res.status(404).json({ 
        message: "Semana no encontrada en esta empresa" 
      });
    }

    const deleted = await Semana.destroy({ where: { id, empresa_id } });

    if (deleted) {
      return res.status(200).json({ 
        message: "Semana eliminada correctamente" 
      });
    }

    res.status(400).json({ message: "No se pudo eliminar la semana" });
  } catch (error) {
    res.status(500).json({ 
      message: "Error al eliminar la semana", 
      error: error.message 
    });
  }
};

module.exports = {
  getAllSemanas,
  getSemanaById,
  createSemana,
  updateSemana,
  deleteSemana,
};
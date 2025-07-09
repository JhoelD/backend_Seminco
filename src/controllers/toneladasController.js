const Toneladas = require('../models/toneladas');

// Obtener todas las toneladas
const getAllToneladas = async (req, res) => {
  try {
    const toneladas = await Toneladas.findAll();
    res.status(200).json(toneladas);
  } catch (error) {
    console.error("Error en getAllToneladas:", error);
    res.status(500).json({ message: 'Error al obtener las toneladas', error: error.message });
  }
};

// Obtener una tonelada por ID
const getToneladaById = async (req, res) => {
  try {
    const { id } = req.params;
    const tonelada = await Toneladas.findByPk(id);
    if (!tonelada) {
      return res.status(404).json({ message: 'Tonelada no encontrada' });
    }
    res.status(200).json(tonelada);
  } catch (error) {
    console.error("Error en getToneladaById:", error);
    res.status(500).json({ message: 'Error al obtener la tonelada', error: error.message });
  }
};

// Crear una tonelada
const createTonelada = async (req, res) => {
  try {
    const { fecha, turno, zona, tipo, labor, toneladas } = req.body;

    const nuevaTonelada = await Toneladas.create({
      fecha,
      turno,
      zona,
      tipo,
      labor,
      toneladas
    });

    res.status(201).json(nuevaTonelada);
  } catch (error) {
    console.error("Error en createTonelada:", error);
    res.status(500).json({ message: 'Error al crear la tonelada', error: error.message });
  }
};

// Actualizar una tonelada
const updateTonelada = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, turno, zona, tipo, labor, toneladas } = req.body;

    const tonelada = await Toneladas.findByPk(id);
    if (!tonelada) {
      return res.status(404).json({ message: 'Tonelada no encontrada' });
    }

    await tonelada.update({
      fecha,
      turno,
      zona,
      tipo,
      labor,
      toneladas
    });

    res.status(200).json(tonelada);
  } catch (error) {
    console.error("Error en updateTonelada:", error);
    res.status(500).json({ message: 'Error al actualizar la tonelada', error: error.message });
  }
};

// Eliminar una tonelada
const deleteTonelada = async (req, res) => {
  try {
    const { id } = req.params;

    const tonelada = await Toneladas.findByPk(id);
    if (!tonelada) {
      return res.status(404).json({ message: 'Tonelada no encontrada' });
    }

    await tonelada.destroy();
    res.status(200).json({ message: 'Tonelada eliminada correctamente' });
  } catch (error) {
    console.error("Error en deleteTonelada:", error);
    res.status(500).json({ message: 'Error al eliminar la tonelada', error: error.message });
  }
};

module.exports = {
  getAllToneladas,
  getToneladaById,
  createTonelada,
  updateTonelada,
  deleteTonelada
};

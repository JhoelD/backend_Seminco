const Meta = require('../models/meta');

// Crear una nueva meta
exports.createMeta = async (req, res) => {
  try {
    const { mes, grafico, nombre, objetivo } = req.body;

    const nuevaMeta = await Meta.create({ mes, grafico, nombre, objetivo });

    return res.status(201).json(nuevaMeta);
  } catch (error) {
    console.error('Error al crear la meta:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todas las metas (opcional)
exports.getAllMetas = async (req, res) => {
  try {
    const metas = await Meta.findAll();
    return res.json(metas);
  } catch (error) {
    console.error('Error al obtener las metas:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Editar una meta
exports.updateMeta = async (req, res) => {
  try {
    const { id } = req.params;
    const { mes, grafico, nombre, objetivo } = req.body;

    const meta = await Meta.findByPk(id);
    if (!meta) {
      return res.status(404).json({ message: 'Meta no encontrada' });
    }

    // Actualizamos los datos
    meta.mes = mes;
    meta.grafico = grafico;
    meta.nombre = nombre;
    meta.objetivo = objetivo;

    await meta.save();

    return res.json(meta);
  } catch (error) {
    console.error('Error al actualizar la meta:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar una meta
exports.deleteMeta = async (req, res) => {
  try {
    const { id } = req.params;

    const meta = await Meta.findByPk(id);
    if (!meta) {
      return res.status(404).json({ message: 'Meta no encontrada' });
    }

    await meta.destroy();

    return res.json({ message: 'Meta eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la meta:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const MetaLargo = require('../models/meta-largo');  // Importa el modelo actualizado

// Crear una nueva meta
exports.createMetaLargo = async (req, res) => {
  try {
    const { mes, grafico, nombre, objetivo } = req.body;

    const nuevaMeta = await MetaLargo.create({ mes, grafico, nombre, objetivo });

    return res.status(201).json(nuevaMeta);
  } catch (error) {
    console.error('Error al crear la meta largo:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todas las metas
exports.getAllMetasLargo = async (req, res) => {
  try {
    const metas = await MetaLargo.findAll();
    return res.json(metas);
  } catch (error) {
    console.error('Error al obtener las metas largo:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Editar una meta
exports.updateMetaLargo = async (req, res) => {
  try {
    const { id } = req.params;
    const { mes, grafico, nombre, objetivo } = req.body;

    const meta = await MetaLargo.findByPk(id);
    if (!meta) {
      return res.status(404).json({ message: 'Meta largo no encontrada' });
    }

    meta.mes = mes;
    meta.grafico = grafico;
    meta.nombre = nombre;
    meta.objetivo = objetivo;

    await meta.save();

    return res.json(meta);
  } catch (error) {
    console.error('Error al actualizar la meta largo:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar una meta
exports.deleteMetaLargo = async (req, res) => {
  try {
    const { id } = req.params;

    const meta = await MetaLargo.findByPk(id);
    if (!meta) {
      return res.status(404).json({ message: 'Meta largo no encontrada' });
    }

    await meta.destroy();

    return res.json({ message: 'Meta largo eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la meta largo:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

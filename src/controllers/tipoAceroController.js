const TipoAcero = require('../models/TipoAcero');

// 📌 Obtener todos los registros
exports.getAll = async (req, res) => {
  try {
    const tipos = await TipoAcero.findAll();
    res.status(200).json(tipos);
  } catch (error) {
    console.error('Error al obtener los tipos de acero:', error);
    res.status(500).json({ error: 'Error al obtener los tipos de acero' });
  }
};

// 📌 Obtener un registro por ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const tipo = await TipoAcero.findByPk(id);
    if (!tipo) {
      return res.status(404).json({ error: 'Tipo de acero no encontrado' });
    }
    res.status(200).json(tipo);
  } catch (error) {
    console.error('Error al obtener tipo de acero:', error);
    res.status(500).json({ error: 'Error al obtener tipo de acero' });
  }
};

// 📌 Crear un nuevo registro
exports.create = async (req, res) => {
  try {
    const { proceso, tipo_acero } = req.body;

    if (!proceso || !tipo_acero) {
      return res.status(400).json({ error: 'Los campos proceso y tipo_acero son obligatorios' });
    }

    const nuevoTipo = await TipoAcero.create({ proceso, tipo_acero });
    res.status(201).json(nuevoTipo);
  } catch (error) {
    console.error('Error al crear tipo de acero:', error);
    res.status(500).json({ error: 'Error al crear tipo de acero' });
  }
};

// 📌 Actualizar un registro existente
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { proceso, tipo_acero } = req.body;

    const tipo = await TipoAcero.findByPk(id);
    if (!tipo) {
      return res.status(404).json({ error: 'Tipo de acero no encontrado' });
    }

    await tipo.update({ proceso, tipo_acero });
    res.status(200).json(tipo);
  } catch (error) {
    console.error('Error al actualizar tipo de acero:', error);
    res.status(500).json({ error: 'Error al actualizar tipo de acero' });
  }
};

// 📌 Eliminar un registro
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const tipo = await TipoAcero.findByPk(id);

    if (!tipo) {
      return res.status(404).json({ error: 'Tipo de acero no encontrado' });
    }

    await tipo.destroy();
    res.status(200).json({ mensaje: 'Tipo de acero eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar tipo de acero:', error);
    res.status(500).json({ error: 'Error al eliminar tipo de acero' });
  }
};

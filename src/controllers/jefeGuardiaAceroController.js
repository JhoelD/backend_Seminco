const JefeGuardiaAcero = require('../../src/models/jefeguardiaacero');

// Obtener todos
exports.getAll = async (req, res) => {
  try {
    const jefes = await JefeGuardiaAcero.findAll();
    res.json(jefes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener jefes de guardia' });
  }
};

// Obtener por ID
exports.getById = async (req, res) => {
  try {
    const jefe = await JefeGuardiaAcero.findByPk(req.params.id);
    if (!jefe) return res.status(404).json({ error: 'Jefe de guardia no encontrado' });
    res.json(jefe);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener jefe de guardia' });
  }
};

// Crear nuevo
exports.create = async (req, res) => {
  try {
    const nuevo = await JefeGuardiaAcero.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear jefe de guardia' });
  }
};

// Actualizar
exports.update = async (req, res) => {
  try {
    const jefe = await JefeGuardiaAcero.findByPk(req.params.id);
    if (!jefe) return res.status(404).json({ error: 'Jefe de guardia no encontrado' });

    await jefe.update(req.body);
    res.json(jefe);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar jefe de guardia' });
  }
};

// Eliminar
exports.delete = async (req, res) => {
  try {
    const jefe = await JefeGuardiaAcero.findByPk(req.params.id);
    if (!jefe) return res.status(404).json({ error: 'Jefe de guardia no encontrado' });

    await jefe.destroy();
    res.json({ message: 'Jefe de guardia eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar jefe de guardia' });
  }
};

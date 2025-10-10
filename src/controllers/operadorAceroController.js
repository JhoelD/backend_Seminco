const OperadorAcero = require('../../src/models/operadoracero');

// Obtener todos
exports.getAll = async (req, res) => {
  try {
    const operadores = await OperadorAcero.findAll();
    res.json(operadores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener operadores' });
  }
};

// Obtener por ID
exports.getById = async (req, res) => {
  try {
    const operador = await OperadorAcero.findByPk(req.params.id);
    if (!operador) return res.status(404).json({ error: 'Operador no encontrado' });
    res.json(operador);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener operador' });
  }
};

// Crear nuevo
exports.create = async (req, res) => {
  try {
    const nuevo = await OperadorAcero.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear operador' });
  }
};

// Actualizar
exports.update = async (req, res) => {
  try {
    const operador = await OperadorAcero.findByPk(req.params.id);
    if (!operador) return res.status(404).json({ error: 'Operador no encontrado' });

    await operador.update(req.body);
    res.json(operador);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar operador' });
  }
};

// Eliminar
exports.delete = async (req, res) => {
  try {
    const operador = await OperadorAcero.findByPk(req.params.id);
    if (!operador) return res.status(404).json({ error: 'Operador no encontrado' });

    await operador.destroy();
    res.json({ message: 'Operador eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar operador' });
  }
};

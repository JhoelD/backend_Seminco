const ProcesoAcero = require('../models/ProcesoAcero');

// Obtener todos los registros
exports.getAll = async (req, res) => {
  try {
    const procesos = await ProcesoAcero.findAll();
    res.json(procesos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener procesos' });
  }
};

// Obtener uno por ID
exports.getById = async (req, res) => {
  try {
    const proceso = await ProcesoAcero.findByPk(req.params.id);
    if (!proceso) {
      return res.status(404).json({ error: 'Proceso no encontrado' });
    }
    res.json(proceso);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el proceso' });
  }
};

// Crear un nuevo registro
exports.create = async (req, res) => {
  try {
    const { codigo, proceso, tipo_acero, descripcion, precio, rendimiento } = req.body;

    // Validar que el código no esté duplicado
    const existeCodigo = await ProcesoAcero.findOne({ where: { codigo } });
    if (existeCodigo) {
      return res.status(400).json({ error: 'El código ya existe' });
    }

    // Crear nuevo registro
    const nuevo = await ProcesoAcero.create({ 
      codigo, 
      proceso, 
      tipo_acero, 
      descripcion, 
      precio, 
      rendimiento
    });

    res.status(201).json(nuevo);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El código ya existe' });
    }
    res.status(500).json({ error: 'Error al crear el proceso' });
  }
};

// Actualizar un registro por ID
exports.update = async (req, res) => {
  try {
    const { codigo, proceso, tipo_acero, descripcion, precio, rendimiento } = req.body;
    const procesoAcero = await ProcesoAcero.findByPk(req.params.id);

    if (!procesoAcero) {
      return res.status(404).json({ error: 'Proceso no encontrado' });
    }

    // Validar que el código no esté duplicado (si se está cambiando)
    if (codigo && codigo !== procesoAcero.codigo) {
      const existeCodigo = await ProcesoAcero.findOne({ where: { codigo } });
      if (existeCodigo) {
        return res.status(400).json({ error: 'El código ya existe' });
      }
    }

    // Actualizar registro
    await procesoAcero.update({ 
      codigo, 
      proceso, 
      tipo_acero, 
      descripcion, 
      precio, 
      rendimiento
    });

    res.json(procesoAcero);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El código ya existe' });
    }
    res.status(500).json({ error: 'Error al actualizar el proceso' });
  }
};

// Eliminar un registro por ID
exports.delete = async (req, res) => {
  try {
    const procesoAcero = await ProcesoAcero.findByPk(req.params.id);
    if (!procesoAcero) {
      return res.status(404).json({ error: 'Proceso no encontrado' });
    }

    await procesoAcero.destroy();
    res.json({ message: 'Proceso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el proceso' });
  }
};

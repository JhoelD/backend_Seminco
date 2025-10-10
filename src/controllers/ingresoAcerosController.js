const IngresoAceros = require('../models/IngresoAceros');

// 📌 GET - obtener todos
exports.getAll = async (req, res) => {
  try {
    const registros = await IngresoAceros.findAll();
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 POST - crear uno o varios registros
exports.create = async (req, res) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      // Si es array, inserta varios
      const registros = await IngresoAceros.bulkCreate(data);
      res.status(201).json(registros);
    } else {
      // Si es objeto, inserta uno
      const registro = await IngresoAceros.create(data);
      res.status(201).json(registro);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 PUT - actualizar por id
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await IngresoAceros.update(req.body, { where: { id } });

    if (updated) {
      const updatedRegistro = await IngresoAceros.findByPk(id);
      res.json(updatedRegistro);
    } else {
      res.status(404).json({ error: "Registro no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 DELETE - eliminar por id
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await IngresoAceros.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: "Registro eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Registro no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

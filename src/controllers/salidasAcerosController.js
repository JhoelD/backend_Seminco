const SalidasAceros = require('../models/SalidasAceros');

// 📌 GET - obtener todos
exports.getAll = async (req, res) => {
  try {
    const registros = await SalidasAceros.findAll();
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
      const registros = await SalidasAceros.bulkCreate(data);
      res.status(201).json(registros);
    } else {
      const registro = await SalidasAceros.create(data);
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
    const [updated] = await SalidasAceros.update(req.body, { where: { id } });

    if (updated) {
      const updatedRegistro = await SalidasAceros.findByPk(id);
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
    const deleted = await SalidasAceros.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: "Registro eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Registro no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

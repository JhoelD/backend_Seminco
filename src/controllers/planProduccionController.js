const PlanProduccion = require("../models/PlanProduccion");

// Obtener todos los registros
exports.getAll = async (req, res) => {
  try {
    const planes = await PlanProduccion.findAll();
    res.status(200).json(planes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los planes de producción", error });
  }
};

// Obtener un registro por ID
exports.getById = async (req, res) => {
  try {
    const plan = await PlanProduccion.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan de producción no encontrado" });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el plan de producción", error });
  }
};

// Crear un nuevo registro
exports.create = async (req, res) => {
  try {
    const nuevoPlan = await PlanProduccion.create(req.body);
    res.status(201).json(nuevoPlan);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el plan de producción", error });
  }
};

// Actualizar un registro por ID
exports.update = async (req, res) => {
  try {
    const plan = await PlanProduccion.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan de producción no encontrado" });
    }
    await plan.update(req.body);
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el plan de producción", error });
  }
};

// Eliminar un registro por ID
exports.delete = async (req, res) => {
  try {
    const plan = await PlanProduccion.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan de producción no encontrado" });
    }
    await plan.destroy();
    res.status(200).json({ message: "Plan de producción eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el plan de producción", error });
  }
};

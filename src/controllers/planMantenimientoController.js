const { PlanMantenimiento, SubPlanMantenimiento } = require('../models/plan_mantenimiento');

exports.getAllPlanes = async (req, res) => {
  try {
    const planes = await PlanMantenimiento.findAll({
      include: [
        {
          model: SubPlanMantenimiento,
          as: 'subplanes'
        }
      ]
    });
    res.json(planes);
  } catch (error) {
    console.error('Error al obtener los planes:', error);
    res.status(500).json({ message: 'Error al obtener los planes de mantenimiento.' });
  }
};

exports.getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await PlanMantenimiento.findByPk(id, {
      include: [{ model: SubPlanMantenimiento, as: 'subplanes' }]
    });

    if (!plan) {
      return res.status(404).json({ message: 'Plan no encontrado.' });
    }

    res.json(plan);
  } catch (error) {
    console.error('Error al obtener el plan:', error);
    res.status(500).json({ message: 'Error al obtener el plan.' });
  }
};

exports.createPlan = async (req, res) => {
  try {
    const { zona, cod_equipo, equipo, subplanes } = req.body;

    const nuevoPlan = await PlanMantenimiento.create(
      {
        zona,
        cod_equipo,
        equipo,
        subplanes: subplanes || []
      },
      {
        include: [{ model: SubPlanMantenimiento, as: 'subplanes' }]
      }
    );

    res.status(201).json(nuevoPlan);
  } catch (error) {
    console.error('Error al crear el plan:', error);
    res.status(500).json({ message: 'Error al crear el plan de mantenimiento.' });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { zona, cod_equipo, equipo, subplanes } = req.body;

    const plan = await PlanMantenimiento.findByPk(id, {
      include: [{ model: SubPlanMantenimiento, as: 'subplanes' }]
    });

    if (!plan) {
      return res.status(404).json({ message: 'Plan no encontrado.' });
    }

    await plan.update({ zona, cod_equipo, equipo });

    if (Array.isArray(subplanes)) {
      await SubPlanMantenimiento.destroy({ where: { plan_mantenimiento_id: plan.id } });
      await SubPlanMantenimiento.bulkCreate(
        subplanes.map(sp => ({
          ...sp,
          plan_mantenimiento_id: plan.id
        }))
      );
    }

    res.json({ message: 'Plan actualizado correctamente.' });
  } catch (error) {
    console.error('Error al actualizar el plan:', error);
    res.status(500).json({ message: 'Error al actualizar el plan de mantenimiento.' });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await PlanMantenimiento.findByPk(id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan no encontrado.' });
    }

    await plan.destroy();

    res.json({ message: 'Plan eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el plan:', error);
    res.status(500).json({ message: 'Error al eliminar el plan de mantenimiento.' });
  }
};

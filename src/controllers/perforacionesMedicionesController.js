const PerforacionMedicion = require('../models/perforaciones_mediciones');
const DetallePerforacionMedicion = require('../models/detalles_perforacion_mediciones');


// POST: Crear perforación con detalles
exports.createPerforacion = async (req, res) => {
  let perforacionesData = req.body;

  // Normalizar: si es un solo objeto, lo convertimos en un array
  if (!Array.isArray(perforacionesData)) {
    perforacionesData = [perforacionesData];
  }

  try {
    const results = [];

    for (const perf of perforacionesData) {
      const { mes, semana, tipo_perforacion, envio, detalles } = perf;

      const perforacion = await PerforacionMedicion.create(
        {
          mes,
          semana,
          tipo_perforacion,
          envio,
          detalles
        },
        {
          include: [{ model: DetallePerforacionMedicion, as: 'detalles' }]
        }
      );

      results.push(perforacion);
    }

    res.status(201).json({
      message: 'Perforaciones creadas con éxito',
      perforaciones: results
    });
  } catch (error) {
    console.error('Error al crear perforaciones:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


// GET: Obtener todas las perforaciones con sus detalles
exports.getPerforaciones = async (req, res) => {
  try {
    const perforaciones = await PerforacionMedicion.findAll({
      include: [{ model: DetallePerforacionMedicion, as: 'detalles' }]
    });

    res.json(perforaciones);
  } catch (error) {
    console.error('Error al obtener perforaciones:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// DELETE: Eliminar una perforación por ID (y sus detalles en cascada)
exports.deletePerforacion = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await PerforacionMedicion.destroy({
      where: { id }
    });

    if (deleted) {
      res.json({ message: 'Perforación eliminada' });
    } else {
      res.status(404).json({ message: 'Perforación no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar perforación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

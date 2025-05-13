const PerforacionMedicion = require('../models/perforaciones_mediciones');
const DetallePerforacionMedicion = require('../models/detalles_perforacion_mediciones');


// POST: Crear perforación con detalles
exports.createPerforacion = async (req, res) => {
  const { mes, semana, tipo_perforacion, envio, detalles } = req.body;

  try {
    const perforacion = await PerforacionMedicion.create(
      {
        mes,
        semana,
        tipo_perforacion,
        envio,
        detalles // array de objetos
      },
      {
        include: [{ model: DetallePerforacionMedicion, as: 'detalles' }]
      }
    );

    res.status(201).json({ message: 'Perforación creada con éxito', perforacion });
  } catch (error) {
    console.error('Error al crear perforación:', error);
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

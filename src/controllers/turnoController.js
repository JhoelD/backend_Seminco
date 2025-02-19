const Turno = require('../../src/models/Turno');

const turnoController = {
    getAll: async (req, res) => {
        try {
            const turnos = await Turno.findAll();
            res.json(turnos);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los turnos' });
        }
    },
    create: async (req, res) => {
        try {
            const { nombre } = req.body;
            const turno = await Turno.create({ nombre });
            res.status(201).json(turno);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el turno' });
        }
    }
};

module.exports = turnoController;

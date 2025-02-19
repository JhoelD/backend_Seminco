const Equipo = require('../models/Equipo');

const equipoController = {
    getAll: async (req, res) => {
        try {
            const equipos = await Equipo.findAll();
            res.json(equipos);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los equipos' });
        }
    },
    create: async (req, res) => {
        try {
            const { nombre } = req.body;
            const equipo = await Equipo.create({ nombre });
            res.status(201).json(equipo);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el equipo' });
        }
    }
};

module.exports = equipoController;

const Empresa = require('../models/Empresa');

const empresaController = {
    getAll: async (req, res) => {
        try {
            const empresas = await Empresa.findAll();
            res.json(empresas);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las empresas' });
        }
    },
    create: async (req, res) => {
        try {
            const { nombre } = req.body;
            const empresa = await Empresa.create({ nombre });
            res.status(201).json(empresa);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear la empresa' });
        }
    }
};

module.exports = empresaController;

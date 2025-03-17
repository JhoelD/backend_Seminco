const Empresa = require('../../src/models/Empresa');

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
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const empresa = await Empresa.findByPk(id);

            if (!empresa) {
                return res.status(404).json({ error: 'Empresa no encontrada' });
            }

            await empresa.destroy();
            res.json({ message: 'Empresa eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la empresa' });
        }
    }
};

module.exports = empresaController;

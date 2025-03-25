const DestinatarioCorreo = require('../models/destinatarioCorreo');

// Obtener todos los destinatarios
exports.getAllDestinatarios = async (req, res) => {
    try {
        const destinatarios = await DestinatarioCorreo.findAll();
        res.json(destinatarios);
    } catch (error) {
        console.error('Error detallado al obtener los destinatarios:', error); // Log completo en consola
        res.status(500).json({ 
            error: 'Error al obtener los destinatarios', 
            details: error.message || error 
        });
    }
};

// Obtener un destinatario por ID
exports.getDestinatarioById = async (req, res) => {
    try {
        const destinatario = await DestinatarioCorreo.findByPk(req.params.id);
        if (!destinatario) {
            return res.status(404).json({ error: 'Destinatario no encontrado' });
        }
        res.json(destinatario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el destinatario' });
    }
};

// Crear un nuevo destinatario
exports.createDestinatario = async (req, res) => {
    try {
        const { nombre, correo } = req.body;
        const nuevoDestinatario = await DestinatarioCorreo.create({ nombre, correo });
        res.status(201).json(nuevoDestinatario);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el destinatario' });
    }
};

// Actualizar un destinatario por ID
exports.updateDestinatario = async (req, res) => {
    try {
        const { nombre, correo } = req.body;
        const destinatario = await DestinatarioCorreo.findByPk(req.params.id);
        if (!destinatario) {
            return res.status(404).json({ error: 'Destinatario no encontrado' });
        }
        await destinatario.update({ nombre, correo });
        res.json(destinatario);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el destinatario' });
    }
};

// Eliminar un destinatario por ID
exports.deleteDestinatario = async (req, res) => {
    try {
        const destinatario = await DestinatarioCorreo.findByPk(req.params.id);
        if (!destinatario) {
            return res.status(404).json({ error: 'Destinatario no encontrado' });
        }
        await destinatario.destroy();
        res.json({ message: 'Destinatario eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el destinatario' });
    }
};

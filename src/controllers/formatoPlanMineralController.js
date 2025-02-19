const FormatoPlanMineral = require('../../src/models/formatoPlanMineral');
const Taladro = require('../models/Taladro');

// Obtener todos los registros
const obtenerTodos = async (req, res) => {
    try {
        const registros = await FormatoPlanMineral.findAll({
            include: { model: Taladro, as: 'taladros' } // Incluir los Taladros
        });
        res.json(registros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
};


// Obtener un registro por ID (con Taladros)
const obtenerPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const registro = await FormatoPlanMineral.findByPk(id, {
            include: { model: Taladro, as: 'taladros' } // Incluimos los Taladros
        });
        if (!registro) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        res.json(registro);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el registro' });
    }
};

// Crear un nuevo registro
const crear = async (req, res) => {
    const datos = req.body;

    try {
        const nuevoRegistro = await FormatoPlanMineral.create(datos, {
            include: [{ model: Taladro, as: 'taladros' }] // Incluir taladros al crear
        });
        res.status(201).json(nuevoRegistro);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el registro' });
    }
};

// Actualizar un registro existente (con Taladros)
const actualizar = async (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    try {
        const registro = await FormatoPlanMineral.findByPk(id, {
            include: { model: Taladro, as: 'taladros' }
        });
        if (!registro) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        // Actualizamos los datos del FormatoPlanMineral
        await registro.update(datos);

        // Si se incluyen Taladros en la actualización, los procesamos
        if (datos.taladros) {
            // Eliminar taladros que no estén en los datos
            await Taladro.destroy({
                where: {
                    formatoPlanMineralId: id,
                    id: { notIn: datos.taladros.map(t => t.id) }
                }
            });

            // Actualizamos o agregamos los Taladros
            for (let taladro of datos.taladros) {
                if (taladro.id) {
                    // Si tiene ID, se actualiza
                    await Taladro.update(taladro, { where: { id: taladro.id } });
                } else {
                    // Si no tiene ID, es un taladro nuevo
                    await Taladro.create({ ...taladro, formatoPlanMineralId: id });
                }
            }
        }

        // Respondemos con el registro actualizado
        const updatedRegistro = await FormatoPlanMineral.findByPk(id, {
            include: { model: Taladro, as: 'taladros' }
        });
        res.json(updatedRegistro);

    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el registro' });
    }
};

// Eliminar un registro
const eliminar = async (req, res) => {
    const { id } = req.params;

    try {
        const registro = await FormatoPlanMineral.findByPk(id);
        if (!registro) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        // Eliminar taladros asociados antes de eliminar el formato
        await Taladro.destroy({ where: { formatoPlanMineralId: id } });

        await registro.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el registro' });
    }
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};

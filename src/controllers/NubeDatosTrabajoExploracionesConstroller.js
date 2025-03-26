// Corrección en la importación de modelos
const { 
    NubeDatosTrabajoExploraciones,
    NubeDespacho,
    NubeDespachoDetalle,
    NubeDevoluciones,
    NubeDevolucionDetalle,
    NubeDetalleDespachoExplosivos,
    NubeDetalleDevolucionesExplosivos
} = require('../models/NubeDatosTrabajoExploraciones '); // Asegúrate que todos los modelos se exporten desde el archivo models

const sequelize = require('../config/sequelize');

async function crearExploracionCompleta(req, res) {
    const t = await sequelize.transaction();

    try {
        // Extraer el primer elemento si es array
        const requestData = Array.isArray(req.body) ? req.body[0] : req.body;
        
        // Validar datos mínimos
        if (!requestData.fecha || !requestData.taladro) {
            throw new Error('Faltan campos obligatorios (fecha, taladro)');
        }

        // 1. Crear datos principales (excluyendo relaciones y IDs)
        const { id, despachos, devoluciones, ...datosTrabajoData } = requestData;
        const datosTrabajo = await NubeDatosTrabajoExploraciones.create(datosTrabajoData, { 
            transaction: t 
        });
        
        // 2. Procesar despachos
        if (despachos?.length > 0) {
            await Promise.all(despachos.map(async (despacho) => {
                const { id: despachoId, datos_trabajo_id, detalles_materiales = [], detalles_explosivos = [], ...datosDespacho } = despacho;
                
                const despachoCreado = await NubeDespacho.create({
                    ...datosDespacho,
                    datos_trabajo_id: datosTrabajo.id
                }, { transaction: t });

                // Crear detalles materiales
                if (detalles_materiales.length > 0) {
                    await NubeDespachoDetalle.bulkCreate(
                        detalles_materiales.map(({ id: _, despacho_id: __, ...detalle }) => ({
                            ...detalle,
                            despacho_id: despachoCreado.id
                        })), 
                        { transaction: t }
                    );
                }

                // Crear detalles explosivos
                if (detalles_explosivos.length > 0) {
                    await NubeDetalleDespachoExplosivos.bulkCreate(
                        detalles_explosivos.map(({ id: _, id_despacho: __, ...detalle }) => ({
                            ...detalle,
                            id_despacho: despachoCreado.id
                        })), 
                        { transaction: t }
                    );
                }
            }));
        }

        // 3. Procesar devoluciones (misma lógica que despachos)
        if (devoluciones?.length > 0) {
            await Promise.all(devoluciones.map(async (devolucion) => {
                const { id: devolucionId, datos_trabajo_id, detalles_materiales = [], detalles_explosivos = [], ...datosDevolucion } = devolucion;
                
                const devolucionCreada = await NubeDevoluciones.create({
                    ...datosDevolucion,
                    datos_trabajo_id: datosTrabajo.id
                }, { transaction: t });

                // Crear detalles materiales
                if (detalles_materiales.length > 0) {
                    await NubeDevolucionDetalle.bulkCreate(
                        detalles_materiales.map(({ id: _, devolucion_id: __, ...detalle }) => ({
                            ...detalle,
                            devolucion_id: devolucionCreada.id
                        })), 
                        { transaction: t }
                    );
                }

                // Crear detalles explosivos
                if (detalles_explosivos.length > 0) {
                    await NubeDetalleDevolucionesExplosivos.bulkCreate(
                        detalles_explosivos.map(({ id: _, id_devolucion: __, ...detalle }) => ({
                            ...detalle,
                            id_devolucion: devolucionCreada.id
                        })), 
                        { transaction: t }
                    );
                }
            }));
        }

        await t.commit();
        res.status(201).json({ 
            message: 'Exploración creada con éxito',
            id: datosTrabajo.id 
        });

    } catch (error) {
        await t.rollback();
        console.error('Error al crear exploración:', error);
        res.status(500).json({ 
            error: error.message.startsWith('Faltan campos') ? 
                  error.message : 
                  'Error al crear exploración',
            details: error.message.startsWith('Faltan campos') ? 
                    null : 
                    error.message
        });
    }
}

async function obtenerExploracionesCompletas(req, res) {
    try {
        const { id } = req.params;

        let whereCondition = {};
        if (id) {
            whereCondition.id = id;
        }

        const exploraciones = await NubeDatosTrabajoExploraciones.findAll({
            where: whereCondition,
            include: [
                {
                    model: NubeDespacho,
                    as: 'despachos',
                    include: [
                        {
                            model: NubeDespachoDetalle,
                            as: 'detalles'
                        },
                        {
                            model: NubeDetalleDespachoExplosivos,
                            as: 'detalles_explosivos'
                        }
                    ]
                },
                {
                    model: NubeDevoluciones,
                    as: 'devoluciones',
                    include: [
                        {
                            model: NubeDevolucionDetalle,
                            as: 'detalles'
                        },
                        {
                            model: NubeDetalleDevolucionesExplosivos,
                            as: 'detalles_explosivos'
                        }
                    ]
                }
            ],
            order: [
                ['createdAt', 'DESC'],
                [{ model: NubeDespacho, as: 'despachos' }, 'createdAt', 'ASC'],
                [{ model: NubeDevoluciones, as: 'devoluciones' }, 'createdAt', 'ASC']
            ]
        });

        if (id && exploraciones.length === 0) {
            return res.status(404).json({ message: 'Exploración no encontrada' });
        }

        res.status(200).json(id ? exploraciones[0] : exploraciones);
    } catch (error) {
        console.error('Error al obtener exploraciones:', error);
        res.status(500).json({ 
            error: 'Error al obtener exploraciones',
            details: error.message 
        });
    }
}

module.exports = { 
    crearExploracionCompleta, 
    obtenerExploracionesCompletas 
};
const sequelize = require('../config/sequelize');
const { NubeOperacion, NubeHorometros, NubeEstado, NubePerforacionTaladroLargo, NubeInterPerforacionTaladroLargo,
    NubePerforacionHorizontal,
    NubeInterPerforacionHorizontal,
    NubeSostenimiento,
    NubeInterSostenimiento
 } = require('../models/operacionLargo');

async function crearOperacionLargo(req, res) {
    const t = await sequelize.transaction(); // Iniciar una transacción

    try {
        const operacionData = req.body.operacion;
         
        // 1. Crear la operación principal
        const operacion = await NubeOperacion.create(operacionData, { transaction: t });
        
        // 2. Crear los estados asociados a la operación
        const estados = req.body.estados.map(estado => ({
            ...estado,
            operacion_id: operacion.id
        }));
        await NubeEstado.bulkCreate(estados, { transaction: t });

        // 3. Crear las perforaciones asociadas a la operación
        const perforaciones = req.body.perforaciones.map(perforacion => ({
            ...perforacion,
            operacion_id: operacion.id
        }));
        const perforacionesCreadas = await NubePerforacionTaladroLargo.bulkCreate(perforaciones, { transaction: t });

        // 4. Crear las inter-perforaciones asociadas a las perforaciones
        const interPerforaciones = req.body.perforaciones.map((perforacion, index) => {
            return perforacion.inter_perforaciones.map(inter => ({
                ...inter,
                perforaciontaladrolargo_id: perforacionesCreadas[index].id
            }));
        }).flat(); // Flatten the array of inter perforaciones

        await NubeInterPerforacionTaladroLargo.bulkCreate(interPerforaciones, { transaction: t });

        // 5. Crear los horómetros asociados a la operación
        const horometros = req.body.horometros.map(horo => ({
            ...horo,
            operacion_id: operacion.id
        }));
        await NubeHorometros.bulkCreate(horometros, { transaction: t });

        // Confirmar la transacción
        await t.commit();

        // Enviar respuesta exitosa
        res.status(201).json({ message: 'Operación creada con éxito' });

    } catch (error) {
        // Si ocurre un error, hacer rollback
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
}
async function obtenerOperacionesLargo(req, res) {
    try {
        const operaciones = await NubeOperacion.findAll({
            where: {
                tipo_operacion: 'PERFORACIÓN TALADROS LARGOS' // Filtramos solo operaciones de taladro largo
            },
            include: [
                {
                    model: NubeEstado,
                    as: 'estados'
                },
                {
                    model: NubePerforacionTaladroLargo,
                    as: 'perforaciones',
                    include: [
                        {
                            model: NubeInterPerforacionTaladroLargo,
                            as: 'inter_perforaciones'
                        }
                    ]
                },
                {
                    model: NubeHorometros,
                    as: 'horometros'
                }
            ],
            order: [['createdAt', 'DESC']] // Ordenamos por fecha de creación descendente
        });

        res.status(200).json(operaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//HORIZONTAL-----------------------------------------------------------
async function crearOperacionHorizontal(req, res) {
    const t = await sequelize.transaction(); // Iniciar una transacción

    try {
        const operacionData = req.body.operacion;
        
        // 1. Crear la operación principal
        const operacion = await NubeOperacion.create(operacionData, { transaction: t });
        
        // 2. Crear los estados asociados a la operación
        const estados = req.body.estados.map(estado => ({
            ...estado,
            operacion_id: operacion.id
        }));
        await NubeEstado.bulkCreate(estados, { transaction: t });

        // 3. Crear las perforaciones horizontales asociadas a la operación
        const perforaciones = req.body.perforaciones.map(perforacion => ({
            ...perforacion,
            operacion_id: operacion.id
        }));
        const perforacionesCreadas = await NubePerforacionHorizontal.bulkCreate(perforaciones, { transaction: t });

        // 4. Crear las inter-perforaciones horizontales asociadas a las perforaciones
        const interPerforaciones = req.body.perforaciones.map((perforacion, index) => {
            return perforacion.inter_perforaciones.map(inter => ({
                ...inter,
                perforacionhorizontal_id: perforacionesCreadas[index].id
            }));
        }).flat(); // Flatten the array of inter perforaciones

        await NubeInterPerforacionHorizontal.bulkCreate(interPerforaciones, { transaction: t });

        // 5. Crear los horómetros asociados a la operación
        const horometros = req.body.horometros.map(horo => ({
            ...horo,
            operacion_id: operacion.id
        }));
        await NubeHorometros.bulkCreate(horometros, { transaction: t });

        // Confirmar la transacción
        await t.commit();

        // Enviar respuesta exitosa
        res.status(201).json({ message: 'Operación horizontal creada con éxito' });

    } catch (error) {
        // Si ocurre un error, hacer rollback
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
}

async function obtenerOperacionesHorizontal(req, res) {
    try {
        const operaciones = await NubeOperacion.findAll({
            where: {
                tipo_operacion: 'PERFORACIÓN HORIZONTAL' // Filtramos solo operaciones horizontales
            },
            include: [
                {
                    model: NubeEstado,
                    as: 'estados'
                },
                {
                    model: NubePerforacionHorizontal,
                    as: 'perforaciones_horizontal',
                    include: [
                        {
                            model: NubeInterPerforacionHorizontal,
                            as: 'inter_perforaciones_horizontal'
                        }
                    ]
                },
                {
                    model: NubeHorometros,
                    as: 'horometros'
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(operaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//SOSTENIMIENTO---------------------------------------------------------
async function crearOperacionSostenimiento(req, res) {
    const t = await sequelize.transaction(); // Iniciar una transacción

    try {
        const operacionData = req.body.operacion;
        
        // 1. Crear la operación principal
        const operacion = await NubeOperacion.create(operacionData, { transaction: t });
        
        // 2. Crear los estados asociados a la operación
        const estados = req.body.estados.map(estado => ({
            ...estado,
            operacion_id: operacion.id
        }));
        await NubeEstado.bulkCreate(estados, { transaction: t });

        // 3. Crear los sostenimientos asociados a la operación
        const sostenimientos = req.body.sostenimientos.map(sostenimiento => ({
            ...sostenimiento,
            operacion_id: operacion.id
        }));
        const sostenimientosCreados = await NubeSostenimiento.bulkCreate(sostenimientos, { transaction: t });

        // 4. Crear las inter-sostenimientos asociados a los sostenimientos
        const interSostenimientos = req.body.sostenimientos.map((sostenimiento, index) => {
            return sostenimiento.inter_sostenimientos.map(inter => ({
                ...inter,
                sostenimiento_id: sostenimientosCreados[index].id
            }));
        }).flat(); // Flatten the array of inter sostenimientos

        await NubeInterSostenimiento.bulkCreate(interSostenimientos, { transaction: t });

        // 5. Crear los horómetros asociados a la operación
        const horometros = req.body.horometros.map(horo => ({
            ...horo,
            operacion_id: operacion.id
        }));
        await NubeHorometros.bulkCreate(horometros, { transaction: t });

        // Confirmar la transacción
        await t.commit();

        // Enviar respuesta exitosa
        res.status(201).json({ message: 'Operación de sostenimiento creada con éxito' });

    } catch (error) {
        // Si ocurre un error, hacer rollback
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
}

async function obtenerOperacionesSostenimiento(req, res) {
    try {
        const operaciones = await NubeOperacion.findAll({
            where: {
                tipo_operacion: 'SOSTENIMIENTO' // Filtramos solo operaciones de sostenimiento
            },
            include: [
                {
                    model: NubeEstado,
                    as: 'estados'
                },
                {
                    model: NubeSostenimiento,
                    as: 'sostenimientos',
                    include: [
                        {
                            model: NubeInterSostenimiento,
                            as: 'inter_sostenimientos'
                        }
                    ]
                },
                {
                    model: NubeHorometros,
                    as: 'horometros'
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(operaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { crearOperacionLargo, obtenerOperacionesLargo, crearOperacionHorizontal, obtenerOperacionesHorizontal, crearOperacionSostenimiento, obtenerOperacionesSostenimiento  };
const sequelize = require('../config/sequelize');
const { NubeOperacion, NubeHorometros, NubeEstado, NubePerforacionTaladroLargo, NubeInterPerforacionTaladroLargo,
    NubePerforacionHorizontal,
    NubeInterPerforacionHorizontal,
    NubeSostenimiento,
    NubeInterSostenimiento
 } = require('../models/operacionLargo');

 async function crearOperacionLargo(req, res) {
    const t = await sequelize.transaction();

    try {
        const operacionesData = Array.isArray(req.body) ? req.body : [req.body]; // Acepta tanto lista como objeto único
        const idsOperacionesCreadas = [];

        for (const data of operacionesData) {
            // 1. Crear operación principal
            const operacion = await NubeOperacion.create(data.operacion, { transaction: t });
            idsOperacionesCreadas.push(operacion.id); 
            
            // 2. Crear estados
            const estados = data.estados.map(estado => ({
                ...estado,
                operacion_id: operacion.id
            }));
            await NubeEstado.bulkCreate(estados, { transaction: t });

            // 3. Crear perforaciones
            const perforaciones = data.perforaciones.map(perforacion => ({
                ...perforacion,
                operacion_id: operacion.id
            }));
            const perforacionesCreadas = await NubePerforacionTaladroLargo.bulkCreate(perforaciones, { transaction: t });

            // 4. Crear inter-perforaciones
            const interPerforaciones = data.perforaciones.map((perforacion, index) => {
                return perforacion.inter_perforaciones.map(inter => ({
                    ...inter,
                    perforaciontaladrolargo_id: perforacionesCreadas[index].id
                }));
            }).flat();
            await NubeInterPerforacionTaladroLargo.bulkCreate(interPerforaciones, { transaction: t });

            // 5. Crear horómetros
            const horometros = data.horometros.map(horo => ({
                ...horo,
                operacion_id: operacion.id
            }));
            await NubeHorometros.bulkCreate(horometros, { transaction: t });
        }

        await t.commit();
        res.status(201).json({ operaciones_ids: idsOperacionesCreadas });

    } catch (error) {
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
    const t = await sequelize.transaction();

    try {
        // Acepta tanto un objeto único como un array
        const operacionesData = Array.isArray(req.body) ? req.body : [req.body];
        const idsOperacionesCreadas = [];

        for (const data of operacionesData) {
            // 1. Crear operación principal
            const operacion = await NubeOperacion.create(data.operacion, { transaction: t });
            idsOperacionesCreadas.push(operacion.id); 
            
            // 2. Crear estados
            const estados = data.estados.map(estado => ({
                ...estado,
                operacion_id: operacion.id
            }));
            await NubeEstado.bulkCreate(estados, { transaction: t });

            // 3. Crear perforaciones horizontales
            const perforaciones = data.perforaciones.map(perforacion => ({
                ...perforacion,
                operacion_id: operacion.id
            }));
            const perforacionesCreadas = await NubePerforacionHorizontal.bulkCreate(perforaciones, { transaction: t });

            // 4. Crear inter-perforaciones horizontales
            const interPerforaciones = data.perforaciones.map((perforacion, index) => {
                return perforacion.inter_perforaciones.map(inter => ({
                    ...inter,
                    perforacionhorizontal_id: perforacionesCreadas[index].id
                }));
            }).flat();
            await NubeInterPerforacionHorizontal.bulkCreate(interPerforaciones, { transaction: t });

            // 5. Crear horómetros
            const horometros = data.horometros.map(horo => ({
                ...horo,
                operacion_id: operacion.id
            }));
            await NubeHorometros.bulkCreate(horometros, { transaction: t });
        }

        await t.commit();
        res.status(201).json({ operaciones_ids: idsOperacionesCreadas });

    } catch (error) {
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
    const t = await sequelize.transaction();

    try {
        // Acepta tanto un objeto único como un array
        const operacionesData = Array.isArray(req.body) ? req.body : [req.body];
        const idsOperacionesCreadas = [];

        for (const data of operacionesData) {
            // 1. Crear operación principal
            const operacion = await NubeOperacion.create(data.operacion, { transaction: t });
            idsOperacionesCreadas.push(operacion.id); 

            // 2. Crear estados
            const estados = data.estados.map(estado => ({
                ...estado,
                operacion_id: operacion.id
            }));
            await NubeEstado.bulkCreate(estados, { transaction: t });

            // 3. Crear sostenimientos
            const sostenimientos = data.sostenimientos.map(sostenimiento => ({
                ...sostenimiento,
                operacion_id: operacion.id
            }));
            const sostenimientosCreados = await NubeSostenimiento.bulkCreate(sostenimientos, { transaction: t });

            // 4. Crear inter-sostenimientos
            const interSostenimientos = data.sostenimientos.map((sostenimiento, index) => {
                return sostenimiento.inter_sostenimientos.map(inter => ({
                    ...inter,
                    sostenimiento_id: sostenimientosCreados[index].id
                }));
            }).flat();
            await NubeInterSostenimiento.bulkCreate(interSostenimientos, { transaction: t });

            // 5. Crear horómetros
            const horometros = data.horometros.map(horo => ({
                ...horo,
                operacion_id: operacion.id
            }));
            await NubeHorometros.bulkCreate(horometros, { transaction: t });
        }

        await t.commit();
        res.status(201).json({ operaciones_ids: idsOperacionesCreadas });
        
    } catch (error) {
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
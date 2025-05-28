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

async function actualizarOperacionLargo(req, res) {
    const t = await sequelize.transaction();

    try {
        const operacionesData = Array.isArray(req.body) ? req.body : [req.body];
        const resultados = [];

        for (const data of operacionesData) {
            const operacionId = data.operacion.id;
            const resultadoOperacion = {
                id: operacionId,
                success: true,
                message: 'Operación actualizada correctamente'
            };

            try {
                // 1. Verificar que la operación existe
                const operacionExistente = await NubeOperacion.findByPk(operacionId, { transaction: t });
                if (!operacionExistente) {
                    throw new Error(`Operación con ID ${operacionId} no encontrada`);
                }

                // 2. Actualizar operación principal
                await NubeOperacion.update(data.operacion, {
                    where: { id: operacionId },
                    transaction: t
                });

                // 3. Eliminar y recrear relaciones en bloques atómicos por tipo
                // Estados
                await NubeEstado.destroy({ where: { operacion_id: operacionId }, transaction: t });
                if (data.estados && data.estados.length > 0) {
                    await NubeEstado.bulkCreate(
                        data.estados.map(estado => ({ ...estado, operacion_id: operacionId })),
                        { transaction: t }
                    );
                }

                // Horómetros
                await NubeHorometros.destroy({ where: { operacion_id: operacionId }, transaction: t });
                if (data.horometros && data.horometros.length > 0) {
                    await NubeHorometros.bulkCreate(
                        data.horometros.map(horo => ({ ...horo, operacion_id: operacionId })),
                        { transaction: t }
                    );
                }

                // Perforaciones e interperforaciones
                const perforacionesAntiguas = await NubePerforacionTaladroLargo.findAll({
                    where: { operacion_id: operacionId },
                    transaction: t
                });
                
                if (perforacionesAntiguas.length > 0) {
                    const perforacionIds = perforacionesAntiguas.map(p => p.id);
                    await NubeInterPerforacionTaladroLargo.destroy({
                        where: { perforaciontaladrolargo_id: perforacionIds },
                        transaction: t
                    });
                }

                await NubePerforacionTaladroLargo.destroy({
                    where: { operacion_id: operacionId },
                    transaction: t
                });

                if (data.perforaciones && data.perforaciones.length > 0) {
                    const perforacionesCreadas = await NubePerforacionTaladroLargo.bulkCreate(
                        data.perforaciones.map(perf => ({ ...perf, operacion_id: operacionId })),
                        { transaction: t }
                    );

                    const interPerforaciones = data.perforaciones
                        .map((perforacion, index) => 
                            (perforacion.inter_perforaciones || []).map(inter => ({
                                ...inter,
                                perforaciontaladrolargo_id: perforacionesCreadas[index].id
                            }))
                        )
                        .flat();

                    if (interPerforaciones.length > 0) {
                        await NubeInterPerforacionTaladroLargo.bulkCreate(interPerforaciones, { transaction: t });
                    }
                }

                resultados.push(resultadoOperacion);
            } catch (error) {
                resultadoOperacion.success = false;
                resultadoOperacion.message = `Error al actualizar operación ${operacionId}: ${error.message}`;
                resultados.push(resultadoOperacion);
                // Continuamos con las siguientes operaciones en lugar de hacer rollback inmediato
            }
        }

        // Verificamos si hubo algún error en alguna operación
        const errores = resultados.filter(r => !r.success);
        if (errores.length > 0) {
            await t.rollback();
            return res.status(207).json({ // 207 Multi-Status
                message: 'Algunas operaciones no se actualizaron correctamente',
                resultados,
                errores: errores.map(e => e.message)
            });
        }

        await t.commit();
        res.status(200).json({
            message: 'Todas las operaciones actualizadas correctamente',
            resultados
        });

    } catch (error) {
        await t.rollback();
        res.status(500).json({ 
            error: error.message,
            message: 'Error general en la transacción'
        });
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

async function actualizarOperacionHorizontal(req, res) {
    const t = await sequelize.transaction();

    try {
        const operacionesData = Array.isArray(req.body) ? req.body : [req.body];
        const resultados = [];

        for (const data of operacionesData) {
            const operacionId = data.operacion.id;
            const resultadoOperacion = {
                id: operacionId,
                success: true,
                message: 'Operación horizontal actualizada correctamente'
            };

            try {
                // 1. Verificar que la operación existe
                const operacionExistente = await NubeOperacion.findByPk(operacionId, { transaction: t });
                if (!operacionExistente) {
                    throw new Error(`Operación horizontal con ID ${operacionId} no encontrada`);
                }

                // 2. Actualizar operación principal
                await NubeOperacion.update(data.operacion, {
                    where: { id: operacionId },
                    transaction: t
                });

                // 3. Eliminar y recrear relaciones en bloques atómicos por tipo
                // Estados
                await NubeEstado.destroy({ where: { operacion_id: operacionId }, transaction: t });
                if (data.estados && data.estados.length > 0) {
                    await NubeEstado.bulkCreate(
                        data.estados.map(estado => ({ ...estado, operacion_id: operacionId })),
                        { transaction: t }
                    );
                }

                // Horómetros
                await NubeHorometros.destroy({ where: { operacion_id: operacionId }, transaction: t });
                if (data.horometros && data.horometros.length > 0) {
                    await NubeHorometros.bulkCreate(
                        data.horometros.map(horo => ({ ...horo, operacion_id: operacionId })),
                        { transaction: t }
                    );
                }

                // Perforaciones horizontales e interperforaciones
                const perforacionesAntiguas = await NubePerforacionHorizontal.findAll({
                    where: { operacion_id: operacionId },
                    transaction: t
                });
                
                if (perforacionesAntiguas.length > 0) {
                    const perforacionIds = perforacionesAntiguas.map(p => p.id);
                    await NubeInterPerforacionHorizontal.destroy({
                        where: { perforacionhorizontal_id: perforacionIds },
                        transaction: t
                    });
                }

                await NubePerforacionHorizontal.destroy({
                    where: { operacion_id: operacionId },
                    transaction: t
                });

                if (data.perforaciones && data.perforaciones.length > 0) {
                    const perforacionesCreadas = await NubePerforacionHorizontal.bulkCreate(
                        data.perforaciones.map(perf => ({ ...perf, operacion_id: operacionId })),
                        { transaction: t }
                    );

                    const interPerforaciones = data.perforaciones
                        .map((perforacion, index) => 
                            (perforacion.inter_perforaciones || []).map(inter => ({
                                ...inter,
                                perforacionhorizontal_id: perforacionesCreadas[index].id
                            }))
                        )
                        .flat();

                    if (interPerforaciones.length > 0) {
                        await NubeInterPerforacionHorizontal.bulkCreate(interPerforaciones, { transaction: t });
                    }
                }

                resultados.push(resultadoOperacion);
            } catch (error) {
                resultadoOperacion.success = false;
                resultadoOperacion.message = `Error al actualizar operación horizontal ${operacionId}: ${error.message}`;
                resultados.push(resultadoOperacion);
                // Continuamos con las siguientes operaciones en lugar de hacer rollback inmediato
            }
        }

        // Verificamos si hubo algún error en alguna operación
        const errores = resultados.filter(r => !r.success);
        if (errores.length > 0) {
            await t.rollback();
            return res.status(207).json({ // 207 Multi-Status
                message: 'Algunas operaciones horizontales no se actualizaron correctamente',
                resultados,
                errores: errores.map(e => e.message)
            });
        }

        await t.commit();
        res.status(200).json({
            message: 'Todas las operaciones horizontales actualizadas correctamente',
            resultados
        });

    } catch (error) {
        await t.rollback();
        res.status(500).json({ 
            error: error.message,
            message: 'Error general en la transacción de operaciones horizontales'
        });
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

async function actualizarOperacionSostenimiento(req, res) {
    const t = await sequelize.transaction();

    try {
        const operacionesData = Array.isArray(req.body) ? req.body : [req.body];
        const resultados = [];

        for (const data of operacionesData) {
            const operacionId = data.operacion.id;
            const resultadoOperacion = {
                id: operacionId,
                success: true,
                message: 'Operación de sostenimiento actualizada correctamente'
            };

            try {
                // 1. Verificar que la operación existe
                const operacionExistente = await NubeOperacion.findByPk(operacionId, { transaction: t });
                if (!operacionExistente) {
                    throw new Error(`Operación de sostenimiento con ID ${operacionId} no encontrada`);
                }

                // 2. Actualizar operación principal
                await NubeOperacion.update(data.operacion, {
                    where: { id: operacionId },
                    transaction: t
                });

                // 3. Eliminar y recrear relaciones en bloques atómicos por tipo
                // Estados
                await NubeEstado.destroy({ where: { operacion_id: operacionId }, transaction: t });
                if (data.estados && data.estados.length > 0) {
                    await NubeEstado.bulkCreate(
                        data.estados.map(estado => ({ ...estado, operacion_id: operacionId })),
                        { transaction: t }
                    );
                }

                // Horómetros
                await NubeHorometros.destroy({ where: { operacion_id: operacionId }, transaction: t });
                if (data.horometros && data.horometros.length > 0) {
                    await NubeHorometros.bulkCreate(
                        data.horometros.map(horo => ({ ...horo, operacion_id: operacionId })),
                        { transaction: t }
                    );
                }

                // Sostenimientos e inter-sostenimientos
                const sostenimientosAntiguos = await NubeSostenimiento.findAll({
                    where: { operacion_id: operacionId },
                    transaction: t
                });
                
                if (sostenimientosAntiguos.length > 0) {
                    const sostenimientoIds = sostenimientosAntiguos.map(s => s.id);
                    await NubeInterSostenimiento.destroy({
                        where: { sostenimiento_id: sostenimientoIds },
                        transaction: t
                    });
                }

                await NubeSostenimiento.destroy({
                    where: { operacion_id: operacionId },
                    transaction: t
                });

                if (data.sostenimientos && data.sostenimientos.length > 0) {
                    const sostenimientosCreados = await NubeSostenimiento.bulkCreate(
                        data.sostenimientos.map(sost => ({ ...sost, operacion_id: operacionId })),
                        { transaction: t }
                    );

                    const interSostenimientos = data.sostenimientos
                        .map((sostenimiento, index) => 
                            (sostenimiento.inter_sostenimientos || []).map(inter => ({
                                ...inter,
                                sostenimiento_id: sostenimientosCreados[index].id
                            }))
                        )
                        .flat();

                    if (interSostenimientos.length > 0) {
                        await NubeInterSostenimiento.bulkCreate(interSostenimientos, { transaction: t });
                    }
                }

                resultados.push(resultadoOperacion);
            } catch (error) {
                resultadoOperacion.success = false;
                resultadoOperacion.message = `Error al actualizar operación de sostenimiento ${operacionId}: ${error.message}`;
                resultados.push(resultadoOperacion);
                // Continuamos con las siguientes operaciones
            }
        }

        // Verificamos si hubo algún error en alguna operación
        const errores = resultados.filter(r => !r.success);
        if (errores.length > 0) {
            await t.rollback();
            return res.status(207).json({
                message: 'Algunas operaciones de sostenimiento no se actualizaron correctamente',
                resultados,
                errores: errores.map(e => e.message)
            });
        }

        await t.commit();
        res.status(200).json({
            message: 'Todas las operaciones de sostenimiento actualizadas correctamente',
            resultados
        });

    } catch (error) {
        await t.rollback();
        res.status(500).json({ 
            error: error.message,
            message: 'Error general en la transacción de operaciones de sostenimiento'
        });
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

module.exports = { crearOperacionLargo,actualizarOperacionLargo, obtenerOperacionesLargo, crearOperacionHorizontal,actualizarOperacionHorizontal, obtenerOperacionesHorizontal, crearOperacionSostenimiento, actualizarOperacionSostenimiento, obtenerOperacionesSostenimiento  };
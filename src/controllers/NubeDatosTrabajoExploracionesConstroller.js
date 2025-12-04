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
const { Op } = require('sequelize');

async function crearExploracionCompleta(req, res) {
    const t = await sequelize.transaction();

    try {
        // Extraer el primer elemento si es array
        const requestData = Array.isArray(req.body) ? req.body[0] : req.body;

        // Validar datos mínimos
        if (!requestData.fecha || !requestData.taladro) {
            throw new Error('Faltan campos obligatorios: fecha y taladro.');
        }

        // 1. Crear datos principales (excluyendo relaciones e IDs)
        const { id, despachos, devoluciones, ...datosTrabajoData } = requestData;

        // Asegurar que los nuevos campos tengan valores por defecto si no vienen en la petición
        const datosTrabajoCompletos = {
            ...datosTrabajoData,
            envio: datosTrabajoData.envio || 0,
            estado: datosTrabajoData.estado || 'Creado',
            cerrado: datosTrabajoData.cerrado || 0
        };

        let datosTrabajo;
        try {
            datosTrabajo = await NubeDatosTrabajoExploraciones.create(datosTrabajoCompletos, { transaction: t });
        } catch (dbError) {
            throw new Error(`Error al insertar en NubeDatosTrabajoExploraciones: ${dbError.message}`);
        }

        // 2. Procesar despachos
        if (despachos?.length > 0) {
            try {
                await Promise.all(despachos.map(async (despacho) => {
                    const { id: despachoId, datos_trabajo_id, detalles_materiales = [], detalles_explosivos = [], ...datosDespacho } = despacho;

                    // Asegurar que el campo observaciones esté presente
                    const despachoCompleto = {
                        ...datosDespacho,
                        datos_trabajo_id: datosTrabajo.id,
                        observaciones: datosDespacho.observaciones || null
                    };

                    let despachoCreado;
                    try {
                        despachoCreado = await NubeDespacho.create(despachoCompleto, { transaction: t });
                    } catch (dbError) {
                        throw new Error(`Error al insertar en NubeDespacho: ${dbError.message}`);
                    }

                    // Crear detalles materiales
                    if (detalles_materiales.length > 0) {
                        try {
                            await NubeDespachoDetalle.bulkCreate(
                                detalles_materiales.map(({ id: _, despacho_id: __, ...detalle }) => ({
                                    ...detalle,
                                    despacho_id: despachoCreado.id
                                })),
                                { transaction: t }
                            );
                        } catch (dbError) {
                            throw new Error(`Error al insertar en NubeDespachoDetalle: ${dbError.message}`);
                        }
                    }

                    // Crear detalles explosivos
                    if (detalles_explosivos.length > 0) {
                        try {
                            await NubeDetalleDespachoExplosivos.bulkCreate(
                                detalles_explosivos.map(({ id: _, id_despacho: __, ...detalle }) => ({
                                    ...detalle,
                                    id_despacho: despachoCreado.id
                                })),
                                { transaction: t }
                            );
                        } catch (dbError) {
                            throw new Error(`Error al insertar en NubeDetalleDespachoExplosivos: ${dbError.message}`);
                        }
                    }
                }));
            } catch (error) {
                throw new Error(`Error procesando despachos: ${error.message}`);
            }
        }

        // 3. Procesar devoluciones
        if (devoluciones?.length > 0) {
            try {
                await Promise.all(devoluciones.map(async (devolucion) => {
                    const { id: devolucionId, datos_trabajo_id, detalles_materiales = [], detalles_explosivos = [], ...datosDevolucion } = devolucion;

                    // Asegurar que el campo observaciones esté presente
                    const devolucionCompleta = {
                        ...datosDevolucion,
                        datos_trabajo_id: datosTrabajo.id,
                        observaciones: datosDevolucion.observaciones || null
                    };

                    let devolucionCreada;
                    try {
                        devolucionCreada = await NubeDevoluciones.create(devolucionCompleta, { transaction: t });
                    } catch (dbError) {
                        throw new Error(`Error al insertar en NubeDevoluciones: ${dbError.message}`);
                    }

                    // Crear detalles materiales
                    if (detalles_materiales.length > 0) {
                        try {
                            await NubeDevolucionDetalle.bulkCreate(
                                detalles_materiales.map(({ id: _, devolucion_id: __, ...detalle }) => ({
                                    ...detalle,
                                    devolucion_id: devolucionCreada.id
                                })),
                                { transaction: t }
                            );
                        } catch (dbError) {
                            throw new Error(`Error al insertar en NubeDevolucionDetalle: ${dbError.message}`);
                        }
                    }

                    // Crear detalles explosivos
                    if (detalles_explosivos.length > 0) {
                        try {
                            await NubeDetalleDevolucionesExplosivos.bulkCreate(
                                detalles_explosivos.map(({ id: _, id_devolucion: __, ...detalle }) => ({
                                    ...detalle,
                                    id_devolucion: devolucionCreada.id
                                })),
                                { transaction: t }
                            );
                        } catch (dbError) {
                            throw new Error(`Error al insertar en NubeDetalleDevolucionesExplosivos: ${dbError.message}`);
                        }
                    }
                }));
            } catch (error) {
                throw new Error(`Error procesando devoluciones: ${error.message}`);
            }
        }

        await t.commit();
        res.status(201).json({
            message: 'Exploración creada con éxito',
            id: datosTrabajo.id,
            envio: datosTrabajo.envio,
            estado: datosTrabajo.estado
        });

    } catch (error) {
        await t.rollback();
        console.error('Error al crear exploración:', error);

        res.status(500).json({
            error: 'Error al crear exploración',
            details: error.message
        });
    }
}

async function marcarComoUsadosEnMediciones(req, res) {
  const t = await sequelize.transaction();

  try {
    let { ids } = req.body;

    // Asegurar que 'ids' sea un array
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    if (ids.length === 0) {
      return res.status(400).json({ message: 'No se recibieron IDs para actualizar.' });
    }

    // Actualizar registros
    const resultados = await NubeDatosTrabajoExploraciones.update(
      { medicion: 1 },
      { where: { id: ids }, transaction: t }
    );

    await t.commit();

    res.status(200).json({
      message: 'Registros actualizados correctamente',
      cantidad_actualizada: resultados[0] // devuelve cantidad de filas afectadas
    });

  } catch (error) {
    await t.rollback();
    console.error('Error en marcarComoUsadosEnMediciones:', error);
    res.status(500).json({
      message: 'Error al actualizar los registros para mediciones',
      error: error.message
    });
  }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function obtenerExploracionesCompletas(req, res) {
    try {
        let { 
            limit = 100, 
            fecha_inicio, 
            fecha_fin,
            turno,
            page = 1
        } = req.query;

        // Normalizar parámetros
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 100;
        const MAX_LIMIT = 200;
        if (limit > MAX_LIMIT) limit = MAX_LIMIT;

        // Construir condiciones WHERE
        const whereConditions = {};
        
        if (fecha_inicio && fecha_fin) {
            whereConditions.fecha = { [Op.between]: [fecha_inicio, fecha_fin] };
        } else if (fecha_inicio) {
            whereConditions.fecha = { [Op.gte]: fecha_inicio };
        } else if (fecha_fin) {
            whereConditions.fecha = { [Op.lte]: fecha_fin };
        }

        if (turno && turno !== '') {
            whereConditions.turno = turno;
        }

        const offset = (page - 1) * limit;

        // 1️⃣ COUNT SIN JOINS (ya lo tienes bien)
        const total = await NubeDatosTrabajoExploraciones.count({
            where: whereConditions
        });

        // 2️⃣ OBTENER SOLO LOS IDs PRINCIPALES CON PAGINACIÓN
        const registrosIds = await NubeDatosTrabajoExploraciones.findAll({
            where: whereConditions,
            attributes: ['id'],
            order: [['fecha', 'DESC'], ['createdAt', 'DESC']],
            limit,
            offset
        });

        const ids = registrosIds.map(reg => reg.id);

        if (ids.length === 0) {
            return res.status(200).json({
                total: 0,
                totalPages: 0,
                currentPage: page,
                data: []
            });
        }

        // 3️⃣ OBTENER DATOS COMPLETOS SOLO PARA LOS IDs PAGINADOS
        const rows = await NubeDatosTrabajoExploraciones.findAll({
            where: { id: { [Op.in]: ids } },
            include: [
                {
                    model: NubeDespacho,
                    as: 'despachos',
                    include: [
                        { 
                            model: NubeDespachoDetalle, 
                            as: 'detalles',
                            separate: true // ⬅️ EVITA PRODUCTO CARTESIANO
                        },
                        { 
                            model: NubeDetalleDespachoExplosivos, 
                            as: 'detalles_explosivos',
                            separate: true // ⬅️ EVITA PRODUCTO CARTESIANO
                        }
                    ]
                },
                {
                    model: NubeDevoluciones,
                    as: 'devoluciones',
                    include: [
                        { 
                            model: NubeDevolucionDetalle, 
                            as: 'detalles',
                            separate: true 
                        },
                        { 
                            model: NubeDetalleDevolucionesExplosivos, 
                            as: 'detalles_explosivos',
                            separate: true 
                        }
                    ]
                }
            ],
            order: [['fecha', 'DESC'], ['createdAt', 'DESC']]
        });

        res.status(200).json({
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            filteredByDate: !!(fecha_inicio || fecha_fin),
            filteredByTurno: !!(turno && turno !== ''),
            fecha_inicio: fecha_inicio || null,
            fecha_fin: fecha_fin || null,
            turno: turno || null,
            data: rows
        });

    } catch (error) {
        console.error('Error al obtener exploraciones:', error);
        res.status(500).json({ 
            error: 'Error al obtener exploraciones',
            details: error.message 
        });
    }
}


async function obtenerExploracionesPorTipo(req, res) {
  try {
    const { limit = 100, tipo_perforacion } = req.query;

    if (!tipo_perforacion) {
      return res.status(400).json({
        error: 'Debe especificar el tipo_perforacion en la consulta'
      });
    }

    // 1️⃣ Obtener total filtrado (solo por tipo_perforacion)
    const where = { tipo_perforacion };

    const total = await NubeDatosTrabajoExploraciones.count({ where });
    const totalPages = Math.ceil(total / limit);

    let allData = [];
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    // 2️⃣ Bucle con paginación y delay
    for (let page = 1; page <= totalPages; page++) {
      const offset = (page - 1) * limit;

      const rows = await NubeDatosTrabajoExploraciones.findAll({
        where,
        // 🔹 Solo los campos necesarios para procesar en el front
        attributes: [
          'id',
          'fecha',
          'turno',
          'empresa',
          'zona',
          'tipo_labor',
          'labor',
          'ala',
          'veta',
          'tipo_perforacion',
          'envio',
          'semanaDefault',
          // Agrega estos solo si realmente existen en tu modelo / tabla:
          // 'avance_programado',
          // 'ancho',
          // 'alto',
          // 'idnube',
          // 'no_aplica',
          // 'remanente'
        ],
        include: [
          {
            model: NubeDespacho,
            as: 'despachos',
            // realmente solo necesitas el id para relacionar, pero incluso eso no lo usas en el front
            attributes: ['id'],
            include: [
              {
                model: NubeDespachoDetalle,
                as: 'detalles',
                attributes: ['nombre_material', 'cantidad']
              }
            ]
          },
          {
            model: NubeDevoluciones,
            as: 'devoluciones',
            attributes: ['id'],
            include: [
              {
                model: NubeDevolucionDetalle,
                as: 'detalles',
                attributes: ['nombre_material', 'cantidad']
              }
            ]
          }
        ],
        // Orden simple para no encarecer tanto la consulta
        order: [
          ['fecha', 'DESC'],
          ['id', 'DESC']
        ],
        limit: parseInt(limit),
        offset
      });

      allData = allData.concat(rows);
      await delay(100);
    }

    // Puedes devolver el mismo formato que antes
    res.status(200).json({
      total,
      totalPages,
      tipo_perforacion,
      data: allData
    });

  } catch (error) {
    console.error('Error al obtener exploraciones por tipo_perforacion:', error);
    res.status(500).json({
      error: 'Error al obtener exploraciones por tipo_perforacion',
      details: error.message
    });
  }
}


async function obtenerPorLaborCompleta(req, res) {
  try {
    const { tipo_labor, labor, ala, mes, anio, limit = 100 } = req.query;

    if (!tipo_labor || !labor) {
      return res.status(400).json({
        error: 'Los parámetros tipo_labor y labor son obligatorios.'
      });
    }

    const where = { tipo_labor, labor };
    if (ala) where.ala = ala;

    // Mapeo de meses a número
    const mesesMap = {
      ENERO: 1, FEBRERO: 2, MARZO: 3, ABRIL: 4, MAYO: 5, JUNIO: 6,
      JULIO: 7, AGOSTO: 8, SEPTIEMBRE: 9, SETIEMBRE: 9, OCTUBRE: 10, NOVIEMBRE: 11, DICIEMBRE: 12
    };

    if (anio) {
      where.fecha = sequelize.where(sequelize.fn('YEAR', sequelize.col('fecha')), anio);
    }

    if (mes) {
      const mesNum = mesesMap[mes.toUpperCase()];
      if (mesNum) {
        if (anio) {
          where[Op.and] = [
            sequelize.where(sequelize.fn('YEAR', sequelize.col('fecha')), anio),
            sequelize.where(sequelize.fn('MONTH', sequelize.col('fecha')), mesNum)
          ];
        } else {
          where.fecha = sequelize.where(sequelize.fn('MONTH', sequelize.col('fecha')), mesNum);
        }
      }
    }

    const total = await NubeDatosTrabajoExploraciones.count({ where });
    const totalPages = Math.ceil(total / limit);
    let allData = [];
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    for (let page = 1; page <= totalPages; page++) {
      const offset = (page - 1) * limit;

      const rows = await NubeDatosTrabajoExploraciones.findAll({
        where,
        attributes: [
          'id',
          'fecha',
          'turno',
          'empresa',
          'zona',
          'tipo_labor',
          'labor',
          'ala',
          'veta',
          'tipo_perforacion',
          'envio',
          'semanaSelect'
        ],
        include: [
          {
            model: NubeDespacho,
            as: 'despachos',
            attributes: ['id'],
            include: [
              {
                model: NubeDespachoDetalle,
                as: 'detalles',
                attributes: ['nombre_material', 'cantidad']
              }
            ]
          },
          {
            model: NubeDevoluciones,
            as: 'devoluciones',
            attributes: ['id'],
            include: [
              {
                model: NubeDevolucionDetalle,
                as: 'detalles',
                attributes: ['nombre_material', 'cantidad']
              }
            ]
          }
        ],
        order: [['fecha', 'DESC']],
        limit: parseInt(limit),
        offset
      });

      allData = allData.concat(rows);
      await delay(100);
    }

    res.status(200).json(allData);

  } catch (error) {
    console.error('❌ Error al obtener exploraciones por labor:', error);
    res.status(500).json({
      error: 'Error al obtener exploraciones por tipo_labor, labor y ala',
      details: error.message
    });
  }
}

async function obtenerPorFechaCompleta(req, res) {
  try {
    const { mes, anio, limit = 100 } = req.query;

    // Mapeo de meses a número
    const mesesMap = {
      ENERO: 1, FEBRERO: 2, MARZO: 3, ABRIL: 4, MAYO: 5, JUNIO: 6,
      JULIO: 7, AGOSTO: 8, SEPTIEMBRE: 9, SETIEMBRE: 9, OCTUBRE: 10, NOVIEMBRE: 11, DICIEMBRE: 12
    };

    // Iniciamos el where vacío
    const where = {};

    if (anio) {
      where.fecha = sequelize.where(
        sequelize.fn('YEAR', sequelize.col('fecha')),
        anio
      );
    }

    if (mes) {
      const mesNum = mesesMap[mes.toUpperCase()];
      if (mesNum) {
        if (anio) {
          // Año + mes
          where[Op.and] = [
            sequelize.where(
              sequelize.fn('YEAR', sequelize.col('fecha')),
              anio
            ),
            sequelize.where(
              sequelize.fn('MONTH', sequelize.col('fecha')),
              mesNum
            )
          ];
        } else {
          // Solo mes
          where.fecha = sequelize.where(
            sequelize.fn('MONTH', sequelize.col('fecha')),
            mesNum
          );
        }
      }
    }

    const total = await NubeDatosTrabajoExploraciones.count({ where });
    const totalPages = Math.ceil(total / limit);
    let allData = [];
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    for (let page = 1; page <= totalPages; page++) {
      const offset = (page - 1) * limit;

      const rows = await NubeDatosTrabajoExploraciones.findAll({
        where,
        attributes: [
          'id',
          'fecha',
          'turno',
          'empresa',
          'zona',
          'tipo_labor',
          'labor',
          'ala',
          'veta',
          'tipo_perforacion',
          'envio',
          'semanaSelect'
        ],
        include: [
          {
            model: NubeDespacho,
            as: 'despachos',
            attributes: ['id'],
            include: [
              {
                model: NubeDespachoDetalle,
                as: 'detalles',
                attributes: ['nombre_material', 'cantidad']
              }
            ]
          },
          {
            model: NubeDevoluciones,
            as: 'devoluciones',
            attributes: ['id'],
            include: [
              {
                model: NubeDevolucionDetalle,
                as: 'detalles',
                attributes: ['nombre_material', 'cantidad']
              }
            ]
          }
        ],
        order: [['fecha', 'DESC']],
        limit: parseInt(limit),
        offset
      });

      allData = allData.concat(rows);
      await delay(100);
    }

    res.status(200).json(allData);

  } catch (error) {
    console.error('❌ Error al obtener exploraciones por fecha:', error);
    res.status(500).json({
      error: 'Error al obtener exploraciones por fecha',
      details: error.message
    });
  }
}



async function actualizarMedicionExploracion(req, res) {
    const t = await sequelize.transaction();

    try {
        const { id } = req.params;
        const { medicion } = req.body;

        // Validaciones básicas
        if (!id) {
            throw new Error('Se requiere el ID de la exploración');
        }

        if (medicion === undefined || medicion === null) {
            throw new Error('El campo medicion es requerido');
        }

        // Verificar que la exploración existe
        const exploracion = await NubeDatosTrabajoExploraciones.findByPk(id, { transaction: t });
        
        if (!exploracion) {
            throw new Error('Exploración no encontrada');
        }

        // Actualizar solo el campo medicion
        await NubeDatosTrabajoExploraciones.update(
            { medicion },
            {
                where: { id },
                transaction: t,
                fields: ['medicion'] // Solo actualiza este campo
            }
        );

        await t.commit();
        
        // Obtener el registro actualizado para devolverlo
        const exploracionActualizada = await NubeDatosTrabajoExploraciones.findByPk(id);
        
        res.status(200).json({
            message: 'Medición actualizada correctamente',
            data: {
                id: exploracionActualizada.id,
                medicion: exploracionActualizada.medicion,
                estado: exploracionActualizada.estado
            }
        });

    } catch (error) {
        await t.rollback();
        console.error('Error al actualizar medición:', error);
        
        res.status(500).json({
            error: 'Error al actualizar medición',
            details: error.message
        });
    }
}async function marcarComoUsadosEnMedicionesProgramado(req, res) {
  const t = await sequelize.transaction();

  try {
    let { ids, valor } = req.body;

    // Asegurar que 'ids' sea un array
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    if (ids.length === 0) {
      return res.status(400).json({ message: 'No se recibieron IDs para actualizar.' });
    }

    // Si no se envía un valor, se pone 1 por defecto
    const nuevoValor = typeof valor === 'number' ? valor : 1;

    // Actualizar registros
    const resultados = await NubeDatosTrabajoExploraciones.update(
      { medicion_programado: nuevoValor },
      { where: { id: ids }, transaction: t }
    );

    await t.commit();

    res.status(200).json({
      message: `Campo "medicion_programado" actualizado correctamente`,
      cantidad_actualizada: resultados[0], // número de filas afectadas
      valor_asignado: nuevoValor
    });

  } catch (error) {
    await t.rollback();
    console.error('Error en marcarComoUsadosEnMedicionesProgramado:', error);
    res.status(500).json({
      message: 'Error al actualizar los registros para medicion_programado',
      error: error.message
    });
  }
}


module.exports = { 
    crearExploracionCompleta, 
    obtenerExploracionesCompletas,
    actualizarMedicionExploracion,
    marcarComoUsadosEnMediciones,
    marcarComoUsadosEnMedicionesProgramado,
    obtenerExploracionesPorTipo,
    obtenerPorLaborCompleta,
    obtenerPorFechaCompleta
};
const sequelize = require('../config/sequelize');

async function updateEnvioAceros() {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida.');

        const [ingresoResult] = await sequelize.query(
            'UPDATE Ingreso_Aceros SET envio = 1 WHERE envio = 0 OR envio IS NULL'
        );
        console.log(`Ingreso_Aceros actualizados: ${ingresoResult.affectedRows} registros`);

        const [salidaResult] = await sequelize.query(
            'UPDATE Salidas_Aceros SET envio = 1 WHERE envio = 0 OR envio IS NULL'
        );
        console.log(`Salidas_Aceros actualizados: ${salidaResult.affectedRows} registros`);

        console.log('Actualización completada exitosamente.');
    } catch (error) {
        console.error('Error al actualizar:', error);
    } finally {
        await sequelize.close();
    }
}

updateEnvioAceros();

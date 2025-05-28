const express = require('express');
const router = express.Router();
const OperacionController = require('../../controllers/operacionLargoController');
const verificarToken = require('../../middleware/auth');

// Ruta para manejar la creación de una nueva operación
router.post('/largo', OperacionController.crearOperacionLargo);
router.put('/update-largo', OperacionController.actualizarOperacionLargo);
router.get('/largo', verificarToken, OperacionController.obtenerOperacionesLargo);

// Rutas para Operaciones Horizontales
router.post('/horizontal', OperacionController.crearOperacionHorizontal);
router.get('/horizontal', verificarToken, OperacionController.obtenerOperacionesHorizontal);
router.put('/update-horizontal', OperacionController.actualizarOperacionHorizontal);
// Rutas para Operaciones de Sostenimiento
router.post('/sostenimiento', OperacionController.crearOperacionSostenimiento);
router.put('/update-sostenimiento', OperacionController.actualizarOperacionSostenimiento);
router.get('/sostenimiento', verificarToken, OperacionController.obtenerOperacionesSostenimiento);
module.exports = router;
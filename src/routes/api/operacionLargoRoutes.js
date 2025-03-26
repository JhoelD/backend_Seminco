const express = require('express');
const router = express.Router();
const OperacionController = require('../../controllers/operacionLargoController');

// Ruta para manejar la creación de una nueva operación
router.post('/largo', OperacionController.crearOperacionLargo);
router.get('/largo', OperacionController.obtenerOperacionesLargo);

// Rutas para Operaciones Horizontales
router.post('/horizontal', OperacionController.crearOperacionHorizontal);
router.get('/horizontal', OperacionController.obtenerOperacionesHorizontal);

// Rutas para Operaciones de Sostenimiento
router.post('/sostenimiento', OperacionController.crearOperacionSostenimiento);
router.get('/sostenimiento', OperacionController.obtenerOperacionesSostenimiento);
module.exports = router;
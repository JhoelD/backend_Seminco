const express = require('express');
const router = express.Router();
const tranajoExploController = require('../../controllers/NubeDatosTrabajoExploracionesConstroller');
const verificarToken = require('../../middleware/auth');

router.post('/', verificarToken, tranajoExploController.crearExploracionCompleta);

router.get('/', verificarToken, tranajoExploController.obtenerExploracionesCompletas);

router.get('/:id', verificarToken, tranajoExploController.obtenerExploracionesCompletas);

router.put('/:id/medicion', tranajoExploController.actualizarMedicionExploracion);

module.exports = router; 
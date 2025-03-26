const express = require('express');
const router = express.Router();
const tranajoExploController = require('../../controllers/NubeDatosTrabajoExploracionesConstroller');

router.post('/', tranajoExploController.crearExploracionCompleta);

router.get('/', tranajoExploController.obtenerExploracionesCompletas);

router.get('/:id', tranajoExploController.obtenerExploracionesCompletas);

module.exports = router;
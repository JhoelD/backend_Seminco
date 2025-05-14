const express = require('express');
const router = express.Router();
const perforacionesController = require('../../controllers/perforacionesMedicionesController');
const verificarToken = require('../../middleware/auth');

router.post('/', perforacionesController.createPerforacion);
router.get('/', verificarToken, perforacionesController.getPerforaciones);
router.delete('/:id', verificarToken, perforacionesController.deletePerforacion);

module.exports = router;

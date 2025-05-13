const express = require('express');
const router = express.Router();
const perforacionesController = require('../../controllers/perforacionesMedicionesController');

router.post('/', perforacionesController.createPerforacion);
router.get('/', perforacionesController.getPerforaciones);
router.delete('/:id', perforacionesController.deletePerforacion);

module.exports = router;

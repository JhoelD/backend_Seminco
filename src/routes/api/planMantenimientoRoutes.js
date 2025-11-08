const express = require('express');
const router = express.Router();
const controller = require('../../controllers/planMantenimientoController');

router.get('/', controller.getAllPlanes);
router.get('/:id', controller.getPlanById);
router.post('/', controller.createPlan);
router.put('/:id', controller.updatePlan);
router.delete('/:id', controller.deletePlan);

module.exports = router;

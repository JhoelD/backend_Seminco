const express = require('express');
const router = express.Router();
const medicionesHorizontalController = require('../../controllers/medicionesHorizontalController');
const verificarToken = require('../../middleware/auth');

router.get('/', medicionesHorizontalController.getAllMedicionesHorizontal);

router.get('/remanente',medicionesHorizontalController.getMedicionesConRemanente);

router.get('/:id', verificarToken, medicionesHorizontalController.getMedicionHorizontalById);

router.post('/', medicionesHorizontalController.createMedicionHorizontal);

router.put('/update', medicionesHorizontalController.bulkUpdateMediciones);

router.delete('/:id', verificarToken, medicionesHorizontalController.deleteMedicionHorizontal);

module.exports = router;

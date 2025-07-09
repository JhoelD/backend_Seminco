const express = require('express');
const router = express.Router();
const medicionesHorizontalController = require('../../controllers/medicionesHorizontalController');
const verificarToken = require('../../middleware/auth');

router.get('/', medicionesHorizontalController.getAllMedicionesHorizontal);

router.get('/:id', verificarToken, medicionesHorizontalController.getMedicionHorizontalById);

router.post('/', medicionesHorizontalController.createMedicionHorizontal);

router.put('/:id', verificarToken, medicionesHorizontalController.updateMedicionHorizontal);

router.delete('/:id', medicionesHorizontalController.deleteMedicionHorizontal);

module.exports = router;

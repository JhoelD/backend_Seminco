const express = require('express');
const router = express.Router();
const medicionesLargoController = require('../../controllers/medicionesLargoController');
const verificarToken = require('../../middleware/auth');

router.get('/', medicionesLargoController.getAllMedicionesLargo);

router.get('/:id', verificarToken, medicionesLargoController.getMedicionLargoById);

router.post('/', medicionesLargoController.createMedicionLargo);

router.put('/:id', verificarToken, medicionesLargoController.updateMedicionLargo);

router.delete('/:id', verificarToken, medicionesLargoController.deleteMedicionLargo);

module.exports = router;

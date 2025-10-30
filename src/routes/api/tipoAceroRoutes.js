const express = require('express');
const router = express.Router();
const tipoAceroController = require('../../controllers/tipoAceroController');
const verificarToken = require('../../middleware/auth');

router.get('/', verificarToken, tipoAceroController.getAll);
router.get('/:id', verificarToken, tipoAceroController.getById);
router.post('/', verificarToken, tipoAceroController.create);
router.put('/:id', verificarToken, tipoAceroController.update);
router.delete('/:id', verificarToken, tipoAceroController.delete);

module.exports = router;

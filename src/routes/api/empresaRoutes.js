const express = require('express');
const router = express.Router();
const empresaController = require('../../controllers/empresaController');
const verificarToken = require('../../middleware/auth');

router.get('/', verificarToken,  empresaController.getAll);
router.post('/', verificarToken,  empresaController.create);
router.delete('/:id', verificarToken, empresaController.delete);

module.exports = router;

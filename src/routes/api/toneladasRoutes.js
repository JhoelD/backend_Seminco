const express = require('express');
const router = express.Router();
const toneladasController = require('../../controllers/toneladasController');
const verificarToken = require('../../middleware/auth');

router.get('/', verificarToken, toneladasController.getAllToneladas);

router.post('/', verificarToken, toneladasController.createTonelada);

router.put('/:id', verificarToken, toneladasController.updateTonelada);

router.delete('/:id', verificarToken, toneladasController.deleteTonelada);

module.exports = router;

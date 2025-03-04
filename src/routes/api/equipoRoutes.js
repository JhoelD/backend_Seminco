const express = require('express');
const router = express.Router();
const equipoController = require('../../controllers/equipoController');
const verificarToken = require('../../middleware/auth');

router.get('/', verificarToken,  equipoController.getAll);
router.post('/', verificarToken,  equipoController.create);

module.exports = router;

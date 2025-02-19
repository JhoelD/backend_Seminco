const express = require('express');
const router = express.Router();
const equipoController = require('../../controllers/equipoController');

router.get('/', equipoController.getAll);
router.post('/', equipoController.create);

module.exports = router;

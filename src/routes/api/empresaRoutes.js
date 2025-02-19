const express = require('express');
const router = express.Router();
const empresaController = require('../../controllers/empresaController');

router.get('/', empresaController.getAll);
router.post('/', empresaController.create);

module.exports = router;

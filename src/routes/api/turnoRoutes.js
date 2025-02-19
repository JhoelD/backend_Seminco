const express = require('express');
const router = express.Router();
const turnoController = require('../../controllers/turnoController');

router.get('/', turnoController.getAll);
router.post('/', turnoController.create);

module.exports = router;

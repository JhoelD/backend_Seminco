const express = require('express');
const router = express.Router();
const explosivoController = require('../../controllers/explosivoController');

router.get('/', explosivoController.getAllExplosivos);
router.get('/:id', explosivoController.getExplosivoById);
router.post('/', explosivoController.createExplosivo);
router.put('/:id', explosivoController.updateExplosivo);
router.delete('/:id', explosivoController.deleteExplosivo);

module.exports = router;

const express = require('express');
const router = express.Router();
const accesorioController = require('../../controllers/accesorioController');

router.get('/', accesorioController.getAllAccesorios);
router.get('/:id', accesorioController.getAccesorioById);
router.post('/', accesorioController.createAccesorio);
router.put('/:id', accesorioController.updateAccesorio);
router.delete('/:id', accesorioController.deleteAccesorio);

module.exports = router;

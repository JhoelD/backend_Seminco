const express = require('express');
const router = express.Router();
const operadorAceroController = require('../../controllers/operadorAceroController');

// GET todos
router.get('/', operadorAceroController.getAll);

// GET por ID
router.get('/:id', operadorAceroController.getById);

// POST crear
router.post('/', operadorAceroController.create);

// PUT actualizar
router.put('/:id', operadorAceroController.update);

// DELETE eliminar
router.delete('/:id', operadorAceroController.delete);

module.exports = router;

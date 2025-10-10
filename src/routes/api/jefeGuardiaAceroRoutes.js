const express = require('express');
const router = express.Router();
const jefeGuardiaAceroController = require('../../controllers/jefeGuardiaAceroController');

// GET todos
router.get('/', jefeGuardiaAceroController.getAll);

// GET por ID
router.get('/:id', jefeGuardiaAceroController.getById);

// POST crear
router.post('/', jefeGuardiaAceroController.create);

// PUT actualizar
router.put('/:id', jefeGuardiaAceroController.update);

// DELETE eliminar
router.delete('/:id', jefeGuardiaAceroController.delete);

module.exports = router;

const express = require('express');
const router = express.Router();
const procesoAceroController = require('../../controllers/procesoAceroController');

router.get('/', procesoAceroController.getAll);         // GET todos
router.get('/:id', procesoAceroController.getById);     // GET por id
router.post('/', procesoAceroController.create);        // POST nuevo
router.put('/:id', procesoAceroController.update);      // PUT actualizar
router.delete('/:id', procesoAceroController.delete);   // DELETE eliminar

module.exports = router;

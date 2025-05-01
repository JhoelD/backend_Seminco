const express = require('express');
const router = express.Router();
const metaController = require('../../controllers/meta-largoController');
const verificarToken = require('../../middleware/auth');

// Crear meta
router.post('/', verificarToken, metaController.createMetaLargo);

// Listar todas las metas
router.get('/', verificarToken, metaController.getAllMetasLargo);

// Actualizar meta
router.put('/:id', verificarToken, metaController.updateMetaLargo);

// Eliminar meta
router.delete('/:id', verificarToken, metaController.deleteMetaLargo);

module.exports = router;

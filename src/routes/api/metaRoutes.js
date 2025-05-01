const express = require('express');
const router = express.Router();
const metaController = require('../../controllers/metaController');
const verificarToken = require('../../middleware/auth');

// Crear meta
router.post('/', verificarToken, metaController.createMeta);

// Listar todas las metas
router.get('/', verificarToken, metaController.getAllMetas);

// Actualizar meta
router.put('/:id', verificarToken, metaController.updateMeta);

// Eliminar meta
router.delete('/:id', verificarToken, metaController.deleteMeta);

module.exports = router;

const express = require('express');
const router = express.Router();
const semanaController = require('../../controllers/semanaController');

// Rutas anidadas bajo empresas
router.get('/empresas/:empresa_id/semanas', semanaController.getAllSemanas);
router.get('/empresas/:empresa_id/semanas/:id', semanaController.getSemanaById);
router.post('/empresas/:empresa_id/semanas', semanaController.createSemana);
router.put('/empresas/:empresa_id/semanas/:id', semanaController.updateSemana);
router.delete('/empresas/:empresa_id/semanas/:id', semanaController.deleteSemana);

module.exports = router;
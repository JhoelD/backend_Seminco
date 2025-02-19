const express = require('express');
const verificarToken = require('../../middleware/auth');
const { 
    obtenerTodos, 
    obtenerPorId, 
    crear, 
    actualizar, 
    eliminar 
} = require('../../controllers/formatoPlanMineralController');

const router = express.Router();

// Rutas protegidas con verificarToken
router.get('/PlanMineral', verificarToken, obtenerTodos);
router.get('/PlanMineral/:id', verificarToken, obtenerPorId);
router.post('/PlanMineral', verificarToken, crear);
router.put('/PlanMineral/:id', verificarToken, actualizar);
router.delete('/PlanMineral/:id', verificarToken, eliminar);

module.exports = router;

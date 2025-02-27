const express = require('express');
const router = express.Router();


const usuariosRoutes = require('../routes/api/UsuarioRoutes');
const authRoutes = require('../routes/api/authRoutes');
const formatoPlanMineralRoutes = require('../routes/api/formatoPlanMineralRoutes');
const empresaRoutes = require('../routes/api/empresaRoutes');
const equipoRoutes = require('../routes/api/equipoRoutes');
const turnoRoutes = require('../routes/api/turnoRoutes');
const estadoRoutes = require('../routes/api/estadoRoutes');
const PlamMensual = require('../routes/api/planMensualRoutes');


router.use('/usuarios', usuariosRoutes);  
router.use('/auth', authRoutes);  
router.use('/PlanMineral', formatoPlanMineralRoutes); 
router.use('/Empresa', empresaRoutes);  
router.use('/Equipo', equipoRoutes);  
router.use('/Turno', turnoRoutes);  
router.use('/estado', estadoRoutes);  
router.use('/PlamMensual', PlamMensual);  

module.exports = router;

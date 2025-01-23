const express = require('express');
const router = express.Router();


const usuariosRoutes = require('../routes/api/UsuarioRoutes');
const authRoutes = require('../routes/api/authRoutes');


router.use('/usuarios', usuariosRoutes);  
router.use('/auth', authRoutes);  

module.exports = router;

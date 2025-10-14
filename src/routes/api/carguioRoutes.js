const express = require('express');
const router = express.Router();
const carguioController = require('../../controllers/carguioController');

// POST: recibir datos desde Flutter
router.post('/', carguioController.createCarguioData);

// GET: obtener todo
router.get('/', carguioController.getAllCarguioData);

module.exports = router;

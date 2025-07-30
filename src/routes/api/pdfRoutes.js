// routes/pdfRoutes.js
const express = require('express');
const router = express.Router();
const pdfController = require('../../controllers/pdfController');

router.get('/', pdfController.getPdfs);
router.post('/', pdfController.createPdf);
router.put('/:id', pdfController.updatePdf);
router.delete('/:id', pdfController.deletePdf);
router.get('/mes/:mes', pdfController.getPdfsPorMes);

module.exports = router;

const express = require('express');
const router = express.Router();
const destinatarioController = require('../../controllers/destinatarioCorreoController');

router.get('/', destinatarioController.getAllDestinatarios);
router.get('/:id', destinatarioController.getDestinatarioById);
router.post('/', destinatarioController.createDestinatario);
router.put('/:id', destinatarioController.updateDestinatario);
router.delete('/:id', destinatarioController.deleteDestinatario);

module.exports = router;

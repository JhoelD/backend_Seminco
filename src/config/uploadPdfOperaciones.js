const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pdf-operaciones',
    resource_type: 'auto', // <-- CAMBIAR AQUÍ
    format: async (req, file) => 'pdf',
    public_id: (req, file) => `pdf_operacion_${Date.now()}`
  }
});


const uploadPdf = multer({ storage });

module.exports = uploadPdf;

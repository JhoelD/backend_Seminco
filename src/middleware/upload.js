const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Asegurar que la carpeta 'firmas' exista
const firmasPath = path.join(__dirname, '../config/firmas');
if (!fs.existsSync(firmasPath)) {
    fs.mkdirSync(firmasPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, firmasPath); // Guarda las imágenes en la carpeta correcta
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        return cb(new Error('Solo se permiten archivos de imagen (JPEG, JPG, PNG)'));
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB por archivo
});

module.exports = upload;

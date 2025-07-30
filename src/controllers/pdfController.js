const Pdf = require('../models/Pdf');
const cloudinary = require('../config/cloudinary');
const uploadPdf = require('../config/uploadPdfOperaciones');
const verificarToken = require('../middleware/auth');

// GET - Obtener todos los registros
exports.getPdfs = [
    verificarToken,
    async (req, res) => {
        try {
            const pdfs = await Pdf.findAll({ order: [['createdAt', 'DESC']] });
            res.json(pdfs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los PDF' });
        }
    }
];

// POST - Crear PDF
exports.createPdf = [
  verificarToken,
  uploadPdf.single('archivo'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Debe subir un archivo PDF' });
    }

    const pdfUrl = req.file.secure_url || req.file.path || req.file.url;

    if (!pdfUrl) {
      return res.status(500).json({ error: 'No se pudo obtener la URL del archivo subido' });
    }

    try {
      const nuevoPdf = await Pdf.create({
        proceso: req.body.proceso,
        mes: req.body.mes,
        url_pdf: pdfUrl
      });

      res.status(201).json({ message: 'PDF subido correctamente', pdf: nuevoPdf });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al guardar el PDF' });
    }
  }
];


// PUT - Actualizar un PDF
exports.updatePdf = [
    verificarToken,
    uploadPdf.single('archivo'),
    async (req, res) => {
        const { id } = req.params;
        const { proceso, mes } = req.body;

        try {
            const pdf = await Pdf.findByPk(id);
            if (!pdf) {
                return res.status(404).json({ error: 'PDF no encontrado' });
            }

            let nuevaUrl = pdf.url_pdf;

            // Si hay un nuevo archivo, subimos y eliminamos el anterior
            if (req.file) {
                nuevaUrl = req.file.path;

                // Eliminar PDF anterior de Cloudinary
                const partes = pdf.url_pdf.split('/');
                const publicIdConExt = partes.pop();
                const publicId = publicIdConExt.split('.')[0];

                await cloudinary.uploader.destroy(`pdf-operaciones/${publicId}`);
            }

            await pdf.update({
                proceso,
                mes,
                url_pdf: nuevaUrl
            });

            res.json({ message: 'PDF actualizado correctamente', pdf });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el PDF' });
        }
    }
];


// GET - Obtener PDFs filtrados por mes
exports.getPdfsPorMes = [
    verificarToken,
    async (req, res) => {
        const { mes } = req.params;

        try {
            const pdfs = await Pdf.findAll({
                where: { mes: mes.toUpperCase() },
                order: [['createdAt', 'DESC']]
            });

            res.json(pdfs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al filtrar los PDFs por mes' });
        }
    }
];

// DELETE - Eliminar PDF
exports.deletePdf = [
    verificarToken,
    async (req, res) => {
        try {
            const pdf = await Pdf.findByPk(req.params.id);
            if (!pdf) return res.status(404).json({ error: 'PDF no encontrado' });

            // Extrae public_id desde secure_url (ej: "v1753791826/pdf-operaciones/pdf_operacion_1753791825409")
            const publicId = pdf.url_pdf
                .split('/')
                .slice(-2) // Toma los últimos 2 segmentos
                .join('/')
                .replace(/\..+$/, ''); // Elimina la extensión

            await cloudinary.uploader.destroy(publicId, {
                resource_type: 'raw' // 👈 Especifica que es un archivo raw
            });

            await pdf.destroy();
            res.json({ message: 'PDF eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el PDF' });
        }
    }
];

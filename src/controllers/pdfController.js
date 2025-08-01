const Pdf = require('../models/Pdf');
const cloudinary = require('../config/cloudinary');
const uploadPdf = require('../config/uploadPdfOperaciones');
const verificarToken = require('../middleware/auth');
const sequelize = require('../config/sequelize');

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
        tipo_labor: req.body.tipo_labor,
        labor: req.body.labor,
        ala: req.body.ala,
        url_pdf: pdfUrl
      });

      res.status(201).json({ 
        message: 'PDF subido correctamente', 
        pdf: nuevoPdf 
      });
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
        const { proceso, mes, tipo_labor, labor, ala } = req.body;

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
                tipo_labor,
                labor,
                ala,
                url_pdf: nuevaUrl
            });

            res.json({ 
              message: 'PDF actualizado correctamente', 
              pdf 
            });
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

// DELETE - Eliminar PDF (Versión Final Funcional)
exports.deletePdf = [
  verificarToken,
  async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const pdf = await Pdf.findByPk(req.params.id, { transaction: t });
      if (!pdf) {
        await t.rollback();
        return res.status(404).json({ error: 'PDF no encontrado' });
      }

      const url = pdf.url_pdf;
      console.log('URL completa del PDF:', url);

      // Extracción mejorada del public_id
      const publicId = extractCloudinaryPublicId(url);
      console.log('Public ID extraído:', publicId);

      if (publicId) {
        try {
          // Intento principal de eliminación
          const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: 'raw',
            invalidate: true,
            type: 'upload' // Asegura que busca en uploads
          });
          
          console.log('Resultado de Cloudinary:', result);

          if (result.result !== 'ok') {
            // Intento alternativo con la versión (v1754075631)
            const versionMatch = url.match(/\/upload\/(v\d+)\//);
            if (versionMatch) {
              const version = versionMatch[1];
              const versionedId = `${version}/${publicId}`;
              console.log('Intentando con versión:', versionedId);
              
              const versionedResult = await cloudinary.uploader.destroy(versionedId, {
                resource_type: 'raw'
              });
              console.log('Resultado con versión:', versionedResult);
            }
          }
        } catch (cloudError) {
          console.error('Error en Cloudinary:', cloudError.message);
        }
      }

      await pdf.destroy({ transaction: t });
      await t.commit();
      
      res.json({
        success: true,
        message: 'Registro eliminado de la base de datos',
        cloudinaryDeleted: publicId ? `Se intentó eliminar: ${publicId}` : 'No se pudo extraer public_id'
      });

    } catch (error) {
      await t.rollback();
      console.error('Error en el proceso:', error);
      res.status(500).json({ 
        error: 'Error al eliminar el registro',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
];

// Función mejorada para extraer public_id
function extractCloudinaryPublicId(url) {
  try {
    if (!url) return null;
    
    // Para URLs de Cloudinary estándar
    const cloudinaryRegex = /\/upload\/(?:v\d+\/)?(.+?)\.pdf$/i;
    const matches = url.match(cloudinaryRegex);
    
    if (matches && matches[1]) {
      return matches[1];
    }
    
    // Para otros formatos
    const fileName = url.split('/').pop()?.split('.')[0];
    return fileName ? `pdf-operaciones/${fileName}` : null;
  } catch (error) {
    console.error('Error extrayendo public_id:', error);
    return null;
  }
}
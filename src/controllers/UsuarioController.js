const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const db = require('../config/db');
const verificarToken = require('../middleware/auth');
const upload = require('../config/upload');

exports.obtenerUsuarios = [verificarToken, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM usuarios');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
}];

exports.obtenerUsuarioPorId = [verificarToken, async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
}];

exports.crearUsuario = [
    verificarToken,
    upload.single('firma'), // Usa Cloudinary
    async (req, res) => {
        try {
            const {
                codigo_dni, apellidos, nombres, cargo = null, rol = null, area = null,
                clasificacion = null, empresa = null, guardia = null,
                autorizado_equipo = null, correo = null, password
            } = req.body;

            const firma = req.file ? req.file.path : null; // URL de Cloudinary

            const [existingUser] = await db.query('SELECT * FROM usuarios WHERE codigo_dni = ?', [codigo_dni]);
            if (existingUser.length > 0) return res.status(400).json({ error: 'El usuario ya existe con este DNI' });

            if (correo) {
                const [existingEmail] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
                if (existingEmail.length > 0) return res.status(400).json({ error: 'El correo ya está en uso' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await db.query(
                `INSERT INTO usuarios (codigo_dni, apellidos, nombres, cargo, rol, area, clasificacion, empresa, guardia, autorizado_equipo, correo, password, firma, createdAt, updatedAt) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                [codigo_dni, apellidos, nombres, cargo, rol, area, clasificacion, empresa, guardia, autorizado_equipo, correo, hashedPassword, firma]
            );

            res.status(201).json({ message: 'Usuario creado exitosamente', firma });
        } catch (error) {
            console.error('Error al crear el usuario:', error.message);
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    }
];


exports.actualizarUsuario = [
    verificarToken,
    upload.single('firma'),
    async (req, res) => {
        const { id } = req.params;
        const { codigo_dni, apellidos, nombres, cargo, empresa, rol, guardia, autorizado_equipo, correo, password } = req.body;
        const firma = req.file ? req.file.path : null; // URL de Cloudinary

        try {
            const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

            let query = `UPDATE usuarios SET codigo_dni = ?, apellidos = ?, nombres = ?, cargo = ?, rol = ?, empresa = ?, guardia = ?, autorizado_equipo = ?, correo = ?, updatedAt = NOW()`;
            const queryParams = [codigo_dni, apellidos, nombres, cargo, rol, empresa, guardia, autorizado_equipo, correo];

            if (firma) {
                // **Eliminar la firma anterior de Cloudinary**
                if (rows[0].firma) {
                    const firmaUrl = rows[0].firma;
                    const publicId = firmaUrl.split('/').pop().split('.')[0]; // Obtener el public_id de Cloudinary
                    await cloudinary.uploader.destroy(`firmas/${publicId}`);
                }

                query += `, firma = ?`;
                queryParams.push(firma);
            }

            if (password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                query += `, password = ?`;
                queryParams.push(hashedPassword);
            }

            query += ` WHERE id = ?`;
            queryParams.push(id);

            await db.query(query, queryParams);

            res.status(200).json({ message: 'Usuario actualizado exitosamente', firma });
        } catch (error) {
            console.error('Error al actualizar el usuario:', error.message);
            res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
    }
];


exports.eliminarUsuario = [verificarToken, async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

        // **Eliminar firma en Cloudinary**
        if (rows[0].firma) {
            const firmaUrl = rows[0].firma;
            const publicId = firmaUrl.split('/').pop().split('.')[0]; // Obtener el public_id de Cloudinary
            await cloudinary.uploader.destroy(`firmas/${publicId}`);
        }

        await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error.message);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
}];


exports.obtenerPerfil = [verificarToken, async (req, res) => {
    try {
        const { id } = req.user;

        const [rows] = await db.query(
            'SELECT id, codigo_dni, apellidos, nombres, cargo, rol, empresa, guardia, autorizado_equipo, correo, firma FROM usuarios WHERE id = ?',
            [id]
        );

        if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al obtener perfil del usuario:', error.message);
        res.status(500).json({ error: 'Error al obtener perfil del usuario' });
    }
}];


exports.actualizarFirma = [
    verificarToken,
    upload.single('firma'),
    async (req, res) => {
        const { id } = req.params;

        try {
            console.log(`Iniciando actualización de firma para el usuario con ID: ${id}`);

            // Verificar si el usuario existe
            const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            if (rows.length === 0) {
                console.warn(`Usuario con ID ${id} no encontrado.`);
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            // Verificar si se subió un archivo
            if (!req.file) {
                console.warn('No se subió ninguna firma.');
                return res.status(400).json({ error: 'Debe subir una firma' });
            }

            console.log('Archivo subido:', req.file);

            const firmaUrl = req.file.path; // URL de Cloudinary
            console.log(`Nueva firma subida: ${firmaUrl}`);

            // **Eliminar la firma anterior en Cloudinary**
            if (rows[0].firma) {
                try {
                    const urlPartes = rows[0].firma.split('/');
                    const publicIdConExt = urlPartes.pop(); // Última parte de la URL (puede incluir extensión)
                    const publicId = publicIdConExt.split('.')[0]; // Eliminar la extensión
                    
                    console.log(`Eliminando firma anterior con public_id: firmas/${publicId}`);
                    await cloudinary.uploader.destroy(`firmas/${publicId}`);
                    console.log('Firma anterior eliminada correctamente.');
                } catch (err) {
                    console.error('Error al eliminar la firma anterior:', err.message);
                }
            }

            // **Actualizar la firma en la base de datos**
            await db.query(
                'UPDATE usuarios SET firma = ?, updatedAt = NOW() WHERE id = ?',
                [firmaUrl, id]
            );

            console.log('Firma actualizada correctamente en la base de datos.');

            res.status(200).json({ message: 'Firma actualizada exitosamente', firma: firmaUrl });
        } catch (error) {
            console.error('Error al actualizar la firma:', error);
            res.status(500).json({ error: 'Error al actualizar la firma' });
        }
    }
];

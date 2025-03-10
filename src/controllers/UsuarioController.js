const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const db = require('../config/db');
const verificarToken = require('../middleware/auth');
const upload = require('../middleware/upload');

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
    upload.single('firma'),
    async (req, res) => {
        try {
            const {
                codigo_dni, apellidos, nombres, cargo = null, area = null,
                clasificacion = null, empresa = null, guardia = null,
                autorizado_equipo = null, correo = null, password
            } = req.body;

            const firma = req.file ? `/firmas/${req.file.filename}` : null;

            const [existingUser] = await db.query('SELECT * FROM usuarios WHERE codigo_dni = ?', [codigo_dni]);
            if (existingUser.length > 0) return res.status(400).json({ error: 'El usuario ya existe con este DNI' });

            if (correo) {
                const [existingEmail] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
                if (existingEmail.length > 0) return res.status(400).json({ error: 'El correo ya está en uso' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await db.query(
                `INSERT INTO usuarios (codigo_dni, apellidos, nombres, cargo, area, clasificacion, empresa, guardia, autorizado_equipo, correo, password, firma, createdAt, updatedAt) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                [codigo_dni, apellidos, nombres, cargo, area, clasificacion, empresa, guardia, autorizado_equipo, correo, hashedPassword, firma]
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
        const { codigo_dni, apellidos, nombres, cargo, empresa, guardia, autorizado_equipo, correo, password } = req.body;
        const firma = req.file ? `/firmas/${req.file.filename}` : null;

        try {
            const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

            let query = `UPDATE usuarios SET codigo_dni = ?, apellidos = ?, nombres = ?, cargo = ?, empresa = ?, guardia = ?, autorizado_equipo = ?, correo = ?, updatedAt = NOW()`;
            const queryParams = [codigo_dni, apellidos, nombres, cargo, empresa, guardia, autorizado_equipo, correo];

            if (firma) {
                // **Eliminar firma anterior**
                if (rows[0].firma) {
                    const firmaPath = path.join(__dirname, '../config' + rows[0].firma);
                    if (fs.existsSync(firmaPath)) {
                        fs.unlinkSync(firmaPath);
                    }
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

        // **Eliminar firma asociada**
        if (rows[0].firma) {
            const firmaPath = path.join(__dirname, '../config' + rows[0].firma);
            if (fs.existsSync(firmaPath)) {
                fs.unlinkSync(firmaPath);
            }
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
            'SELECT id, codigo_dni, apellidos, nombres, cargo, empresa, guardia, autorizado_equipo, correo, firma FROM usuarios WHERE id = ?',
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
            // Verificar si el usuario existe
            const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            // Verificar si se subió un archivo
            if (!req.file) {
                return res.status(400).json({ error: 'Debe subir una firma' });
            }

            const firma = `/uploads/firmas/${req.file.filename}`; // Ruta de la firma

            // Actualizar solo la firma en la base de datos
            await db.query(
                'UPDATE usuarios SET firma = ?, updatedAt = NOW() WHERE id = ?',
                [firma, id]
            );

            res.status(200).json({ message: 'Firma actualizada exitosamente', firma });
        } catch (error) {
            console.error('Error al actualizar la firma:', error.message);
            res.status(500).json({ error: 'Error al actualizar la firma' });
        }
    }
];


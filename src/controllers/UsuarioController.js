const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const verificarToken = require('../middleware/auth'); 


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
    verificarToken, // Asegura que se está enviando un token válido
    async (req, res) => {
        const { codigo_dni, apellidos, nombres, cargo, empresa, guardia, autorizado_equipo, correo, password } = req.body;

        try {
            // Verifica si el usuario ya existe por correo o DNI en lugar de contar toda la tabla
            const [existingUsers] = await db.query('SELECT * FROM usuarios WHERE correo = ? OR codigo_dni = ?', [correo, codigo_dni]);
            if (existingUsers.length > 0) {
                return res.status(400).json({ error: 'El usuario ya existe' });
            }

            // Encripta la contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Inserta el usuario
            const [result] = await db.query(
                'INSERT INTO usuarios (codigo_dni, apellidos, nombres, cargo, empresa, guardia, autorizado_equipo, correo, password, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
                [codigo_dni, apellidos, nombres, cargo, empresa, guardia, autorizado_equipo, correo, hashedPassword]
            );            

            res.status(201).json({ message: 'Usuario creado exitosamente' });
        } catch (error) {
            console.error('Error al crear el usuario:', error.message);
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    }
];



exports.actualizarUsuario = [verificarToken, async (req, res) => {
    const { id } = req.params;
    const { codigo_dni, apellidos, nombres, cargo, empresa, guardia, autorizado_equipo, correo, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        let hashedPassword = password;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        await db.query(
            'UPDATE usuarios SET codigo_dni = ?, apellidos = ?, nombres = ?, cargo = ?, empresa = ?, guardia = ?, autorizado_equipo = ?, correo = ?, password = ? WHERE id = ?',
            [codigo_dni, apellidos, nombres, cargo, empresa, guardia, autorizado_equipo, correo, hashedPassword, id]
        );
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error.message);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
}];


exports.eliminarUsuario = [verificarToken, async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
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
        const { id } = req.user; // Extrae el ID del usuario desde el token

        const [rows] = await db.query(
            'SELECT id, codigo_dni, apellidos, nombres, cargo, empresa, guardia, autorizado_equipo, correo, password FROM usuarios WHERE id = ?', 
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(rows[0]); // Devuelve los datos del usuario, incluyendo el hash de la contraseña
    } catch (error) {
        console.error('Error al obtener perfil del usuario:', error.message);
        res.status(500).json({ error: 'Error al obtener perfil del usuario' });
    }
}];

const pool = require('../db');
const bcrypt = require('bcrypt');

// Registrar usuario
exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
    // Verificar si ya existe
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
        return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert db
    const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
        [email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
    }
};

// login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
        return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // generar token JWT

    res.json({ message: 'Login exitoso', user: { id: user.id, email: user.email } });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
    }
};

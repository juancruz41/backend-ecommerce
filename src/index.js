const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'admin',
  host: 'dpg-d038d1ruibrs738578dg-a',
  database: 'ecommercebackendbd',
  password: 'gVOTfd6qSboZ5PrrkqxNQPSF9hdaAKY0',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

// Endpoint test
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: '✅ Conexión exitosa', hora: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: '❌ Error al conectar', error: err.message });
  }
});

// server up 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


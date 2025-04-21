const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//prueba
app.get('/', (req, res) => {
  res.send('E-commerce Backend running ✅');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

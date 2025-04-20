const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('E-commerce backend running ✅');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

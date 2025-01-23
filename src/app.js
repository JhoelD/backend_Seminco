const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');

app.use(cors());

app.use(bodyParser.json());

app.use('/api', routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

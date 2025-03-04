const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { sequelize } = require('./config/sequelize'); // Importar la instancia de Sequelize
const { exec } = require('child_process');

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

const port = 3000;

// Ejecutar migraciones antes de iniciar el servidor
exec('npx sequelize-cli db:migrate', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error ejecutando migraciones: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Salida de error en migraciones: ${stderr}`);
  }
  console.log(`Migraciones ejecutadas:\n${stdout}`);

  // Iniciar el servidor solo después de las migraciones
  app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://10.0.2.2:${port}`);
  });
});

require('dotenv').config();

const express = require("express");
const cors = require('cors')

const { dbConnection } = require("./database/config");

// Crea el servidor de express
const app = express();

// Cofigurar los cors
app.use(cors())

// Base de datos
dbConnection();

// Lectura y parseo de los datos
app.use( express.json() );

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/login', require('./routes/auth.route'));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto 3000 -> ", 3000);
});

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

// Rutas
app.get("/", (req, res) => {
  res.json({
    data: "sucess",
    msg: "Hola mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto 3000 -> ", 3000);
});

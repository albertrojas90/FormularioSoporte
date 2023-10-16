const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

const pool = new Pool({
  user:'albertrojas',
  host:'localhost',
  database:'usuariosads',
  password:'ciudad',
  port: 5432,
});

app.use(bodyParser.json());
app.use(cors()); 

app.post('/guardar-datos', (req, res) => {
  const { nombreCompleto, nombreEmpresa, correo, telefono, categoria, mensaje } = req.body;

  const query = 'INSERT INTO datossoporte (nombre_completo, nombre_empresa, correo, telefono, categoria, mensaje) VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [nombreCompleto, nombreEmpresa, correo, telefono, categoria, mensaje];

  pool.query(query, values, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al guardar los datos' });
    } else {
      res.status(201).json({ message: 'Datos guardados correctamente' });
    }
  });
});
app.get('/prueba', (req, res) => {
    res.status(201).json({ message: 'Hola desde la API' });
  });

app.listen(port, () => {
  console.log(`API en ejecución en http://localhost:${port}`);
});
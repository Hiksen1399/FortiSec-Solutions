const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT); // Esto imprimirá todas las variables de entorno para verificar que estén cargadas

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos MySQL usando variables de entorno
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos MySQL:', err);
        process.exit(1);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

// Endpoint para agregar un nuevo correo electrónico
app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    const query = 'INSERT INTO subscribers (email) VALUES (?)';

    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Error al suscribir el correo electrónico:', err);
            res.status(500).json({ error: 'Error al suscribir el correo electrónico' });
        } else {
            res.status(200).json({ message: 'Correo electrónico suscrito con éxito' });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

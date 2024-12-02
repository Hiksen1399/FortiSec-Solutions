const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto'); // Para cifrado
const validator = require('validator'); // Para validación de correos electrónicos
const winston = require('winston'); // Logger
require('dotenv').config();

// Configuración de Logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console() // Muestra logs en la terminal
    ]
});

// Validar la clave secreta para cifrado
const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
    logger.error('SECRET_KEY no está definida en .env');
    process.exit(1); // Detiene el servidor si no hay SECRET_KEY
}

function encrypt(text) {
    const iv = crypto.randomBytes(16); // Vector de inicialización
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`; // Almacena IV junto con los datos cifrados
}

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);

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
        logger.error('Error al conectar a la base de datos MySQL:', err);
        process.exit(1);
    } else {
        logger.info('Conectado a la base de datos MySQL');
    }
});

// Endpoint para agregar un nuevo correo electrónico
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email) {
        logger.error('El campo "email" está vacío');
        return res.status(400).json({ error: 'El campo "email" es requerido' });
    }

    if (!validator.isEmail(email)) {
        logger.error(`Correo inválido recibido: ${email}`);
        return res.status(400).json({ error: 'Correo electrónico inválido' });
    }

    const encryptedEmail = encrypt(email);
    logger.info(`Correo cifrado: ${encryptedEmail}`);

    const query = 'INSERT INTO subscribers (email) VALUES (?)';

    db.query(query, [encryptedEmail], (err, result) => {
        if (err) {
            logger.error('Error al suscribir el correo electrónico:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        logger.info(`Correo electrónico suscrito con éxito: ${email}`);
        res.status(200).json({ message: 'Correo electrónico suscrito con éxito' });
    });
});

// Iniciar el servidor HTTP
app.listen(port, () => {
    logger.info(`Servidor HTTP ejecutándose en http://localhost:${port}`);
});

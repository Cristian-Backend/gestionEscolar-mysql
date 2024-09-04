require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

const PORT = process.env.PORT || 3000;
const DB_USER = process.env.MYSQLUSER || process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || 'saionara123';
const DB_HOST = process.env.MYSQLHOST || process.env.DB_HOST || 'localhost';
const DB_DATABASE = process.env.MYSQLDATABASE || process.env.DB_DATABASE || 'gestionEscolar';
const DB_PORT = process.env.MYSQLPORT || process.env.DB_PORT || 3306;

module.exports = {
    PORT,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_DATABASE,
    DB_PORT
};

const express = require('express');
require('dotenv').config();
const conexionDB = require('./src/database/db');
const estudiantesRouter = require('./src/routes/estudiantes.routes');
const profesoresRouter = require('./src/routes/profesores.routes')
const cursosRouter = require('./src/routes/cursos.routes')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// rutas
app.use('/api', estudiantesRouter);
app.use('/api', profesoresRouter);
app.use('/api', cursosRouter);


// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).send('Ruta no encontrada');
});


// Conectar a la base de datos antes de iniciar el servidor
conexionDB().then(() => {
    app.listen(port, () => {
        console.log(`Servidor iniciado en el puerto ${port}`);
    });
}).catch(error => {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);  // Salir del proceso si no se puede conectar a la base de datos
});

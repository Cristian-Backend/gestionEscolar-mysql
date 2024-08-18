const conexionPromesa = require('../database/db')
const moment = require('moment'); 


// obtener estudiantes.
const getStudents = async (req, res) => { 
    try {
        const conect = await conexionPromesa();
        const [rows] = await conect.query('SELECT * FROM estudiantes');
        res.json(rows);
        
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    
        
    }
}

// obtener estudiante por id.

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const conect = await conexionPromesa();
        const [row] = await conect.query('SELECT * FROM estudiantes WHERE id = ?', [id]);
        
        if (!row) { // si la fila no existe
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        
        res.json(row);
        
    } catch (error) {
        console.error('Error al obtener estudiante por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}


// crear estudiante.



const createStudent = async (req, res) => {
    try {
        const { nombre, apellido, telefono, email, direccion, fecha_nacimiento } = req.body;

        // Validación de campos necesarios
        if (!nombre || !apellido || telefono || !email ) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Convertir la fecha al formato YYYY-MM-DD
        const formattedDate = moment(fecha_nacimiento, 'DD/MM/YYYY').format('YYYY-MM-DD');

        // Conexión a la base de datos
        const conect = await conexionPromesa();

        // Inserción de datos en la base de datos
        await conect.query(
            'INSERT INTO estudiantes (nombre, apellido, telefono, email, direccion, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, apellido, telefono, email, direccion, formattedDate]
        );

        res.status(201).json({ message: 'Estudiante creado exitosamente' });

    } catch (error) {
        console.error('Error al crear estudiante:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}





const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido,  telefono, email, direccion, fecha_nacimiento } = req.body;

    try {
        // Conexión a la base de datos
        const conexion = await conexionPromesa();

        // Actualizar el estudiante con los datos proporcionados, dejando los valores originales si no se actualizan
        const [result] = await conexion.query(
            'UPDATE estudiantes SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido),  telefono = IFNULL(?, telefono), email = IFNULL(?, email), direccion = IFNULL(?, direccion), fecha_nacimiento = IFNULL(?, fecha_nacimiento) WHERE id = ?',
            [nombre, apellido,  telefono, email, direccion, fecha_nacimiento, id]
        );

        // Verifica cuántas filas fueron afectadas
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        // Consulta para obtener el estudiante actualizado
        const [rows] = await conexion.query('SELECT * FROM estudiantes WHERE id = ?', [id]);

        // Devuelve el estudiante actualizado
        res.json(rows[0]);

    } catch (error) {
        console.error('Error al actualizar el estudiante:', error);
        return res.status(500).json({
            message: "Lo sentimos, ha ocurrido un error interno en el servidor al intentar procesar tu solicitud."
        });
    }
};




const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        // Conexión a la base de datos
        const conexion = await conexionPromesa();

        // Eliminar el estudiante basado en el ID
        const [result] = await conexion.query('DELETE FROM estudiantes WHERE id = ?', [id]);

        // Verifica cuántas filas fueron afectadas
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        res.status(200).json({ message: "Estudiante eliminado exitosamente" });

    } catch (error) {
        console.error('Error al eliminar el estudiante:', error);
        return res.status(500).json({
            message: "Lo sentimos, ha ocurrido un error interno en el servidor al intentar procesar tu solicitud."
        });
    }
};


module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
 };

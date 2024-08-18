
const conexionPromesa = require('../database/db')
const moment = require('moment'); 

// obtener profesores.
const getTeacher = async (req, res) => { 
    try {
        const conect = await conexionPromesa();
        const [rows] = await conect.query('SELECT * FROM profesores');
        res.json(rows);
        
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    
        
    }
}

// obtener profesor por id.
const getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;
        const conect = await conexionPromesa();
        const [row] = await conect.query('SELECT * FROM profesores WHERE id = ?', [id]);
        
        if (!row) { // si la fila no existe
            return res.status(404).json({ message: 'Profesor no encontrado'});
        }
        
        res.json(row);
        
    } catch (error) {
        console.error('Error al obtener profesor por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// crear profesor.
const createTeacher = async (req, res) => {
    try {
        const { nombre, apellido, telefono, email, direccion, fecha_nacimiento, especialidad } = req.body;

        // Validación de campos necesarios
        if (!nombre || !apellido || !telefono || !email || !especialidad) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Verificar y convertir la fecha al formato YYYY-MM-DD
        if (!fecha_nacimiento || !moment(fecha_nacimiento, 'DD/MM/YYYY', true).isValid()) {
            return res.status(400).json({ message: 'Fecha de nacimiento inválida' });
        }

        const formattedDate = moment(fecha_nacimiento, 'DD/MM/YYYY').format('YYYY-MM-DD');

        // Conexión a la base de datos
        const conect = await conexionPromesa();

        // Inserción de datos en la base de datos
        await conect.query(
            'INSERT INTO profesores (nombre, apellido, telefono, email, direccion, fecha_nacimiento, especialidad) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nombre, apellido, telefono, email, direccion, formattedDate, especialidad]
        );

        res.status(201).json({ message: 'Profesor creado exitosamente' } ,);

    } catch (error) {
        console.error('Error al crear profesor:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// actualizar profesor.
const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, email, direccion, fecha_nacimiento, especialidad } = req.body;

    try {
        // Conexión a la base de datos
        const conexion = await conexionPromesa();

        // Actualizar el estudiante con los datos proporcionados, dejando los valores originales si no se actualizan
        const [result] = await conexion.query(
            'UPDATE profesores SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), telefono = IFNULL(?, telefono), email = IFNULL(?, email), direccion = IFNULL(?, direccion), fecha_nacimiento = IFNULL(?, fecha_nacimiento), especialidad = IFNULL(?, especialidad) WHERE id = ?',
            [nombre, apellido, telefono, email, direccion, fecha_nacimiento, especialidad, id]
        );

        // Verifica cuántas filas fueron afectadas
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Profesor no encontrado" });
        }

        // Consulta para obtener el estudiante actualizado
        const [rows] = await conexion.query('SELECT * FROM profesores WHERE id = ?', [id]);

        // Devuelve el estudiante actualizado
        res.json(rows[0]);

    } catch (error) {
        console.error('Error al actualizar el profesor:', error);
        return res.status(500).json({
            message: "Lo sentimos, ha ocurrido un error interno en el servidor al intentar procesar tu solicitud."
        });
    }
};


// eliminar profesor.
const deleteTeacher = async (req,res) => {
    const {id} = req.params;
    try {
        const conexion = await conexionPromesa();
        const [result] = await conexion.query('DELETE FROM profesores WHERE id =?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }

        res.status(200).json({ message: 'Profesor eliminado exitosamente' });

    } catch (error) {
         console.error('Error al eliminar el profesor:', message.error);
        res.status(500).json({ message: 'Error interno del servidor' });  // Error interno del servidor.
    }
}



module.exports = {
    getTeacher,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher,
}
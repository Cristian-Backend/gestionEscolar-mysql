const conexionPromesa = require('../database/db')
const moment = require('moment'); 

// obtener cursos
const getCourses = async (req, res) => { 
    try {
        const conect = await conexionPromesa();
        const [rows] = await conect.query('SELECT * FROM cursos');
        res.json(rows);
        
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    
        
    }
}

//obtener cursos por id
const getCourseById = async (req, res) => { 
    const { id } = req.params;
    try {
        const conect = await conexionPromesa();
        const [rows] = await conect.query('SELECT * FROM cursos WHERE id = ?', [id]);
        if(rows.length === 0) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        res.json(rows[0]);
        
    } catch (error) {
        console.error('Error al obtener curso por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}


//crear cursos

const createCourse = async (req, res) => {
    
    const { nombre, descripcion, profesor_id, codigo_curso, duracion, fecha_inicio, fecha_fin, horario, aula, nivel , requisitos } = req.body;
    
    if (!nombre || !descripcion || !profesor_id || !codigo_curso || !duracion || !fecha_inicio || !fecha_fin || !aula || !nivel || !requisitos) {
       
       // PARA SABER ue campos faltantes faltarian.
       const campos = {
        nombre,
        descripcion,
        profesor_id,
        codigo_curso,
        duracion,
        fecha_inicio,
        fecha_fin,
        aula,
        nivel,
        requisitos
    };
    
    const camposFaltantes = Object.keys(campos).filter(campo => !campos[campo]);
    
    if (camposFaltantes.length > 0) {
        return res.status(400).json({ 
            message: 'Faltan datos obligatorios', 
            camposFaltantes 
        });
    }
    
    }
    
    try {
        const conect = await conexionPromesa();
    
        
        await conect.query('INSERT INTO cursos (nombre, descripcion, profesor_id, codigo_curso, duracion, fecha_inicio, fecha_fin , horario, aula, nivel, requisitos) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [nombre, descripcion,profesor_id, codigo_curso, duracion, fecha_inicio, fecha_fin,horario, aula, nivel, requisitos]);
        
        res.status(201).json({ message: 'Curso creado exitosamente' });

    } catch (error) {
        console.error('Error al crear curso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}


// actualizar cursos
const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, profesor_id, codigo_curso, duracion, fecha_inicio, fecha_fin, horario, aula, nivel, requisitos } = req.body;

    try {
        const conect = await conexionPromesa();

        const [result] = await conect.query(
            'UPDATE cursos SET nombre = IFNULL(?, nombre), descripcion = IFNULL(?, descripcion), profesor_id = IFNULL(?, profesor_id), codigo_curso = IFNULL(?, codigo_curso), duracion = IFNULL(?, duracion), fecha_inicio = IFNULL(?, fecha_inicio), fecha_fin = IFNULL(?, fecha_fin), horario = IFNULL(?, horario), aula = IFNULL(?, aula), nivel = IFNULL(?, nivel), requisitos = IFNULL(?, requisitos) WHERE id = ?',
            [nombre, descripcion, profesor_id, codigo_curso, duracion, fecha_inicio, fecha_fin, horario, aula, nivel, requisitos, id]
        );

        // Verifica cuántas filas fueron afectadas
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        // Consulta para obtener el curso actualizado
        const [rows] = await conect.query('SELECT * FROM cursos WHERE id = ?', [id]);

        // Devuelve el curso actualizado
        res.json(rows[0]);

    } catch (error) {
        console.error('Error al actualizar el curso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


 // eliminar cursos
 const deleteCourse = async (req, res) => {
    const { id } = req.params;
    
    try {
        const conect = await conexionPromesa();
        await conect.query('DELETE FROM cursos WHERE id =?', [id]);
        res.json({ message: 'Curso eliminado exitosamente' });
        
    } catch (error) {
        console.error('Error al eliminar el curso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
}
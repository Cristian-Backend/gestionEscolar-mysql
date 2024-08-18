const express = require('express')
const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent} = require('../controllers/estudiastes.controllers')


const router = express.Router()



router.get('/', (req,res)=> {
res.send('Inicio')
})


router.get('/estudiantes' , getStudents)

router.get('/estudiantes/:id', getStudentById)

router.post('/estudiantes', createStudent)

router.put('/estudiantes/:id', updateStudent)

router.delete('/estudiantes/:id', deleteStudent)



module.exports = router;
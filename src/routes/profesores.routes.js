const express = require('express')
const { deleteTeacher, updateTeacher, createTeacher, getTeacherById, getTeacher } = require('../controllers/profesores.controllers')



const router = express.Router()

router.get('/profesores' , getTeacher)

router.get('/profesores/:id', getTeacherById)

router.post('/profesores', createTeacher)

router.put('/profesores/:id', updateTeacher)

router.delete('/profesores/:id', deleteTeacher)




module.exports = router;
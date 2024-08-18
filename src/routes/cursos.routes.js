const express = require('express')
const { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/cursos.controllers')

const router = express.Router()


router.get('/cursos', getCourses)

router.get('/cursos/:id',  getCourseById)

router.post('/cursos', createCourse)

router.put('/cursos/:id', updateCourse)

router.delete('/cursos/:id', deleteCourse)





module.exports = router;
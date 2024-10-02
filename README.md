# Sistema de Gestión Escolar

##   Descripción del Bakcend

El Sistema de Gestión Escolar es una aplicación web destinada a facilitar la administración de estudiantes, profesores y cursos en una institución educativa. Permite la realización de operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para cada entidad, con el objetivo de centralizar y optimizar la gestión académica.

## Características

- **Gestión de Estudiantes:** Crear, leer, actualizar y eliminar registros de estudiantes.
- **Gestión de Profesores:** Administrar información de profesores, incluyendo la asignación de cursos.
- **Gestión de Cursos:** Agregar, modificar y eliminar cursos, así como gestionar sus detalles asociados.

## Tecnologías Utilizadas

- **Node.js:** Entorno de ejecución de JavaScript en el servidor.
- **Express.js:** Framework para el desarrollo de servidores web.
- **MySQL:** Sistema de gestión de bases de datos relacional.
- **Moment.js:** Biblioteca para el manejo de fechas y horas.

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. **Clonar el Repositorio:**

   ```bash
   git clone https://github.com/Cristian-Backend/mysql-gestionEscolar-nodejs.git


2.  Acceder al Directorio del Proyecto:
    cd nombre-del-repositorio

3. Instalar Dependencias:
npm install

4. Configurar la Base de Datos:
Ajusta la configuración de la base de datos en el archivo database/db.js para conectar con tu base de datos MySQL.

5. Iniciar servidor
npm start




## Rutas Disponibles

### Estudiantes

- **GET /api/estudiantes**
  - **Descripción:** Obtiene una lista de todos los estudiantes.
  - **Respuesta:** Lista de estudiantes.

- **GET /api/estudiantes/:id**
  - **Descripción:** Obtiene la información de un estudiante por ID.
  - **Parámetros:** `id` - ID del estudiante.
  - **Respuesta:** Detalles del estudiante.

- **POST /api/estudiantes**
  - **Descripción:** Crea un nuevo estudiante.
  - **Cuerpo de Solicitud:**
    ```json
    {
      "nombre": "Nombre del Estudiante",
       "apellido": "Apellido del estudiante"
      "email": "email@dominio.com",
       "fecha de nacimiento" : "YYYY-MM-DD",
       "direccion": "Sarmiento 53",
       "telefono": "15615165161651"
      sd
    }
    ```
  - **Respuesta:** Confirmación de la creación del estudiante.

- **PUT /api/estudiantes/:id**
  - **Descripción:** Actualiza los datos de un estudiante existente.
  - **Parámetros:** `id` - ID del estudiante.
  - **Cuerpo de Solicitud:**
    ```json
    {
      "nombre": "Nombre Actualizado",
      "email": "nuevoemail@dominio.com"
    }
    ```
  - **Respuesta:** Confirmación de la actualización del estudiante.

- **DELETE /api/estudiantes/:id**
  - **Descripción:** Elimina un estudiante de la base de datos.
  - **Parámetros:** `id` - ID del estudiante.
  - **Respuesta:** Confirmación de la eliminación del estudiante.

### Profesores

- **GET /api/profesores**
  - **Descripción:** Obtiene una lista de todos los profesores.
  - **Respuesta:** Lista de profesores.

- **GET /api/profesores/:id**
  - **Descripción:** Obtiene la información de un profesor por ID.
  - **Parámetros:** `id` - ID del profesor.
  - **Respuesta:** Detalles del profesor.

- **POST /api/profesores**
  - **Descripción:** Crea un nuevo profesor.
  - **Cuerpo de Solicitud:**
    ```json
    {
      "nombre": "Nombre del Profesor",
    "apellido": "Apellido del profesor",
    "email": "email@dominio.com",
    "fecha_nacimiento": "YYYY-MM-DD",
    "direccion" : "Direccion del profesor", (donde vive)
    "telefono" : "4234423141",
    "especialidad: "Matematicas"
   
    }
    ```
  - **Respuesta:** Confirmación de la creación del profesor.

- **PUT /api/profesores/:id**
  - **Descripción:** Actualiza los datos de un profesor existente.
  - **Parámetros:** `id` - ID del profesor.
  - **Cuerpo de Solicitud:**
    ```json
    {
      "nombre": "Nombre Actualizado",
      "email": "nuevoemail@dominio.com"
    }
    ```
  - **Respuesta:** Confirmación de la actualización del profesor.

- **DELETE /api/profesores/:id**
  - **Descripción:** Elimina un profesor de la base de datos.
  - **Parámetros:** `id` - ID del profesor.
  - **Respuesta:** Confirmación de la eliminación del profesor.

### Cursos

- **GET /api/cursos**
  - **Descripción:** Obtiene una lista de todos los cursos.
  - **Respuesta:** Lista de cursos.

- **GET /api/cursos/:id**
  - **Descripción:** Obtiene la información de un curso por ID.
  - **Parámetros:** `id` - ID del curso.
  - **Respuesta:** Detalles del curso.

- **POST /api/cursos**
  - **Descripción:** Crea un nuevo curso.
  - **Cuerpo de Solicitud:**
    ```json
    {
      "nombre": "Nombre del Curso",
      "descripcion": "Descripción del Curso",
      "profesor_id": 1,
      "codigo_curso": "Código",
      "duracion": 16,
      "fecha_inicio": "YYYY-MM-DD",
      "fecha_fin": "YYYY-MM-DD",
      "horario": "Lunes y Miércoles 10:00-12:00",
      "aula": "Aula 101",
      "nivel": "Avanzado",
      "requisitos": "Matemáticas Básicas"
    }
    ```
  - **Respuesta:** Confirmación de la creación del curso.

- **PUT /api/cursos/:id**
  - **Descripción:** Actualiza los detalles de un curso existente.
  - **Parámetros:** `id` - ID del curso.
  - **Cuerpo de Solicitud:**
    ```json
    {
      "nombre": "Nombre Actualizado",
      "descripcion": "Descripción Actualizada",
      "profesor_id": 2
    }
    ```
  - **Respuesta:** Confirmación de la actualización del curso.

- **DELETE /api/cursos/:id**
  - **Descripción:** Elimina un curso de la base de datos.
  - **Parámetros:** `id` - ID del curso.
  - **Respuesta:** Confirmación de la eliminación del curso.

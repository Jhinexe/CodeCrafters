# CodeCrafters

## 1. Integrantes del grupo

### Juan Pablo Cantillano

Desarrolló la totalidad del proyecto:

* Diseño e implementación de la vista pública (`index.html`).
* Desarrollo de la interfaz administrativa (`admin.html`).
* Implementación del formulario de inicio de sesión.
* Desarrollo de funcionalidades CRUD para la gestión de cursos.
* Creación y configuración de la base de datos MySQL.
* Implementación de la arquitectura MVC (Model, View, Controller).
* Integración de Bootstrap para el diseño responsivo.
* Desarrollo de la lógica cliente-servidor utilizando JavaScript, Node.js y Express.
* Diseño e integración del logo corporativo de CodeCrafters.
* Implementación del sistema de inscripción de alumnos.
* Desarrollo del módulo de visualización de alumnos inscritos.
* Generación automática de comprobantes de inscripción en formato PDF.

---

## 2. Descripción del proyecto

**CodeCrafters** es una academia de programación orientada a la enseñanza de desarrollo web y bases de datos. El sistema permite presentar información institucional mediante una vista pública, administrar cursos desde un panel privado protegido por autenticación, gestionar inscripciones de alumnos y generar automáticamente comprobantes de inscripción en formato PDF. El proyecto fue desarrollado utilizando Node.js, Express, MySQL, Bootstrap y arquitectura MVC.

---

## 3. Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

* Node.js (versión 18 o superior recomendada).
* XAMPP con Apache y MySQL.
* Visual Studio Code (opcional).
* Navegador web actualizado.

---

## 4. Instalación paso a paso

### Clonar o descargar el proyecto

Descargar el proyecto y extraerlo en una carpeta local.

### Instalar dependencias

Abrir una terminal dentro de la carpeta del proyecto y ejecutar:

```bash
npm install
```

### Iniciar servicios

Abrir XAMPP y encender:

* Apache
* MySQL

### Importar la base de datos

1. Abrir phpMyAdmin.
2. Crear una base de datos llamada:

```text
codecrafters
```

3. Importar el archivo:

```text
database/codecrafters.sql
```

### Ejecutar el servidor

```bash
node server.js
```

o

```bash
npm run start
```

### Acceder al sistema

Abrir el navegador y dirigirse a:

```text
http://localhost:3000
```

---

## 5. Configuración de la base de datos

Archivo de configuración:

```text
config/db.js
```

Configuración utilizada:

```javascript
host: "localhost",
user: "root",
password: "",
database: "codecrafters"
```

Archivo SQL:

```text
database/codecrafters.sql
```

La base de datos incluye las siguientes tablas:

* **cursos:** almacena la información de los cursos disponibles.
* **usuarios:** contiene las credenciales para acceder al panel de administración.
* **inscripciones:** registra los alumnos inscritos, el curso seleccionado, la sección y la fecha de inscripción.

---

## 6. Credenciales de prueba

### Administrador

Usuario:

```text
admin
```

Contraseña:

```text
1234
```

### Profesor

Usuario:

```text
profesor
```

Contraseña:

```text
5678
```

---

## 7. Uso del sistema

### Vista pública

Al ingresar a:

```text
http://localhost:3000
```

el usuario puede visualizar información general de la academia, conocer los cursos disponibles y acceder al sistema de inscripción.

### Panel de administración

Presionar el botón **Administración** e ingresar una de las credenciales disponibles.

### Funcionalidades disponibles

* Crear cursos.
* Visualizar cursos registrados.
* Editar cursos existentes.
* Eliminar cursos.
* Registrar inscripciones de alumnos.
* Visualizar alumnos inscritos por curso y sección.
* Generar comprobantes de inscripción en formato PDF.
* Administrar la información almacenada en la base de datos.

### Inscripción de alumnos

Cada curso dispone del botón **Inscribirme**, el cual permite al alumno:

* Seleccionar el curso.
* Elegir una sección disponible.
* Registrar sus datos personales.
* Descargar automáticamente un comprobante de inscripción en formato PDF.

---

## 8. Estructura del proyecto

```text
CodeCrafters
│
├── config
│   └── db.js
│
├── controllers
│   ├── cursoController.js
│   └── inscripcionController.js
│
├── database
│   └── codecrafters.sql
│
├── models
│   ├── cursoModel.js
│   └── inscripcionModel.js
│
├── public
│   ├── css
│   │   └── style.css
│   │
│   ├── img
│   │   └── logo.png
│   │
│   └── js
│       ├── main.js
│       ├── login.js
│       └── admin.js
│
├── views
│   ├── index.html
│   ├── login.html
│   └── admin.html
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

### Descripción de archivos principales

* `server.js`: Configuración principal del servidor Express.
* `config/db.js`: Conexión a la base de datos MySQL.
* `controllers/cursoController.js`: Lógica de negocio del CRUD.
* `models/cursoModel.js`: Consultas SQL relacionadas con los cursos.
* `views/index.html`: Vista pública principal.
* `views/login.html`: Inicio de sesión.
* `views/admin.html`: Panel de administración.
* `public/js/admin.js`: Gestión dinámica del CRUD.
* `public/js/login.js`: Funcionalidades del login.
** `public/js/main.js`: Gestiona la inscripción de alumnos y la generación automática del comprobante PDF.
* `public/css/style.css`: Estilos personalizados.
* `database/codecrafters.sql`: Respaldo de la base de datos.
* `controllers/inscripcionController.js`: Gestiona el registro y consulta de las inscripciones de alumnos.
* `models/inscripcionModel.js`: Contiene las consultas SQL relacionadas con las inscripciones.

---

## 9. Mejoras implementadas

Durante la segunda etapa del proyecto se incorporaron las siguientes mejoras:

* Sistema de inscripción de alumnos desde la vista pública.
* Registro automático de las inscripciones en la base de datos MySQL.
* Visualización de alumnos inscritos desde el panel de administración.
* Generación automática de comprobantes de inscripción en formato PDF con identidad visual de CodeCrafters.

```
```
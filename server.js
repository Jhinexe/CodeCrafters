const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

const path = require("path");

// Conexión a la base de datos MySQL
const conexion = require("./config/db");

require("./config/db");

// Controlador encargado del CRUD de cursos
const cursosController =
require("./controllers/cursoController");

const inscripcionController =
require("./controllers/inscripcionController");

app.use(express.urlencoded({extended:true}));

// Permite acceder a archivos CSS, JS e imágenes
app.use(express.static("public"));

// Ruta principal del sitio web
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Muestra el formulario de inicio de sesión
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

// Ruta para obtener todos los cursos registrados
app.get("/cursos", cursosController.obtenerCursos);

// Ruta para eliminar un curso según su ID
app.delete("/eliminarCurso/:id", cursosController.eliminarCurso);

app.post(
    "/crearInscripcion",
    inscripcionController.crearInscripcion
);

app.get(
    "/inscripciones",
    inscripcionController.obtenerInscripciones
);

// Validación de credenciales de acceso
app.post("/login", (req, res) => {

    const usuario = req.body.usuario;
    const password = req.body.password;

    const sql =
    "SELECT * FROM usuarios WHERE usuario = ? AND password = ?";

    conexion.query(
        sql,
        [usuario, password],
        (error, resultados) => {

            if(error){
                console.log(error);
                return res.send("Error en la base de datos");
            }

            if(resultados.length > 0){

                res.sendFile(
                    path.join(__dirname,
                    "views",
                    "admin.html")
                );

            }else{

                res.send(
                    "<h2>Usuario o contraseña incorrectos</h2>"
                );

            }

        }
    );

});

app.listen(PORT,()=>{
    console.log("Servidor Corriendo");
});

// Ruta para crear nuevos cursos
app.post("/crearCurso", cursosController.crearCurso);

// Ruta para editar cursos existentes
app.put("/editarCurso/:id", cursosController.editarCurso);
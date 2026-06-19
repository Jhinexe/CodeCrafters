const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

const path = require("path");

const conexion = require("./config/db");

require("./config/db");

const cursosController =
require("./controllers/cursoController");

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/cursos", cursosController.obtenerCursos);

app.delete("/eliminarCurso/:id", cursosController.eliminarCurso);

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

app.post("/crearCurso", cursosController.crearCurso);

app.put("/editarCurso/:id", cursosController.editarCurso);
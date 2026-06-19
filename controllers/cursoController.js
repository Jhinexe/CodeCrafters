const cursoModel = require("../models/cursoModel");

// Controlador encargado de listar cursos
const obtenerCursos = (req, res) => {

    cursoModel.obtenerTodos((error, resultados) => {

        if(error){
            console.log(error);
            return res.send("Error al obtener cursos");
        }

        res.json(resultados);

    });

};

// Controlador encargado de eliminar cursos
const eliminarCurso = (req, res) => {

    const id = req.params.id;

    console.log("CONTROLADOR PASO 1");

    cursoModel.eliminarCurso(
        id,
        (error, resultado) => {

            console.log("CONTROLADOR PASO 2");

            if(error){
                console.log(error);
                return res.send("Error al eliminar curso");
            }

            console.log("CONTROLADOR PASO 3");

            res.send("Curso eliminado correctamente");

        }
    );

};

// Controlador encargado de crear cursos
const crearCurso = (req, res) => {

    cursoModel.crearCurso(
        req.body,
        (error, resultado) => {

            if(error){
                console.log(error);
                return res.send(
                    "Error al crear curso"
                );
            }

            res.send(
                "Curso creado correctamente"
            );

        }
    );

};

// Controlador encargado de actualizar cursos
const editarCurso = (req, res) => {

    const id = req.params.id;

    cursoModel.editarCurso(
        id,
        req.body,
        (error, resultado) => {

            if(error){
                console.log(error);

                return res.send(
                    "Error al editar curso"
                );
            }

            res.send(
                "Curso actualizado correctamente"
            );

        }
    );

};

module.exports = {
    obtenerCursos,
    eliminarCurso,
    crearCurso,
    editarCurso
};
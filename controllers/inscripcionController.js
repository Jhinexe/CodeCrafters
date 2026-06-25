const inscripcionModel = require("../models/inscripcionModel");

// Guarda una inscripción enviada desde la página pública
const crearInscripcion = (req, res) => {

    inscripcionModel.crearInscripcion(
        req.body,
        (error, resultado) => {

            if(error){
                console.log(error);
                return res.send("Error al realizar la inscripción");
            }

            res.json({mensaje: "Inscripción realizada correctamente", id_inscripcion: resultado.insertId});

        }
    );

};

// Envía al frontend la lista de alumnos inscritos
const obtenerInscripciones = (req, res) => {

    inscripcionModel.obtenerInscripciones(
        (error, resultados) => {

            if(error){
                console.log(error);
                return res.send("Error al obtener inscripciones");
            }

            res.json(resultados);

        }
    );

};

module.exports = {
    crearInscripcion,
    obtenerInscripciones
};
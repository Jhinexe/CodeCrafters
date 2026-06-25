const conexion = require("../config/db");

// Registra una nueva inscripción en la base de datos
const crearInscripcion = (datos, callback) => {

    const sql = `
        INSERT INTO inscripciones
        (nombre_alumno, correo_alumno, curso_id, seccion, fecha_inscripcion)
        VALUES (?, ?, ?, ?, CURDATE())
    `;

    conexion.query(
        sql,
        [
            datos.nombre_alumno,
            datos.correo_alumno,
            datos.curso_id,
            datos.seccion
        ],
        (error, resultado) => {

            if(error){
                return callback(error, null);
            }

            callback(null, resultado);

        }
    );

};

// Obtiene las inscripciones junto con el nombre del curso y profesor
const obtenerInscripciones = (callback) => {

    const sql = `
        SELECT
            inscripciones.id,
            inscripciones.nombre_alumno,
            inscripciones.correo_alumno,
            inscripciones.seccion,
            inscripciones.fecha_inscripcion,
            cursos.nombre AS nombre_curso,
            cursos.profesor
        FROM inscripciones
        INNER JOIN cursos
        ON inscripciones.curso_id = cursos.id
        ORDER BY cursos.nombre ASC, inscripciones.seccion ASC, inscripciones.nombre_alumno ASC
    `;

    conexion.query(sql, (error, resultados) => {

        if(error){
            return callback(error, null);
        }

        callback(null, resultados);

    });

};

module.exports = {
    crearInscripcion,
    obtenerInscripciones
};
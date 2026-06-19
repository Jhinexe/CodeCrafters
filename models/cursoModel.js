const conexion = require("../config/db");

const obtenerTodos = (callback) => {

    const sql = "SELECT * FROM cursos";

    conexion.query(sql, (error, resultados) => {

        if(error){
            return callback(error, null);
        }

        callback(null, resultados);

    });

};

const eliminarCurso = (id, callback) => {

    console.log("MODELO PASO 1");

    const sql = "DELETE FROM cursos WHERE id = ?";

    conexion.query(
        sql,
        [id],
        (error, resultado) => {

            console.log("MODELO PASO 2", resultado);

            if(error){
                console.log("ERROR MYSQL:", error);
                return callback(error, null);
            }
            console.log(resultado);

            console.log("MODELO PASO 3 - filas afectadas:", resultado.affectedRows);

            callback(null, resultado);

        }
    );

};

const crearCurso = (datos, callback) => {

    const sql = `
        INSERT INTO cursos
        (nombre, profesor, duracion, descripcion, cantidad_alumnos)
        VALUES (?, ?, ?, ?, ?)
    `;

    conexion.query(
        sql,
        [
            datos.nombre,
            datos.profesor,
            datos.duracion,
            datos.descripcion,
            datos.cantidad_alumnos
        ],
        (error, resultado) => {

            if(error){
                return callback(error, null);
            }

            callback(null, resultado);

        }
    );

};

const editarCurso = (
    id,
    datos,
    callback
) => {

    const sql = `
        UPDATE cursos
        SET
        nombre = ?,
        profesor = ?,
        duracion = ?,
        descripcion = ?,
        cantidad_alumnos = ?
        WHERE id = ?
    `;

    conexion.query(
        sql,
        [
            datos.nombre,
            datos.profesor,
            datos.duracion,
            datos.descripcion,
            datos.cantidad_alumnos,
            id
        ],
        (error, resultado) => {

            if(error){
                return callback(error, null);
            }

            callback(null, resultado);

        }
    );

};

module.exports = {
    obtenerTodos,
    eliminarCurso,
    crearCurso,
    editarCurso
};
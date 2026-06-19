const conexion = require("../config/db");

// Obtiene todos los cursos desde la base de datos
const obtenerTodos = (callback) => {

    const sql = "SELECT * FROM cursos";

    conexion.query(sql, (error, resultados) => {

        if(error){
            return callback(error, null);
        }

        callback(null, resultados);

    });

};

// Elimina un curso según el ID recibido
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

// Inserta un nuevo curso en la base de datos
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

// Actualiza los datos de un curso existente
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
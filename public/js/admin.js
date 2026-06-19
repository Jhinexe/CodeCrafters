let idCursoEditar = null;

fetch("/cursos")
    .then(response => response.json())
    .then(cursos => {

        const tabla =
        document.getElementById("tablaCursos");

        tabla.innerHTML = "";

        cursos.forEach(curso => {

            tabla.innerHTML += `
                <tr>
                    <td>${curso.id}</td>
                    <td>${curso.nombre}</td>
                    <td>${curso.profesor}</td>
                    <td>${curso.duracion}</td>
                    <td>${curso.cantidad_alumnos}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarCurso(${curso.id})">
                            Editar
                        </button>

                        <button class="btn btn-danger btn-sm" onclick="eliminarCurso(${curso.id})">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;

        });

    })
    .catch(error => {
        console.log(error);
    });

function eliminarCurso(id){

    console.log("ID recibido:", id);

    const confirmar = confirm(
        "¿Deseas eliminar este curso?"
    );

    if(!confirmar){
        return;
    }

    fetch(`/eliminarCurso/${id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(mensaje => {

        alert(mensaje);

        location.reload();

    })
    .catch(error => {
        console.log(error);
    });

}

function editarCurso(id){

    fetch("/cursos")
    .then(response => response.json())
    .then(cursos => {

        const curso = cursos.find(
            c => c.id == id
        );

        if(!curso){
            alert("Curso no encontrado");
            return;
        }

        idCursoEditar = id;

        document.getElementById("nombre").value =
        curso.nombre;

        document.getElementById("profesor").value =
        curso.profesor;

        document.getElementById("duracion").value =
        curso.duracion;

        document.getElementById("descripcion").value =
        curso.descripcion;

        document.getElementById("cantidad_alumnos").value =
        curso.cantidad_alumnos;

        const modal =
        new bootstrap.Modal(
            document.getElementById("modalCurso")
        );

        modal.show();

    })
    .catch(error => {
        console.log(error);
    });

}

const formulario =
document.getElementById("formCurso");

formulario.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const curso = {

            nombre:
            document.getElementById("nombre").value,

            profesor:
            document.getElementById("profesor").value,

            duracion:
            document.getElementById("duracion").value,

            descripcion:
            document.getElementById("descripcion").value,

            cantidad_alumnos:
            document.getElementById("cantidad_alumnos").value

        };

        const url =
idCursoEditar
? `/editarCurso/${idCursoEditar}`
: "/crearCurso";

const metodo =
idCursoEditar
? "PUT"
: "POST";

fetch(url, {

    method: metodo,

    headers: {
        "Content-Type":
        "application/json"
    },

    body:
    JSON.stringify(curso)

})
        .then(response => response.text())
        .then(mensaje => {

            alert(mensaje);

            location.reload();

        })
        .catch(error => {

            console.log(error);

        });

    }
);
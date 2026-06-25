document.addEventListener("DOMContentLoaded", () => {

    let profesorSeleccionado = "";

    const botonesInscripcion =
    document.querySelectorAll(".btn-inscripcion");

    const cursoIdInput =
    document.getElementById("curso_id");

    const cursoNombreInput =
    document.getElementById("curso_nombre");

    botonesInscripcion.forEach(boton => {

        boton.addEventListener("click", () => {

            const cursoId =
            boton.getAttribute("data-curso-id");

            const cursoNombre =
            boton.getAttribute("data-curso-nombre");

            const profesor =
            boton.getAttribute("data-profesor");

            cursoIdInput.value = cursoId;
            cursoNombreInput.value = cursoNombre;
            profesorSeleccionado = profesor;

        });

    });

    const formInscripcion =
    document.getElementById("formInscripcion");

    formInscripcion.addEventListener("submit", (e) => {

        e.preventDefault();

        const datos = {
            nombre_alumno:
            document.getElementById("nombre_alumno").value,

            correo_alumno:
            document.getElementById("correo_alumno").value,

            curso_id:
            document.getElementById("curso_id").value,

            curso_nombre:
            document.getElementById("curso_nombre").value,

            profesor:
            profesorSeleccionado,

            seccion:
            document.getElementById("seccion").value
        };

        fetch("/crearInscripcion", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .then(respuesta => {

            alert(respuesta.mensaje);

            datos.id_inscripcion = respuesta.id_inscripcion;

            generarComprobantePDF(datos);

            formInscripcion.reset();

            const modal =
            bootstrap.Modal.getInstance(
                document.getElementById("modalInscripcion")
            );

            modal.hide();

        })
        .catch(error => {
            console.log(error);
        });

    });

});

function generarComprobantePDF(datos){

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const fecha =
    new Date().toLocaleDateString("es-CL");

    const azul = "#00BFFF";
    const blanco = "#FFFFFF";
    const negro = "#121212";

    const logo = new Image();
    logo.src = "/img/logo.png";

    logo.onload = () => {

        // Cabecera
        doc.setFillColor(30, 41, 59);
        doc.rect(0, 0, 210, 75, "F");

        // Logo
        doc.addImage(
            logo,
            "PNG",
            83,
            6,
            44,
            34
        );

        doc.setTextColor(blanco);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text(
            "CODECRAFTERS",
            105,
            48,
            { align: "center" }
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(
            "Construyendo el futuro línea por línea",
            105,
            56,
            { align: "center" }
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(
            "COMPROBANTE DE INSCRIPCIÓN",
            105,
            68,
            { align: "center" }
        );

        // Línea decorativa
        doc.setDrawColor(0, 191, 255);
        doc.setLineWidth(1);
        doc.line(25, 82, 185, 82);

        const numeroComprobante = String(datos.id_inscripcion).padStart(5, "0");

        const codigoInscripcion = `CC-${new Date().getFullYear()}-${numeroComprobante}`;

        doc.setTextColor(negro);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(
            `Comprobante N° ${numeroComprobante}`,
            35,
            90
        );

        doc.text(
            `Código: ${codigoInscripcion}`,
            35,
            98
        );

        // Cuerpo
        doc.setFillColor(255, 255, 255);
        doc.rect(15, 104, 180, 88, "F");

        doc.setDrawColor(0, 191, 255);
        doc.setLineWidth(0.5);
        doc.rect(15, 104, 180, 88);

        doc.setFontSize(12);

        const xEtiqueta = 35;
        const xValor = 85;
        let y = 122;

        function agregarDato(etiqueta, valor){

            doc.setTextColor(azul);
            doc.setFont("helvetica", "bold");
            doc.text(etiqueta, xEtiqueta, y);

            doc.setTextColor(negro);
            doc.setFont("helvetica", "normal");
            doc.text(String(valor), xValor, y);

            y += 12;

        }

        agregarDato("Alumno:", datos.nombre_alumno);
        agregarDato("Correo:", datos.correo_alumno);
        agregarDato("Curso:", datos.curso_nombre);
        agregarDato("Profesor:", datos.profesor);
        agregarDato("Sección:", datos.seccion);
        agregarDato("Fecha:", fecha);

        // Pie
        doc.setFillColor(30, 41, 59);
        doc.rect(0, 198, 210, 70, "F");
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.3);
        doc.line(25, 210, 185, 210);

        doc.setTextColor(blanco);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);

        doc.text(
            "Su inscripción fue registrada correctamente.",
            105,
            218,
            { align: "center" }
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        doc.text(
            "Este comprobante acredita que el alumno ha sido",
            105,
            229,
            { align: "center" }
        );

        doc.text(
            "inscrito satisfactoriamente en el curso seleccionado.",
            105,
            236,
            { align: "center" }
        );

        doc.text(
            "Presente este documento cuando sea solicitado",
            105,
            244,
            { align: "center" }
        );

        doc.text(
            "por la administración de CodeCrafters.",
            105,
            251,
            { align: "center" }
        );

        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);

        doc.text(
            "Documento generado automáticamente por el Sistema de Gestión Académica CodeCrafters.",
            105,
            260,
            { align: "center" }
        );

        const nombreArchivo =
        `Comprobante_Inscripcion_${datos.nombre_alumno.replaceAll(" ", "_")}.pdf`;

        doc.save(nombreArchivo);

    };

}
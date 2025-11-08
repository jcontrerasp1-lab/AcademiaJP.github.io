let listElement = document.querySelectorAll(".lista_button--click");
listElement.forEach(listElement => {
    listElement.addEventListener("click", () =>{
        listElement.classList.toggle("arrow");
        let height = 0;
        let menu = listElement.nextElementSibling;
        if(menu.clientHeight == "0"){
            height = menu.scrollHeight;
        }
        menu.style.height = height + "px";
    });
});

function mostrarNombreUsuario() {
    const username = localStorage.getItem('username');
    const inicioSesionElement = document.getElementById('Isecion');
    const Csecion = document.getElementById('Csecion');
    
    if (username && inicioSesionElement) {
        inicioSesionElement.textContent = username;
        inicioSesionElement.style.pointerEvents = 'none';
        inicioSesionElement.style.cursor = 'default';
        if (Csecion) {
            Csecion.style.display = 'block';
        }
    } else {
        if (Csecion) {
            Csecion.style.display = 'none';
        }
    }
}

function cerrarSesion() {
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

function mostrarSeccion(idSeccion) {
    const secciones = document.querySelectorAll('.content-section');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });

    const pruebas = document.querySelectorAll('.prueba-section');
    pruebas.forEach(prueba => {
        prueba.style.display = 'none';
    });

    const seccionActiva = document.getElementById(idSeccion);
    if (seccionActiva) {
        seccionActiva.style.display = 'block';
    }
}
function generarDiploma(materia, puntaje, nombreUsuario) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    const colorPrincipal = '#8536C9';
    const colorSecundario = '#C7A2E6';
    const colorTexto = '#333333';

    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 297, 210, 'F');

    doc.setDrawColor(colorPrincipal);
    doc.setLineWidth(2);
    doc.rect(15, 15, 267, 180);

    doc.setFontSize(36);
    doc.setTextColor(colorPrincipal);
    doc.setFont('helvetica', 'bold');
    doc.text('DIPLOMA', 148, 50, { align: 'center' });

    doc.setFontSize(20);
    doc.setTextColor(colorTexto);
    doc.setFont('helvetica', 'normal');
    doc.text('Academia JP', 148, 65, { align: 'center' });

    doc.setDrawColor(colorSecundario);
    doc.setLineWidth(1);
    doc.line(80, 75, 217, 75);

    doc.setFontSize(16);
    doc.setTextColor(colorTexto);
    doc.text('Se otorga el presente diploma a:', 148, 95, { align: 'center' });

    doc.setFontSize(24);
    doc.setTextColor(colorPrincipal);
    doc.setFont('helvetica', 'bold');
    doc.text(nombreUsuario, 148, 115, { align: 'center' });

    doc.setFontSize(16);
    doc.setTextColor(colorTexto);
    doc.setFont('helvetica', 'normal');
    doc.text('Por haber aprobado exitosamente la prueba de:', 148, 130, { align: 'center' });

    doc.setFontSize(20);
    doc.setTextColor(colorPrincipal);
    doc.setFont('helvetica', 'bold');
    doc.text(materia, 148, 145, { align: 'center' });

    doc.setFontSize(16);
    doc.setTextColor(colorTexto);
    doc.setFont('helvetica', 'normal');
    doc.text(`Con un puntaje de: ${puntaje}/5`, 148, 160, { align: 'center' });

    const fecha = new Date().toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    doc.text(`Fecha: ${fecha}`, 148, 175, { align: 'center' });

    doc.save(`Diploma_${materia}_${nombreUsuario}.pdf`);
}

function cafiM() {
    let puntaje = 0;
    const respuestasUsuario = [];
    const respuestasCorrectas = ['c', 'b', 'b', 'a', 'd'];
    const formulario = document.getElementById('formulario-matematicas');
    const resultado = document.getElementById('Resultado');
    const nombreUsuario = localStorage.getItem('username') || 'Estudiante';
    
    for (let i = 1; i <= 5; i++) {
        const pregunta = formulario.querySelector(`input[name="P${i}"]:checked`);
        if (pregunta) {
            respuestasUsuario.push(pregunta.value);
            if (pregunta.value === respuestasCorrectas[i-1]) {
                puntaje++;
            }
        } else {
            respuestasUsuario.push(null);
        }
    }
    
    if (puntaje >= 3) {
        resultado.textContent = `¡Felicidades! Obtuviste ${puntaje}/5 respuestas correctas. ¡Aprobado!`;
        resultado.className = 'aprobado';
        
        // Crear botón para descargar diploma
        const botonDiploma = document.createElement('button');
        botonDiploma.textContent = 'Descargar Diploma';
        botonDiploma.className = 'btn-enviar';
        botonDiploma.style.marginLeft = '10px';
        botonDiploma.onclick = function() {
            generarDiploma('Matemáticas', puntaje, nombreUsuario);
        };
        
        // Agregar botón al resultado
        resultado.appendChild(botonDiploma);
        
        // Generar automáticamente el diploma (opcional)
        // generarDiploma('Matemáticas', puntaje, nombreUsuario);
    } else {
        resultado.textContent = `Obtuviste ${puntaje}/5 respuestas correctas. Sigue estudiando.`;
        resultado.className = 'reprobado';
    }
}

function cafiC() {
    let puntaje = 0;
    const respuestasUsuario = [];
    const respuestasCorrectas = ['a', 'b', 'c', 'c', 'b'];
    const formulario = document.getElementById('formulario-Comunicacion');
    const ResultadoComu = document.getElementById('ResultadoComu');
    const nombreUsuario = localStorage.getItem('username') || 'Estudiante';
    
    for (let i = 1; i <= 5; i++) {
        const pregunta = formulario.querySelector(`input[name="P${i}"]:checked`);
        if (pregunta) {
            respuestasUsuario.push(pregunta.value);
            if (pregunta.value === respuestasCorrectas[i-1]) {
                puntaje++;
            }
        } else {
            respuestasUsuario.push(null);
        }
    }

    if (puntaje >= 3) {
        ResultadoComu.textContent = `¡Felicidades! Obtuviste ${puntaje}/5 respuestas correctas. ¡Aprobado!`;
        ResultadoComu.className = 'aprobado';
        
        // Crear botón para descargar diploma
        const botonDiploma = document.createElement('button');
        botonDiploma.textContent = 'Descargar Diploma';
        botonDiploma.className = 'btn-enviar';
        botonDiploma.style.marginLeft = '10px';
        botonDiploma.onclick = function() {
            generarDiploma('Comunicación', puntaje, nombreUsuario);
        };
        
        // Agregar botón al resultado
        ResultadoComu.appendChild(botonDiploma);
    } else {
        ResultadoComu.textContent = `Obtuviste ${puntaje}/5 respuestas correctas. Sigue estudiando.`;
        ResultadoComu.className = 'reprobado';
    }
}

function cafiT() {
    let puntaje = 0;
    const respuestasUsuario = [];
    const respuestasCorrectas = ['b', 'c', 'a', 'c', 'd'];
    const formulario = document.getElementById('formulario-Tecnologia');
    const ResultadoTec = document.getElementById('ResultadoTec');
    const nombreUsuario = localStorage.getItem('username') || 'Estudiante';

    for (let i = 1; i <= 5; i++) {
        const pregunta = formulario.querySelector(`input[name="P${i}"]:checked`);
        if (pregunta) {
            respuestasUsuario.push(pregunta.value);
            if (pregunta.value === respuestasCorrectas[i-1]) {
                puntaje++;
            }
        } else {
            respuestasUsuario.push(null);
        }
    }

    if (puntaje >= 3) {
        ResultadoTec.textContent = `¡Felicidades! Obtuviste ${puntaje}/5 respuestas correctas. ¡Aprobado!`;
        ResultadoTec.className = 'aprobado';
        
        // Crear botón para descargar diploma
        const botonDiploma = document.createElement('button');
        botonDiploma.textContent = 'Descargar Diploma';
        botonDiploma.className = 'btn-enviar';
        botonDiploma.style.marginLeft = '10px';
        botonDiploma.onclick = function() {
            generarDiploma('Tecnología', puntaje, nombreUsuario);
        };
        
        // Agregar botón al resultado
        ResultadoTec.appendChild(botonDiploma);
    } else {
        ResultadoTec.textContent = `Obtuviste ${puntaje}/5 respuestas correctas. Sigue estudiando.`;
        ResultadoTec.className = 'reprobado';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    mostrarNombreUsuario();
    
    const Csecion = document.getElementById('Csecion');
    if (Csecion) {
        Csecion.addEventListener('click', function(e) {
            e.preventDefault();
            cerrarSesion();
        });
    }

    document.getElementById('inicio-btn').addEventListener('click', function() {
        mostrarSeccion('inicio-content');
    });
    document.getElementById('Matematicas-btn').addEventListener('click', function() {
        mostrarSeccion('matematicas-content');
    });
    document.getElementById('Comunicacion-btn').addEventListener('click', function() {
      mostrarSeccion('comunicacion-content');
    });
    document.getElementById('Tecnologia-btn').addEventListener('click', function() {
        mostrarSeccion('Tecnologia-content');
    });
    document.getElementById('Prueba1').addEventListener('click', function() {
    const secciones = document.querySelectorAll('.content-section');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });
    const pruebas = document.querySelectorAll('.prueba-section');
    pruebas.forEach(prueba => {
        prueba.style.display = 'none';
    });
    const pruebaMatematicas = document.getElementById('prueba-matematicas');
    if (pruebaMatematicas) {
        pruebaMatematicas.style.display = 'block';
    }});
    document.getElementById('Prueba2').addEventListener('click', function() {
     const secciones = document.querySelectorAll('.content-section');
     secciones.forEach(seccion => {
         seccion.style.display = 'none';
     });

     const pruebas = document.querySelectorAll('.prueba-section');
     pruebas.forEach(prueba => {
         prueba.style.display = 'none';
     });
    
     const pruebaComunicacion = document.getElementById('prueba-Comunicacion');
     if (pruebaComunicacion) {
         pruebaComunicacion.style.display = 'block';
        }
    });
    document.getElementById('Prueba3').addEventListener('click', function() {
    const secciones = document.querySelectorAll('.content-section');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });

    const pruebas = document.querySelectorAll('.prueba-section');
    pruebas.forEach(prueba => {
        prueba.style.display = 'none';
    });

    const pruebaTecnologia = document.getElementById('prueba-Tecnologia');
    if (pruebaTecnologia) {  // ← CORREGIDO: pruebaTecnologia en lugar de pruebaCTecnologia
        pruebaTecnologia.style.display = 'block';
    }
});
            
});
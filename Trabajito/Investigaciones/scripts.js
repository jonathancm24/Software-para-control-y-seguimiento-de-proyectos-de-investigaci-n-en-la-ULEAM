const agregarProyectoBtn = document.getElementById('agregarProyectoBtn');
const modal = document.getElementById('modal');
const cerrarModal = document.getElementById('cerrarModal');
const proyectoForm = document.getElementById('proyectoForm');
const proyectoTable = document.getElementById('proyectoTable');
const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];

function actualizarTabla() {
    proyectoTable.innerHTML = ''; // Limpiar la tabla antes de actualizar

    proyectos.forEach((proyecto, index) => {
        const newRow = proyectoTable.insertRow();
        newRow.innerHTML = `
            <td>${proyecto.nombreProyecto}</td>
            <td>${proyecto.autor}</td>
            <td>${proyecto.descripcion}</td>
            <td>${proyecto.carrera}</td>
            <td>${proyecto.facultad}</td>
            <td>${proyecto.anio}</td>
            <td>
                <button class="editarBtn" data-index="${index}">Editar</button>
                <button class="eliminarBtn" data-index="${index}">Eliminar</button>
            </td>
        `;
    });
}

agregarProyectoBtn.addEventListener('click', () => {
    var nuevoTexto2="Agregar Proyecto";
    modal.style.display = 'block';
    var elemento = document.getElementById("miTitulo");
     elemento.innerHTML = nuevoTexto2;
});

cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});


let proyectoEnEdicion = null; // Variable para rastrear el proyecto en edición


proyectoTable.addEventListener('click', (e) => {
    var nuevoTexto1="Editar Proyecto";
    if (e.target.classList.contains('eliminarBtn')) {
        const index = e.target.getAttribute('data-index');
        proyectos.splice(index, 1);
        localStorage.setItem('proyectos', JSON.stringify(proyectos));
        actualizarTabla();
    } else if (e.target.classList.contains('editarBtn')) {
        const index = e.target.getAttribute('data-index');
        proyectoEnEdicion = proyectos[index]; // Establecer el proyecto en edición.
        var elemento = document.getElementById("miTitulo"); //cambiar el titulo
        elemento.innerHTML = nuevoTexto1;
        // Llenar el formulario con los valores del proyecto en edición
        document.getElementById('nombreProyecto').value = proyectoEnEdicion.nombreProyecto;
        document.getElementById('autor').value = proyectoEnEdicion.autor;
        document.getElementById('descripcion').value = proyectoEnEdicion.descripcion;
        document.getElementById('carrera').value = proyectoEnEdicion.carrera;
        document.getElementById('facultad').value = proyectoEnEdicion.facultad;
        document.getElementById('anio').value = proyectoEnEdicion.anio;

        modal.style.display = 'block';
    }
});

proyectoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombreProyecto = document.getElementById('nombreProyecto').value;
    const autor = document.getElementById('autor').value;
    const descripcion = document.getElementById('descripcion').value;
    const carrera = document.getElementById('carrera').value;
    const facultad = document.getElementById('facultad').value;
    const anio = document.getElementById('anio').value;
    
    if (proyectoEnEdicion) {
        // Si hay un proyecto en edición, actualiza sus valores
        
        proyectoEnEdicion.nombreProyecto = nombreProyecto;
        proyectoEnEdicion.autor = autor;
        proyectoEnEdicion.descripcion = descripcion;
        proyectoEnEdicion.carrera = carrera;
        proyectoEnEdicion.facultad = facultad;
        proyectoEnEdicion.anio = anio;
    } else {
        
        
        // Si no hay un proyecto en edición, agrega uno nuevo
        const proyecto = {
            
            nombreProyecto,
            autor,
            descripcion,
            carrera,
            facultad,
            anio
        };
        proyectos.push(proyecto);
    }

    // Guarda los cambios en localStorage y actualiza la tabla
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
    actualizarTabla();

    modal.style.display = 'none';
    proyectoForm.reset();
    proyectoEnEdicion = null; // Restablece el proyecto en edición.
});


// Cargar los proyectos almacenados en localStorage al cargar la página
actualizarTabla();


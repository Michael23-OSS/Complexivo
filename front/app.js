document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formulario");
    const btnAgregar = document.getElementById("btnAgregar");
    const divclientes = document.querySelector(".div-clientes");

    // Función para cargar los clientes
    function cargarclientes() {
        fetch('http://10.40.26.23:8000/api/usuarios')
            .then(response => response.json())
            .then(data => {
                // Limpiar div de clientes antes de cargar nuevos
                divclientes.innerHTML = '';

                const table = document.createElement('table');
                const tableHeader = document.createElement('thead');
                const headerRow = document.createElement('tr');
                headerRow.innerHTML = '<th>ID</th><th>Usuario</th><th>address</th><th>phone</th><th>Acciones</th>';
                tableHeader.appendChild(headerRow);
                table.appendChild(tableHeader);

                const tableBody = document.createElement('tbody');

                data.forEach(cliente => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${cliente.id}</td>
                        <td>${cliente.usuario}</td>
                        <td>${cliente.address}</td>
                        <td>${cliente.phone}</td>
                        <td>
                            <button class="btn btnEditar" data-id="${cliente.id}">Editar</button>
                            <button class="btn btnEliminar" data-id="${cliente.id}">Eliminar</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });

                table.appendChild(tableBody);
                divclientes.appendChild(table);

                // Agregar eventos a los botones de editar y eliminar
                const btnsEditar = document.querySelectorAll('.btnEditar');
                btnsEditar.forEach(btn => {
                    btn.addEventListener('click', editarcliente);
                });

                const btnsEliminar = document.querySelectorAll('.btnEliminar');
                btnsEliminar.forEach(btn => {
                    btn.addEventListener('click', eliminarcliente);
                });
            })
            .catch(error => alert('Error al cargar clientes:', error));
    }

    // Función para editar un cliente
    function editarcliente(event) {
        const idcliente = event.target.dataset.id;
        fetch(`http://10.40.26.23:8000/api/usuarios/${idcliente}`)
            .then(response => response.json())
            .then(cliente => {
                // Llenar el formulario con los detalles del cliente
                document.getElementById("usuario").value = cliente.usuario;
                document.getElementById("address").value = cliente.address;
                document.getElementById("phone").value = cliente.phone;

                // Cambiar el texto del botón de agregar a "Actualizar"
                btnAgregar.textContent = "Actualizar";
                // Agregar un atributo de datos al botón para almacenar el ID del cliente a actualizar
                btnAgregar.setAttribute("data-id", idcliente);

                // Agregar un manejador de eventos para la actualización
                btnAgregar.removeEventListener("click", agregarcliente);
                btnAgregar.addEventListener("click", actualizarcliente);
            })
            .catch(error => alert('Error al obtener detalles del cliente:', error));
    }

    // Función para actualizar un cliente
    function actualizarcliente(event) {
        event.preventDefault();

        const idcliente = event.target.dataset.id;
        const usuario = document.getElementById("usuario").value;
        const address = document.getElementById("address").value;
        const phone = document.getElementById("phone").value;

        fetch(`http://10.40.26.23:8000/api/usuarios/${idcliente}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idcliente,
                usuario: usuario,
                address: address,
                phone: phone
            })
        })
        .then(response => {
            if (response.ok) {
                alert('cliente actualizado con éxito.');
                cargarclientes(); // Volver a cargar clientes después de actualizar uno
                // Reiniciar el formulario y el botón
                reiniciarFormulario();
            } else {
                alert('Error al actualizar cliente.');
            }
        })
        .catch(error => alert('Error al actualizar cliente:', error));
    }

    // Función para reiniciar el formulario y el botón de agregar
    function reiniciarFormulario() {
        document.getElementById("usuario").value = "";
        document.getElementById("address").value = "";
        document.getElementById("phone").value = "";

        btnAgregar.textContent = "Agregar";
        btnAgregar.removeAttribute("data-id");

        // Restaurar el manejador de eventos original del botón de agregar
        btnAgregar.removeEventListener("click", actualizarcliente);
        btnAgregar.addEventListener("click", agregarcliente);
    }

    // Función para eliminar un cliente
    function eliminarcliente(event) {
        const idcliente = event.target.dataset.id;
        fetch(`http://10.40.26.23:8000/api/usuarios/${idcliente}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('cliente eliminado con éxito.');
                cargarclientes(); // Volver a cargar clientes después de eliminar uno
            } else {
                alert('Error al eliminar cliente.');
            }
        })
        .catch(error => alert('Error al eliminar cliente:', error));
    }

    // Función para agregar un nuevo cliente
    function agregarcliente(event) {
        event.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const address = document.getElementById("address").value;
        const phone = document.getElementById("phone").value;

        fetch('http://10.40.26.23:8000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `usuario=${usuario}&address=${address}&phone=${phone}`
        })
        .then(response => response.json())
        .then(data => {
            alert('cliente agregado con éxito');
            cargarclientes(); // Volver a cargar clientes después de agregar uno nuevo
        })
        .catch(error => alert('Error al agregar cliente:', error));
    }

    // Agregar evento al botón de agregar
    btnAgregar.addEventListener('click', agregarcliente);

    // Cargar clientes al cargar la página
    cargarclientes();
});

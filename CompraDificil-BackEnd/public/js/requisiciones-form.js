document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams(window.location.search);
    const reqId = params.get('id'); 
    
    const selectProducto = document.getElementById('selectProducto');
    const selectEstado = document.getElementById('id_estadoSC'); // Movido adentro
    const btnAdd = document.getElementById('btnAdd');
    const tbody = document.querySelector('#tempTable tbody');
    const reqForm = document.getElementById('reqForm');
    const title = document.querySelector('h2');
    const submitBtn = reqForm.querySelector('button[type="submit"]');
    
    let dbProductos = []; 
    let carrito = []; 

    // --- FUNCIÓN PARA CARGAR ESTADOS ---
    async function cargarEstados() {
        try {
            const res = await fetch('/api/estados', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const estados = await res.json();
            selectEstado.innerHTML = '<option value="">-- Selecciona un estado --</option>';
            estados.forEach(e => {
                const opt = document.createElement('option');
                opt.value = e.id_estadoSC;
                opt.textContent = e.nombre_estadoSC;
                selectEstado.appendChild(opt);
            });
            // Si ya tenemos el ID del estado por la edición, lo seleccionamos
            if (reqId && window.estadoActualId) {
                selectEstado.value = window.estadoActualId;
            }
        } catch (e) { console.error("Error cargando estados", e); }
    }

    // 1. Cargar catálogo de productos y estados
    cargarEstados();
    try {
        const res = await fetch('/api/productos', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        dbProductos = await res.json();
        dbProductos.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id_producto;
            opt.textContent = `${p.nombre_producto} ($${p.precio_base})`;
            selectProducto.appendChild(opt);
        });
    } catch (e) { console.error("Error cargando productos", e); }

    // --- 1.5 LÓGICA DE EDICIÓN ---
    if (reqId) {
        title.textContent = "Editar Requisición";
        submitBtn.textContent = "Actualizar Requisición";

        try {
            const res = await fetch(`/api/requisiciones/${reqId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch(e) {
                console.error("El servidor devolvió algo que no es JSON:", text);
                return;
            }

            if (res.ok) {
                document.getElementById('justificacion').value = data.justificacion_solicitud;
                // Guardamos el ID del estado para que cargarEstados lo use al terminar de llenar el select
                window.estadoActualId = data.id_estadoSC;
                selectEstado.value = data.id_estadoSC;

                if (data.detalles) {
                    carrito = data.detalles.map(d => {
                        const pBase = parseFloat(d.precio_estimado || 0);
                        const cant = parseInt(d.cantidad_producto || 0);
                        return {
                            id_producto: d.id_producto,
                            nombre: d.producto ? d.producto.nombre_producto : 'Producto no encontrado',
                            cantidad: cant,
                            precio: pBase,
                            subtotal: cant * pBase
                        };
                    });
                    renderTable();
                }
            }
        } catch (e) { console.error("Error cargando datos de la requisición", e); }
    }

    // 2. Añadir a la tabla temporal
    btnAdd.addEventListener('click', () => {
        const id = selectProducto.value;
        const cant = parseInt(document.getElementById('inputCantidad').value);
        const prod = dbProductos.find(p => p.id_producto == id);

        if (!prod) return alert("Selecciona un producto");
        if (isNaN(cant) || cant <= 0) return alert("Ingresa una cantidad válida");

        const item = {
            id_producto: prod.id_producto,
            nombre: prod.nombre_producto,
            cantidad: cant,
            precio: parseFloat(prod.precio_base),
            subtotal: cant * parseFloat(prod.precio_base)
        };

        carrito.push(item);
        renderTable();
    });

    function renderTable() {
        tbody.innerHTML = '';
        let total = 0;
        carrito.forEach((item, index) => {
            const sub = parseFloat(item.subtotal) || 0;
            total += sub;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.nombre || 'N/A'}</td>
                <td>${item.cantidad}</td>
                <td>$${parseFloat(item.precio).toFixed(2)}</td>
                <td>$${sub.toFixed(2)}</td>
                <td><button type="button" onclick="removeItem(${index})" class="btn-danger">Eliminar</button></td>
            `;
            tbody.appendChild(row);
        });
        document.getElementById('totalLabel').textContent = `Total Estimado: $${total.toFixed(2)}`;
    }

    window.removeItem = (index) => {
        carrito.splice(index, 1);
        renderTable();
    };

    // 3. Enviar
    reqForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (carrito.length === 0) return alert("Agrega al menos un producto");

        const payload = {
            justificacion_solicitud: document.getElementById('justificacion').value,
            id_estadoSC: selectEstado.value, // CAMBIO: Ahora enviamos el estado seleccionado
            items: carrito 
        };

        const url = reqId ? `/api/requisiciones/${reqId}` : '/api/requisiciones';
        const method = reqId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert(reqId ? "Requisición actualizada" : "Requisición enviada");
                window.location.href = 'requisiciones.html';
            } else {
                const errData = await res.json();
                alert("Error: " + (errData.message || "No se pudo procesar"));
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    });
});
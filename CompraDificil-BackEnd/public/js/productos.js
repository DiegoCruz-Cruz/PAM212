document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const status = document.getElementById('status');
    const tbody = document.querySelector('#productsTable tbody');
    const refreshBtn = document.getElementById('refreshBtn');
    const search = document.getElementById('search');

    let products = [];

    const normalize = (str) => (str ?? '').toString().toLowerCase().trim();

    function render(list) {
        tbody.innerHTML = '';
        if (!list.length) {
            status.textContent = 'No hay productos para mostrar.';
            return;
        }

        status.textContent = `Productos encontrados: ${list.length}`;

        for (const p of list) {
            const tr = document.createElement('tr');
            // IMPORTANTE: p.id_producto debe ser el nombre exacto de tu PK en el JSON de Laravel
            tr.innerHTML = `
                <td><strong>${p.sku_producto}</strong></td>
                <td>${p.nombre_producto}</td>
                <td>$${parseFloat(p.precio_base).toFixed(2)}</td>
                <td>${p.categoria?.nombre_categoria ?? 'Sin categoría'}</td>
                <td>${p.unidad_medida ?? 'N/A'}</td>
                <td>${p.stock_minimo}</td>
                <td>
                    <div class="actions">
                        <button class="btn btn-small" data-action="edit" data-id="${p.id_producto}">Editar</button>
                        <button class="btn btn-small btn-danger" data-action="delete" data-id="${p.id_producto}">Eliminar</button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        }
    }

    async function fetchProducts() {
        status.textContent = 'Cargando productos...';
        try {
            const res = await fetch('/api/productos', {
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Accept': 'application/json' 
                }
            });
            const data = await res.json();
            
            // Laravel a veces envuelve la respuesta en 'data', manejamos ambos casos
            products = Array.isArray(data) ? data : (data.data || []);
            render(products);
        } catch (err) {
            status.textContent = 'Error: ' + err.message;
        }
    }

    // --- Lógica de Búsqueda ---
    search.addEventListener('input', () => {
        const q = normalize(search.value);
        const filtered = products.filter(p => 
            normalize(p.sku_producto).includes(q) || 
            normalize(p.nombre_producto).includes(q) ||
            normalize(p.categoria?.nombre_categoria).includes(q)
        );
        render(filtered);
    });

    // --- Lógica de Acciones (Editar/Eliminar) ---
    tbody.addEventListener('click', async (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;

        const action = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');

        console.log(`Acción: ${action}, ID capturado: ${id}`); // Debug en consola

        if (action === 'edit') {
            if (!id || id === 'undefined') {
                console.error("ID de producto no encontrado en el botón");
                return;
            }
            // Redirige pasando el ID en la URL
            window.location.href = `productos-form.html?id=${id}`;
            
        } else if (action === 'delete') {
            if (!confirm('¿Estás seguro de eliminar este producto?')) return;
            try {
                const res = await fetch(`/api/productos/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    fetchProducts();
                } else {
                    alert("No se pudo eliminar el producto, ya que está siendo utilizado.");
                }
            } catch (err) { 
                alert("Error de conexión: " + err.message); 
            }
        }
    });

    refreshBtn.addEventListener('click', fetchProducts);
    fetchProducts();
});
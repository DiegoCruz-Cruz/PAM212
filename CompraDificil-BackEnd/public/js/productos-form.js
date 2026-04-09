document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Detectar el ID en la URL (?id=...)
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const form = document.getElementById('productForm');
    const msg = document.getElementById('msg');
    const catSelect = document.getElementById('id_categoria');
    const title = document.getElementById('title');

    // 1. Cargar el catálogo de Categorías (Siempre necesario)
    try {
        const res = await fetch('/api/categorias', {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json' 
            }
        });
        const categorias = await res.json();
        
        catSelect.innerHTML = '<option value="">-- Selecciona Categoría --</option>';
        categorias.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.id_categoria; // Tu PK de la tabla Categorias
            opt.textContent = cat.nombre_categoria;
            catSelect.appendChild(opt);
        });
    } catch (err) {
        console.error("Error cargando categorías:", err);
    }

    // 2. MODO EDICIÓN: Si hay un ID, cargar los datos del producto
    if (id) {
        title.textContent = 'Editar Producto';
        try {
            const res = await fetch(`/api/productos/${id}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json' 
                }
            });
            
            if (!res.ok) throw new Error("No se pudo obtener el producto");
            
            const p = await res.json();
            
            // Rellenar el formulario con los datos que vienen del servidor
            document.getElementById('sku_producto').value = p.sku_producto;
            document.getElementById('nombre_producto').value = p.nombre_producto;
            document.getElementById('descripcion_producto').value = p.descripcion_producto || '';
            document.getElementById('precio_base').value = p.precio_base;
            document.getElementById('unidad_medida').value = p.unidad_medida;
            document.getElementById('stock_minimo').value = p.stock_minimo;
            
            // IMPORTANTE: Esperar a que las categorías carguen para seleccionar la correcta
            catSelect.value = p.id_categoria;

        } catch (err) {
            msg.textContent = "Error: " + err.message;
            msg.style.color = "red";
        }
    }

    // 3. EVENTO GUARDAR (POST para nuevo, PUT para editar)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        msg.textContent = "Guardando...";

        const payload = {
            sku_producto: document.getElementById('sku_producto').value,
            nombre_producto: document.getElementById('nombre_producto').value,
            descripcion_producto: document.getElementById('descripcion_producto').value,
            precio_base: document.getElementById('precio_base').value,
            id_categoria: catSelect.value,
            unidad_medida: document.getElementById('unidad_medida').value,
            stock_minimo: document.getElementById('stock_minimo').value,
        };

        try {
            const url = id ? `/api/productos/${id}` : '/api/productos';
            const method = id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Error al procesar la solicitud");
            }

            msg.textContent = "✅ Producto guardado correctamente.";
            msg.style.color = "green";

            // Redirigir después de un breve momento
            setTimeout(() => window.location.href = 'productos.html', 1000);

        } catch (err) {
            msg.textContent = "❌ " + err.message;
            msg.style.color = "red";
        }
    });
});
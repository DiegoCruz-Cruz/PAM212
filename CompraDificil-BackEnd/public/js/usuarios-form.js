document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const form = document.getElementById('userForm');
    const msg = document.getElementById('msg');
    const rolSelect = document.getElementById('id_rol');
    const deptoSelect = document.getElementById('id_departamento');

    // 1. Cargar Roles y Departamentos (Lo que SÍ necesita el usuario)
    try {
        // Cargar Roles
        const resRoles = await fetch('/api/roles', {
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        });
        const roles = await resRoles.json();
        rolSelect.innerHTML = '<option value="">-- Selecciona Rol --</option>';
        roles.forEach(r => {
            rolSelect.innerHTML += `<option value="${r.id_rol}">${r.nombre_rol}</option>`;
        });

        // Cargar Departamentos
        const resDeptos = await fetch('/api/departamentos', {
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        });
        const deptos = await resDeptos.json();
        deptoSelect.innerHTML = '<option value="">-- Selecciona Departamento --</option>';
        deptos.forEach(d => {
            deptoSelect.innerHTML += `<option value="${d.id_departamento}">${d.nombre_departamento}</option>`;
        });
    } catch (err) {
        console.error("Error cargando catálogos", err);
    }

    // 2. Si es edición, cargar datos del USUARIO
    if (id) {
        document.getElementById('title').textContent = 'Editar Usuario';
        document.getElementById('subtitle').textContent = 'Modifica los datos del usuario seleccionado';
        try {
            const res = await fetch(`/api/usuarios/${id}`, {
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
            });
            const u = await res.json();
            
            document.getElementById('nombre_usuario').value = u.nombre_usuario;
            document.getElementById('apellido_p').value = u.apellido_p;
            document.getElementById('apellido_m').value = u.apellido_m || '';
            document.getElementById('gmail_usuario').value = u.gmail_usuario;
            document.getElementById('id_rol').value = u.id_rol;
            document.getElementById('id_departamento').value = u.id_departamento;
            // La contraseña se deja vacía por seguridad
        } catch (err) {
            msg.textContent = "Error cargando usuario";
        }
    }

    // 3. Guardar Usuario (POST o PUT)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const payload = {
            nombre_usuario: document.getElementById('nombre_usuario').value,
            apellido_p: document.getElementById('apellido_p').value,
            apellido_m: document.getElementById('apellido_m').value,
            gmail_usuario: document.getElementById('gmail_usuario').value,
            id_rol: document.getElementById('id_rol').value,
            id_departamento: document.getElementById('id_departamento').value,
        };

        // Solo enviamos password si el usuario escribió algo
        const pass = document.getElementById('password_usuario').value;
        if (pass) payload.password_usuario = pass;

        try {
            const method = id ? 'PUT' : 'POST';
            const url = id ? `/api/usuarios/${id}` : '/api/usuarios';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                msg.textContent = "¡Usuario guardado correctamente!";
                msg.className = "status success"; // Asegúrate de tener esta clase en CSS
                setTimeout(() => window.location.href = 'usuarios.html', 1000);
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error al guardar");
            }
        } catch (err) {
            msg.textContent = err.message;
            msg.style.color = "red";
        }
    });
});
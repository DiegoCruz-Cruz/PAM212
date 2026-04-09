document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    const status = document.getElementById('status');
    const tbody = document.querySelector('#usersTable tbody');
    const refreshBtn = document.getElementById('refreshBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const search = document.getElementById('search');

    let users = [];

    const normalize = (str) => (str ?? '').toString().toLowerCase().trim();
    const firstOrSelf = (x) => Array.isArray(x) ? (x[0] ?? null) : x;

    function render(list) {
        tbody.innerHTML = '';
        
        if (!list.length) {
            status.textContent = 'No hay usuarios para mostrar.';
            return;
        }

        status.textContent = `Usuarios: ${list.length}`;

        for (const u of list) {
            // Ajuste de relaciones: Aseguramos compatibilidad con lo que devuelva el modelo
            const rolObj = firstOrSelf(u.roles || u.rol);
            const depObj = firstOrSelf(u.departamentos || u.departamento);

            const rol = rolObj?.nombre_rol ?? 'Sin rol';
            const dep = depObj?.nombre_departamento ?? 'Sin depto';
            
            // Priorizamos id_usuario que es el nombre real en tu DB
            const idUsuario = u.id_usuario || u.id; 

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${idUsuario ?? ''}</td>
                <td>${u.nombre_usuario ?? 'N/A'}</td>
                <td>${u.gmail_usuario ?? ''}</td>
                <td>${rol}</td>
                <td>${dep}</td>
                <td>
                    <div class="actions">
                        <button class="btn btn-small" 
                        data-action="edit" data-id="${idUsuario}">Editar</button>
                        <button class="btn btn-small" 
                        data-action="encrypt" data-id="${idUsuario}">Encriptar</button>
                        <button class="btn btn-small btn-danger" 
                        data-action="delete" data-id="${idUsuario}">Eliminar</button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        }
    }

    async function fetchUsers() {
        status.textContent = 'Cargando usuarios...';
        tbody.innerHTML = '';

        try {
            const res = await fetch('/api/usuarios', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ` + token
                }
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                status.textContent = data?.message || 'No se pudieron cargar los usuarios.';
                if (res.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login.html';
                }
                return;
            }

            users = Array.isArray(data) ? data : (data.data || []);
            render(users);

        } catch (err) {
            status.textContent = 'Error: ' + err.message;
        }
    }

    search.addEventListener('input', () => {
        const q = normalize(search.value);
        if (!q) return render(users);

        const filtered = users.filter(u => {
            const rolObj = firstOrSelf(u.roles || u.rol);
            const depObj = firstOrSelf(u.departamentos || u.departamento);

            const rol = normalize(rolObj?.nombre_rol);
            const nombre = normalize(u.nombre_usuario);
            const email = normalize(u.gmail_usuario);

            return nombre.includes(q) || rol.includes(q) || email.includes(q);
        });

        render(filtered);
    });

    tbody.addEventListener('click', async (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;

        const action = btn.dataset.action;
        const id = btn.dataset.id;

        if (action === 'edit') {
            window.location.href = `/usuarios-form.html?id=${encodeURIComponent(id)}`;
            return;
        }

        if (action === 'delete') {
            const ok = confirm('¿Confirma que desea eliminar este usuario?');
            if (!ok) return;

            try {
                const res = await fetch(`/api/usuarios/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ` + token
                    }
                });

                if (res.ok) {
                    await fetchUsers(); 
                    return;
                }

                const data = await res.json().catch(() => ({}));
                alert(data?.message || 'No se pudo eliminar el usuario.');

            } catch (err) {
                alert('Error: ' + err.message);
            }
            return;
        }

        if (action === 'encrypt') {
            const nueva = prompt('Ingrese la nueva contraseña para este usuario (Al menos 6 caracteres):');
            if (nueva === null) return; 
            if (nueva.trim().length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            try {
                const res = await fetch(`/api/usuarios/${id}/rehash`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ` + token
                    },
                    body: JSON.stringify({ password_usuario: nueva.trim() })
                });

                const data = await res.json().catch(() => ({}));

                if (!res.ok) {
                    alert(data?.message || 'No se pudo actualizar la contraseña.');
                    return;
                }

                alert('Contraseña actualizada (Hasheada) ✅.');
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }
    });

    refreshBtn.addEventListener('click', fetchUsers);

    logoutBtn.addEventListener('click', async () => {
        try {
            await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ` + token 
                }
            });
        } catch (_) {}

        localStorage.removeItem('token');
        window.location.href = '/login.html';
    });

    fetchUsers();
});
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const status = document.getElementById('status');
    const logoutBtn = document.getElementById('logoutBtn');

    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    try {
        const res = await fetch('/api/me', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        if (!res.ok) {
            localStorage.removeItem('token');
            window.location.href = '/login.html';
            return;
        }

        const me = await res.json();
        console.log("Datos recibidos de /me:", me); // Esto te ayudará a ver en la consola qué llega

        const nombreCompleto = me.nombre_usuario 
            ? `${me.nombre_usuario} ${me.apellido_p ?? ''} ${me.apellido_m ?? ''}`.trim()
            : 'Usuario desconocido';

        status.textContent = `Bienvenido/a: ${nombreCompleto}`;
    } catch (err) {
        status.textContent = 'No se pudo validar sesión.';
    }

    logoutBtn.addEventListener('click', async () => {
        try {
            await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
        } catch (_) {}

        localStorage.removeItem('token');
        window.location.href = '/login.html';
    });
});
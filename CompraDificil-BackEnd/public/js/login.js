document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const msg = document.getElementById('msg');
    const submitBtn = document.getElementById('submitBtn');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Deshabilitar el botón durante la petición
        submitBtn.disabled = true;

        // Limpiar mensajes previos
        msg.className = 'msg info';
        msg.textContent = 'Verificando credenciales...';
        
        const correoValue = document.getElementById('usuario').value.trim();
        const contrasenaValue = document.getElementById('contrasena').value;

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ 
                    email: correoValue, 
                    password_usuario: contrasenaValue
                })
            });

            const data = await res.json();

            if (!res.ok) {
                msg.className = 'msg error';
                
                // Mostrar errores de validación si existen
                if (data.errors) {
                    const primeraError = Object.values(data.errors)[0];
                    msg.textContent = Array.isArray(primeraError) ? primeraError[0] : primeraError;
                } else {
                    msg.textContent = data.message || 'Credenciales incorrectas.';
                }
                
                submitBtn.disabled = false;
                return;
            }

            // Validar que se recibió el token
            if (!data.token) {
                msg.className = 'msg error';
                msg.textContent = 'Error: No se recibió el token del servidor.';
                submitBtn.disabled = false;
                return;
            }

            // Guardar datos en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', data.rol);
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userName', data.nombre);
            localStorage.setItem('sucursal', data.sucursal);
            localStorage.setItem('sucursal_id', data.sucursal_id);

            // Mostrar mensaje de éxito
            msg.className = 'msg success';
            msg.textContent = `¡Bienvenido ${data.nombre}! Redirigiendo...`;

            // Redirigir según el rol
            setTimeout(() => {
                // Puedes personalizar el dashboard según el rol
                const roleDashboard = {
                    'Admin': '/dashboard-admin.html',
                    'Vendedor': '/dashboard-vendedor.html',
                    'Analista': '/dashboard-analista.html'
                };

                const redirectUrl = roleDashboard[data.rol] || '/dashboard.html';
                window.location.href = redirectUrl;
            }, 1500);

        } catch (error) {
            msg.className = 'msg error';
            msg.textContent = 'Error de conexión: ' + error.message;
            submitBtn.disabled = false;
            console.error('Error:', error);
        }
    });
});
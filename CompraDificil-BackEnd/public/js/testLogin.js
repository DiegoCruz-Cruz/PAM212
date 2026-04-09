console.log('login.js cargó correctamente');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const output = document.getElementById('output');
    const meBtn = document.getElementById('meBtn');
    const meOut = document.getElementById('meOut');

    if (!form || !output) {
        console.error('Falta #loginForm o #output. Revisa que estés en /login.html y recarga sin caché');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const usuarioEl = document.getElementById('usuario'); 
        const contrasenaEl = document.getElementById('password');

        const usuario = usuarioEl.value.trim();
        const contrasena = contrasenaEl.value;

        output.textContent = 'Enviando...';

        try {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // En tu fetch de JS
        body: JSON.stringify({ 
            email: usuario,           // <--- Cambio aquí
            password_usuario: contrasena 
        })
    });

            const text = await res.text();
            let data;

            try {data = JSON.parse(text); }
            catch { output.textContent = 'HTTP ${res.status}\n' + text; return; }

            output.textContent = JSON.stringify(data, null, 2);
            if (data.token) localStorage.setItem('token', data.token);
        } catch (err) {
            output.textContent = 'Error: ' + err.message;
        }
    });

    if (meBtn && meOut) {
        meBtn.addEventListener('click', async () => {
            const token = localStorage.getItem('token');

            if (!token) { meOut.textContent = 'No hay token. Primero haz login.'; return; }

            meOut.textContent = 'Consultando...';

            try {
                const res = await fetch('/api/me', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token 
                    }
                });

                const text = await res.text();
                let data;

                try { data = JSON.parse(text); }
                catch { meOut.textContent = 'HTTP ${res.status}\n' + text; return; }

                meOut.textContent = JSON.stringify(data, null, 2);
            } catch (err) {
                meOut.textContent = 'Error: ' + err.message;
            }
        });
    }
});
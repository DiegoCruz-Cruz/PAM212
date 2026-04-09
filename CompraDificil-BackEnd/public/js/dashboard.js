document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/login.html'; return; }

    const welcome = document.getElementById('welcome');
    const logoutBtn = document.getElementById('logoutBtn');

    const kpiBorrador = document.getElementById('kpiBorrador');
    const kpiAprobadas = document.getElementById('kpiAprobadas');
    const kpiRechazadas = document.getElementById('kpiRechazadas');

    const chartSubtitle = document.getElementById('chartSubtitle');
    const chartContainer = document.getElementById('reqPieChart');

    google.charts.load('current', { packages: ['corechart'] });

    async function fetchJSON(url, opts = {}) {
        const res = await fetch(url, {
            ...opts,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token, 
                ...(opts.headers || {})
            }
        });

        if (res.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login.html';
            return;
        }

        if (res.status === 204) return { ok: true, data: null };

        const data = await res.json().catch(() => ({}));
        return { ok: res.ok, status: res.status, data };
    }

    async function loadMe() {
        const r = await fetchJSON('api/me');
        if (!r.ok) {
            welcome.textContent = 'Sesión Activa.';
            return;
        }

        const me = r.data; 
        const nombreCompleto = me.nombre_usuario 
            ? `${me.nombre_usuario} ${me.apellido_p ?? ''} ${me.apellido_m ?? ''}`.trim()
            : (me.usuario ?? 'Usuario');
            
        welcome.textContent = `¿Cómo estás ${nombreCompleto}?`;
    }

    async function loadResumen() {
        if (!chartSubtitle) return;
        chartSubtitle.textContent = 'Cargando resumen...';

        const r = await fetchJSON('api/requisiciones/resumen');
        
        if (!r.ok) {
            chartSubtitle.textContent = r.data?.message || 'No se pudo cargar el resumen.';
            return;
        }

        const borrador = Number(r.data?.borrador ?? 0);
        const aprobadas = Number(r.data?.aprobadas ?? 0);
        const rechazadas = Number(r.data?.rechazadas ?? 0);
        const total = Number(r.data?.total ?? 0);

        if (kpiBorrador) kpiBorrador.textContent = borrador;
        if (kpiAprobadas) kpiAprobadas.textContent = aprobadas;
        if (kpiRechazadas) kpiRechazadas.textContent = rechazadas;

        if(total === 0) {
            chartSubtitle.textContent = 'No hay requisiciones registradas.';
            if (chartContainer) chartContainer.innerHTML = '';
            return;
        }

        const p1 = Math.round((borrador / total) * 100);
        const p2 = Math.round((aprobadas / total) * 100);
        const p3 = Math.max(0, 100 - p1 - p2);

        chartSubtitle.textContent = `Total: ${total} | En Proceso ${p1}% | Aprobadas ${p2}% | Rechazadas ${p3}%`;

        google.charts.setOnLoadCallback(() => {
            if (!chartContainer) return;
            const table = google.visualization.arrayToDataTable([
                ['Estatus', 'Cantidad'],
                ['En Proceso', borrador],
                ['Aprobadas', aprobadas],
                ['Rechazadas', rechazadas],
            ]);

            const options = {
                legend: { position: 'bottom' },
                pieHole: 0.35,
                chartArea: { width: '92%', height: '80%' }
            };

            const chart = new google.visualization.PieChart(chartContainer);
            chart.draw(table, options);
        });
    }

    async function loadAprobadasPorDepartamento() {
        const subtitle = document.getElementById('depSubtitle');
        const container = document.getElementById('depPieChart'); // Corregido el ID para que empate con el HTML
        if (!container) return;

        subtitle.textContent = 'Cargando...';

        const r = await fetchJSON('api/requisiciones/aprobadas-por-departamento');
        if (!r.ok) {
            subtitle.textContent = r.data?.message || 'No se pudo cargar.';
            return;
        }

        const rows = Array.isArray(r.data) ? r.data : [];
        const total = rows.reduce((acc, x) => acc + Number(x.total || 0), 0);

        if (!total) {
            subtitle.textContent = 'No hay requisiciones aprobadas aún.';
            if (container) container.innerHTML = '';
            return;
        }

        subtitle.textContent = `Total aprobadas: ${total}`;

        google.charts.setOnLoadCallback(() => {
            const table = google.visualization.arrayToDataTable([
                ['Departamento', 'Aprobadas'],
                ...rows.map(x => [x.departamento, Number(x.total)])
            ]);

            const options = {
                legend: { position: 'none' },
                chartArea: { width: '88%', height: '75%' },
                hAxis: { title: 'Departamento' },
                vAxis: { title: 'Aprobadas', minValue: 0, format: '0' },
                colors: ['#4e73df']
            };

            new google.visualization.ColumnChart(container).draw(table, options);
        })
    }

    async function loadAprobadasPorMes2026() {
        const subtitle = document.getElementById('mesSubtitle');
        const container = document.getElementById('mesChart');
        if (!container) return;

        subtitle.textContent = 'Cargando...';

        const r = await fetchJSON('api/requisiciones/aprobadas-por-mes-2026');
        if (!r.ok) {
            subtitle.textContent = r.data?.message || 'No se pudo cargar.';
            return;
        }

        // Corregido: Usamos data para el reduce
        const data = r.data?.data ?? [];
        const total = data.reduce((acc, x) => acc + Number(x.total || 0), 0);

        if (total === 0) { // Es mejor comparar con 0 directamente
            subtitle.textContent = 'No hay requisiciones aprobadas en 2026.';
            container.innerHTML = '';
            return;
        }

        subtitle.textContent = `Año 2026 | Total aprobadas: ${total}`;

        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

        google.charts.setOnLoadCallback(() => {
            const table = google.visualization.arrayToDataTable([
                ['Mes', 'Aprobadas'],
                ...data.map(x => [meses[(x.mes || 1) - 1], Number(x.total)])
            ]);

            const options = {
                legend: { position: 'none' },
                chartArea: { width: '90%', height: '75%' },
                hAxis: { slantedText: false },
                vAxis: { minValue: 0, format: '0' }, // format '0' evita decimales en el eje Y
                colors: ['#36b9cc']
            };

            new google.visualization.ColumnChart(container).draw(table, options);
        });
    }

    logoutBtn.addEventListener('click', async () => {
        try {
            await fetch('api/logout', {
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

    await loadMe();
    await loadResumen();
    await loadAprobadasPorDepartamento();
    await loadAprobadasPorMes2026(); // Descomentado
});
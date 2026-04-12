/**
 * Dashboard CompraDifícil
 * Maneja diferentes vistas según el rol del usuario
 */

// Cargar Google Charts
google.charts.load('current', { packages: ['corechart', 'bar', 'table'] });

let currentUser = null;

// ════════════════════════════════════════════════════════════════════════════
// INICIALIZACIÓN
// ════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', async () => {
    // Verificar autenticación
    currentUser = await checkAuth();
    
    if (!currentUser) {
        return;
    }

    // Mostrar información del usuario
    initializeUserInfo(currentUser);

    // Cargar menú según rol
    initializeMenu(currentUser.rol);

    // Mostrar la vista correcta según el rol
    showViewByRole(currentUser.rol);

    // Cargar datos según rol
    await loadDashboardData(currentUser.rol);

    // Event listeners
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('refreshBtn').addEventListener('click', () => {
        loadDashboardData(currentUser.rol);
    });
});

// ════════════════════════════════════════════════════════════════════════════
// INTERFAZ DE USUARIO
// ════════════════════════════════════════════════════════════════════════════

/**
 * Mostrar información del usuario en sidebar
 */
function initializeUserInfo(user) {
    const userName = `${user.nombre} ${user.ap}`.trim();
    const initial = user.nombre.charAt(0).toUpperCase();

    document.getElementById('userName').textContent = userName;
    document.getElementById('userRole').textContent = user.rol;
    document.getElementById('userInitial').textContent = initial;
    document.getElementById('welcome').textContent = `Bienvenido, ${user.nombre} (${user.sucursal})`;
    document.getElementById('roleTag').textContent = getRoleLabel(user.rol);
}

/**
 * Crear menú según rol
 */
function initializeMenu(rol) {
    const menu = document.getElementById('mainMenu');
    const menuItems = getMenuByRole(rol);

    menu.innerHTML = menuItems
        .map(item => `
            <a class="menu__item" href="${item.href}" title="${item.label}">
                ${item.icon} ${item.label}
            </a>
        `)
        .join('');
}

/**
 * Mostrar la vista correcta según el rol
 */
function showViewByRole(rol) {
    // Ocultar todas las vistas
    document.querySelectorAll('.view-section').forEach(el => {
        el.style.display = 'none';
    });

    // Mostrar la vista del rol
    const viewId = getRoleViewId(rol);
    const view = document.getElementById(viewId);

    if (view) {
        view.style.display = 'flex';
    } else {
        document.getElementById('accessDenied').style.display = 'flex';
    }
}

// ════════════════════════════════════════════════════════════════════════════
// CARGAR DATOS
// ════════════════════════════════════════════════════════════════════════════

/**
 * Cargar datos según el rol
 */
async function loadDashboardData(rol) {
    google.charts.setOnLoadCallback(() => {
        if (rol === 'Admin') {
            loadAdminDashboard();
        } else if (rol === 'Vendedor') {
            loadVendedorDashboard();
        } else if (rol === 'Analista') {
            loadAnalistaDashboard();
        }
    });
}

// ════════════════════════════════════════════════════════════════════════════
// DASHBOARD ADMIN
// ════════════════════════════════════════════════════════════════════════════

async function loadAdminDashboard() {
    document.getElementById('pageTitle').textContent = 'Dashboard Administrativo';

    // Cargar datos generales
    const [empleados, productos, ventas] = await Promise.all([
        apiGet('/empleados'),
        apiGet('/productos'),
        apiGet('/ventas'),
    ]);

    // KPIs
    document.getElementById('kpiEmpleados').textContent = empleados?.length || '0';
    document.getElementById('kpiProductos').textContent = productos?.length || '0';
    document.getElementById('kpiVentasHoy').textContent = 
        formatCurrency(ventas?.reduce((sum, v) => sum + (v.total_calculado || 0), 0) || 0);

    // Calcular stock bajo (< 5 unidades)
    const stockBajo = productos?.filter(p => p.stock < 5).length || 0;
    document.getElementById('kpiStockBajo').textContent = stockBajo;

    // Gráficos
    if (ventas && ventas.length > 0) {
        drawVentasPorSucursal(ventas);
        drawVentasMensuales(ventas);
        drawProductosTop(productos, ventas);
    }
}

/**
 * Gráfico: Ventas por Sucursal
 */
function drawVentasPorSucursal(ventas) {
    const sucursalMap = {};
    
    ventas.forEach(v => {
        const sucursal = v.sucursal || 'Sin sucursal';
        sucursalMap[sucursal] = (sucursalMap[sucursal] || 0) + (v.total_calculado || 0);
    });

    const data = [['Sucursal', 'Ventas']];
    Object.entries(sucursalMap).forEach(([sucursal, total]) => {
        data.push([sucursal, total]);
    });

    const options = {
        title: 'Ventas por Sucursal',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
            title: 'Sucursal',
        },
        vAxis: {
            title: 'Ventas ($)',
        },
        pointSize: 7,
    };

    const table = google.visualization.arrayToDataTable(data);
    const chart = new google.visualization.LineChart(document.getElementById('sucursalChart'));
    chart.draw(table, options);
}

/**
 * Gráfico: Ventas Mensuales 2026
 */
function drawVentasMensuales(ventas) {
    const mesesMap = {};
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    ventas.forEach(v => {
        const fecha = new Date(v.fecha);
        const mes = meses[fecha.getMonth()];
        mesesMap[mes] = (mesesMap[mes] || 0) + (v.total_calculado || 0);
    });

    const data = [['Mes', 'Ventas']];
    meses.forEach(mes => {
        data.push([mes, mesesMap[mes] || 0]);
    });

    const options = {
        title: 'Ventas Mensuales 2026',
        curveType: 'function',
        legend: { position: 'bottom' },
    };

    const table = google.visualization.arrayToDataTable(data);
    const chart = new google.visualization.LineChart(document.getElementById('ventasMesChart'));
    chart.draw(table, options);
}

/**
 * Gráfico: Top 5 Productos Vendidos
 */
function drawProductosTop(productos, ventas) {
    const productoMap = {};

    // Aquí necesitarías acceso a detalle_ventas para saber qué productos se vendieron
    // Por ahora, mostraremos los primeros 5 productos

    const topProductos = (productos || []).slice(0, 5);
    const data = [['Producto', 'Disponibles']];
    
    topProductos.forEach(p => {
        data.push([p.nombre, p.stock || 0]);
    });

    const options = {
        title: 'Top 5 Productos por Stock',
        pieHole: 0.4,
        legend: { position: 'bottom' },
    };

    const table = google.visualization.arrayToDataTable(data);
    const chart = new google.visualization.PieChart(document.getElementById('productosChart'));
    chart.draw(table, options);
}

// ════════════════════════════════════════════════════════════════════════════
// DASHBOARD VENDEDOR
// ════════════════════════════════════════════════════════════════════════════

async function loadVendedorDashboard() {
    document.getElementById('pageTitle').textContent = 'Mi Dashboard de Ventas';

    // Cargar mis ventas
    const misvetas = await apiGet('/ventas');
    
    if (!misvetas) {
        console.error('No se pudieron cargar las ventas');
        return;
    }

    const ventasHoy = misvetas.filter(v => esHoy(v.fecha));
    const ventasMes = misvetas.filter(v => estesMes(v.fecha));

    // KPIs
    const totalHoy = ventasHoy.reduce((sum, v) => sum + (v.total_calculado || 0), 0);
    const totalMes = ventasMes.reduce((sum, v) => sum + (v.total_calculado || 0), 0);
    const clientesUnicos = new Set(misvetas.map(v => v.id_cliente)).size;

    document.getElementById('kpiVentasHoyVendedor').textContent = formatCurrency(totalHoy);
    document.getElementById('kpiVentasMesVendedor').textContent = formatCurrency(totalMes);
    document.getElementById('kpiTransacciones').textContent = misvetas.length;
    document.getElementById('kpiClientesAtendidos').textContent = clientesUnicos;

    // Tabla de ventas recientes
    cargarTablaVentas(misvetas.slice(0, 10));

    // Gráfico: Ventas últimos 7 días
    if (misvetas.length > 0) {
        drawVentasUltimos7Dias(misvetas);
    }
}

/**
 * Cargar tabla de ventas recientes
 */
function cargarTablaVentas(ventas) {
    const tbody = document.getElementById('ventasTableBody');
    
    if (ventas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No hay ventas registradas</td></tr>';
        return;
    }

    tbody.innerHTML = ventas
        .map(v => `
            <tr>
                <td>${formatDate(v.fecha)}</td>
                <td>${v.cliente_nombre || 'Cliente ' + v.id_cliente}</td>
                <td>1</td>
                <td>${formatCurrency(v.total_calculado)}</td>
                <td>
                    <a href="#" onclick="verDetalleVenta(${v.id_venta})" style="color: #3b82f6; text-decoration: none;">
                        Ver
                    </a>
                </td>
            </tr>
        `)
        .join('');
}

/**
 * Gráfico: Ventas últimos 7 días
 */
function drawVentasUltimos7Dias(ventas) {
    const diasMap = {};
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    for (let i = 6; i >= 0; i--) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - i);
        const diaTexto = dias[fecha.getDay()];
        diasMap[diaTexto] = 0;
    }

    ventas.forEach(v => {
        const fecha = new Date(v.fecha);
        const hoy = new Date();
        
        if (fecha >= new Date(hoy.setDate(hoy.getDate() - 7))) {
            const diaTexto = dias[fecha.getDay()];
            diasMap[diaTexto] = (diasMap[diaTexto] || 0) + (v.total_calculado || 0);
        }
    });

    const data = [['Día', 'Ventas']];
    Object.entries(diasMap).forEach(([dia, total]) => {
        data.push([dia, total]);
    });

    const options = {
        title: 'Mis Ventas por Día',
        curveType: 'function',
        legend: { position: 'bottom' },
    };

    const table = google.visualization.arrayToDataTable(data);
    const chart = new google.visualization.LineChart(document.getElementById('ventasDiasChart'));
    chart.draw(table, options);
}

// ════════════════════════════════════════════════════════════════════════════
// DASHBOARD ANALISTA
// ════════════════════════════════════════════════════════════════════════════

async function loadAnalistaDashboard() {
    document.getElementById('pageTitle').textContent = 'Dashboard de Análisis';

    // Cargar datos
    const [ventas, productos, empleados] = await Promise.all([
        apiGet('/ventas'),
        apiGet('/productos'),
        apiGet('/empleados'),
    ]);

    if (!ventas) {
        console.error('No se pudieron cargar los datos de análisis');
        return;
    }

    // KPIs
    const ventasTotales = ventas.reduce((sum, v) => sum + (v.total_calculado || 0), 0);
    const promedio = ventas.length > 0 ? ventasTotales / ventas.length : 0;

    document.getElementById('kpiVentasTotales').textContent = formatCurrency(ventasTotales);
    document.getElementById('kpiPromedioVenta').textContent = formatCurrency(promedio);
    document.getElementById('kpiTotalTransacciones').textContent = ventas.length;
    document.getElementById('kpiCategoriaTop').textContent = 'Computadoras'; // Placeholder

    // Gráficos
    if (ventas.length > 0) {
        drawResumenVentasSucursal(ventas);
        drawVentasMensualesAnalista(ventas);
        drawCategorias(productos);
        drawVendedoresTop(empleados);
    }
}

/**
 * Gráfico: Resumen de Ventas por Sucursal
 */
function drawResumenVentasSucursal(ventas) {
    const sucursalMap = {};
    
    ventas.forEach(v => {
        const sucursal = v.sucursal || 'Sin sucursal';
        sucursalMap[sucursal] = (sucursalMap[sucursal] || 0) + (v.total_calculado || 0);
    });

    const data = [['Sucursal', 'Ventas', { role: 'style' }]];
    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#e94560'];
    
    Object.entries(sucursalMap).forEach(([sucursal, total], idx) => {
        data.push([sucursal, total, colors[idx % colors.length]]);
    });

    const options = {
        title: 'Ventas por Sucursal',
        legend: { position: 'none' },
        vAxis: {
            title: 'Ventas ($)',
        },
    };

    const table = google.visualization.arrayToDataTable(data);
    const chart = new google.visualization.BarChart(document.getElementById('analisisResumenChart'));
    chart.draw(table, options);
}

/**
 * Gráfico: Ventas Mensuales Analista
 */
function drawVentasMensualesAnalista(ventas) {
    const mesesMap = {};
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    ventas.forEach(v => {
        const fecha = new Date(v.fecha);
        const mes = meses[fecha.getMonth()];
        mesesMap[mes] = (mesesMap[mes] || 0) + (v.total_calculado || 0);
    });

    const data = [['Mes', 'Ventas', { role: 'annotation' }]];
    meses.forEach(mes => {
        const total = mesesMap[mes] || 0;
        data.push([mes, total, formatCurrency(total)]);
    });

    const options = {
        title: 'Ventas Mensuales 2026',
        curveType: 'function',
        pointSize: 7,
        legend: 'none',
    };

    const table = google.visualization.arrayToDataTable(data);
    const chart = new google.visualization.LineChart(document.getElementById('analisisMensualesChart'));
    chart.draw(table, options);
}

/**
 * Gráfico: Productos por Categoría
 */
function drawCategorias(productos) {
    const categoriaMap = {};
    
    (productos || []).forEach(p => {
        const cat = p.categoria || 'Sin categoría';
        categoriaMap[cat] = (categoriaMap[cat] || 0) + 1;
    });

    const data = [['Categoría', 'Cantidad']];
    Object.entries(categoriaMap).forEach(([cat, cantidad]) => {
        data.push([cat, cantidad]);
    });

    const options = {
        title: 'Productos por Categoría',
        pieHole: 0.4,
        legend: { position: 'bottom' },
    };

    const table = google.visualization.arrayToDataTable(data);
    const chart = new google.visualization.PieChart(document.getElementById('categoriasChart'));
    chart.draw(table, options);
}

/**
 * Gráfico: Top 10 Vendedores
 */
function drawVendedoresTop(empleados) {
    // Placeholder - necesitarías datos de ventas por vendedor
    const data = [['Vendedor', 'Ventas Totales']];
    
    (empleados || []).slice(0, 10).forEach(e => {
        data.push([`${e.nombre} ${e.ap}`, Math.floor(Math.random() * 10000)]);
    });

    const options = {
        title: 'Top 10 Vendedores',
        legend: { position: 'bottom' },
        hAxis: {
            title: 'Vendedor',
        },
        vAxis: {
            title: 'Ventas ($)',
        },
    };

    const table = google.visualization.arrayToDataTable(data);
    const chart = new google.visualization.ColumnChart(document.getElementById('vendedoresChart'));
    chart.draw(table, options);
}

// ════════════════════════════════════════════════════════════════════════════
// UTILIDADES
// ════════════════════════════════════════════════════════════════════════════

/**
 * Obtener etiqueta del rol
 */
function getRoleLabel(rol) {
    const labels = {
        'Admin': '👨‍💼 Administrador',
        'Vendedor': '🛍️ Vendedor',
        'Analista': '📊 Analista',
    };
    return labels[rol] || rol;
}

/**
 * Obtener items del menú según rol
 */
function getMenuByRole(rol) {
    const baseMenu = [
        { icon: '📊', label: 'Dashboard', href: '/dashboard.html' },
    ];

    if (rol === 'Admin') {
        return [
            ...baseMenu,
            { icon: '👥', label: 'Empleados', href: '/empleados.html' },
            { icon: '🛍️', label: 'Productos', href: '/productos.html' },
            { icon: '🏪', label: 'Sucursales', href: '/sucursales.html' },
            { icon: '📦', label: 'Inventario', href: '/inventario.html' },
            { icon: '💰', label: 'Ventas', href: '/ventas.html' },
        ];
    }

    if (rol === 'Vendedor') {
        return [
            ...baseMenu,
            { icon: '💰', label: 'Nueva Venta', href: '/nueva-venta.html' },
            { icon: '📋', label: 'Mis Ventas', href: '/mis-ventas.html' },
            { icon: '📦', label: 'Inventario', href: '/inventario.html' },
            { icon: '👥', label: 'Clientes', href: '/clientes.html' },
        ];
    }

    if (rol === 'Analista') {
        return [
            ...baseMenu,
            { icon: '📊', label: 'Reportes', href: '/reportes.html' },
            { icon: '💰', label: 'Ventas', href: '/ventas-analisis.html' },
            { icon: '📈', label: 'Tendencias', href: '/tendencias.html' },
        ];
    }

    return baseMenu;
}

/**
 * Obtener ID de la vista según rol
 */
function getRoleViewId(rol) {
    const views = {
        'Admin': 'adminView',
        'Vendedor': 'vendedorView',
        'Analista': 'analistaView',
    };
    return views[rol] || null;
}

/**
 * Formatear moneda
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    }).format(amount);
}

/**
 * Formatear fecha
 */
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('es-MX');
}

/**
 * Verificar si es hoy
 */
function esHoy(dateString) {
    const fecha = new Date(dateString);
    const hoy = new Date();
    return fecha.toDateString() === hoy.toDateString();
}

/**
 * Verificar si es este mes
 */
function estesMes(dateString) {
    const fecha = new Date(dateString);
    const hoy = new Date();
    return fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
}

/**
 * Ver detalle de venta
 */
function verDetalleVenta(idVenta) {
    alert(`Ver detalle de venta #${idVenta}`);
    // Implementar modal o página de detalle
}
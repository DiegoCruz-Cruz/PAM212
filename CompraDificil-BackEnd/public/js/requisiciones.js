let requisicionesCargadas = [];
window.currentRequisicion = null;

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) window.location.href = '/login.html';

    const statusText = document.getElementById('status');
    const searchInput = document.getElementById('searchInput');
    const btnLogout = document.getElementById('btnLogout');

    async function loadReqs() {
        try {
            const res = await fetch('/api/requisiciones', {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json' 
                }
            });
            if (!res.ok) throw new Error("Error en el servidor");
            const data = await res.json();
            requisicionesCargadas = data; 
            renderRequisitionTable(data);
            if(statusText) statusText.style.display = 'none';
        } catch (err) {
            console.error("Error:", err);
            if(statusText) statusText.innerText = "Error al cargar las solicitudes.";
        }
    }

    function renderRequisitionTable(data) {
        const tableBody = document.getElementById('tbody-requisiciones');
        if (!tableBody) return;
        tableBody.innerHTML = '';

        data.forEach(req => {
            const row = document.createElement('tr');
            const nombreSolicitante = req.usuario ? `${req.usuario.nombre_usuario} ${req.usuario.apellido_p || ''}` : 'N/A';
            const nombreDepto = req.departamento ? req.departamento.nombre_departamento : 'N/A';
            const nombreEstado = req.estado ? req.estado.nombre_estadoSC : 'Pendiente';

            row.innerHTML = `
                <td><strong>${req.folio_solicitud}</strong></td>
                <td>${new Date(req.fecha_solicitud).toLocaleDateString()}</td>
                <td>${nombreSolicitante}</td>
                <td>${nombreDepto}</td>
                <td>${req.justificacion_solicitud}</td>
                <td><span class="badge badge-info">${nombreEstado}</span></td>
                <td>
                    <div style="display: flex; gap: 5px;">
                        <button class="btn btn-sm" onclick="verDetalle(${req.id_solicitud})">Ver</button>
                        <button class="btn btn-sm btn-warning" onclick="editarRequisicion(${req.id_solicitud})">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarRequisicion(${req.id_solicitud})">Eliminar</button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', () => {
            const term = searchInput.value.toLowerCase();
            const rows = document.querySelectorAll('#tbody-requisiciones tr');
            rows.forEach(row => {
                row.style.display = row.innerText.toLowerCase().includes(term) ? '' : 'none';
            });
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', async () => {
            if (!confirm('¿Cerrar sesión ahora?')) return;
            try {
                await fetch('/api/logout', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } finally {
                localStorage.clear();
                window.location.href = '/login.html';
            }
        });
    }
    loadReqs();
});

window.verDetalle = function(id) {
    const req = requisicionesCargadas.find(r => r.id_solicitud == id);
    if (!req) return;

    window.currentRequisicion = req;

    document.getElementById('modalFolio').innerText = `Detalle: ${req.folio_solicitud}`;
    document.getElementById('modalUsuario').innerText = req.usuario ? req.usuario.nombre_usuario : 'N/A';
    document.getElementById('modalJustificacion').innerText = req.justificacion_solicitud;

    const productosBody = document.getElementById('modalProductosBody');
    productosBody.innerHTML = '';

    if (req.detalles && req.detalles.length > 0) {
        req.detalles.forEach(det => {
            const tr = document.createElement('tr');
            const subtotal = det.cantidad_producto * det.precio_estimado;
            tr.innerHTML = `
                <td>${det.producto ? det.producto.nombre_producto : 'Desconocido'}</td>
                <td>${det.cantidad_producto}</td>
                <td>$${parseFloat(det.precio_estimado).toFixed(2)}</td>
                <td>$${subtotal.toFixed(2)}</td>
            `;
            productosBody.appendChild(tr);
        });
    } else {
        productosBody.innerHTML = '<tr><td colspan="4">No hay productos en esta solicitud.</td></tr>';
    }
    document.getElementById('modalDetalle').style.display = 'block';
};

window.cerrarModal = function() {
    document.getElementById('modalDetalle').style.display = 'none';
};

window.editarRequisicion = function(id) {
    window.location.href = `/requisiciones-form.html?id=${id}`;
};

window.eliminarRequisicion = async function(id) {
    if (!confirm('¿Estás segura de eliminar esta requisición?')) return;
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`/api/requisiciones/${id}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            alert('Eliminada correctamente');
            location.reload();
        }
    } catch (err) { console.error(err); }
};

/*  ==========================================================
        EXPORTAR PDF
    ==========================================================*/

const btnPDF = document.getElementById('btnPDF');
if (btnPDF) {
    btnPDF.addEventListener('click', async () => {
        const element = document.getElementById('pdfContent');
        if (!element || !window.currentRequisicion) return;
        const opt = {
            margin: 10,
            filename: `Requisicion_${window.currentRequisicion.folio_solicitud}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, scrollY: 0 },
            jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
        };
        await html2pdf().set(opt).from(element).save();
    });
}

/*  ==========================================================
        EXPORTAR EXCEL
    ==========================================================*/

const btnExcel = document.getElementById('btnExcel');
if (btnExcel) {
    btnExcel.addEventListener('click', () => {
        const r = window.currentRequisicion;
        if (!r) return alert("Selecciona una requisición primero");

        const colorBrand700 = "2173A6"; 
        const colorBrand500 = "4992BF"; 
        const borderBase = { style: "thin", color: { rgb: "000000" } };
        const borderFull = { top: borderBase, bottom: borderBase, left: borderBase, right: borderBase };

        const styleTitle = {
            font: { bold: true, color: { rgb: "FFFFFF" }, sz: 14 },
            fill: { fgColor: { rgb: colorBrand700 } },
            alignment: { horizontal: "center", vertical: "center" },
            border: borderFull
        };

        const styleLabel = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: colorBrand500 } },
            alignment: { horizontal: "right", vertical: "center" },
            border: borderFull
        };

        const styleValue = {
            alignment: { horizontal: "left", vertical: "center", wrapText: true },
            border: borderFull
        };

        const styleTh = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: colorBrand500 } },
            alignment: { horizontal: "center", vertical: "center" },
            border: borderFull
        };

        const styleTd = {
            alignment: { horizontal: "center", vertical: "center" },
            border: borderFull
        };

        const styleMoney = {
            numFmt: '"$"#,##0.00',
            alignment: { horizontal: "right", vertical: "center" },
            border: borderFull
        };

        const solicitanteName = `${r.usuario?.nombre_usuario ?? ''} ${r.usuario?.apellido_p ?? ''} ${r.usuario?.apellido_m ?? ''}`.trim() || 'N/A';
        const deptoName = r.departamento?.nombre_departamento ?? 'N/A';
        const fecha = new Date(r.fecha_solicitud).toLocaleDateString();

        const rows = [];

        rows.push([
            { v: "Requisición de Compra", s: styleTitle },
            { v: "", s: styleTitle }, { v: "", s: styleTitle }, { v: "", s: styleTitle }, { v: "", s: styleTitle }
        ]);

        rows.push([]);

        rows.push([
            "", "", "", 
            { v: "Folio:", s: styleLabel }, 
            { v: r.folio_solicitud, s: styleTd }
        ]);

        rows.push([
            "", "", "", 
            { v: "Fecha:", s: styleLabel }, 
            { v: fecha, s: styleTd }
        ]);

        rows.push([]);

        rows.push([
            { v: "Nombre del Solicitante:", s: styleLabel },
            { v: solicitanteName, s: styleValue },
            { v: "", s: styleValue }, { v: "", s: styleValue }, { v: "", s: styleValue }
        ]);
        rows.push([
            { v: "Departamento:", s: styleLabel },
            { v: deptoName, s: styleValue },
            { v: "", s: styleValue }, { v: "", s: styleValue }, { v: "", s: styleValue }
        ]);
        rows.push([
            { v: "Justificación:", s: styleLabel },
            { v: r.justificacion_solicitud, s: styleValue },
            { v: "", s: styleValue }, { v: "", s: styleValue }, { v: "", s: styleValue }
        ]);

        rows.push([]);

        rows.push([
            { v: "Producto", s: styleTh },
            { v: "Categoría", s: styleTh },
            { v: "Cantidad", s: styleTh },
            { v: "Precio Unitario", s: styleTh },
            { v: "Subtotal", s: styleTh }
        ]);

        let totalGeneral = 0;
        (r.detalles || []).forEach(d => {
            const cantidad = parseFloat(d.cantidad_producto) || 0;
            const precio = parseFloat(d.precio_estimado) || 0;
            const subtotal = cantidad * precio;
            totalGeneral += subtotal;

            const nombreCategoria = d.producto?.categoria?.nombre_categoria ?? 'Sin categoría';

            rows.push([
                { v: d.producto?.nombre_producto || 'Desconocido', s: styleValue },
                { v: nombreCategoria, s: styleTd }, 
                { v: cantidad, s: styleTd },
                { v: precio, t: 'n', s: styleMoney },
                { v: subtotal, t: 'n', s: styleMoney }
            ]);
        });

        rows.push([
            "", "", "",
            { v: "Total", s: styleTh },
            { v: totalGeneral, t: 'n', s: styleMoney }
        ]);

        rows.push([]); rows.push([]); rows.push([]);
        rows.push([
            "",
            { v: "___________________________", s: { alignment: { horizontal: "center" } } },
            "",
            { v: "___________________________", s: { alignment: { horizontal: "center" } } },
            ""
        ]);
        rows.push([
            "",
            { v: `Realizó\n${solicitanteName}\n${deptoName}`, s: { alignment: { horizontal: "center", wrapText: true } } },
            "",
            { v: "Autorizó\nLic. Nelson Hernán Torres Cervantes \nDirector de Finanzas", s: { alignment: { horizontal: "center", wrapText: true } } },
            ""
        ]);

        const ws = XLSX.utils.aoa_to_sheet(rows);

        ws["!merges"] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }, 
            { s: { r: 5, c: 1 }, e: { r: 5, c: 4 } }, 
            { s: { r: 6, c: 1 }, e: { r: 6, c: 4 } }, 
            { s: { r: 7, c: 1 }, e: { r: 7, c: 4 } }, 
        ];

        ws["!cols"] = [
            { wch: 30 }, 
            { wch: 20 }, 
            { wch: 12 }, 
            { wch: 18 }, 
            { wch: 18 }  
        ];

        ws["!rows"] = [];
        ws["!rows"][7] = { hpt: 60 }; 
        ws["!rows"][rows.length - 1] = { hpt: 45 }; 

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Requisicion");
        XLSX.writeFile(wb, `Requisicion_${r.folio_solicitud}.xlsx`);
    });
}
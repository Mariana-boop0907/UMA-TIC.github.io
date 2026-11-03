// Unificamos las cápsulas importadas de los archivos independientes
const listaCapsulas = [capsulaSociales, capsulaProgramacion, capsulaMatematicas];

function navegarA(idSeccion) {
    document.querySelectorAll('.seccion-pagina').forEach(sec => sec.classList.add('hidden'));
    
    if(idSeccion === 'inicio') {
        document.getElementById('sec-inicio').classList.remove('hidden');
    } else if(idSeccion === 'catalogo') {
        document.getElementById('sec-catalogo').classList.remove('hidden');
        renderizarCatalogo();
    } else if(idSeccion === 'capsula') {
        document.getElementById('sec-capsula').classList.remove('hidden');
    } else if(idSeccion === 'acerca') {
        document.getElementById('sec-acerca').classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderizarCatalogo() {
    const grid = document.getElementById('gridCapsulas');
    grid.innerHTML = '';
    
    listaCapsulas.forEach(cap => {
        grid.innerHTML += `
            <div class="bg-white rounded-2xl shadow-md border p-5 flex flex-col justify-between">
                <div>
                    <span class="text-xs font-semibold uppercase bg-vino-50 text-vino-800 px-2 py-1 rounded">${cap.area}</span>
                    <h3 class="font-bold text-slate-900 mt-2">${cap.titulo}</h3>
                    <p class="text-xs text-slate-600 mt-1">${cap.explicacion}</p>
                </div>
                <button onclick="verDetalleCapsula(${cap.id})" class="mt-4 w-bg bg-vino-800 hover:bg-vino-900 text-white text-xs py-2 rounded-lg">Ver Cápsula</button>
            </div>
        `;
    });
}

function verDetalleCapsula(id) {
    const cap = listaCapsulas.find(item => item.id === id);
    if(!cap) return;

    const contenedor = document.getElementById('detalleCapsulaContenido');
    contenedor.innerHTML = `
        <h2 class="text-2xl font-bold text-vino-900 mb-2">${cap.titulo}</h2>
        <p class="text-sm text-slate-600 mb-4">${cap.explicacion}</p>
        <div class="mb-4">${cap.recursoHtml}</div>
        <p class="font-bold text-xs mb-2">${cap.ejercicioPregunta}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${cap.opciones.map((opt, idx) => `
                <button onclick="alert('${idx === cap.respuestaCorrecta ? "¡Correcto!" : "Incorrecto"}')" class="p-2 text-xs border rounded hover:bg-slate-50 text-left">${opt}</button>
            `).join('')}
        </div>
    `;
    navegarA('capsula');
}

window.onload = function() {
    renderizarCatalogo();
};
// ============================================
// ELEMENTOS DEL DOM
// ============================================

const selectorRaza = document.getElementById('breed-select');
const selectorCantidad = document.getElementById('limit-select');
const contenedor = document.getElementById('contenedor-perros');
const botonBuscar = document.getElementById('btn-search');
const botonRandom = document.getElementById('btn-random');


// ============================================
// LLENAR SELECT DE RAZAS
// ============================================

export function llenarSelectRazas(razas) {
    selectorRaza.innerHTML = '';
    for (const raza in razas) {
        const subrazas = razas[raza];
        // -----------------------------
        // SIN SUBRAZAS
        // -----------------------------
        if (subrazas.length === 0) {
            const option = document.createElement('option');
            option.value = raza;
            option.textContent = formatearNombre(raza);
            selectorRaza.appendChild(option);

            // -----------------------------
            // CON SUBRAZAS
            // -----------------------------

        } else {

            for (const subraza of subrazas) {
                const option = document.createElement('option');
                option.value = `${raza}/${subraza}`;
                option.textContent = `${formatearNombre(subraza)} ${formatearNombre(raza)}`;
                selectorRaza.appendChild(option);
            }
        }
    }
}


// ============================================
// FORMATEAR NOMBRE
// ============================================

function formatearNombre(nombre) {
    return nombre
        .replace(/-/g, ' ')
        .replace(/\b\w/g, letra =>
            letra.toUpperCase()
        );

}


// ============================================
// OBTENER RAZA
// ============================================

export function obtenerRazaSeleccionada() {
    return selectorRaza.value;
}


// ============================================
// OBTENER CANTIDAD
// ============================================

export function obtenerCantidadSeleccionada() {
    return Number(selectorCantidad.value);
}


// ============================================
// MOSTRAR PERROS
// ============================================

export function mostrarPerros(imagenes, raza) {
    // Limpiar galería
    contenedor.innerHTML = '';
    // Crear tarjetas
    for (const urlPerro of imagenes) {
        const tarjeta = crearTarjeta(urlPerro, raza);
        contenedor.appendChild(tarjeta);
    }
}


// ============================================
// CREAR TARJETA
// ============================================

function crearTarjeta(urlPerro, raza) {
    const tarjeta = document.createElement('div');


    // TU DISEÑO
    tarjeta.className = "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-100 transition-all duration-300 group";


    tarjeta.innerHTML = `

        <!-- IMAGEN -->

        <div class="relative overflow-hidden aspect-[4/3] bg-slate-100">

            <img
                src="${urlPerro}"
                alt="Perro ${formatearNombre(raza)}"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy">

        </div>


        <!-- INFORMACIÓN -->

        <div class="p-4 flex justify-between items-center">

            <div>

                <h3
                    class="font-bold text-slate-800 capitalize tracking-tight">

                    ${formatearNombre(raza)}

                </h3>


                <p
                    class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">

                    Dog API

                </p>

            </div>


            <!-- BOTÓN COMPARTIR -->

            <button
                class="btn-compartir p-2 bg-slate-50 hover:bg-indigo-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                title="Compartir">

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">

                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 8h10M7 8l3-3m-3 3l3 3M17 16H7m10 0l-3-3m3 3l-3 3" />

                </svg>

            </button>

        </div>

    `;


    // ========================================
    // BOTÓN COMPARTIR
    // ========================================

    const botonCompartir = tarjeta.querySelector('.btn-compartir');


    botonCompartir.addEventListener('click', () => {
        compartirImagen(urlPerro, raza);
    }
    );


    return tarjeta;

}


// ============================================
// COMPARTIR IMAGEN
// ============================================

async function compartirImagen(urlPerro, raza) {

    try {

        // ------------------------------------
        // SI EL NAVEGADOR TIENE SHARE
        // ------------------------------------

        if (navigator.share) {

            await navigator.share({

                title:
                    `Perro ${formatearNombre(raza)}`,

                text:
                    `Mira este ${formatearNombre(raza)} 🐶`,

                url:
                    urlPerro

            });

            return;
        }


        // ------------------------------------
        // SI NO TIENE SHARE
        // ------------------------------------

        await navigator.clipboard.writeText(urlPerro);


        Swal.fire({

            icon: 'success',

            title: '¡Enlace copiado!',

            text:
                'Ya puedes compartir la imagen.',

            timer: 1800,

            showConfirmButton: false

        });


    } catch (error) {

        // El usuario canceló compartir
        if (error.name === 'AbortError') {
            return;
        }

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal!',
            footer: 'Error al compartir:'
        });
        


        // ------------------------------------
        // ÚLTIMO INTENTO: COPIAR
        // ------------------------------------

        try {

            await navigator.clipboard.writeText(urlPerro);


            Swal.fire({

                icon: 'success',

                title: 'Enlace copiado',

                text:
                    'Copia el enlace para compartirlo.',

                timer: 2000,

                showConfirmButton: false

            });

        } catch (errorCopiar) {

            Swal.fire({

                icon: 'error',

                title: 'No se pudo compartir',

                text:
                    'Tu navegador no permite compartir esta imagen.'

            });

        }

    }

}


// ============================================
// BOTÓN BUSCAR
// ============================================

export function cuandoPresioneBuscar(funcion) {
    botonBuscar.addEventListener('click',funcion);
}


// ============================================
// BOTÓN ALEATORIO
// ============================================

export function cuandoPresioneRandom(funcion) {
    botonRandom.addEventListener('click', funcion);
}

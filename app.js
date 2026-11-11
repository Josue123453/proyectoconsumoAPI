import { obtenerRazas, obtenerDatos } from './api.js';


import { llenarSelectRazas, obtenerRazaSeleccionada, obtenerCantidadSeleccionada, mostrarPerros, cuandoPresioneBuscar, cuandoPresioneRandom } from './dom.js';


// ============================================
// CARGAR RAZAS
// ============================================

async function cargarRazas() {
    try {
        const razas = await obtenerRazas();
        llenarSelectRazas(razas);
    } catch (error) {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal!',
            footer: 'No se pudieron cargar las razas:'
        });
    }

}


// ============================================
// CARGAR PERROS
// ============================================

async function cargarPerros() {
    try {
        const raza = obtenerRazaSeleccionada();
        const cantidad = obtenerCantidadSeleccionada();
        if (!raza) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo salió mal!',
                footer: 'No hay una raza seleccionada'
            });

            return;
        }
        const imagenes = await obtenerDatos(raza, cantidad);
        mostrarPerros(imagenes, raza);


    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal!',
            footer: 'Error cargando perros:'
        });
    }

}


// ============================================
// PERROS ALEATORIOS
// ============================================

async function perrosAleatorios() {
    try {
        const cantidad = obtenerCantidadSeleccionada();
        const razas = await obtenerRazas();
        const listaRazas = Object.keys(razas);
        const razaAleatoria =listaRazas[Math.floor(Math.random() *listaRazas.length)];
        const imagenes = await obtenerDatos(razaAleatoria,cantidad);
        mostrarPerros(imagenes,razaAleatoria);
    } catch (error) {
       Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal!',
            footer:  'Error obteniendo perros aleatorios:'
        });
    }

}


// ============================================
// INICIAR APLICACIÓN
// ============================================

async function iniciar() {
    // Cargar razas
    await cargarRazas();
    // Cargar perros iniciales
    await cargarPerros();
    // Botón Buscar
    cuandoPresioneBuscar(cargarPerros);
    // Botón Aleatorio
    cuandoPresioneRandom(perrosAleatorios);
}


// ============================================
// EJECUTAR
// ============================================

iniciar();

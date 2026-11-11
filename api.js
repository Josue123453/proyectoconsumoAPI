const API_URL = 'https://dog.ceo/api';


// Obtener todas las razas
export async function obtenerRazas() {
    const respuesta = await fetch(`${API_URL}/breeds/list/all`);
    if (!respuesta.ok) {
        throw new Error(
            `Error al obtener las razas: ${respuesta.status}`
        );
    }
    const datos = await respuesta.json();
    return datos.message;
}


// Obtener imágenes de una raza
export async function obtenerDatos(raza, cantidad) {
    const respuesta = await fetch(`${API_URL}/breed/${raza}/images/random/${cantidad}`);
    if (!respuesta.ok) {
        throw new Error(
            `Error al obtener las imágenes: ${respuesta.status}`
        );
    }
    const datos = await respuesta.json();
    return datos.message;
}

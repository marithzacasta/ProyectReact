import { fetchWithRefresh } from "./fetchWithRefresh";
const API_URL = import.meta.env.VITE_API_URL;


export const loginUser = async (email, password) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', //  Indica que estás enviando datos en formato JSON.
            },
            body: JSON.stringify({ email, password }), // Convierte el objeto { email, password } a texto JSON para enviarlo en el cuerpo de la solicitud.
            credentials: 'include', // Permite enviar cookies junto con la solicitud, lo que es útil para la autenticación.
        }

        const response = await fetch(`${API_URL}/api/login`, options); // Realiza la solicitud a la API utilizando la URL y las opciones definidas anteriormente.
        const data = await response.json(); // Espera y convierte la respuesta del servidor en formato JSON.

        if (!response.ok) { // Si no está bien la respuesta
            // Este throw detiene la ejecución de la función y permite que el error sea capturado en un try...catch desde donde se llamó esta función.
            throw new Error(data.message || 'Error en el inicio de sesión');
        }

        return data;

    } catch (error) {
        // Puedes manejar el error o volverlo a lanzar para usar en el componente
        console.error('Error en loginUser:', error.message);
        throw error;

    }
};

export const logoutUser = async () => {
    try {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Permite enviar cookies junto con la solicitud, lo que es útil para la autenticación.
        }

        const response = await fetch(`${API_URL}/api/logout`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al cerrar sesión');
        }

        return data;

    } catch (error) {
        console.error('Error en logoutUser:', error.message);
        throw error;
    }
}

export const authUser = async () => {
    try {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Permite enviar cookies junto con la solicitud, lo que es útil para la autenticación.
        }
        const response = await fetch(`${API_URL}/api/protected`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en la autenticación');
        }

        return data;

    } catch (error) {
        console.error('Error en authUser:', error.message);
        throw error;
    }
};



export const registerUser = async (names, lastNames, email, password) => {

    const name = `${names} ${lastNames}`; // Concatenar nombres y apellidos
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        }

        const response = await fetch(`${API_URL}/api/crear`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en el registro');
        }

        return data;

    } catch (error) {
        console.error('Error en RegisterUser:', error.message);
        throw error;
    }

}


import { Heart } from "lucide-react";
import { useEffect, useState } from 'react';
import { PopularMoviesTMDB, GenreListTMDB } from '../api/tmdbApi';

export function PopularMovie() {

    const [peliculas, setPeliculas] = useState([]);
    const [error, setError] = useState([]);
    const [genres, setGenres] = useState([]); // Estado para el género seleccionado

    // ✅ Cargar la lista de películas al iniciar el componente
    useEffect(() => {
        const cargarPeliculas = async () => {
            try {
                const data = await PopularMoviesTMDB();
                setPeliculas(data.results); // Asumiendo que quieres la primera película
                console.log(data.results); // Verifica la estructura de datos

            } catch (error) {
                console.error("Error al cargar las películas:", error.message);
                setError("No se pudieron cargar las películas");
            }
        };

        cargarPeliculas();

    }, []);

    // ✅ Cargar la lista de géneros al iniciar el componente
    useEffect(() => {
        const cargarGeneros = async () => {
            try {
                const data = await GenreListTMDB();
                setGenres(data.genres); // Asumiendo que quieres la lista de géneros
                console.log(data.genres); // Verifica la estructura de datos
            } catch (error) {
                console.error("Error al cargar los géneros:", error.message);
            }
        }
        cargarGeneros();
    }, []);



    // ✅ Función para limitar a X palabras
    const limitarPalabras = (texto, maxPalabras) => {
        const palabras = texto.split(" ");
        return palabras.length > maxPalabras
            ? palabras.slice(0, maxPalabras).join(" ") + "..."
            : texto;
    };

    // ✅ Función para obtener los nombres de los géneros a partir de sus IDs
    const obtenerNombresGeneros = (genreIds) => {
        return genreIds.map((id) => {
            const genero = genres.find((g) => g.id === id);
            return genero ? genero.name : null;
        }).filter(Boolean); // Filtra los que no encontró
    };

    // ✅ Función para obtener la clase de género para el estilo
    const obtenerClaseGenero = (nombre) => {
        switch (nombre.toLowerCase()) { // toLowerCase convierte el nombre a minúsculas para evitar problemas de coincidencia
            case 'acción':
                return 'bg-red-100 text-red-800';
            case 'drama':
                return 'bg-blue-100 text-blue-800';
            case 'comedia':
                return 'bg-yellow-100 text-yellow-800';
            case 'fantasía':
                return 'bg-purple-100 text-purple-800';
            case 'terror':
                return 'bg-gray-200 text-gray-800';
            case 'documental':
                return 'bg-green-100 text-green-800';
            case 'familia':
                return 'bg-pink-100 text-pink-800';
            case 'aventura':
                return 'bg-orange-100 text-orange-800';
            case 'animación':
                return 'bg-green-100 text-green-800';
            case 'misterio':
                return 'bg-blue-100 text-blue-800';
            case 'crimen':
                return 'bg-purple-100 text-purple-800';
            case 'suspense':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };


    return (

        <div className="w-full py-10 px-7 lg:px-20">
            <div className="flex justify-between mb-10 ">
                <h2 className="font-bold text-4xl">Popular Movies</h2>

                <select className="bg-blue-400 text-white font-semibold rounded-md p-2 hover:bg-blue-500 focus:outline-none h-11">
                    <option className="bg-white text-black" value="">Select Genre</option>
                    {genres.map((genre) => (
                        <option className="bg-white text-black" key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
            </div>

            {error && <p className="text-red-500">{error}</p>} {/* Este es un operador lógico AND (&&), 
            Funciona así: si error tiene un valor verdadero, entonces React mostrará lo que hay después del &&. 
            Si error es null, undefined, false o una cadena vacía (""), no se mostrará nada. */}
            

            {/* Contenido del Manage */}
            <div className="flex justify-center ">
                <table className="w-full table-auto shadow bg-white rounded-lg ">
                    <thead className=" text-left border-b">
                        <tr>
                            <th className="p-3 font-medium text-sm text-gray-700">Movie</th>
                            <th className="p-3 font-medium text-sm text-gray-700">Category</th>
                            <th className="p-3 font-medium text-sm text-gray-700">Date</th>
                            <th className="p-3 font-medium text-sm text-gray-700 hidden md:table-cell">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">

                        {peliculas.map((pelicula) => (
                            <tr className="hover:bg-gray-50">
                                <td className="p-3 flex items-center gap-3">
                                    <img src={`https://image.tmdb.org/t/p/w200${pelicula.poster_path}`} alt="" className="w-10 h-10 object-cover" />
                                    <div>
                                        <div className="font-medium text-gray-800">{pelicula.title}</div>
                                        <div className="text-sm text-gray-500"> {limitarPalabras(pelicula.overview, 10)}</div>
                                    </div>
                                </td>
                                <td className="p-2 md:p-4 space-x-2">
                                    <div className="flex flex-wrap gap-1">
                                        {obtenerNombresGeneros(pelicula.genre_ids).map((nombre) => (
                                            <span className={`${obtenerClaseGenero(nombre)} text-xs font-semibold px-2 py-1 rounded-full`}>
                                                {nombre}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-2 md:p-4 text-gray-700">{pelicula.release_date}</td>
                                <td className="p-2 md:p-4 text-center space-x-2 hidden md:table-cell">
                                    <button className="text-blue-600 hover:text-red-600"><Heart size={16} /></button>
                                </td>
                            </tr>

                        ))}


                        {/* Puedes seguir agregando más filas copiando y pegando el <tr> */}
                    </tbody>
                </table>



            </div>

        </div>

    );

}
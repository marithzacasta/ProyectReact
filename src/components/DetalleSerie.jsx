import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { showEachSeriesTMDB, GenreListTMDB } from "../api/tmdbApi"; // Este lo debes tener o crear
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DetalleSerie() {

    const Navigate = useNavigate();
    const { id } = useParams();
    const [serie, setSerie] = useState(null);
    const [genres, setGenres] = useState([]);


    const handleVolver = () => {
        Navigate("/series")
    }


    // ✅ Cargar la lista de géneros al iniciar el componente
    useEffect(() => {
        const cargarGeneros = async () => {
            try {
                const data = await GenreListTMDB();
                setGenres(data.genres); // Asumiendo que quieres la lista de géneros

            } catch (error) {
                console.error("Error al cargar los géneros:", error.message);
            }
        }
        cargarGeneros();
    }, []);

    

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


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await showEachSeriesTMDB(id);
                setSerie(data);
                console.log(data);


            } catch (error) {
                console.error("Error al cargar detalles:", error);
            }
        };
        fetchMovie();
    }, [id]);

    if (!serie) return <p className="text-center mt-10">Cargando...</p>;

    return (
        <div className="w-full pt-20">
            <div className="flex justify-end items-center px-10 py-6">

                <button onClick={handleVolver} className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-200 transition-colors">
                    <ArrowLeft size={22} />
                    <span>Volver al inicio</span>
                </button>
            </div>

            <div className="px-10 flex justify-center items-stretch md:px-14 md:flex-row flex-col py-8 gap-10 transition-all duration-300">
                <div className="flex justify-center">
                    <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.title} className="rounded-md w-80" />
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    <h1 className="font-bold text-4xl mb-5">{serie.name}</h1>
                    <p className="text-gray-700">{serie.overview}</p>

                    <p className="text-gray-600 mt-2 font-semibold">Genero:</p>
                    <div className="flex flex-wrap gap-3 my-5">
                        {serie.genres.map((g) => (
                            <span key={g.id} className={`${obtenerClaseGenero(g.name)} text-xs font-semibold px-2 py-1 rounded-full`}>
                                {g.name}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-500 mt-2">Fecha de lanzamiento: {serie.release_date}</p>
                    <p className="text-gray-500 mt-2">Puntuación: {serie.vote_average}</p>

                </div>

            </div>


        </div>
    );
}

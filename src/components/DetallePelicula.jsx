import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { showEachMoviesTMDB } from "../api/tmdbApi"; // Este lo debes tener o crear
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DetallePelicula() {

    const Navigate = useNavigate();
    const { id } = useParams();
    const [pelicula, setPelicula] = useState(null);

    const handleVolver = () => {
        Navigate("/movies")
    }

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await showEachMoviesTMDB(id);
                setPelicula(data);
                console.log(data);

            } catch (error) {
                console.error("Error al cargar detalles:", error);
            }
        };
        fetchMovie();
    }, [id]);

    if (!pelicula) return <p className="text-center mt-10">Cargando...</p>;

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
                    <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} className="rounded-md w-80" />
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    <h1 className="font-bold text-4xl mb-5">{pelicula.title}</h1>
                    <p className="text-gray-700">{pelicula.overview}</p>
                    <p className="text-gray-500 mt-2">Fecha de lanzamiento: {pelicula.release_date}</p>
                    <p className="text-gray-500">Puntuación: {pelicula.vote_average}</p>

                </div>

            </div>


        </div>
    );
}

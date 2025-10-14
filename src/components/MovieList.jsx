import { useEffect, useState } from "react";
import { PopularMoviesTMDB } from "../api/tmdbApi";
import { Link } from "react-router-dom";

export function MovieList() {

    const [movies, setMovies] = useState([]);


    useEffect(() => {
        const cargarPeliculas = async () => {
            try {
                const data = await PopularMoviesTMDB();
                setMovies(data.results);

            } catch (error) {
                console.error("Error al cargar los géneros:", error.message);
            }
        }

        cargarPeliculas();

    },);


    return (
        <div className="w-full py-10 px-7 lg:px-20">
            <div className="flex justify-between mb-10 ">
                <h2 className="font-bold text-4xl"> 🎬 Popular Movies</h2>

            </div>

            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 mb-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {movies.map((movie) => (
                    <Link to={`detallespeliculas2/${movie.id}`} key={movie.id}>
                        <div className="bg-gray-50 rounded-xl overflow-hidden shadow hover:scale-105 transition">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="h-64 w-full object-cover"
                            />
                            <div className="p-3 text-center">
                                <h2 className="text-sm font-semibold text-gray-700 line-clamp-2">{movie.title}</h2>
                                <p className="text-gray-500 text-xs mt-1">⭐ {movie.vote_average}</p>
                            </div>
                        </div>
                    </Link>
                ))}
                </div>
            </div>

           

        </div>
    );
}

import { useEffect, useState } from 'react';
import { PopularMoviesTMDB } from '../api/tmdbApi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


export function PopularMovie() {

    const [peliculas, setPeliculas] = useState([]);
    const [error, setError] = useState([]);
    const [totalResults, setTotalResults] = useState(0);

    // ✅ Cargar la lista de películas al iniciar el componente
    useEffect(() => {
        const cargarPeliculas = async () => {
            try {
                const data = await PopularMoviesTMDB();
                setPeliculas(data.results.slice(0, 5)); // Top 5 películas
                setTotalResults(data.total_results); // Total de películas populares

            } catch (error) {
                console.error("Error loading Movies listing:", error.message)
                setError("The Movies listings could not be loaded");
            }
        };

        cargarPeliculas();

    }, []);



    return (

        <div className="w-full py-10 px-7 lg:px-20">
            <div className="flex justify-between mb-10 ">
                <h2 className="font-bold text-4xl"> 🎬 Popular Movies</h2>

            </div>

            {error && <p className="text-red-500">{error}</p>} {/* Este es un operador lógico AND (&&), 
            Funciona así: si error tiene un valor verdadero, entonces React mostrará lo que hay después del &&. 
            Si error es null, undefined, false o una cadena vacía (""), no se mostrará nada. */}


            {/* 🧮 Tarjetas de resumen */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-5">
                <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-xl flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-700">Total Popular Movies</h2>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {totalResults.toLocaleString()}
                    </p>
                </div>

                <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-xl flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-700">General Average</h2>
                    <p className="text-3xl font-bold text-yellow-500 mt-2">
                        {(
                            peliculas.reduce((sum, m) => sum + m.vote_average, 0) / peliculas.length
                        ).toFixed(1)}
                    </p>
                </div>

                <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-xl flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-700">Top 5 Current</h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">🔥</p>
                </div>
            </div>


            {/* 🎥 Top 5 Películas */}
            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 mb-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top 5 Popular Movies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {peliculas.map((movie) => (
                        <div
                            key={movie.id}
                            className="bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-md transition">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="h-64 w-full object-cover"
                            />
                            <div className="p-3 text-center">
                                <h3 className="text-sm font-semibold text-gray-700 line-clamp-2">
                                    {movie.title}
                                </h3>
                                <p className="text-gray-500 text-xs mt-1">
                                    ⭐ {movie.vote_average} | {movie.release_date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 📊 Gráfica de Ratings */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Comparison of Ratings (Top 5)
                </h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={peliculas}>
                        <XAxis
                            dataKey="title"
                            tickFormatter={(value) =>
                                value.length > 15 ? value.slice(0, 15) + "..." : value
                            }
                            tick={{ fontSize: 12 }}
                            interval={0}
                            angle={-35}
                            textAnchor="end"
                            height={70}
                        />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Bar dataKey="vote_average" fill="#6366F1" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>


        </div>

    );

}
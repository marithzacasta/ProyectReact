import { useEffect, useState } from 'react';
import { NowPlayingMoviesTMDB } from '../api/tmdbApi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";


export function EnCartelera() {

    const [nowPlaying, setNowPlaying] = useState([]);
    const [error, setError] = useState([]);
    const [chartData, setChartData] = useState([]);

    // ✅ Cargar la lista de películas al iniciar el componente
    useEffect(() => {
        const cargarPeliculas = async () => {
            try {
                const data = await NowPlayingMoviesTMDB();
                setNowPlaying(data.results);

                // Procesar para comparar meses
                const currentMonth = new Date().getMonth() + 1;
                const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;

                const countThisMonth = data.results.filter(movie => {
                    const releaseMonth = new Date(movie.release_date).getMonth() + 1;
                    return releaseMonth === currentMonth;
                }).length;

                const countLastMonth = data.results.filter(movie => {
                    const releaseMonth = new Date(movie.release_date).getMonth() + 1;
                    return releaseMonth === lastMonth;
                }).length;

                setChartData([
                    { mes: "Previous month", peliculas: countLastMonth },
                    { mes: "Current month", peliculas: countThisMonth },
                ]);

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
                <h2 className="font-bold text-4xl"> 🎬 Movies Now Playing</h2>

            </div>

            {error && <p className="text-red-500">{error}</p>} {/* Este es un operador lógico AND (&&), 
            Funciona así: si error tiene un valor verdadero, entonces React mostrará lo que hay después del &&. 
            Si error es null, undefined, false o una cadena vacía (""), no se mostrará nada. */}


            {/* 🎥 Películas en cartelera */}
            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 mb-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Movies in Theaters</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {nowPlaying.map((movie) => (
                        <div
                            key={movie.id}
                            className="bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-md transition"
                        >
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
                                    <p className="text-xs text-gray-500">📅 {movie.release_date}</p>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 📊 Comparativa de estrenos */}
            <div className="bg-white shadow-md rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4 text-center">
                    📈 Comparison of releases (Current vs. previous month)
                </h2>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="peliculas" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>



        </div>

    );

}
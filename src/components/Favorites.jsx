import { Film } from "lucide-react";
import { useEffect, useState } from "react";
import { TopRatedMoviesTMDB, PopularMoviesTMDB } from "../api/tmdbApi";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";

export function Favorites() {

    const [TopRated, sertTopRated] = useState([]);
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        const mostrarTopRated = async () => {
            try {
                const dataRated = await TopRatedMoviesTMDB();
                sertTopRated(dataRated.results.slice(0, 10));
                const dataPopular = await PopularMoviesTMDB();
                setPopular(dataPopular.results.slice(0, 10));
                // console.log(data.results); // Verifica la estructura de datos


            } catch (error) {
                console.error("Error al cargar las películas mejor valoradas:", error.message);
            }

        }

        mostrarTopRated();

    }, [])

    // Gráfica comparativa
    const compareData = TopRated.map((movie, index) => ({
        title: movie.title,
        MejorValoradas: movie.vote_average,
        Populares: popular[index]?.vote_average || 0,
    }));


    return (

        <div className="w-full py-10 px-7 lg:px-20">
            <div className="flex justify-between mb-10 ">
                <h2 className="font-bold text-4xl"> 🏆 Favorite Movies</h2>
            </div>

            {/* 🏆 Top 10 Mejor Valoradas */}
            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 mb-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top 10 Mejor Valoradas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {TopRated.map((movie) => (
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
                                    ❤️ <b>{movie.vote_average}</b> | {movie.release_date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 📊 Comparativa Populares vs Mejor Valoradas */}
            <div className="bg-white shadow-md rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4 text-center">📈 Comparativa: Populares vs Mejor Valoradas</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={compareData} margin={{ bottom: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" />
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
                        <Legend />
                        <Bar dataKey="MejorValoradas" fill="#10b981" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="Populares" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>


        </div>

    );

}
import { useEffect, useState } from "react";
import { PopularSeriesTMDB, TopRatedSeriesTMDB } from "../api/tmdbApi";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function SeriesPage() {
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [stats, setStats] = useState({ promedioPopular: 0, promedioTop: 0 });
    const [error, setError] = useState([]);


    useEffect(() => {
        const cargarSeries = async () => {
            try {
                const popularData = await PopularSeriesTMDB();
                const topData = await TopRatedSeriesTMDB();

                setPopular(popularData.results || []);
                setTopRated(topData.results || []);

                // Calcular estadísticas
                const promPopular =
                    popularData.results.reduce((sum, s) => sum + s.vote_average, 0) / popularData.results.length;
                const promTop =
                    topData.results.reduce((sum, s) => sum + s.vote_average, 0) / topData.results.length;

                setStats({
                    promedioPopular: promPopular.toFixed(1),
                    promedioTop: promTop.toFixed(1),
                });
            } catch (error) {
                console.error("Error loading Series listing:", error.message)
                setError("The Series listings could not be loaded");
            }
        };

        cargarSeries();
    }, []);

    // Datos para la gráfica
    const dataChart = [
        { name: "Series Populares", Promedio: parseFloat(stats.promedioPopular) },
        { name: "Series Mejor Valoradas", Promedio: parseFloat(stats.promedioTop) },
    ];

    return (
        <div className="w-full py-10 px-7 lg:px-20">
            <div className="flex justify-between mb-10 ">
                <h2 className="font-bold text-4xl"> 📺 Popular and Top-Rated Series</h2>

            </div>

            {error && <p className="text-red-500">{error}</p>}


            {/* 📊 Sección de estadísticas */}
            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 mb-5">
                <h2 className="text-xl font-semibold mb-4 text-center">General Statistics</h2>
                <div className="flex flex-col md:flex-row items-center justify-around text-center">
                    <div>
                        <p className="text-gray-500">Popular Series Average</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.promedioPopular}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Average Top Rated Series</p>
                        <p className="text-2xl font-bold text-green-600">{stats.promedioTop}</p>
                    </div>
                </div>

                <div className="mt-6" style={{ width: "100%", height: 250 }}>
                    <ResponsiveContainer>
                        <BarChart data={dataChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 10]} />
                            <Tooltip />
                            <Bar dataKey="Promedio" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 🔥 Series Populares */}
            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 mb-5">
                <h2 className="text-2xl font-semibold mb-4">🔥 Popular Series</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {popular.map((serie) => (
                        <Link to={`detailserie/${serie.id}`} key={serie.id}>
                            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                                    alt={serie.name}
                                    className="w-full h-72 object-cover"
                                />
                                <div className="p-3">
                                    <h2 className="font-semibold text-lg truncate">{serie.name}</h2>
                                    <p className="text-gray-500 text-sm">⭐ {serie.vote_average}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* 🏆 Series Mejor Valoradas */}
            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 mb-5">
                <h2 className="text-2xl font-semibold mb-4">🏆 Best Rated Series</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {topRated.map((serie) => (
                        <Link to={`detailserie/${serie.id}`} key={serie.id}>
                            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                                    alt={serie.name}
                                    className="w-full h-72 object-cover"
                                />
                                <div className="p-3">
                                    <h2 className="font-semibold text-lg truncate">{serie.name}</h2>
                                    <p className="text-gray-500 text-sm">⭐ {serie.vote_average}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { useEffect, useState } from 'react';
import { UpcomingReleasesMoviesTMDB } from '../api/tmdbApi';


export function UpcomingMovies() {

    const [upcoming, setUpcoming] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [error, setError] = useState([]);
    const [countThisMonth, setCountThisMonth] = useState(0);

    // ✅ Cargar la lista de películas al iniciar el componente
    useEffect(() => {
        const cargarPeliculas = async () => {
            try {
                const data = await UpcomingReleasesMoviesTMDB();
                setUpcoming(data.results);


                // 🔹 Filtrar películas que se estrenan este mes
                const currentMonth = new Date().getMonth() + 1;
                const currentYear = new Date().getFullYear();

                const moviesThisMonth = data.results.filter((movie) => {
                    const date = new Date(movie.release_date);
                    return (
                        date.getMonth() + 1 === currentMonth &&
                        date.getFullYear() === currentYear
                    );
                });

                setCountThisMonth(moviesThisMonth.length);

                // 🔹 Agrupar por semana del mes
                const weekCounts = [0, 0, 0, 0, 0]; // máximo 5 semanas
                moviesThisMonth.forEach((movie) => {
                    const day = new Date(movie.release_date).getDate();
                    const weekIndex = Math.ceil(day / 7) - 1;
                    weekCounts[weekIndex]++;
                });

                const chart = weekCounts.map((count, i) => ({
                    semana: `Semana ${i + 1}`,
                    estrenos: count,
                }));

                setChartData(chart);


            } catch (error) {
                console.error("Error al cargar las películas:", error.message);
                setError("No se pudieron cargar las películas");
            }
        };

        cargarPeliculas();

    }, []);



    return (

        <div className="w-full py-10 px-7 lg:px-20">

            <div className="flex justify-between mb-10 ">
                <h2 className="font-bold text-4xl"> 📅 Upcoming Releases </h2>
            </div>

            {error && <p className="text-red-500">{error}</p>} {/* Este es un operador lógico AND (&&), 
            Funciona así: si error tiene un valor verdadero, entonces React mostrará lo que hay después del &&. 
            Si error es null, undefined, false o una cadena vacía (""), no se mostrará nada. */}

            {/* 🎞️ Total de estrenos del mes */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-lg p-4 text-center mb-5">
                <h2 className="text-2xl font-bold text-yellow-600 mb-2"> Upcoming Releases </h2>
                <p className="text-gray-600">
                    Releases this month:{" "}
                    <span className="text-yellow-500 font-semibold">{countThisMonth}</span>
                </p>
            </div>


            {/* ⭐ Lista de películas próximas */}
            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 mb-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎥 Featured Upcoming Movies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {upcoming.slice(0, 10).map((movie) => (
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
                                    📅 {movie.release_date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



        </div>

    );

}
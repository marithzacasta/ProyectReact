import { Clapperboard, Star, Drama, Tv } from "lucide-react";
import { useEffect, useState } from "react";
import { UpcomingReleasesMoviesTMDB, PopularMoviesTMDB, TopRatedMoviesTMDB, GenreListTMDB, PopularSeriesTMDB } from "../api/tmdbApi";
import { useNavigate } from "react-router-dom";


export function Dashboard() {

    const navegate = useNavigate();

    // const [usuarios, setUsuarios] = useState([]);
    const [lanzamientos, setLanzamientos] = useState([]);
    const [error, setError] = useState(null);

    const [totalPopulares, setTotalPopulares] = useState(0);
    const [totalMejorValoradas, setTotalMejorValoradas] = useState(0);
    const [totalGeneros, setTotalGeneros] = useState(0);
    const [totalSeries, setTotalSeries] = useState(0);

    const handleUpComingAdmin = () => {
        navegate("/dashboardPage/upcomingmovies")
    }

    const handleMoviesPopularAdmin = () => {
        navegate("/dashboardPage/popular")
    }

    const handleTpoRatedrAdmin = () => {
        navegate("/dashboardPage/favorites")
    }



    useEffect(() => {

        const cargarLanzamientos = async () => {
            try {
                const data = await UpcomingReleasesMoviesTMDB();
                setLanzamientos(data.results.slice(0, 5)); // Asumiendo que quieres la lista de lanzamientos
                console.log(data.results); // Verifica la estructura de datos

            } catch (error) {
                console.error("Error loading upcoming dates:", error.message);
                setError("The releases could not be loaded");
            }
        }

        const cargarEstadisticas = async () => {
            try {
                const [populares, mejorValoradas, generos, series] = await Promise.all([
                    PopularMoviesTMDB(),
                    TopRatedMoviesTMDB(),
                    GenreListTMDB(),
                    PopularSeriesTMDB()
                ]);

                setTotalPopulares(populares.results.length);
                setTotalMejorValoradas(mejorValoradas.results.length);
                setTotalGeneros(generos.genres.length);
                setTotalSeries(series.results.length);
            } catch (error) {
                console.error("Error al cargar estadísticas:", error.message);
            }
        };


        cargarEstadisticas();
        cargarLanzamientos();

    }, [])

    // ✅ Función para limitar a X palabras
    const limitarPalabras = (texto, maxPalabras) => {
        const palabras = texto.split(" ");
        return palabras.length > maxPalabras
            ? palabras.slice(0, maxPalabras).join(" ") + "..."
            : texto;
    };

    return (
        <div className="w-full py-10 px-7 md:px-15">
            <h2 className="font-bold mb-10 text-4xl">Admin Dashboard</h2>

            {error && <p className="text-red-500">{error}</p>}

            {/* Contenido del Dashboard */}
            <div className="grid gap-y-5 ">

                {/* Cuadros sobre las estadisticas */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5" >
                    <div className="bg-white shadow-xl border border-gray-100 rounded-lg p-4 flex items-center space-x-4 h-28">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Clapperboard className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500"> Películas Populares</p>
                            <p className="text-xl font-bold text-black">{totalPopulares}</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-xl border border-gray-100 rounded-lg p-4 flex items-center space-x-4 h-28">
                        <div className="bg-green-100 p-3 rounded-full">
                            <Star className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500"> Mejor Valoradas</p>
                            <p className="text-xl font-bold text-black">{totalMejorValoradas}</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-xl border border-gray-100 rounded-lg p-4 flex items-center space-x-4 h-28">
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <Drama className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500"> Géneros</p>
                            <p className="text-xl font-bold text-black">{totalGeneros}</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-xl border border-gray-100 rounded-lg p-4 flex items-center space-x-4 h-28">
                        <div className="bg-purple-100 p-3 rounded-full">
                            <Tv className="w-6 h-6 text-purple-600" /> 
                        </div>
                        <div>
                            <p className="text-sm text-gray-500"> Series Populares</p>
                            <p className="text-xl font-bold text-black">{totalSeries}</p>
                        </div>
                    </div>
                </div>



                <div className="grid gap-5 md:grid-cols-2 " >

                    <div className="bg-white shadow-xl border border-gray-100 rounded-lg md:row-span-2 h-96 md:h-[540px]">
                        <h1 className="font-bold text-xl m-5">Top 5 Upcoming Releases</h1>

                        <div className="overflow-y-auto h-72 md:h-[450px]">
                            {lanzamientos.map((lanzamiento) => (
                                <div className="p-5 border-t w-full flex justify-between">
                                    <div>
                                        <p>{lanzamiento.original_title}</p>
                                        <p className="text-gray-600 text-sm">{limitarPalabras(lanzamiento.overview, 10)}</p>
                                    </div>
                                    <div className="text-end">
                                        <p title="Popularidad">Original language: <b>{lanzamiento.original_language}</b> </p>
                                        <p className="text-gray-600 text-sm">  {lanzamiento.release_date} </p>
                                    </div>
                                </div>

                            ))

                            }

                        </div>

                    </div>

                    <div className="bg-white shadow-xl border border-gray-100 rounded-lg">
                        <h1 className="font-bold text-xl m-5">Quick Actions</h1>
                        <div className="p-5 border-t w-full grid gap-5">
                            <button onClick={handleUpComingAdmin} className="bg-blue-600 text-white font-bold p-3 w-full rounded-md hover:bg-blue-500">Upcoming Releases</button>
                            <button onClick={handleMoviesPopularAdmin} className=" text-gray-600 border border-gray-400 font-bold p-3 w-full rounded-md hover:bg-gray-100"> Popular Movies </button>
                            <button onClick={handleTpoRatedrAdmin} className="text-gray-600 border border-gray-400 font-bold p-3 w-full rounded-md hover:bg-gray-100">Favorites Movies</button>
                        </div>
                    </div>

                    <div className="bg-white shadow-xl border border-gray-100 rounded-lg ">
                        <h1 className="font-bold text-xl m-5">Movies Status</h1>
                        <div className="p-5 border-t w-full grid gap-5">
                            <div className="flex justify-between">
                                <p className="text-gray-600">Movies in Favorites:</p>
                                <p className="font-bold">13</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-600">Categories:</p>
                                <p className="font-bold">4</p>
                            </div>

                        </div>
                    </div>

                </div>


            </div>

        </div>

    );
}
import { PopularSeriesTMDB, TopRatedSeriesTMDB, OnTheAirSeriesTMDB, AiringTodaySeriesTMDB } from "../api/tmdbApi";
import { useEffect, useState } from "react";

export function Series() {
    const [mostrarMovies, setMsotrarMovies] = useState([]);
    const [categoria, setCategoria] = useState("popular")

    const cambioCategoria = (e) => {
        setCategoria(e.target.value)
    }

    useEffect(() => {
        const mostrarPopularMovies = async () => {
            try {

                let data;

                if (categoria === "popular") data = await PopularSeriesTMDB();
                else if (categoria === "airing_today") data = await AiringTodaySeriesTMDB();
                else if (categoria === "on_the_air") data = await OnTheAirSeriesTMDB();
                else if (categoria === "top_rated") data = await TopRatedSeriesTMDB();


                setMsotrarMovies(data.results);
                console.log(data.results);

            } catch (error) {
                console.error("Error al cargar las películas:", error.message)
            }
        }

        mostrarPopularMovies();
    }, [categoria]);

    return (
        <>

            <div className="w-full pt-20">

                <div className="flex justify-between items-center px-10 py-5">
                <h1 className=" font-bold text-4xl m-5">Popular Series</h1>
             

                    <select
                        className="border border-gray-300 rounded p-2 text-sm h-10 focus:border-blue-500 focus:outline-none"
                        value={categoria}
                        onChange={cambioCategoria}>

                        <option value="popular">Populares</option>
                        <option value="airing_today">Se emiten hoy</option>
                        <option value="on_the_air">En el aire acualmente</option>
                        <option value="top_rated">Mejor calificadas</option>
                    </select>
                </div>

                <div className="p-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {mostrarMovies.map((pelicula) => (
                        <div
                            key={pelicula.id}
                            className="rounded-lg bg-white overflow-hidden shadow-lg hover:shadow-blue-600 transition-shadow duration-300 w-full"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w200${pelicula.poster_path}`}
                                alt={pelicula.title}
                                className="w-full object-cover"
                            />
                            <div className="p-3">
                                <p className="font-semibold">{pelicula.name}</p>
                                <p className="text-sm text-gray-500">{pelicula.first_air_date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )

}
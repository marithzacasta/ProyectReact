import { PopularSeriesTMDB, TopRatedSeriesTMDB, OnTheAirSeriesTMDB, AiringTodaySeriesTMDB } from "../api/tmdbApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Series() {
    const [mostrarSeries, setMsotrarSeries] = useState([]);
    const [categoria, setCategoria] = useState("popular")
    const [busqueda, setBusqueda] = useState("");
    const [error, setError] = useState([]);

    const navigate = useNavigate();

    const cambioCategoria = (e) => {
        setCategoria(e.target.value)
    }

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const normalizeText = (text) =>
        text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    // text.normalize("NFD") separa las letras de los acentos (o `)
    // .replace(/[\u0300-\u036f]/g, "") se usa para eliminar los caracteres de acento que quedaron sueltos después de la normalización.

    const seriresFiltradas = mostrarSeries.filter((serie) =>
        normalizeText(serie.name).includes(normalizeText(busqueda))
    ); // una variable que filtre según el texto del buscador:


    useEffect(() => {
        const mostrarPopularMovies = async () => {
            try {
                let data;

                if (categoria === "popular") data = await PopularSeriesTMDB();
                else if (categoria === "airing_today") data = await AiringTodaySeriesTMDB();
                else if (categoria === "on_the_air") data = await OnTheAirSeriesTMDB();
                else if (categoria === "top_rated") data = await TopRatedSeriesTMDB();

                setMsotrarSeries(data.results);
                console.log(data.results);
                

            } catch (error) {
                console.error("Error loading series listing:", error.message)
                setError("The series listings could not be loaded");
            }
        }

        mostrarPopularMovies();
    }, [categoria]);

    return (
        <>

            <div className="w-full pt-20">

                <div className="flex justify-between items-center px-10 py-5">
                    <h1 className=" font-bold text-4xl m-5">Popular Series</h1>

                    {error && <p className="text-red-500 m-10">{error}</p>}

                    <div className="flex flex-col sm:flex-row ">
                        <input
                            type="text"
                            placeholder="Search Serie..."
                            value={busqueda}
                            onChange={handleBusqueda}
                            className="border border-gray-300 rounded p-2 text-sm h-10 focus:border-blue-500 focus:outline-none mb-2 sm:mr-2"
                        />

                        <select
                            className="border border-gray-300 rounded p-2 text-sm h-10 focus:border-blue-500 focus:outline-none"
                            value={categoria}
                            onChange={cambioCategoria}>

                            <option value="popular">Popular</option>
                            <option value="airing_today">Airing Today</option>
                            <option value="on_the_air">On the Air</option>
                            <option value="top_rated">Top Rated</option>
                        </select>
                    </div>
                </div>

                <div className="p-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {seriresFiltradas.map((series) => (
                        <div
                            key={series.id}
                            className="rounded-lg bg-white overflow-hidden shadow-lg hover:shadow-blue-600 transition-shadow duration-300 w-full"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w200${series.poster_path}`}
                                alt={series.title}
                                className="w-full object-cover"
                                onClick={() => navigate(`/serie/${series.id}`)}
                            />
                            <div className="p-3">
                                <p className="font-semibold">{series.name}</p>
                                <p className="text-sm text-gray-500">{series.first_air_date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )

}
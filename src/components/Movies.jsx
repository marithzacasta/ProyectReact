import { PopularMoviesTMDB, UpcomingReleasesMoviesTMDB, TopRatedMoviesTMDB, NowPlayingMoviesTMDB } from "../api/tmdbApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Movies() {

    const [mostrarMovies, setMostrarMovies] = useState([]);
    const [categoria, setCategoria] = useState("popular");
    const [busqueda, setBusqueda] = useState("");

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

    const peliculasFiltradas = mostrarMovies.filter((pelicula) =>
        normalizeText(pelicula.title).includes(normalizeText(busqueda))
    ); // una variable que filtre según el texto del buscador:

    useEffect(() => {
        const mostrarPopularMovies = async () => {
            try {
                let data;

                if (categoria === "popular") data = await PopularMoviesTMDB();
                else if (categoria === "upcoming") data = await UpcomingReleasesMoviesTMDB();
                else if (categoria === "now_playing") data = await NowPlayingMoviesTMDB();
                else if (categoria === "top_rated") data = await TopRatedMoviesTMDB();

                setMostrarMovies(data.results);

            } catch (error) {
                console.error("Error al cargar las películas:", error.message)
            }
        }

        mostrarPopularMovies();
    }, [categoria]); // Ejecuta este efecto cada vez que cambie el valor de categoria // // ← Esto hace que se recargue cuando cambias el select

    return (
        <>

            <div className="w-full pt-20">

                <div className="flex justify-between items-center px-10 py-5">

                    <h1 className=" font-bold text-4xl m-5">Popular Movies</h1>

                    <div className="flex flex-col sm:flex-row ">
                        <input
                            type="text"
                            placeholder="Buscar película..."
                            value={busqueda}
                            onChange={handleBusqueda}
                            className="border border-gray-300 rounded p-2 text-sm h-10 focus:border-blue-500 focus:outline-none mb-2 sm:mr-2"
                        />

                        <select
                            className="border border-gray-300 rounded p-2 text-sm h-10 focus:border-blue-500 focus:outline-none"
                            value={categoria}
                            onChange={cambioCategoria}>

                            <option value="popular">Populares</option>
                            <option value="upcoming">Próximas</option>
                            <option value="now_playing">En cartelera</option>
                            <option value="top_rated">Mejor calificadas</option>
                        </select>

                    </div>

                </div>


                <div className="p-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {peliculasFiltradas.map((pelicula) => (
                        <div
                            key={pelicula.id}
                            className="rounded-lg bg-white overflow-hidden shadow-lg hover:shadow-blue-600 transition-shadow duration-300 w-full"
                            onClick={() => navigate(`/movie/${pelicula.id}`)}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w200${pelicula.poster_path}`}
                                alt={pelicula.title}
                                className="w-full object-cover"
                            />
                            <div className="p-3">
                                <p className="font-semibold">{pelicula.title}</p>
                                <p className="text-sm text-gray-500">{pelicula.release_date}</p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>

        </>
    )

}
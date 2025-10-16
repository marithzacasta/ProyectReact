import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { showEachMoviesTMDB, GenreListTMDB, showEachVideosMoviesTMDB, showEachReviewMoviesTMDB } from "../api/tmdbApi"; // Este lo debes tener o crear
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DetallePelicula() {

    const Navigate = useNavigate();

    const { id } = useParams();
    const [pelicula, setPelicula] = useState(null);
    const [genres, setGenres] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [reviews, setReviews] = useState([]);


    const handleVolver = () => {
        Navigate("/movies")
    }

    useEffect(() => {
        const cargarGeneros = async () => {
            try {
                const data = await GenreListTMDB();
                setGenres(data.genres); // Asumiendo que quieres la lista de géneros

            } catch (error) {
                console.error("Error al cargar los géneros:", error.message);
            }
        }

        const fetchTrailer = async () => {
            try {
                const data = await showEachVideosMoviesTMDB(id);
                const trailerVideo = data.results.find((v) => v.type === "Trailer" && v.site === "YouTube");
                setTrailer(trailerVideo); // Asumiendo que quieres la lista de géneros

            } catch (error) {
                console.error("Error al cargar los géneros:", error.message);
            }

        };

        const fetchReviews = async () => {
            try {
                const data = await showEachReviewMoviesTMDB(id);
                setReviews(data.results || []);

            } catch (error) {
                console.error("Error al cargar los géneros:", error.message);
            }

        };

        cargarGeneros();
        fetchTrailer();
        fetchReviews();

    }, []);


    // ✅ Función para obtener la clase de género para el estilo
    const obtenerClaseGenero = (nombre) => {
        switch (nombre.toLowerCase()) { // toLowerCase convierte el nombre a minúsculas para evitar problemas de coincidencia
            case 'acción':
                return 'bg-red-100 text-red-800';
            case 'drama':
                return 'bg-blue-100 text-blue-800';
            case 'comedia':
                return 'bg-yellow-100 text-yellow-800';
            case 'fantasía':
                return 'bg-purple-100 text-purple-800';
            case 'terror':
                return 'bg-gray-200 text-gray-800';
            case 'documental':
                return 'bg-green-100 text-green-800';
            case 'familia':
                return 'bg-pink-100 text-pink-800';
            case 'aventura':
                return 'bg-orange-100 text-orange-800';
            case 'animación':
                return 'bg-green-100 text-green-800';
            case 'misterio':
                return 'bg-blue-100 text-blue-800';
            case 'crimen':
                return 'bg-purple-100 text-purple-800';
            case 'suspense':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await showEachMoviesTMDB(id);
                setPelicula(data);
                //console.log(data);

            } catch (error) {
                console.error("Error al cargar detalles:", error);
            }
        };
        fetchMovie();
    }, [id]);

    if (!pelicula) return <p className="text-center mt-10">Loading...</p>;


    return (
        <div className="w-full pt-20">
            <div className="flex justify-end items-center px-10 py-6">

                <button onClick={handleVolver} className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-200 transition-colors">
                    <ArrowLeft size={22} />
                    <span>Return to the beginning</span>
                </button>
            </div>

            <div className="px-10 flex justify-center items-stretch md:px-14 md:flex-row flex-col py-8 gap-10 transition-all duration-300">
                <div className="flex justify-center h-[500px]">
                    <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} className="rounded-md w-80" />
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    <h1 className="font-bold text-4xl mb-5">{pelicula.title}</h1>
                    <p className="text-gray-700">{pelicula.overview}</p>

                    <p className=" mt-5 font-semibold text-2xl">🎭 Genders:</p>
                    <div className="flex flex-wrap gap-3 my-5">
                        {pelicula.genres.map((g) => (
                            <span key={g.id} className={`${obtenerClaseGenero(g.name)} text-xs font-semibold px-2 py-1 rounded-full`}>
                                {g.name}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-600 mt-2 "><b>Release Date:</b> {pelicula.release_date}</p>
                    <p className="text-gray-600 mt-2 "> <b>Vote Average:</b> {pelicula.vote_average}</p>

                    <h2 className="text-2xl font-bold my-5 ">🎞️ Tráiler</h2>
                    {trailer ? (
                        <iframe
                            width="100%"
                            height="400"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title="Trailer"
                            allowFullScreen
                            className="rounded-lg "
                        ></iframe>
                    ) : (
                        <p className="text-gray-500">No trailer available.</p>
                    )}

                    <h2 className="text-2xl font-bold my-5 ">📝 Reviews</h2>
                    {reviews.length > 0 ? (
                        reviews.slice(0, 5).map((r) => (
                            <div key={r.id} className="border-t py-2">
                                <p className="text-gray-800">
                                    <strong>{r.author}:</strong> {r.content}...
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No reviews available.</p>
                    )}

                </div>

            </div>


        </div>
    );
}

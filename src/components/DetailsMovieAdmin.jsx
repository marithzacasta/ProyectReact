import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { showEachMoviesTMDB, showEachVideosMoviesTMDB, showEachReviewMoviesTMDB } from "../api/tmdbApi";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function DetailsPelicula2() {

    const Navigate = useNavigate();

    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [reviews, setReviews] = useState([]);

    const handleVolver = () => {
        Navigate("/dashboardPage/movielist")
    }


    // ✅ Cargar la lista de géneros al iniciar el componente
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const data = await showEachMoviesTMDB(id);
                setMovie(data); // Asumiendo que quieres la lista de géneros

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



        fetchMovieDetails();
        fetchTrailer();
        fetchReviews();
    }, [id]);

    if (!movie) return <p className="text-center mt-10">Cargando detalles...</p>;


    return (
        <div className="w-full py-10 px-7">
            <div className="flex justify-end items-center px-10 py-6">

                <button onClick={handleVolver} className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-200 transition-colors">
                    <ArrowLeft size={22} />
                    <span> Return</span>
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 ">
                <div className="flex flex-col md:flex-row gap-6">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-64 rounded-lg shadow"
                    />
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                        <p className="text-gray-600 mb-3">{movie.overview}</p>

                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        <p><strong>Original Language:</strong> {movie.original_language}</p>
                        <p><strong>Runtime:</strong> {movie.runtime} min</p>
                        <p><strong>Vote avarage:</strong> ⭐ {movie.vote_average} / 10</p>

                        <div className="mt-3">
                            <strong>Genders:</strong>{" "}
                            {movie.genres?.map((g) => g.name).join(", ")}
                        </div>
                    </div>
                </div>

                {/* Trailer */}
                {trailer && (
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-2">🎞️ Tráiler</h2>
                        <iframe
                            width="100%"
                            height="400"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title="Trailer"
                            allowFullScreen
                            className="rounded-lg"
                        ></iframe>
                    </div>
                )}

                {/* Reseñas */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-2">📝 Reviews</h2>
                    {reviews.length > 0 ? (
                        reviews.slice(0, 5).map((r) => (
                            <div key={r.id} className="border-t py-2">
                                <p className="text-gray-800">
                                    <strong>{r.author}:</strong> {r.content.slice(0, 200)}...
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

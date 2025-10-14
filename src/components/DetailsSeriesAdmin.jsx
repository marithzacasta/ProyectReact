import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { showEachSeriesTMDB, showEachVideosSeriesTMDB, showEachReviewSeriesTMDB } from "../api/tmdbApi";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function DetailsSerie() {

      const Navigate = useNavigate();

  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [reviews, setReviews] = useState([]);

  const handleVolver = () => {
        Navigate("/dashboardPage/seriepage")
    }

  useEffect(() => {
    const fetchSerieData = async () => {
      try {
        const data = await showEachSeriesTMDB(id);
        setSerie(data);

        const trailerData = await showEachVideosSeriesTMDB(id);
        const trailerVideo = trailerData.results.find(v => v.type === "Trailer" && v.site === "YouTube");
        setTrailer(trailerVideo);

        const reviewData = await showEachReviewSeriesTMDB(id);
        setReviews(reviewData.results || []);
      } catch (error) {
        console.error("Error al obtener detalles de la serie:", error.message);
      }
    };

    fetchSerieData();
  }, [id]);

  if (!serie) return <p className="text-center mt-10">Cargando detalles...</p>;

  return (
    <div className="w-full py-10 px-7">

        <div className="flex justify-end items-center px-10 py-6">

                <button onClick={handleVolver} className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-200 transition-colors">
                    <ArrowLeft size={22} />
                    <span> Return</span>
                </button>
            </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
            alt={serie.name}
            className="w-64 rounded-lg shadow"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{serie.name}</h1>
            <p className="text-gray-600 mb-3">{serie.overview}</p>
            <p><strong>Primer episodio:</strong> {serie.first_air_date}</p>
            <p><strong>Idioma original:</strong> {serie.original_language}</p>
            <p><strong>Promedio de votos:</strong> ⭐ {serie.vote_average} / 10</p>
            <p><strong>Temporadas:</strong> {serie.number_of_seasons}</p>
            <p><strong>Episodios:</strong> {serie.number_of_episodes}</p>

            <div className="mt-3">
              <strong>Géneros:</strong>{" "}
              {serie.genres?.map((g) => g.name).join(", ")}
            </div>
          </div>
        </div>

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

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">📝 Reseñas</h2>
          {reviews.length > 0 ? (
            reviews.slice(0, 5).map((r) => (
              <div key={r.id} className="border-t py-2">
                <p className="text-gray-800">
                  <strong>{r.author}:</strong> {r.content.slice(0, 200)}...
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay reseñas disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { GenreListTMDB } from '../api/tmdbApi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const API_KEY = "d26f471083cc40dad45fc838fa21355d";
export function Genres() {

    const [genres, setGenres] = useState([]);
    const [moviesByGenre, setMoviesByGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("es");
    const [totalGenres, setTotalGenres] = useState(0);
    const [error, setError] = useState([]);

    useEffect(() => {
        fetchGenres();
    }, []);

    useEffect(() => {
        if (selectedGenre) fetchMoviesByGenre();
    }, [selectedGenre, selectedLanguage]);

    // 🔹 Obtener lista de géneros
    const fetchGenres = async () => {
        try {
            const data = await GenreListTMDB();
            setGenres(data.genres);
            setTotalGenres(data.genres.length);


        } catch (error) {
            console.error("Error al obtener géneros:", error);
            setError("No se pudieron cargar los generos");
        }
    };

    // 🔹 Obtener películas por género
    const fetchMoviesByGenre = async () => {
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&language=${selectedLanguage}`
            );
            const data = await res.json();
            console.log(data);
            

            const chart = [
                {
                    name: genres.find((g) => g.id == selectedGenre)?.name || "Género",
                    peliculas: data.results.length,
                },
            ];

            setMoviesByGenre(chart);
        } catch (error) {
            console.error("Error al obtener películas por género:", error);
            setError("No se pudieron obtener peliculas por genero");
        }
    };


    return (

        <div className="w-full py-10 px-7 lg:px-20">

            <div className="flex justify-between mb-10 ">
                <h2 className="font-bold text-4xl"> 🎭 Géneros disponibles </h2>
            </div>

            {error && <p className="text-red-500">{error}</p>} {/* Este es un operador lógico AND (&&), 
            Funciona así: si error tiene un valor verdadero, entonces React mostrará lo que hay después del &&. 
            Si error es null, undefined, false o una cadena vacía (""), no se mostrará nada. */}


            {/* 🎬 Total de géneros */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-lg p-4 text-center mb-5">
                <h2 className="text-2xl font-bold text-indigo-600 mb-2"> Géneros disponibles</h2>
                <p className="text-gray-600">
                    Total de géneros registrados:{" "}
                    <span className="text-indigo-500 font-semibold">{totalGenres}</span>
                </p>
            </div>

            {/* 🧩 Filtros */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center justify-center mb-5">
                <div>
                    <label className="block text-sm font-medium mb-1">Filtrar por género:</label>
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="">Selecciona un género</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Filtrar por idioma:</label>
                    <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="es">Español</option>
                        <option value="en">Inglés</option>
                        <option value="fr">Francés</option>
                        <option value="ja">Japonés</option>
                    </select>
                </div>
            </div>

            {/* 📊 Gráfica */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-lg p-4">
                <h3 className="text-xl font-bold mb-4 text-center">
                    📈 Películas por género seleccionado
                </h3>

                {moviesByGenre.length === 0 ? (
                    <p className="text-center text-gray-500">
                        Selecciona un género para ver los resultados
                    </p>
                ) : (
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={moviesByGenre}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="peliculas" fill="#6366f1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>



        </div>

    );

}
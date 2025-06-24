import { Film } from "lucide-react";
import { useEffect, useState } from "react";
import { TopRatedMoviesTMDB } from "../api/tmdbApi";

export function Favorites() {

    const [TopRated, sertTopRated] = useState([]);

    useEffect(() => {
        const mostrarTopRated = async () => {
            try {
                const data = await TopRatedMoviesTMDB();
                sertTopRated(data.results);
                console.log(data.results); // Verifica la estructura de datos
                

            } catch (error) {
                console.error("Error al cargar las películas mejor valoradas:", error.message);
            }

        }

        mostrarTopRated();

    }, [])


    return (

        <div className="w-full py-10 px-7 lg:px-20">
            <div className="flex justify-between mb-10 ">
                <h2 className="font-bold text-4xl">Favorite Movies</h2>
            </div>

            {/* Contenido del Manage */}
            <div className="flex justify-center ">
                <table className="w-full table-auto shadow bg-white rounded-lg ">
                    <thead className=" text-left border-b">
                        <tr>
                            <th className="p-3 font-medium text-sm text-gray-700">Movie</th>
                            <th className="p-3 font-medium text-sm text-gray-700 hidden md:table-cell">Category</th>
                            <th className="p-3 font-medium text-sm text-gray-700">Date</th>
                            <th className="p-3 font-medium text-sm text-gray-700 hidden md:table-cell">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">

                        {TopRated.map((movie) => (
                            <tr className="hover:bg-gray-50">
                                <td className="p-3 flex items-center gap-3">
                                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="" className="w-10 h-10 object-cover" />
                                    <div>
                                        <div className="font-medium text-gray-800">{movie.title}</div>
                                        <div className="text-sm text-gray-500"> {movie.overview}</div>
                                    </div>
                                </td>
                                <td className="p-2 md:p-4 space-x-2 hidden md:table-cell">
                                    <div className="flex flex-wrap gap-1">

                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full`}>
                                            holaaa
                                        </span>

                                    </div>
                                </td>
                                <td className="p-2 md:p-4 text-gray-700">{movie.release_date}</td>
                                <td className="p-2 md:p-4 text-center space-x-2 hidden md:table-cell">
                                    <button className="text-blue-600 hover:text-green-600"><Film size={16} /></button>
                                </td>
                            </tr>
                        ))}




                    </tbody>
                </table>



            </div>

        </div>

    );

}
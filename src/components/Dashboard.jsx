import { Package, ShoppingBag, Users, TrendingUp } from "lucide-react";
// import { mostrar } from "../api/authApi";
import { useEffect, useState } from "react";
import { UpcomingReleasesMoviesTMDB } from "../api/tmdbApi";


export function Dashboard() {

    // const [usuarios, setUsuarios] = useState([]);
    const [lanzamientos, setLanzamientos] = useState([]);
    const [error, setError] = useState(null);


    // Función para mostrar los usuarios
    // useEffect(() => {
    //     const cargarUsuarios = async () => {
    //         try {
    //             const data = await mostrar();
    //             setUsuarios(data.message);


    //         } catch (err) {
    //             console.error("Error:", err.message);
    //             setError("No se pudieron cargar los usuarios");
    //         }
    //     };

    //     cargarUsuarios();
    // }, []);


    useEffect(() => {

        const cargarLanzamientos = async () => {
            try {
                const data = await UpcomingReleasesMoviesTMDB();
                setLanzamientos(data.results); // Asumiendo que quieres la lista de lanzamientos
                // console.log(data.results); // Verifica la estructura de datos

            } catch (error) {
                console.error("Error al cargar las próximas fechas:", error.message);
                setError("No se pudieron cargar los lanzamientos");
            }
        }

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
                            <Package className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Views</p>
                            <p className="text-xl font-bold text-black">6</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-xl border border-gray-100 rounded-lg p-4 flex items-center space-x-4 h-28">
                        <div className="bg-green-100 p-3 rounded-full">
                            <ShoppingBag className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Favorites</p>
                            <p className="text-xl font-bold text-black">6</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-xl border border-gray-100 rounded-lg p-4 flex items-center space-x-4 h-28">
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <Users className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Users Registered</p>
                            <p className="text-xl font-bold text-black">6</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-xl border border-gray-100 rounded-lg p-4 flex items-center space-x-4 h-28">
                        <div className="bg-purple-100 p-3 rounded-full">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Revenue</p>
                            <p className="text-xl font-bold text-black">6</p>
                        </div>
                    </div>
                </div>


               
                <div className="grid gap-5 md:grid-cols-2 " >

                    <div className="bg-white shadow-xl border border-gray-100 rounded-lg md:row-span-2 h-96 md:h-[540px]">
                        <h1 className="font-bold text-xl m-5">Upcoming Releases</h1>

                        <div className="overflow-y-auto h-72 md:h-[450px]">
                            {lanzamientos.map((lanzamiento) => (
                                <div className="p-5 border-t w-full flex justify-between">
                                    <div>
                                        <p>{lanzamiento.title}</p>
                                        <p className="text-gray-600 text-sm">{limitarPalabras(lanzamiento.overview, 10)}</p>
                                    </div>
                                    <div className="text-end">
                                        <p title="Popularidad">{lanzamiento.popularity}</p>
                                        <p className="text-gray-600 text-sm">{lanzamiento.release_date}</p>
                                        <div title="Películas para toda la familia" className="text-yellow-700 text-xs font-medium bg-yellow-200 text-center rounded-lg">Familiar</div>
                                    </div>
                                </div>

                            ))

                            }

                        </div>

                    </div>

                    <div className="bg-white shadow-xl border border-gray-100 rounded-lg">
                        <h1 className="font-bold text-xl m-5">Quick Actions</h1>
                        <div className="p-5 border-t w-full grid gap-5">
                            <button className="bg-blue-600 text-white font-bold p-3 w-full rounded-md hover:bg-blue-500">Upcoming Releases</button>
                            <button className=" text-gray-600 border border-gray-400 font-bold p-3 w-full rounded-md hover:bg-gray-100"> Popular Movies </button>
                            <button className="text-gray-600 border border-gray-400 font-bold p-3 w-full rounded-md hover:bg-gray-100">Favorites Movies</button>
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
                                <p className="font-bold">5</p>
                            </div>
                            
                        </div>
                    </div>

                </div>


            </div>

        </div>

    );
}
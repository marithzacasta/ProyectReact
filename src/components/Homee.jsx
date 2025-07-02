import { Link } from "react-router-dom";

export function Homee() {

    return (
        <>

            <div className="w-full pt-20">

                <div>
                    <img src="/img/movies.jpg" alt="" className="object-cover w-full" />
                </div>
                
                <div className="p-5 pb-20">

                    {/* Título centrado */}
                    <div className="m-10">
                        <h1 className="font-semibold text-4xl text-center">Dashboard Movies</h1>
                    </div>

                    {/* Contenedor de tarjetas */}
                    <div className="flex flex-wrap justify-center gap-10">

                        {/* Tarjeta 1 */}

                        <div className="relative w-[350px] h-60 rounded-lg overflow-hidden shadow-xl border border-gray-100 group">
                            <img
                                src="/img/pocorn.jpg"
                                alt="Movie"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40">
                                <h1 className="text-xl font-semibold text-white">Map</h1>
                                <button className="bg-white p-2 rounded-md shadow-x hover:bg-slate-100 mt-2">
                                    Watch
                                </button>
                            </div>
                        </div>

                        {/* Tarjeta 2 */}

                        <div className="relative w-[350px] h-60 rounded-lg overflow-hidden shadow-xl border border-gray-100 group">
                            <img
                                src="/img/film.jpg"
                                alt="Movie"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40">
                                <h1 className="text-xl font-semibold text-white">Popular Series</h1>
                                <Link to={"/series"}>
                                    <button className="bg-white p-2 rounded-md shadow-lg hover:bg-slate-100 mt-2">
                                        Watch List
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Tarjeta 3 */}
                        <div className="relative w-[350px] h-60 rounded-lg overflow-hidden shadow-xl border border-gray-100 group">
                            <img
                                src="/img/table.jpg"
                                alt="Movie"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-400 bg-opacity-50">
                                <h1 className="text-xl font-semibold">Popular Movies</h1>
                                <Link to={"/movies"}>
                                    <button className="bg-white p-2 rounded-md shadow-lg hover:bg-slate-100 mt-2">
                                        Watch List
                                    </button>
                                </Link>

                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </>
    );

}
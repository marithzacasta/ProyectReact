import { Footer } from "../components/Footer";
import { Navegador } from "../components/Navegador";

export function Home() {

   

    const handleCV = () => {
        const link = document.createElement("a"); // Crea un elemento de enlace.
        link.href = "../public/Hoja_de_vida.pdf"; // Le da una dirección (el archivo PDF).
        link.download = "HojaDeVida_MarithzaCastano.pdf"; // Activa la descarga con download.
        link.click(); // Simula un clic para iniciar la descarga.

    }

   

    return (
        <>

            <Navegador />

            <div className="flex-1 flex flex-col h-full transition-all duration-300 bg-gray-100 overflow-y-auto">

                <div className="w-full pt-20">

                    <div>
                        <img src="../public/img/movies.jpg" alt="" className="object-cover w-full" />
                    </div>

                    <div className="bg-white grid md:grid-cols-[60%_40%] ">

                        <div className="p-5 py-10 flex ">
                            <img src="../public/img/foto_mia.jpg" alt="" className="w-50 h-60 rounded-lg" />

                            <div className="p-5">
                                <h1 className="font-semibold text-lg">Marithza Castaño</h1>
                                <br />
                                <p className="text-sm"> Proactiva, organizada y responsable, con buenas habilidades interpersonales y actitud positiva
                                    ante los retos. Apasionada por el aprendizaje continuo, el trabajo en equipo y el desarrollo de
                                    soluciones funcionales. Busco un puesto desafiante donde seguir creciendo profesionalmente.</p>
                            </div>

                        </div>

                        <div className="bg-amber-400 px-40 md:px-20 py-10 flex flex-col items-center justify-center gap-5">
                            <button onClick={handleCV} className="p-2 w-full bg-white rounded-lg font-semibold hover:bg-slate-100">My CV</button>
                            <button className="p-2 w-full text-white bg-blue-500 rounded-lg font-semibold hover:bg-blue-600">Contact me</button>
                            <button className="p-2 w-full bg-white rounded-lg font-semibold hover:bg-slate-100">Information About me</button>

                        </div>

                    </div>

                    {/* <div className="grid md:grid-cols-[40%_60%]">
                        <div className="p-5 py-10 bg-purple-400 text-white">
                            <h1 className="font-semibold text-2xl">About this project</h1>
                            <br />
                            <p className="text-sm">This project is a web application that allows users to explore and manage a collection of movies.
                                It includes features such as viewing popular movies, managing favorites, and searching for specific titles.
                                The application is built using React and integrates with the TMDB API to fetch movie data.</p>

                        </div>

                        <div className="p-5 py-10 ">
                            <h1 className="font-semibold text-lg">Technologies used</h1>
                            <br />
                            <p className="text-sm">The project is developed using the following technologies:</p>

                            <div className="grid grid-cols-3 gap-4 mt-5 text-white">
                                <button className="bg-blue-300 p-2 flex flex-col items-center rounded-md shadow-md shadow-blue-700 transition transform hover:scale-105 duration-300"> <Atom /> React</button>
                                <button className="bg-blue-700 p-2 flex flex-col items-center rounded-md shadow-md shadow-blue-400 transition transform hover:scale-105 duration-300"> <EqualApproximately /> Tailwind </button>
                                <button className="bg-blue-400 p-2 flex flex-col items-center rounded-md shadow-md shadow-green-500 transition transform hover:scale-105 duration-300"> <Film /> TMDB API </button>
                                <button className="bg-gray-600 p-2 flex flex-col items-center rounded-md shadow-md shadow-purple-700 transition transform hover:scale-105 duration-300"> <Github /> GitHub </button>
                                <button className="bg-yellow-400 p-2 flex flex-col items-center rounded-md shadow-md shadow-white transition transform hover:scale-105 duration-300"> <FileJson /> JavaScript </button>
                                <button className="bg-red-600 p-2 flex flex-col items-center rounded-md shadow-md shadow-gray-600 transition transform hover:scale-105 duration-300"> <Shell /> Lucide</button>

                            </div>

                        </div>

                    </div> */}

                    <div className="p-5 pb-20">

                        {/* Título centrado */}
                        <div className="m-10">
                            <h1 className="font-semibold text-4xl text-center">Recommend Movies</h1>
                        </div>

                        {/* Contenedor de tarjetas */}
                        <div className="flex  flex-wrap justify-center gap-10">

                            {/* Tarjeta 1 */}
                            <div className="relative w-[350px] h-60 rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src="../public/img/pocorn.jpg"
                                    alt="Movie"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-400 bg-opacity-50">
                                    <h1 className="text-xl font-semibold">Recommend</h1>
                                    <button className="bg-white p-2 rounded-md shadow-lg hover:bg-slate-100 mt-2">
                                        Watch Now
                                    </button>
                                </div>
                            </div>

                            {/* Tarjeta 2 */}
                            <div className="relative w-[350px] h-60 rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src="../public/img/film.jpg"
                                    alt="Movie"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-400 bg-opacity-50">
                                    <h1 className="text-xl font-semibold text-white">Recommend</h1>
                                    <button className="bg-white p-2 rounded-md shadow-lg hover:bg-slate-100 mt-2">
                                        Watch Now
                                    </button>
                                </div>
                            </div>

                            {/* Tarjeta 3 */}
                            <div className="relative w-[350px] h-60 rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src="../public/img/table.jpg"
                                    alt="Movie"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-400 bg-opacity-50">
                                    <h1 className="text-xl font-semibold">Recommend</h1>
                                    <button className="bg-white p-2 rounded-md shadow-lg hover:bg-slate-100 mt-2">
                                        Watch Now
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

                {/* Footer */}
                <Footer />

            </div>
        </>
    )
}
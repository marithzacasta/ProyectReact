import Lottie from "lottie-react";
import Dowload from "../assets/icons/Download.json";
import User from "../assets/icons/User.json";
import Archive from "../assets/icons/FolderOpen.json";
import { Link } from "react-router-dom";

export function Homee() {
    const handleCV = () => {
        const link = document.createElement("a"); // Crea un elemento de enlace.
        link.href = "../public/Hoja_de_vida.pdf"; // Le da una dirección (el archivo PDF).
        link.download = "HojaDeVida_MarithzaCastano.pdf"; // Activa la descarga con download.
        link.click(); // Simula un clic para iniciar la descarga.

    }
    return (
        <>

            <div className="w-full pt-20">

                <div>
                    <img src="/img/movies.jpg" alt="" className="object-cover w-full" />
                </div>

                <div className="bg-white grid md:grid-cols-[60%_40%] ">

                    <div className="p-5 py-10 flex ">
                        <img src="/img/foto_mia.jpg" alt="" className="w-50 h-60 rounded-lg shadow-md" />

                        <div className="p-5">
                            <h1 className="font-semibold text-lg">Marithza Castaño</h1>
                            <br />
                            <p className="text-sm"> Proactiva, organizada y responsable, con buenas habilidades interpersonales y actitud positiva
                                ante los retos. Apasionada por el aprendizaje continuo, el trabajo en equipo y el desarrollo de
                                soluciones funcionales. Busco un puesto desafiante donde seguir creciendo profesionalmente.</p>
                        </div>

                    </div>

                    <div className="bg-violet-400 px-40 md:px-20 py-10 flex flex-col items-center justify-center gap-5 transition-all duration-200">
                        <button onClick={handleCV} className="p-2 w-full text-white bg-blue-600 rounded-lg font-semibold shadow-lg hover:bg-white hover:text-red-600 hover:shadow-red-600 flex flex-col items-center justify-center group">
                            My CV
                            <Lottie animationData={Dowload} loop={true} className="w-12 h-12 hidden group-hover:block" />
                        </button>
                        <button onClick={handleCV} className="p-2 w-full text-white bg-blue-400 rounded-lg font-semibold shadow-lg hover:bg-white hover:text-blue-600 hover:shadow-blue-600 flex flex-col items-center justify-center group">
                            Contact me
                            <Lottie animationData={User} loop={true} className="w-12 h-12 hidden group-hover:block" />
                        </button>
                        <button onClick={handleCV} className="p-2 w-full text-white bg-yellow-300 rounded-lg font-semibold shadow-lg hover:bg-white hover:text-green-500 hover:shadow-green-600 flex flex-col items-center justify-center group">
                        Information About Page
                            <Lottie animationData={Archive} loop={true} className="w-12 h-12 hidden group-hover:block" />
                        </button>

                    </div>

                </div>

                <div className="p-5 pb-20">

                    {/* Título centrado */}
                    <div className="m-10">
                        <h1 className="font-semibold text-4xl text-center">Dashboard Movies</h1>
                    </div>

                    {/* Contenedor de tarjetas */}
                    <div className="flex flex-wrap justify-center gap-10">

                        {/* Tarjeta 1 */}

                        <div className="relative w-[350px] h-60 rounded-lg overflow-hidden shadow-lg group">
                            <img
                                src="/img/pocorn.jpg"
                                alt="Movie"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40">
                                <h1 className="text-xl font-semibold text-white">Map</h1>
                                <button className="bg-white p-2 rounded-md shadow-lg hover:bg-slate-100 mt-2">
                                    Watch 
                                </button>
                            </div>
                        </div>

                        {/* Tarjeta 2 */}

                        <div className="relative w-[350px] h-60 rounded-lg overflow-hidden shadow-lg group">
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
                        <div className="relative w-[350px] h-60 rounded-lg overflow-hidden shadow-lg group">
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
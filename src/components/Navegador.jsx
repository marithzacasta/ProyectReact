import { Clapperboard, UserRound, Menu } from "lucide-react";
import { useState } from "react";

import Lottie from "lottie-react";
import MovieClapper from "../assets/icons/MovieClapper.json";
import { Link } from "react-router-dom";


export function Navegador() {

    const [menuAbierto, setMenuAbierto] = useState(false);

    const manegarMenu = () => {
        setMenuAbierto(!menuAbierto)
    }

    const cerrarMenu = () => {
        setMenuAbierto(false)
    }

    const handleLogin = () => {
        window.open('/login', '_blank');
    }

    const handleAbout = () => {
        window.open('/about', '_blank');
    }

    const manejarClick = () => {
        manegarMenu();
        handleAbout();
      };

    return (
        <>
            <nav className="flex justify-between p-5 bg-white/80 backdrop-blur-md shadow-md fixed w-full z-50 ">
                <div className="flex gap-3 ">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent p-1">CineGalaxy</h1>
                    {/* <h1 className="text-3xl font-semibold">CineGalaxy</h1> */}
                    {/* <Clapperboard className="w-7 h-7 text-blue-500 mt-2" /> */}
                    <Lottie animationData={MovieClapper} loop={true} className="w-10 h-10 " />
                </div>

                <div className="flex items-center gap-5">
                    <Link to="/">
                        <a href="#" className="text-lg font-semibold hover:text-blue-800 hidden md:block">Home</a>
                    </Link>
                    <Link to="/movies">
                        <a href="#" className="text-lg font-semibold hover:text-blue-800 hidden md:block">Movies</a>
                    </Link>
                    <Link to="/series">
                        <a href="#" className="text-lg font-semibold hover:text-blue-800 hidden md:block">Series</a>
                    </Link>
                    <button onClick={handleAbout}>
                        <a href="#" className="text-lg font-semibold hover:text-blue-800 hidden md:block">About me</a>
                    </button>
                   

                    <button onClick={manegarMenu} className="md:hidden hover:text-blue-600 rounded-full hover:bg-blue-100 w-8 h-8 flex items-center justify-center">
                        <Menu />
                    </button>

                    <button onClick={handleLogin} className="bg-blue-500 text-white font-semibold p-2 flex gap-2 rounded-md hover:bg-blue-400 "> Login  <UserRound className="w-6 h-6 " /></button>
                </div>
            </nav>

            {/* Menú desplegable en móviles */}
            {menuAbierto && (
                <div className="md:hidden fixed top-20 left-0 w-full bg-white shadow-md z-40 flex flex-col items-start p-5 gap-2">
                    <Link to="/" onClick={cerrarMenu} className="text-lg font-semibold hover:bg-gray-200 w-full h-full p-2">Home </Link>
                    <Link to="/movies" onClick={cerrarMenu} className="text-lg font-semibold hover:bg-gray-200 w-full h-full p-2">Movies</Link>
                    <Link to="/series" onClick={cerrarMenu} className="text-lg font-semibold hover:bg-gray-200 w-full h-full p-2">Series</Link>
                    <button onClick={manejarClick} className="text-lg font-semibold hover:bg-gray-200 w-full h-full p-2 text-start">About me</button>
                </div>
            )}


        </>
    )
}
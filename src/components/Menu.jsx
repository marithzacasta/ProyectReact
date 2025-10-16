import { LayoutDashboard, Heart, Crown, Clapperboard, LogOut, Film, CalendarPlus, Drama, ListCollapse, Grid3x3 } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../api/authApi";
import Swal from "sweetalert2";

export function Menu() {
    const [open, setOpen] = useState(false); // empieza cerrado (para pantallas pequeñas)
    const navigate = useNavigate();

    // Alternar menú
    const closeMenu = () => setOpen(!open);

    // Cerrar sesión
    const handleLogout = async () => {
        try {
            await logoutUser();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Logged out successfully",
                showConfirmButton: false,
                timer: 1500,
            });

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error("Error:", error.message);
            Swal.fire({
                icon: "error",
                title: "Error al cerrar sesión",
                text: error.message,
                showConfirmButton: true,
            });
        }
    };

    return (
        <>
            {/* Fondo oscuro detrás del menú (solo móviles) */}
            {open && (
                <div onClick={closeMenu} className="fixed inset-0 bg-black bg-opacity-40 lg:hidden z-40"></div>
            )}

            <div className={`${open ? "w-60" : "w-20"} bg-white shadow-md duration-500 transition-all ease-in-out h-full flex flex-col z-50 ${open ? "fixed lg:relative left-0 top-0" : "relative"}`}>
                {/* Header del menú */}
                <div className={`flex px-4 py-5 border-b transition-all duration-300 ${open ? "items-center justify-between" : "justify-center"}`}>
                    <span className={`text-3xl font-bold text-blue-600 ${!open && "hidden"}`}>
                        CineGalaxy
                    </span>
                    <button onClick={closeMenu}>
                        <Clapperboard className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Navegación */}
                <nav className="mt-4 flex-1">
                    <ul>
                        <Link to="/dashboardPage" onClick={() => setOpen(false)}>
                            <li className={`flex px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${open ? "items-center justify-start gap-3" : "justify-center"}`}>
                                <LayoutDashboard className="w-6 h-6 text-gray-600" />
                                {open && (
                                    <span className="font-semibold ml-3 text-gray-600">
                                        Dashboard
                                    </span>
                                )}
                            </li>
                        </Link>

                        <Link to="/dashboardPage/popular" onClick={() => setOpen(false)}>
                            <li className={`flex px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${open ? "items-center justify-start gap-3" : "justify-center" }`}>
                                <Crown className="w-6 h-6 text-gray-600" />
                                {open && (
                                    <span className="font-semibold ml-3 text-gray-600">
                                        Popular Movies
                                    </span>
                                )}
                            </li>
                        </Link>

                        <Link to="/dashboardPage/favorites" onClick={() => setOpen(false)}>
                            <li
                                className={`flex px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${open ? "items-center justify-start gap-3" : "justify-center" }`}>
                                <Heart className="w-6 h-6 text-gray-600" />
                                {open && (
                                    <span className="font-semibold ml-3 text-gray-600">
                                        Top_Rated Movies
                                    </span>
                                )}
                            </li>
                        </Link>

                        <Link to="/dashboardPage/encartelera" onClick={() => setOpen(false)}>
                            <li className={`flex px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${open ? "items-center justify-start gap-3" : "justify-center" }`}>
                                <Film className="w-6 h-6 text-gray-600" />
                                {open && (
                                    <span className="font-semibold ml-3 text-gray-600">
                                        Now Playing Movies
                                    </span>
                                )}
                            </li>
                        </Link>

                        <Link to="/dashboardPage/upcomingmovies" onClick={() => setOpen(false)}>

                            <li className={`flex px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${open ? "items-center justify-start gap-3" : "justify-center" }`}>
                                <CalendarPlus className="w-6 h-6 text-gray-600" />
                                {open && (
                                    <span className="font-semibold ml-3 text-gray-600">
                                        Up Coming Movies
                                    </span>
                                )}
                            </li>
                        </Link>

                        <Link to="/dashboardPage/genres" onClick={() => setOpen(false)}>
                            <li className={`flex px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${open ? "items-center justify-start gap-3" : "justify-center" }`}>
                                <Drama className="w-6 h-6 text-gray-600" />
                                {open && (
                                    <span className="font-semibold ml-3 text-gray-600">
                                        Genres
                                    </span>
                                )}
                            </li>
                        </Link>

                        <Link to="/dashboardPage/movielist" onClick={() => setOpen(false)}>
                            <li className={`flex px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${open ? "items-center justify-start gap-3" : "justify-center"}`}>
                                <ListCollapse className="w-6 h-6 text-gray-600" />
                                {open && (
                                    <span className="font-semibold ml-3 text-gray-600">
                                        Movie Details
                                    </span>
                                )}
                            </li>
                        </Link>

                        <Link to="/dashboardPage/seriepage" onClick={() => setOpen(false)}>
                            <li className={`flex px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${open ? "items-center justify-start gap-3" : "justify-center"}`}>
                                <Grid3x3 className="w-6 h-6 text-gray-600" />
                                {open && (
                                    <span className="font-semibold ml-3 text-gray-600">
                                        Serie Details
                                    </span>
                                )}
                            </li>
                        </Link>
                    </ul>
                </nav>

                {/* Logout */}
                <div className="p-4 mt-auto border-t">
                    <button onClick={handleLogout} className={`w-full flex items-center px-4 py-2 rounded-md hover:bg-red-100 text-red-600 transition-all duration-300 ${open ? "justify-start gap-3" : "justify-center"}`}>
                        <LogOut className="w-5 h-5" />
                        {open && <span className="font-semibold">Logout</span>}
                    </button>
                </div>
            </div>
        </>
    );
}

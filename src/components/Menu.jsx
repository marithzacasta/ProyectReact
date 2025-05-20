import { LayoutDashboard, ClipboardPen, SquareChartGantt, Footprints, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";
import Swal from 'sweetalert2';

export function Menu() {

    const [open, setOpen] = useState(true); // empieza abierto DISEÑO RESPONSIVO

    // Función para alternar el menú
    const closeMenu = () => {
        setOpen(!open);
    }

    const navigate = useNavigate();

    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            await logoutUser();

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Logged out successfully",
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                navigate('/login'); // Redirige a la página de inicio de sesión después de cerrar sesión
            }, 2000);

        } catch (error) {
            console.error("Error:", error.message);

            Swal.fire({
                icon: "error",
                title: "Error al cerrar sesión",
                text: error.message,
                showConfirmButton: true
            });
        }

    }

    return (
        <div className={`${open ? "w-60" : "w-20"} bg-white shadow-md duration-500 transition-all ease-in-out fixed h-full md:relative z-10 flex flex-col`}>

            <div
                className={`flex px-4 py-5 border-b transition-all duration-300 ${open ? "items-center justify-between" : "justify-center"}`}>
                <span className={`text-3xl font-bold text-blue-600 ${!open && "hidden"}`}>Shoes</span>
                {/* Si open = true → se muestra el texto "Shoes" / Si open = false → se aplica hidden y el texto no se ve */}
                <button onClick={closeMenu}>
                    <Footprints className="w-6 h-6 text-gray-600" />

                </button>
            </div>

            <nav className="mt-4 flex-1">
                <ul>
                    <li className={`flex px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${open ? "items-center justify-start gap-3" : "justify-center"}`}>
                        <LayoutDashboard className="w-6 h-6 text-gray-600" />
                        {open && <span className="font-semibold ml-3 text-gray-600 ">Dashboard</span>}
                        {/* open && → si la variable open es true, entonces muestra el elemento <span>...</span>. Si open es false, no muestra nada. */}
                        {/* Es una forma corta de escribir: {open ? <span>Perfil</span> : null} */}

                    </li>

                    <li className={`flex px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${open ? "items-center justify-start gap-3" : "justify-center"}`}>
                        <SquareChartGantt className="w-6 h-6 text-gray-600" />
                        {open && <span className="font-semibold ml-3 text-gray-600">Manage Shoes</span>}
                    </li>

                    <li className={`flex px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${open ? "items-center justify-start gap-3" : "justify-center"}`}>
                        <ClipboardPen className="w-6 h-6 text-gray-600" />

                        {open && <span className="font-semibold ml-3 text-gray-600">Orders</span>}
                    </li>


                </ul>
            </nav>

            <div className="p-4 mt-auto border-t">
                <button onClick={handleLogout} className={`w-full flex items-center px-4 py-2 rounded-md hover:bg-red-100 text-red-600 transition-all duration-300 ${open ? "justify-start gap-3" : "justify-center"}`}>
                    <LogOut className="w-5 h-5" />
                    {open && <span className="font-semibold">Logout</span>}
                </button>
            </div>

        </div>

    );

}
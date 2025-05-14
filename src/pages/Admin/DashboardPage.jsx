import { logoutUser, mostrar } from "../../api/authApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { Home, User, Footprints } from "lucide-react";


function DashboardPage() {

    const [open, setOpen] = useState(true); // empieza abierto DISEÑO RESPONSIVO

    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);


    const navigate = useNavigate();

    const closeMenu = () => {
        setOpen(!open);
    }

    // Función para mostrar los usuarios
    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const data = await mostrar();
                setUsuarios(data.message[0].names);

            } catch (err) {
                console.error("Error:", err.message);
                setError("No se pudieron cargar los usuarios");
            }
        };

        cargarUsuarios();
    }, []);


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
        <>
            <div className="flex w-screen h-screen bg-blue-950">

                {/* Sidebar */}
                <div className={`${open ? "w-60" : "w-20"} bg-white shadow-md duration-500 transition-all ease-in-out fixed h-full md:relative z-10`}>

                    <div
                        className={`flex px-4 py-4 border-b transition-all duration-300 ${open ? "items-center justify-between" : "justify-center" }`}>
                        <span className={`text-3xl font-bold text-blue-600 ${!open && "hidden"}`}>Shoes</span>
                        {/* Si open = true → se muestra el texto "Shoes" / Si open = false → se aplica hidden y el texto no se ve */}
                        <button onClick={closeMenu}>
                            <Footprints className="w-6 h-6 text-gray-600" />

                        </button>
                    </div>

                    <nav className="mt-4">
                        <ul>
                            <li className={`flex px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${open ? "items-center justify-start gap-3" : "justify-center"}`}>
                                <Home className="w-6 h-6 text-gray-600" />
                                {open && <span className="font-semibold ml-3 text-gray-600 ">Inicio</span>}
                                {/* open && → si la variable open es true, entonces muestra el elemento <span>...</span>. Si open es false, no muestra nada. */}
                                {/* Es una forma corta de escribir: {open ? <span>Perfil</span> : null} */}

                            </li>
                            <li className={`flex px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all duration-300 ${open ? "items-center justify-start gap-3" : "justify-center"}`}>
                                <User className="w-6 h-6 text-gray-600" />
                                {open && <span className="font-semibold ml-3 text-gray-600">Perfil</span>}
                            </li>

                        </ul>
                    </nav>

                </div>

                {/* Contenido principal */}
                <div className={`flex-1 h-full p-6 ml-${open ? "64" : "20"} transition-all duration-300 bg-gray-100`}>
                    <h2 className="text-xl font-bold mb-4">BIENVENIDA@</h2>

                    {error && <p className="text-red-500">{error}</p>}
                    {usuarios}

                    <button onClick={handleLogout} className="p-1 bg-blue-500 rounded-md text-white font-semibold hover:bg-blue-400">Cerra Sesion</button>

                </div>

            </div>


        </>
    )

}

export default DashboardPage;
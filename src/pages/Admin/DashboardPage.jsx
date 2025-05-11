import { logoutUser, mostrar } from "../../api/authApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


function DashboardPage() {

    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const data = await mostrar();
                setUsuarios(data.message[0].names);

            } catch (err) {
                setError("No se pudieron cargar los usuarios");
            }
        };

        cargarUsuarios();
    }, []);

    const navigate = useNavigate();

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
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">BIENVENIDA@</h2>

                {error && <p className="text-red-500">{error}</p>}
                {usuarios}

            </div>

            <button onClick={handleLogout} className="p-1 bg-blue-500 rounded-md text-white font-semibold hover:bg-blue-400">Cerra Sesion</button>

        </>
    )

}

export default DashboardPage;
import { mostrar } from "../../api/authApi";
import { useEffect, useState } from "react";
import { Menu } from "../../components/Menu";


function DashboardPage() {

    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);


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




    return (
        <>
            <div className="flex w-screen h-screen bg-blue-950">

                {/* Sidebar */}
                <Menu></Menu>

                {/* Contenido principal */}
                <div className={`flex-1 h-full p-5 ml-${open ? "64" : "20"} transition-all duration-300 bg-gray-100`}>


                    <h2 className="text-xl font-bold mb-4">BIENVENIDA@</h2>

                    {error && <p className="text-red-500">{error}</p>}
                    {usuarios}


                </div>

            </div>


        </>
    )

}

export default DashboardPage;
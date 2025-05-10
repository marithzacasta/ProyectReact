import { mostrar } from "../../api/authApi";
import { useEffect, useState } from "react";


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


    return (
        <>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">BIENVENIDA@</h2>

                {error && <p className="text-red-500">{error}</p>}
                {usuarios}

            </div>

        </>
    )

}

export default DashboardPage;
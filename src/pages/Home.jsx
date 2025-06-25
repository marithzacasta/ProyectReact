import { Footer } from "../components/Footer";
import { Navegador } from "../components/Navegador";
import { Outlet } from "react-router-dom";

export function Home() {

    return (
        <>
            <Navegador />
            <div className="flex-1 flex flex-col h-full transition-all duration-300 bg-gray-100 overflow-y-auto ">
                
                <Outlet /> {/* Aquí se renderizan los componentes según la subruta */}
                {/* Footer */}
                <Footer />

            </div>
        </>
    )
}
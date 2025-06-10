import { Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu";
import { Footer } from "../../components/Footer";


function DashboardPage() {

    return (
        <>
            <div className="flex w-screen h-screen bg-blue-950 overflow-hidden">

                {/* Sidebar */}
                <Menu />

                {/* Contenido principal que va a avariar*/}
                <div className="flex-1 flex flex-col h-full transition-all duration-300 bg-gray-100 overflow-y-auto ">


                    <Outlet /> {/* Aquí se renderizan los componentes según la subruta */}

                    {/* Footer */}
                    <Footer />

                </div>

            </div>


        </>
    )

}

export default DashboardPage;
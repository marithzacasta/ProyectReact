import { Clapperboard, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";


export function Navegador() {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <>
            <nav className="flex justify-between p-5 bg-white shadow-md fixed w-full">
                <div className="flex gap-3">
                    <h1 className="text-3xl font-semibold">CineGalaxy</h1>
                    <Clapperboard className="w-7 h-7 text-blue-500 mt-2" />
                </div>

                <div className="flex gap-5 items-center">
                    <a href="#" className="text-lg font-semibold hover:text-blue-800">Home</a>
                    <a href="#" className="text-lg font-semibold hover:text-blue-800">catalog</a>
                    <button onClick={handleLogin} className="bg-blue-500 text-white font-semibold p-2 flex gap-2 rounded-md hover:bg-blue-400"> Login  <UserRound className="w-6 h-6 " /></button>
                </div>
            </nav>
        </>
    )
}
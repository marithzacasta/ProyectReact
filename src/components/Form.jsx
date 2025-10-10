import { loginUser } from '../api/authApi';
import { useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export function FormSignIn({ alternarFormulario }) {

    const [InputEmailColor, setInputEmailColor] = useState(false);
    const [InputPasswordColor, setInputPasswordColor] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // Hook de React Router para navegar entre rutas

    const modificarEmail = (e) => {
        setEmail(e.target.value)
    }

    const modificarPassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = () => {
        window.open('/recoverPassword', '_blank');
    }

    const handleSubmit = async () => {
        try {
            const data = await loginUser(email, password);

            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Signed in successfully"
            });

            setTimeout(() => {
                navigate('/dashboardPage'); // Redirige a la página de inicio después de 2 segundos
            }, 2000);


        } catch (err) {
            console.error("Error:", err.message);

            let mesaje = '';

            if (err.message === 'Failed to fetch') {
                mesaje = 'Error de conexión, por favor verifica tu conexión a internet.';
            } else if (err.message === 'Email y contraseña son obligatorios') {
                mesaje = 'email and password are required';
                setInputEmailColor(true); // Activamos el color rojo
                setInputPasswordColor(true); // Activamos el color rojo

            } else if (err.message === 'Contraseña incorrecta') {
                mesaje = 'incorrect password';
                setInputPasswordColor(true); // Activamos el color rojo

            } else if (err.message === 'Usuario no existe') {
                mesaje = 'incorrect email';
                setInputEmailColor(true); // Activamos el color rojo
            }


            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-start",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: mesaje || 'Error en el inicio de sesión',
            });

            setTimeout(() => {
                setInputEmailColor(false); // Desactivamos el color rojo después de 2 segundos
                setInputPasswordColor(false); // Desactivamos el color rojo después de 2 segundos
            }, 2000);


        }
    };

    return (

        <div className="bg-white px-10 py-10 rounded-3xl border-2 border-gray-100 shadow-xl">

            <h1 className="text-5xl font-semibold">Welcome Back!</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">Welcome Back! Please enter your details.</p>

            <div className='bg-gray-100 mt-5 border-gray-300 border-solid border-2 rounded-md p-3 text-gray-500 text-center flex flex-col'>
                <label htmlFor=""><b>Email:</b> admin@gmail.com</label>
                <label htmlFor=""><b>Password:</b> 123Admin</label>
            </div>

            <div className="mt-8">

                <div>
                    <label className="text-lg font-medium">Email</label>
                    <input value={email} onChange={modificarEmail} className={`w-full border-2 ${InputEmailColor ? 'border-red-300 bg-red-100 shadow shadow-red-400' : 'border-gray-100'} rounded-xl p-3 mt-1 bg-transparent outline-none focus:border-violet-300`} type="email" placeholder="Enter your email" />
                </div>
                <div className='mt-3'>
                    <label className="text-lg font-medium ">Password</label>
                    <input value={password} onChange={modificarPassword} className={`w-full border-2 ${InputPasswordColor ? 'border-red-300 bg-red-100 shadow shadow-red-400' : 'border-gray-100'} rounded-xl p-3 mt-1 bg-transparent outline-none focus:border-violet-300`} type="password" placeholder="Enter your password" />
                </div>

                <div className="mt-8 flex flex-col gap-y-4">

                    <button onClick={handleSubmit} className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-blue-500 text-white text-lg font-bold">Sign in</button>

                </div>

                
                {/* <div className="mt-8 flex justify-center items-center">
                    <button onClick={handleLogin} className="font-medium text-base text-purple-500 underline hover:text-purple-800">Forgot password</button>
                </div> */}

                {/* <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">Don't have an acoount?</p>
                    <button onClick={alternarFormulario} className="text-blue-500 text-base font-medium ml-2 underline hover:text-blue-800">Sign up</button>
                </div> */}

            </div>

        </div>

    )
}


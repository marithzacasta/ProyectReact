import { registerUser } from "../api/authApi"
import { useState } from "react";
import Swal from 'sweetalert2';


export function FormRegister({ alternarFormulario }) {

    const [names, setNames] = useState('');
    const [lastNames, setLastNames] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const modificarNames = (e) => {
        setNames(e.target.value)
    }

    const modificarLastNames = (e) => {
        setLastNames(e.target.value)
    }

    const modificarEmail = (e) => {
        setEmail(e.target.value)
    }

    const modificarPassword = (e) => {
        setPassword(e.target.value)
    }

    const modificarConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }



    const handleSubmit = async () => {

        let mensaje = '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del email
        const contraseñaValida = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/; // Expresión regular para validar la contraseña

        if (password !== confirmPassword) { // Verifica si las contraseñas coinciden
            mensaje = 'Passwords do not match';
        } else if (names === '' || lastNames === '' || email === '' || password === '') { // Verifica si los campos están vacíos
            mensaje = 'All fields are required';
        } else if (emailRegex.test(email) === false) { // Verifica si el email tiene un formato válido
            mensaje = 'Invalid email format';
        } else if (contraseñaValida.test(password) === false) { // Verifica si la contraseña cumple con los requisitos
            mensaje = 'Password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character.';
        }

        if (mensaje) {
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
                title: mensaje,
            });
            return;
        }


        try {
            const data = await registerUser(names, lastNames, email, password);
            console.log(data.message);

            Swal.fire({
                title: "Registered successfully",
                text: "You can now log in",
                icon: "success"
            });


        } catch (err) {
            console.error("Error:", err.message);

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
                title: 'No se pudo registrar, por favor verifica los datos ingresados.',
            });

        }

    }


    return (
        <div className="bg-white px-10 py-10 rounded-3xl shadow-xl border-2 border-gray-100">

            <h1 className="font-semibold text-4xl">Register Here!</h1>
            <p className="text-lg font-medium text-gray-500 mt-3">Register here and love yourself with our discount.</p>

            <div className="mt-4">

                <div>
                    <label className="text-lg font-medium">Names</label>
                    <input value={names} onChange={modificarNames} className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 outline-none focus:border-violet-300" type="text" placeholder="Enter your Names" />
                </div>

                <div>
                    <label className="text-lg font-medium">Last Names</label>
                    <input value={lastNames} onChange={modificarLastNames} className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 outline-none focus:border-violet-300" type="text" placeholder="Enter your Last Names" />
                </div>

                <div>
                    <label className="text-lg font-medium">Email</label>
                    <input value={email} onChange={modificarEmail} className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 outline-none focus:border-violet-300" type="email" placeholder="Enter your Email" />
                </div>

                <div>
                    <label className="text-lg font-medium">Password</label>
                    <input value={password} onChange={modificarPassword} className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 outline-none focus:border-violet-300" type="password" placeholder="Enter your Password" />
                </div>

                <div>
                    <label className="text-lg font-medium">Confirm Password</label>
                    <input value={confirmPassword} onChange={modificarConfirmPassword} className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 outline-none focus:border-violet-300" type="password" placeholder="Enter your Password Again" />
                </div>

                <div className="my-6">
                    <button onClick={handleSubmit} className="active:scale-[0.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out w-full bg-blue-500 text-white p-2 rounded-xl font-bold text-lg">Sign Up</button>
                </div>

                <div className="my-6 flex justify-center items-center gap-3">
                    <p className="font-medium text-base">You already have an account?</p>
                    <button onClick={alternarFormulario} className="underline text-base font-medium text-blue-500 hover:text-blue-800">Sign In</button>
                </div>

            </div>

        </div>
    )
}
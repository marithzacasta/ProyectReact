export function FormRegister({ alternarFormulario }) {
    return (
        <div className="bg-white px-10 py-10 rounded-3xl">

            <h1 className="font-semibold text-4xl">Register Here!</h1>
            <p className="text-lg font-medium text-gray-500 mt-3">Register here and love yourself with our discount.</p>

            <div className="mt-4">

                <div>
                    <label className="text-lg font-medium">Names</label>
                    <input className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 outline-none focus:border-pink-200" type="text" placeholder="Enter your Names" />
                </div>

                <div>
                    <label className="text-lg font-medium">Last Names</label>
                    <input className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 outline-none focus:border-pink-200" type="text" placeholder="Enter your Last Names" />
                </div>

                <div>
                    <label className="text-lg font-medium">Email</label>
                    <input className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 outline-none focus:border-pink-200" type="email" placeholder="Enter your Email" />
                </div>

                <div>
                    <label className="text-lg font-medium">Password</label>
                    <input className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 outline-none focus:border-pink-200" type="password" placeholder="Enter your Password" />
                </div>

                <div>
                    <label className="text-lg font-medium">Confirm Passwor</label>
                    <input className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 outline-none focus:border-pink-200" type="password" placeholder="Enter your Password Again" />
                </div>

                <div className="my-6">
                    <button className="active:scale-[0.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out w-full bg-violet-500 text-white p-2 rounded-xl font-bold text-lg">Sign Up</button>
                </div>

                <div className="my-6 flex justify-center items-center gap-3">
                    <p className="font-medium text-base">You already have an account?</p>
                    <button onClick={alternarFormulario} className="underline text-base font-medium text-violet-500 hover:text-purple-800">Sign In</button>
                </div>

            </div>

        </div>
    )
}
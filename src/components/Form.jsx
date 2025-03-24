
export function FormSignIn({ alternarFormulario }) {
    return (

        <div className="bg-white px-10 py-10 rounded-3xl border-2 border-gray-100">

            <h1 className="text-5xl font-semibold">Welcome Back</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">Welcome Back! Please enter your details.</p>

            <div className="mt-8">

                <div>
                    <label className="text-lg font-medium">Email</label>
                    <input className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent outline-none focus:border-pink-200" type="email" placeholder="Enter your email" />
                </div>
                <div>
                    <label className="text-lg font-medium">Password</label>
                    <input className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent outline-none focus:border-pink-200" type="password" placeholder="Enter your password" />
                </div>

                <div className="mt-8 flex justify-between items-center">
                    <div>
                        <input type="checkbox" id="remember" />
                        <label className="ml-2 font-medium text-base" for="remember">Remember for 30 days</label>
                    </div>

                    <button className="font-medium text-base text-violet-500 underline hover:text-purple-800">Forgot password</button>
                </div>

                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-violet-500 text-white text-lg font-bold">Sign in</button>
                    <button className="flex rounded-xl border-2 border-gray-100 items-center justify-center gap-1 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out">
                        <img className="scale-50" src="https://img.icons8.com/color/48/000000/google-logo.png" />
                        Sign in with google
                    </button>
                </div>

                <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">Don't have an acoount?</p>
                    <button onClick={alternarFormulario} className="text-violet-500 text-base font-medium ml-2 underline hover:text-purple-800">Sign up</button>
                </div>

            </div>

        </div>

    )
}
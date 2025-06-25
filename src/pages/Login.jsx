import { useState } from "react";
import { FormSignIn } from '../components/Form.jsx';
import { FormRegister } from '../components/FormRegister.jsx';


// lg, significa Large (grande). Se activa cuando la pantalla tiene un ancho mínimo de 1024px (tamaño de una laptop estándar).
// relative y absolute son propiedades de posicionamiento de CSS. relative hace que el elemento se posicione de acuerdo a su posición original, mientras que absolute hace que el elemento se posicione de acuerdo a su contenedor más cercano.
// animate-spin es una clase de Tailwind CSS que hace que un elemento gire en sentido horario.
// animate-bounce es una clase de Tailwind CSS que hace que un elemento realice un pequeño salto.
// bg-gradient-to-tr es una clase de Tailwind CSS que aplica un degradado de color de arriba a abajo y de izquierda a derecha.
// from-violet-500 y to-pink-500 son clases de Tailwind CSS que aplican un color degradado de violeta a rosa.


function Login() {

  const [showRegister, setShowRegister] = useState(false);


  const handleAlterForm = () => {
    setShowRegister(!showRegister);
  }

  const vista = showRegister ? <FormRegister alternarFormulario={handleAlterForm} /> : <FormSignIn alternarFormulario={handleAlterForm} />;


  return (
    <>
      <div className="flex w-full h-screen">

        <div className="w-full flex items-center justify-center lg:w-1/2 bg-gray-100">
          {vista}
        </div>

        <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center overflow-hidden">
          {/* Imagen de fondo */}
          <img
            src="./img/fondo_login.jpg"
            alt="Fondo"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Capa borrosa encima */}
          <div className="absolute inset-0 bg-white/30 z-10"></div>

          {/* Contenido encima (opcional) */}
          <div className="z-20 relative text-center text-black font-bold text-xl">
             {/* <img src="./img/accion.png" alt="" className="w-48 h-48 animate-bounce" /> */}
            
          </div>
        </div>


      </div>
    </>
  )
}

export default Login;

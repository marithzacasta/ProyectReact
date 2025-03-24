import { useState } from "react";
import {FormSignIn} from './components/Form.jsx';
import {FormRegister} from './components/FormRegister.jsx';

// lg, significa Large (grande). Se activa cuando la pantalla tiene un ancho mínimo de 1024px (tamaño de una laptop estándar).
// relative y absolute son propiedades de posicionamiento de CSS. relative hace que el elemento se posicione de acuerdo a su posición original, mientras que absolute hace que el elemento se posicione de acuerdo a su contenedor más cercano.
// animate-spin es una clase de Tailwind CSS que hace que un elemento gire en sentido horario.
// animate-bounce es una clase de Tailwind CSS que hace que un elemento realice un pequeño salto.
// bg-gradient-to-tr es una clase de Tailwind CSS que aplica un degradado de color de arriba a abajo y de izquierda a derecha.
// from-violet-500 y to-pink-500 son clases de Tailwind CSS que aplican un color degradado de violeta a rosa.


function App() {

  const [showRegister, setShowRegister] = useState(false);

  const handleAlterForm = () => {
    setShowRegister(!showRegister);
  }           

  const vista = showRegister ? <FormRegister alternarFormulario={handleAlterForm}/> : <FormSignIn alternarFormulario={handleAlterForm}/>;
  
  return (
    <>
    <div className="flex w-full h-screen">

      <div className="w-full flex items-center justify-center lg:w-1/2 bg-gray-200">
       {vista}
      </div>

      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center ">
        
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"></div>
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
        {/* <img src="./img/spa.png" alt="" className="w-90 h-90 animate-bounce" />
        <div className="w-full h-1/4 absolute bottom-0 bg-blue-200"></div> */}
      </div>


    </div>
    </>
  )
}

export default App

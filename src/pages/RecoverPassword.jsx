import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function RecoverPassword() {
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    } else {
      e.target.value = '';
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePassowrdNew = () => {
    navigate('/passwordNew');
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 bg-[url('/img/pocorn.jpg')] bg-cover bg-center bg-no-repeat z-0" />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Contenido */}
      <div className="relative z-10 bg-white p-8 rounded-3xl shadow-md w-full max-w-md text-center">
        <h2 className="text-3xl font-semibold mb-4">Recuperar Contraseña</h2>
        <p className="mb-6 text-gray-600">Ingresa el código de 6 dígitos que enviamos a tu correo:</p>
        <div className="flex justify-center gap-3 mb-6">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              className="w-12 h-14 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              ref={(el) => (inputsRef.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>

        <button
          onClick={handlePassowrdNew}
          className="w-full bg-blue-600 text-white text-lg py-2 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
        >
          Verificar Código
        </button>
      </div>
    </div>
  );
}

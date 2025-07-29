import { useState } from 'react';

export default function PasswordNew() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
    } else if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
    } else {
      setError('');
      // Aquí puedes llamar a tu API para guardar la nueva contraseña
      console.log('Contraseña actualizada:', password);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 bg-[url('/img/table.jpg')] bg-cover bg-center bg-no-repeat z-0" />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Contenido */}
      <div className="relative z-10 bg-white p-8 rounded-3xl shadow-md w-full max-w-md text-center">
        <h2 className="text-3xl font-semibold mb-4">Establecer Nueva Contraseña</h2>
        <p className="mb-6 text-gray-600">Ingresa tu nueva contraseña para continuar:</p>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 border-gray-100 rounded-xl focus:outline-none border-2 focus:border-violet-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 border-gray-100 rounded-xl focus:outline-none border-2 focus:border-violet-300"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-lg py-2 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
          >
            Guardar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}

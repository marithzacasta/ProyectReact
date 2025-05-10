import { authUser } from "../api/authApi";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => { // es una herramienta para manejar efectos secundarios en los componentes de función 
  // EJEMPLOS Llamadas a una API (por ejemplo, fetch), Validar autenticación, Acceder a cookies/localStorage Y Temporizadores.

    const verificar = async () => {
      try {
        await authUser(); // verifica si el token (en cookie) es válido
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };
    verificar();
  }, []); // [] significa que el efecto se ejecutará solo una vez después de que el componente se monte.
  // Si no se pasa nada, el efecto se ejecuta solo una vez al montar el componente.

  if (isAuth === null) {
    return (
      <p className="text-xl text-center text-gray-600 mt-10 animate-pulse">
        Verificando sesión, por favor espera...
      </p>
    );
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
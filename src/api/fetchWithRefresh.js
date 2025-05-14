const API_URL = import.meta.env.VITE_API_URL;

export const fetchWithRefresh = async (url, options = {}) => {
    let response = await fetch(url, {
      ...options,
      credentials: "include",
    });
  
    if (response.status === 401) {
      // Intentar refrescar token
      const refresh = await fetch(`${API_URL}/api/refresh`, {
        method: "POST",
        credentials: "include",
      });
  
      if (refresh.ok) {
        // Repetir solicitud original
        response = await fetch(url, {
          ...options,
          credentials: "include",
        });
      } else {
        throw new Error("Sesión expirada. No autorizado.");
      }
    }
  
    return response;
  };
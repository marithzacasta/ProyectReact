const API_URL = import.meta.env.VITE_API_URL;


export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
    },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
    return data;
};
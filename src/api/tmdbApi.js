const API_KEY_TMDB = import.meta.env.VITE_API_KEY_TMDB;

export const PopularMoviesTMDB = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_TMDB}&language=es`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.status_message || 'Error al obtener las películas populares de TMDB');
    }

    return data;

  } catch (error) {
    console.error("Error in fetchTMDB:", error.message);
    throw error;
  }
};

export const GenreListTMDB = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY_TMDB}&language=es`
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.status_message || 'Error al obtener la lista de géneros de TMDB');
      }
  
      return data;
  
    } catch (error) {
      console.error("Error in fetchTMDB:", error.message);
      throw error;
    }
  };
  

  export const UpcomingReleasesTMDB = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY_TMDB}&language=es`
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.status_message || 'Error al obtener la lista de géneros de TMDB');
      }
  
      return data;
  
    } catch (error) {
      console.error("Error in fetchTMDB:", error.message);
      throw error;
    }
  };
  

export const TopRatedTMDB = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY_TMDB}&language=es`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.status_message || 'Error al obtener las películas mejor valoradas de TMDB');
        }

        return data;

    } catch (error) {
        console.error("Error in fetchTMDB:", error.message);
        throw error;
    }

}
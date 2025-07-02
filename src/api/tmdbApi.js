const API_KEY_TMDB = import.meta.env.VITE_API_KEY_TMDB;

// MOVIES
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

export const UpcomingReleasesMoviesTMDB = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY_TMDB}&language=es`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.status_message || 'Error al obtener las peliculas en cartelera de TMDB');
        }

        return data;

    } catch (error) {
        console.error("Error in fetchTMDB:", error.message);
        throw error;
    }
};


export const TopRatedMoviesTMDB = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY_TMDB}&language=es`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.status_message || 'Error al obtener las películas mejor calificadas de TMDB');
        }

        return data;

    } catch (error) {
        console.error("Error in fetchTMDB:", error.message);
        throw error;
    }

}

export const NowPlayingMoviesTMDB = async () => {

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY_TMDB}&language=es`);

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.status_message || 'Error al obtener las películas que se estan viendo de TMDB')
        }

        return data;
    } catch (error) {

        console.error("Error in fetchTMDB:", error.message)
        throw error;
    }


}

export const showEachMoviesTMDB = async (id) => {

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY_TMDB}&language=es`);

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.status_message || 'Error al obtener los detalles de la película de TMDB')
        }

        return data;
    } catch (error) {

        console.error("Error in fetchTMDB:", error.message)
        throw error;
    }


}



// SERIES
export const PopularSeriesTMDB = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY_TMDB}&language=es`
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

export const TopRatedSeriesTMDB = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY_TMDB}&language=es`
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

export const OnTheAirSeriesTMDB = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY_TMDB}&language=es`
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

export const AiringTodaySeriesTMDB = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY_TMDB}&language=es`
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


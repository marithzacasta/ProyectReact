import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import DashboardPage from '../pages/Admin/DashboardPage';
import Error404 from '../pages/Error404';
import { Dashboard } from '../components/Dashboard';
import { PopularMovie } from '../components/PopularMovieAdmin';
import { Favorites } from '../components/FavoritesAdmin';
import PrivateRoute from '../components/PrivateRoute'; // Componente para proteger rutas privadas
import { Home } from '../pages/Home';
import { Movies } from '../components/Movies';
import { Series } from '../components/Series';
import { Homee } from '../components/Homee';
import AboutPage from '../pages/AboutPage';
import { DetallePelicula } from '../components/DetailsMovie';
import { DetalleSerie } from '../components/DetailsSeries';
import { RecoverPassword } from '../pages/RecoverPassword';
import PasswordNew from '../components/PasswordNew';
import { EnCartelera } from '../components/NowPlayingAdmin'
import { UpcomingMovies } from '../components/UpcomingMoviesAdmin'
import { Genres } from '../components/GenresAdmin'
import { DetailsPelicula2 } from '../components/DetailsMovieAdmin'
import { MovieList } from '../components/MovieList'
import { SeriesPage } from '../components/SeriesPagesAdmin'
import { DetailsSerie } from '../components/DetailsSeriesAdmin'

// Separar tus rutas en un componente como AppRoutes es excelente.
export default function AppRoutes() {
  return (
    <BrowserRouter> {/* Es el componente que se encarga de manejar el enrutamiento en el navegador usando la historia del navegador (sin recargar la página). */}
      <Routes> {/* Componente que agrupa todas las rutas. */}

        <Route path="/" element={<Home />}>
          <Route index element={<Homee />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<DetallePelicula />} />
          <Route path="/series" element={<Series />} />
          <Route path="/serie/:id" element={<DetalleSerie />} />
        </Route>


        <Route path="/recoverPassword" element={<RecoverPassword />} />
        <Route path="/passwordNew" element={<PasswordNew />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} /> {/* Componente que define una ruta (una URL y qué componente mostrar). */}

        {/* 🔐 Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboardPage" element={<DashboardPage />}>
            {/* Subrutas que renderiza Outlet dentro de DashboardPage */}
            <Route index element={<Dashboard />} /> {/* Ruta por defecto */}
            <Route path="popular" element={<PopularMovie />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="encartelera" element={<EnCartelera />} />
            <Route path="upcomingmovies" element={<UpcomingMovies />} />
            <Route path="genres" element={<Genres />} />
            <Route path="movielist" element={<MovieList />} />
            <Route path="movielist/detallespeliculas2/:id" element={<DetailsPelicula2 />} />
            <Route path="seriepage" element={<SeriesPage />} />
            <Route path="seriepage/detailserie/:id" element={<DetailsSerie />} />

          </Route>
        </Route>

        {/* Ruta por defecto si no se encuentra la URL */}
        <Route path="*" element={<Error404 />} />

      </Routes>
    </BrowserRouter>
  );
}
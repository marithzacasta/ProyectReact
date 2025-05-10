import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import DashboardPage from '../pages/Admin/DashboardPage';
import Error404 from '../pages/Error404';
import PrivateRoute from '../components/PrivateRoute'; // Componente para proteger rutas privadas

// Separar tus rutas en un componente como AppRoutes es excelente.
export default function AppRoutes() {
  return (
    <BrowserRouter> {/* Es el componente que se encarga de manejar el enrutamiento en el navegador usando la historia del navegador (sin recargar la página). */}
      <Routes> {/* Componente que agrupa todas las rutas. */}
        <Route path="/login" element={<Login />} /> {/* Componente que define una ruta (una URL y qué componente mostrar). */}

        {/* 🔐 Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboardPage" element={<DashboardPage />} />
        </Route>

        {/* Ruta por defecto si no se encuentra la URL */}
        <Route path="*" element={<Error404 />} />

      </Routes>
    </BrowserRouter>
  );
}
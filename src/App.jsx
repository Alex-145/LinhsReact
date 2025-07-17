// src/App.jsx
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import GuestLayout from "./Layouts/GuestLayout";
import AuthenticatedLayout from "./Layouts/AuthenticatedLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HomeHero from "./pages/HomeHero";
import SupplierRoutes from "./routes/SupplierRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<GuestLayout />}>
          <Route index element={<HomeHero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/productos"
            element={<div>Listado productos (público)</div>}
          />
        </Route>

        {/* Rutas protegidas */}
        <Route
          element={
            <PrivateRoute>
              <AuthenticatedLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productos" element={<div>Mis productos</div>} />
          <Route path="/carrito" element={<div>Mi carrito</div>} />
          <Route path="/suppliers/*" element={<SupplierRoutes />} />
          <Route path="/customers/*" element={<CustomerRoutes />} />
        </Route>

        {/* Redirección desconocida */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

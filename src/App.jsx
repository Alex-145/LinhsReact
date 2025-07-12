// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GuestLayout from "./Layouts/GuestLayout";
import AuthenticatedLayout from "./Layouts/AuthenticatedLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Simula si el usuario ha iniciado sesión
const isLoggedIn = !!localStorage.getItem("token");

function App() {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          // Rutas protegidas (requieren login)
          <Route element={<AuthenticatedLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/productos" element={<div>Mis productos</div>} />
            <Route path="/carrito" element={<div>Mi carrito</div>} />
          </Route>
        ) : (
          // Rutas públicas
          <Route element={<GuestLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route index element={<div>Inicio público</div>} />
            <Route
              path="/productos"
              element={<div>Listado productos (público)</div>}
            />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;

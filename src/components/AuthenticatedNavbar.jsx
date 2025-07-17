import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logonuevosinfondo.png";

import {
  FaHome,
  FaTachometerAlt,
  FaBox,
  FaPlusCircle,
  FaList,
  FaTags,
  FaThList,
  FaConciergeBell,
  FaMoneyBillWave,
  FaGlobe,
  FaShoppingCart,
  FaReceipt,
  FaUsers,
  FaTruck,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";

function AuthenticatedNavbar({ menuOpen, toggleMenu, isMobile }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdowns, setDropdowns] = useState({
    inventario: false,
    ventas: false,
    contactos: false,
    more: false,
  });

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) toggleMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    // Aumenta el z-index del menú y ajusta el top
    <aside
      className={`fixed top-0 left-0 h-full z-50 bg-[#1D4ED8] text-white transition-all duration-300 ${
        menuOpen ? (isMobile ? "w-full" : "w-64") : "-translate-x-full"
      } ${isMobile ? "pt-[104px]" : ""}`} // Añade padding-top en móvil
    >
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <img src={logo} alt="Linhs Llantas Logo" className="h-10" />
        <button onClick={toggleMenu} className="md:hidden">
          <HiX className="text-white text-xl" />
        </button>
      </div>

      <nav className="h-[calc(100%-60px)] overflow-y-auto space-y-1 px-4 py-4 text-sm">
        <MenuItem
          label="Inicio"
          icon={<FaHome className="text-blue-400" />}
          active={isActive("/")}
          onClick={() => handleNavigation("/")}
        />

        <MenuItem
          label="Dashboard"
          icon={<FaTachometerAlt className="text-yellow-400" />}
          active={isActive("/dashboard")}
          onClick={() => handleNavigation("/dashboard")}
        />

        <Dropdown
          open={dropdowns.inventario}
          toggle={() => toggleDropdown("inventario")}
          label="Inventario"
          icon={<FaBox className="text-teal-400" />}
        >
          <SubItem
            label="Nueva Entrada"
            icon={<FaPlusCircle />}
            onClick={() => handleNavigation("/stockentries/create")}
          />
          <SubItem
            label="Lista de Entradas"
            icon={<FaList />}
            onClick={() => handleNavigation("/stockentries")}
          />
          <SubItem
            label="Productos"
            icon={<FaBox />}
            onClick={() => handleNavigation("/products")}
          />
          <SubItem
            label="Marcas"
            icon={<FaTags />}
            onClick={() => handleNavigation("/brands")}
          />
          <SubItem
            label="Categorías"
            icon={<FaThList />}
            onClick={() => handleNavigation("/categories")}
          />
          <SubItem
            label="Servicios"
            icon={<FaConciergeBell />}
            onClick={() => handleNavigation("/services")}
          />
        </Dropdown>

        <Dropdown
          open={dropdowns.ventas}
          toggle={() => toggleDropdown("ventas")}
          label="Ventas"
          icon={<FaMoneyBillWave className="text-orange-400" />}
        >
          <SubItem
            label="Ventas Online"
            icon={<FaGlobe />}
            onClick={() => handleNavigation("/ventas-online")}
          />
          <SubItem
            label="Nueva Venta"
            icon={<FaShoppingCart />}
            onClick={() => handleNavigation("/sales/create")}
          />
          <SubItem
            label="Lista de Ventas"
            icon={<FaReceipt />}
            onClick={() => handleNavigation("/sales")}
          />
        </Dropdown>

        <Dropdown
          open={dropdowns.contactos}
          toggle={() => toggleDropdown("contactos")}
          label="Contactos"
          icon={<FaUsers className="text-green-400" />}
        >
          <SubItem
            label="Clientes"
            icon={<FaUsers />}
            onClick={() => handleNavigation("/customers")}
          />
          <SubItem
            label="Proveedores"
            icon={<FaTruck />}
            onClick={() => handleNavigation("/suppliers")}
          />
        </Dropdown>

        <Dropdown
          open={dropdowns.more}
          toggle={() => toggleDropdown("more")}
          label="Más"
          icon={<FaUserPlus className="text-red-400" />}
        >
          <SubItem
            label="Crear Nuevo Usuario"
            icon={<FaUserPlus />}
            onClick={() => handleNavigation("/register")}
          />
        </Dropdown>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition mt-4"
        >
          <FaSignOutAlt className="text-red-400" />
          <span>Cerrar sesión</span>
        </button>
      </nav>
    </aside>
  );
}

function MenuItem({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
        active ? "bg-white/20" : "hover:bg-white/10"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function Dropdown({ label, icon, children, open, toggle }) {
  return (
    <div className="space-y-1">
      <button
        onClick={toggle}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition"
      >
        {icon}
        <span>{label}</span>
        <svg
          className={`ml-auto w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && <div className="pl-6 space-y-1">{children}</div>}
    </div>
  );
}

function SubItem({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-white/10 rounded transition"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default AuthenticatedNavbar;

import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logonuevosinfondo.png";

const navLinkClass =
  "text-[#ebe7d9] hover:text-[#f55139] px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105";

const menuItems = [
  { label: "Inicio", path: "/" },
  { label: "Nosotros", path: "/nosotros" },
  { label: "Productos", path: "/productos" },
  { label: "Servicios", path: "/servicios" },
  { label: "Contáctenos", path: "/contacto" },
];

function GuestNavbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const isScrollingUp = currentScrollY < lastScrollY || currentScrollY <= 100;
    setShowNavbar(isScrollingUp);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ type: "spring", damping: 15, stiffness: 200 }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 shadow-lg"
    >
      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Botón de menú móvil */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#ebe7d9] hover:text-[#f55139] hover:bg-white/10"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </motion.button>

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link to="/">
              <img
                className="h-10 w-auto transition-all duration-300 hover:drop-shadow-lg"
                src={logo}
                alt="Logo LINHSLLANTAS"
              />
            </Link>
          </motion.div>

          {/* Navegación en desktop */}
          <nav className="hidden md:flex items-center space-x-1 mr-auto ml-6">
            {menuItems.map(({ label, path }) => (
              <motion.div
                key={path}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-lg px-2 py-1 transition-colors ${
                  location.pathname === path ? "bg-white/10" : ""
                }`}
              >
                <Link
                  to={path}
                  className={`${navLinkClass} ${
                    location.pathname === path
                      ? "text-[#f55139] font-semibold"
                      : ""
                  }`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Iconos lado derecho */}
          <div className="flex items-center space-x-4">
            {/* Botón login */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="flex items-center text-[#ebe7d9] hover:text-[#f55139] font-semibold text-sm px-4 py-2 rounded transition-all group"
              >
                <FaUser className="mr-2 group-hover:rotate-12 transition-transform" />
                Ingresar
              </Link>
            </motion.div>

            {/* Carrito */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative transition"
            >
              <FaShoppingCart className="text-2xl text-[#ebe7d9] hover:text-[#f55139]" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-[#f55139] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center"
              >
                0
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 shadow-md overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              {menuItems.map(({ label, path }) => (
                <motion.div
                  key={path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={path}
                    className={`block text-[#ebe7d9] hover:text-[#f55139] text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                      location.pathname === path
                        ? "bg-white/10 text-[#f55139]"
                        : "hover:bg-white/5"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default GuestNavbar;

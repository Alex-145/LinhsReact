import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRobot, FaBell, FaUser, FaSearch, FaCog } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import { useAuth } from "../hooks/useAuth";

function AuthenticatedHeader({ menuOpen, toggleMenu, isMobile }) {
  const location = useLocation();
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scroll hacia abajo - ocultar
        setHidden(true);
      } else if (currentScrollY < lastScrollY) {
        // Scroll hacia arriba - mostrar
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
      setScrolled(currentScrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const getTitleFromPath = (path) => {
    const routes = {
      "/dashboard": "Dashboard",
      "/clients": "Clientes",
      "/products": "Productos",
      "/sales/create": "Nueva Venta",
      "/sales": "Ventas",
      "/brands": "Marcas",
      "/categories": "Categorías",
      "/suppliers": "Proveedores",
      "/stockentries/create": "Nueva Entrada",
    };
    return routes[path] || "Panel";
  };

  const handleLogout = () => {
    logoutUser();
    setUserMenuOpen(false);
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    let initials = names[0].charAt(0).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].charAt(0).toUpperCase();
    }
    return initials;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 transform ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/90 backdrop-blur-sm"
      } ${menuOpen && !isMobile ? "ml-64" : "ml-0"} ${
        isMobile ? "h-[104px]" : "h-16"
      }`}
      ref={headerRef}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-full">
        <div
          className={`flex ${
            isMobile ? "flex-col" : "flex-row items-center"
          } h-full`}
        >
          {/* Línea superior: Menú, título y búsqueda */}
          <div
            className={`flex items-center ${
              isMobile ? "justify-between h-14" : "flex-1"
            }`}
          >
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {!searchOpen && (
                <h2 className="text-lg font-semibold text-gray-800 truncate max-w-[120px] sm:max-w-none">
                  {getTitleFromPath(location.pathname)}
                </h2>
              )}
            </div>

            {!isMobile && (
              <div className="flex-1 max-w-md mx-2">
                <div
                  className={`flex items-center bg-gray-100 rounded-full transition-all duration-300 overflow-hidden ${
                    searchOpen ? "w-full px-3 py-2" : "w-0"
                  }`}
                >
                  <FaSearch className="text-gray-500 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className={`bg-transparent outline-none flex-1 text-sm text-gray-700 min-w-0 ${
                      searchOpen ? "opacity-100" : "opacity-0"
                    }`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            )}

            {!isMobile && (
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ${
                  searchOpen ? "text-blue-600" : "text-gray-600"
                }`}
                aria-label="Search"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Controles derechos (desktop) */}
          {!isMobile && (
            <div className="flex items-center space-x-2">
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-blue-600 relative"
                onClick={() => alert("Ir a predicciones")}
                aria-label="AI Assistant"
              >
                <FaRobot className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
              </button>

              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-600 relative"
                aria-label="Notifications"
              >
                <FaBell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 p-1 pr-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-medium">
                  {user ? getInitials(user.username) : "U"}
                </div>
                <RiArrowDownSLine
                  className={`text-gray-500 transition-transform duration-200 ${
                    userMenuOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}

          {/* Segunda línea móvil */}
          {isMobile && (
            <div className="flex items-center justify-between h-12 border-t border-gray-100">
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-blue-600 relative"
                onClick={() => alert("Ir a predicciones")}
                aria-label="AI Assistant"
              >
                <FaRobot className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
              </button>

              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-600 relative"
                aria-label="Notifications"
              >
                <FaBell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-600"
                aria-label="Settings"
              >
                <FaCog className="w-5 h-5" />
              </button>

              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-medium">
                  {user ? getInitials(user.username) : "U"}
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Menús desplegables */}
      {notificationsOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setNotificationsOpen(false)}
          />
          <div className="absolute right-4 mt-1 w-72 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200">
            <div className="p-3 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-800">Notificaciones</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                <p className="text-sm text-gray-600">
                  No tienes nuevas notificaciones.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {userMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setUserMenuOpen(false)}
          />
          <div className="absolute right-4 mt-1 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-800 truncate">
                {user?.username || "Usuario"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || "usuario@ejemplo.com"}
              </p>
            </div>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Mi perfil
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Configuración
            </button>
            <div className="border-t border-gray-100"></div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </div>
        </>
      )}
    </header>
  );
}

export default AuthenticatedHeader;

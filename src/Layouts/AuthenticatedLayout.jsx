import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthenticatedHeader from "../components/AuthenticatedHeader";
import AuthenticatedNavbar from "../components/AuthenticatedNavbar";

function AuthenticatedLayout() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setMenuOpen(false);
      } else {
        setMenuOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AuthenticatedNavbar
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        isMobile={isMobile}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AuthenticatedHeader
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
          isMobile={isMobile}
        />

        {/* Content */}
        <main
          className={`flex-1 transition-all duration-200 overflow-auto ${
            menuOpen && !isMobile ? "ml-64" : "ml-0"
          } ${isMobile ? "mt-[104px]" : "mt-16"} px-4 md:px-6 pb-4`}
        >
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobile && menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
}

export default AuthenticatedLayout;

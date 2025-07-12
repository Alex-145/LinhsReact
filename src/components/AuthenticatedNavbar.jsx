function AuthenticatedNavbar() {
  return (
    <header
      style={{
        background: "#ddd",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>🛞 Linhs Llantas</span>
      <div>
        <span style={{ marginRight: "1rem" }}>🛒 Carrito</span>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default AuthenticatedNavbar;

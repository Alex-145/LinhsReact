import { Link } from "react-router-dom";

function GuestNavbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        background: "#eee",
      }}
    >
      <Link to="/">🛞 Linhs Llantas</Link>
      <div>
        <Link to="/">Inicio</Link>
        <Link to="/productos" style={{ margin: "0 1rem" }}>
          Productos
        </Link>
        <Link to="/login">Ingresar</Link>
      </div>
    </nav>
  );
}

export default GuestNavbar;

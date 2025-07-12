import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      style={{
        width: "200px",
        background: "#f4f4f4",
        padding: "1rem",
        height: "100vh",
      }}
    >
      <h3>Menú</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <Link to="/carrito">Carrito</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

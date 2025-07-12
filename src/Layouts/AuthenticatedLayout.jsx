import AuthenticatedNavbar from "../components/AuthenticatedNavbar";
import Sidebar from "../components/Sidebar";

function AuthenticatedLayout({ children }) {
  return (
    <div>
      <AuthenticatedNavbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: "1rem" }}>{children}</main>
      </div>
    </div>
  );
}

export default AuthenticatedLayout;

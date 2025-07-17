// src/Layouts/GuestLayout.jsx
import { Outlet } from "react-router-dom";
import GuestNavbar from "../components/GuestNavbar";

function GuestLayout() {
  return (
    <>
      <GuestNavbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  );
}

export default GuestLayout;

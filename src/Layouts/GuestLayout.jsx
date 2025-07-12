import GuestNavbar from "../components/GuestNavbar";

function GuestLayout({ children }) {
  return (
    <>
      <GuestNavbar />
      <main>{children}</main>
    </>
  );
}

export default GuestLayout;

// src/routes/SupplierRoutes.jsx
import { Routes, Route } from "react-router-dom";
import SupplierList from "../components/suppliers/SupplierList";
import SupplierForm from "../components/suppliers/SupplierForm";

const SupplierRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SupplierList />} />
      <Route path="/new" element={<SupplierForm />} />
      <Route path="/edit/:id" element={<SupplierForm />} />
    </Routes>
  );
};

export default SupplierRoutes;

// src/routes/CustomerRoutes.jsx
import { Routes, Route } from "react-router-dom";
import CustomerList from "../components/customer/CustomerList";
import CustomerForm from "../components/customer/CustomerForm";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route index element={<CustomerList />} />
      <Route path="new" element={<CustomerForm />} />
      <Route path="edit/:id" element={<CustomerForm />} />
    </Routes>
  );
};

export default CustomerRoutes;

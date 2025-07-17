// src/services/supplierService.js
import api from "./api";
import axios from "axios";

export const getSuppliers = async (search = "", page = 0, size = 10) => {
  const response = await api.get("/suppliers", {
    params: { search, page, size },
  });
  return response.data;
};

export const getSupplierById = async (id) => {
  const response = await api.get(`/suppliers/${id}`);
  return response.data;
};

export const createSupplier = async (supplierData) => {
  const response = await api.post("/suppliers", supplierData);
  return response.data;
};

export const updateSupplier = async (id, supplierData) => {
  const response = await api.post("/suppliers", { ...supplierData, id });
  return response.data;
};

export const deleteSupplier = async (id) => {
  await api.delete(`/suppliers/${id}`);
};

export const searchByRuc = async (ruc) => {
  const response = await api.get(`/suppliers/ruc/${ruc}`);
  return response.data;
};

// ✅ NUEVO: exportar proveedores a Excel
export const exportSuppliersToExcel = async () => {
  const response = await api.get("/suppliers/export", {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "proveedores.xlsx");
  document.body.appendChild(link);
  link.click();
  link.remove();
};

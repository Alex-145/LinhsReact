// src/hooks/useSuppliers.js
import { useState, useCallback } from "react";
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  searchByRuc,
  exportSuppliersToExcel, // ✅ nuevo import
  getSupplierById,
} from "../services/supplierService";

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  const fetchSuppliers = useCallback(
    async (search = "", currentPage = 0, size = 10) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSuppliers(search, currentPage, size);
        setSuppliers(data.content);
        setPagination((prev) => ({
          ...prev,
          page: currentPage,
          size: size,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
        }));
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const addSupplier = async (supplierData) => {
    setLoading(true);
    try {
      const newSupplier = await createSupplier(supplierData);
      setSuppliers((prev) => [...prev, newSupplier]);
      return newSupplier;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editSupplier = async (id, supplierData) => {
    setLoading(true);
    try {
      const updatedSupplier = await updateSupplier(id, supplierData);
      setSuppliers((prev) =>
        prev.map((supplier) =>
          supplier.id === id ? updatedSupplier : supplier
        )
      );
      return updatedSupplier;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeSupplier = async (id) => {
    setLoading(true);
    try {
      await deleteSupplier(id);
      setSuppliers((prev) => prev.filter((supplier) => supplier.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getRucInfo = async (ruc) => {
    setLoading(true);
    try {
      const data = await searchByRuc(ruc);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ NUEVO: Exportar proveedores a Excel
  const exportSuppliers = async () => {
    try {
      await exportSuppliersToExcel();
    } catch (err) {
      setError("Error al exportar a Excel");
    }
  };

  const getSupplier = useCallback(async (id) => {
    setLoading(true);
    try {
      const supplier = await getSupplierById(id);
      return supplier;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    suppliers,
    loading,
    error,
    pagination,
    fetchSuppliers,
    addSupplier,
    editSupplier,
    removeSupplier,
    getRucInfo,
    exportSuppliers,
    getSupplier,
  };
};

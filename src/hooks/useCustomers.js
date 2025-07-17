import { useState, useCallback } from "react";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  searchDni,
  searchRuc,
} from "../services/customerService";

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  });

  const fetchCustomers = useCallback(
    async (searchTerm = "", page = 0, size = 10) => {
      setLoading(true);
      setError(null);
      try {
        const { customers: fetchedCustomers, pagination: paginationData } =
          await getCustomers(searchTerm, page, size);
        setCustomers(fetchedCustomers);
        setPagination(paginationData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchCustomerById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const customer = await getCustomerById(id);
      return customer;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const saveCustomer = useCallback(async (customerData) => {
    setLoading(true);
    setError(null);
    try {
      let customer;
      if (customerData.id) {
        customer = await updateCustomer(customerData.id, customerData);
      } else {
        customer = await createCustomer(customerData);
      }
      return customer;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeCustomer = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCustomer(id);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCustomerDni = useCallback(async (dni) => {
    setLoading(true);
    setError(null);
    try {
      const customerData = await searchDni(dni);
      return customerData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCustomerRuc = useCallback(async (ruc) => {
    setLoading(true);
    setError(null);
    try {
      const customerData = await searchRuc(ruc);
      return customerData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    customers,
    loading,
    error,
    pagination,
    fetchCustomers,
    fetchCustomerById,
    saveCustomer,
    removeCustomer,
    searchDni: searchCustomerDni,
    searchRuc: searchCustomerRuc,
  };
};

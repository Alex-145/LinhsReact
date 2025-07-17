import api from "./api";

export const getCustomers = async (searchTerm = "", page = 0, size = 10) => {
  try {
    const response = await api.get("/customers", {
      params: {
        searchTerm,
        page,
        size,
      },
    });
    return {
      customers: response.data.content,
      pagination: {
        page: response.data.number,
        size: response.data.size,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
      },
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener clientes"
    );
  }
};

export const getCustomerById = async (id) => {
  try {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener cliente"
    );
  }
};

export const createCustomer = async (customerData) => {
  try {
    const response = await api.post("/customers", customerData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al crear cliente");
  }
};

export const updateCustomer = async (id, customerData) => {
  try {
    const response = await api.put(`/customers/${id}`, customerData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar cliente"
    );
  }
};

export const deleteCustomer = async (id) => {
  try {
    await api.delete(`/customers/${id}`);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al eliminar cliente"
    );
  }
};

export const searchDni = async (dni) => {
  try {
    const response = await api.get(`/customers/search-dni/${dni}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error al buscar DNI en RENIEC"
    );
  }
};

export const searchRuc = async (ruc) => {
  try {
    const response = await api.get(`/customers/search-ruc/${ruc}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error al buscar RUC en SUNAT"
    );
  }
};

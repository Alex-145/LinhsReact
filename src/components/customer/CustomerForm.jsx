import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  useTheme,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Save, Cancel, PersonSearch, Business } from "@mui/icons-material";
import { useCustomers } from "../../hooks/useCustomers";

const CustomerForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const {
    saveCustomer,
    searchDni,
    searchRuc,
    fetchCustomerById,
    loading,
    error,
  } = useCustomers();

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    dni: "",
    ruc: "",
    businessName: "",
    phoneNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchType = searchParams.get("searchType");
    const customerId = location.pathname.split("/").pop();

    const loadInitialData = async () => {
      try {
        if (customerId && location.pathname.includes("/edit/")) {
          const customer = await fetchCustomerById(customerId);
          setFormData(customer);
        } else if (searchType) {
          await handleInitialSearch(searchType);
        } else if (location.state?.initialData) {
          setFormData(location.state.initialData);
        }
      } catch (err) {
        console.error("Error loading initial data:", err);
      }
    };

    loadInitialData();
  }, [location, searchParams, fetchCustomerById]);

  const handleInitialSearch = async (searchType) => {
    setIsSearching(true);
    try {
      if (searchType === "dni") {
        const dni = prompt("Ingrese el DNI a buscar (8 dígitos):");
        if (dni && dni.length === 8) {
          const customerData = await searchDni(dni);
          setFormData({
            ...customerData,
            dni: dni,
          });
        } else {
          navigate("/customers/new", { replace: true });
        }
      } else if (searchType === "ruc") {
        const ruc = prompt("Ingrese el RUC a buscar (11 dígitos):");
        if (ruc && ruc.length === 11) {
          const customerData = await searchRuc(ruc);
          setFormData({
            ...customerData,
            ruc: ruc,
          });
        } else {
          navigate("/customers/new", { replace: true });
        }
      }
    } catch (err) {
      alert(
        `Error al buscar ${searchType === "dni" ? "DNI" : "RUC"}: ${
          err.message
        }`
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Nombre es requerido";
    if (!formData.dni && !formData.ruc) {
      newErrors.dni = "Debe ingresar DNI o RUC";
      newErrors.ruc = "Debe ingresar DNI o RUC";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email no válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await saveCustomer(formData);
      setSuccessMessage(
        formData.id
          ? "Cliente actualizado correctamente"
          : "Cliente creado correctamente"
      );

      setTimeout(() => {
        navigate("/customers");
      }, 1500);
    } catch (err) {
      console.error("Error saving customer:", err);
    }
  };

  const handleSearchDni = async () => {
    try {
      if (!formData.dni || formData.dni.length !== 8) {
        alert("El DNI debe tener 8 dígitos");
        return;
      }

      setIsSearching(true);
      const customerData = await searchDni(formData.dni);

      // Actualiza solo los campos necesarios, manteniendo los demás
      setFormData((prev) => ({
        ...prev, // Mantiene todos los valores actuales
        name: customerData.name || prev.name, // Actualiza nombre solo si viene de la API
        businessName: customerData.businessName || prev.businessName,
        // Mantiene dni, ruc, phoneNumber, email como estaban
      }));

      setErrors({});
    } catch (err) {
      alert("Error al buscar DNI: " + err.message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchRuc = async () => {
    try {
      if (!formData.ruc || formData.ruc.length !== 11) {
        alert("El RUC debe tener 11 dígitos");
        return;
      }

      setIsSearching(true);
      const customerData = await searchRuc(formData.ruc);

      // Actualiza solo los campos necesarios, manteniendo los demás
      setFormData((prev) => ({
        ...prev, // Mantiene todos los valores actuales
        name: customerData.name || prev.name,
        businessName: customerData.businessName || prev.businessName,
        // Mantiene dni, ruc, phoneNumber, email como estaban
      }));

      setErrors({});
    } catch (err) {
      alert("Error al buscar RUC: " + err.message);
    } finally {
      setIsSearching(false);
    }
  };
  return (
    <Paper sx={{ p: 3, maxWidth: 800, margin: "auto", mt: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: theme.palette.primary.main }}
      >
        {formData.id ? "Editar Cliente" : "Nuevo Cliente"}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
              disabled={isSearching}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="DNI"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                error={!!errors.dni}
                helperText={errors.dni}
                inputProps={{ maxLength: 8 }}
                disabled={isSearching}
              />
              <Tooltip title="Buscar DNI en RENIEC">
                <IconButton
                  onClick={handleSearchDni}
                  color="primary"
                  disabled={isSearching}
                >
                  <PersonSearch />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="RUC"
                name="ruc"
                value={formData.ruc}
                onChange={handleChange}
                error={!!errors.ruc}
                helperText={errors.ruc}
                inputProps={{ maxLength: 11 }}
                disabled={isSearching}
              />
              <Tooltip title="Buscar RUC en SUNAT">
                <IconButton
                  onClick={handleSearchRuc}
                  color="primary"
                  disabled={isSearching}
                >
                  <Business />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Razón Social"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              disabled={isSearching}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Teléfono"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={isSearching}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={isSearching}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={() => navigate("/customers")}
            disabled={loading || isSearching}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            type="submit"
            startIcon={
              loading || isSearching ? <CircularProgress size={20} /> : <Save />
            }
            disabled={loading || isSearching}
          >
            {formData.id ? "Actualizar" : "Guardar"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CustomerForm;

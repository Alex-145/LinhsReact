// src/components/suppliers/SupplierForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSuppliers } from "../../hooks/useSuppliers";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Save, ArrowBack, Search } from "@mui/icons-material";

const SupplierForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addSupplier, editSupplier, getRucInfo, getSupplier, loading, error } =
    useSuppliers();
  const [formData, setFormData] = useState({
    name: "",
    ruc: "",
    cellphone: "",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!id || id === "new") return;

    const loadSupplierData = async () => {
      try {
        const supplierData = await getSupplier(id);
        setFormData({
          name: supplierData.name || "",
          ruc: supplierData.ruc || "",
          cellphone: supplierData.cellphone || "",
        });
      } catch (err) {
        setFormError(err.message);
      }
    };

    loadSupplierData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchRuc = async () => {
    try {
      const rucInfo = await getRucInfo(formData.ruc);
      setFormData((prev) => ({
        ...prev,
        name: rucInfo.name || prev.name,
      }));
    } catch (err) {
      setFormError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name || !formData.ruc) {
      setFormError("Nombre y RUC son campos requeridos");
      return;
    }

    try {
      if (id && id !== "new") {
        await editSupplier(id, formData);
      } else {
        await addSupplier(formData);
      }
      navigate("/suppliers");
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => navigate("/suppliers")} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">
          {id && id !== "new" ? "Editar Proveedor" : "Nuevo Proveedor"}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {formError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {formError}
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
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="RUC"
              name="ruc"
              value={formData.ruc}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearchRuc}>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Celular"
              name="cellphone"
              value={formData.cellphone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} /> : <Save />}
              disabled={loading}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SupplierForm;

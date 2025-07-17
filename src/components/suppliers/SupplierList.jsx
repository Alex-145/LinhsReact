import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSuppliers } from "../../hooks/useSuppliers";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  Pagination,
  Stack,
  Box,
  Typography,
  Alert,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Add, Edit, Delete, Search } from "@mui/icons-material";

const SupplierList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    suppliers,
    loading,
    error,
    pagination,
    fetchSuppliers,
    removeSupplier,
    exportSuppliers,
  } = useSuppliers();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  // Efecto para cargar proveedores iniciales y al cambiar searchTerm o tamaño de página
  useEffect(() => {
    if (pagination.size > 0) {
      fetchSuppliers(searchTerm, 0, pagination.size); // Siempre empezar en página 0 al cambiar términos de búsqueda
    }
  }, [searchTerm, pagination.size, fetchSuppliers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (event, newPage) => {
    // Convertir newPage (1-based) a 0-based para la API
    fetchSuppliers(searchTerm, newPage - 1, pagination.size);
  };

  const handleDeleteClick = (id) => {
    setSelectedSupplierId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedSupplierId) {
      await removeSupplier(selectedSupplierId);
      // Recargar los proveedores manteniendo los filtros actuales
      fetchSuppliers(searchTerm, pagination.page, pagination.size);
      setDeleteDialogOpen(false);
      setSelectedSupplierId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedSupplierId(null);
  };

  return (
    <Paper sx={{ p: { xs: 1, sm: 3 }, borderRadius: 2, boxShadow: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          mb: 3,
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: theme.palette.primary.main }}
        >
          Lista de Proveedores
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/suppliers/new")}
            sx={{ whiteSpace: "nowrap" }}
          >
            {isMobile ? "Nuevo" : "Nuevo Proveedor"}
          </Button>
          <Button
            variant="outlined"
            onClick={exportSuppliers}
            sx={{ whiteSpace: "nowrap" }}
          >
            Exportar Excel
          </Button>
        </Box>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar proveedor..."
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: "action.active" }} />,
        }}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
        size={isMobile ? "small" : "medium"}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          overflowX: "auto",
        }}
      >
        <Table size={isMobile ? "small" : "medium"}>
          <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>RUC</TableCell>
              {!isMobile && (
                <TableCell sx={{ fontWeight: 600 }}>Celular</TableCell>
              )}
              <TableCell sx={{ fontWeight: 600 }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 3 : 4}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : suppliers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 3 : 4}
                  align="center"
                  sx={{ py: 3 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No se encontraron proveedores
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              suppliers.map((supplier) => (
                <TableRow
                  key={supplier.id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.ruc}</TableCell>
                  {!isMobile && <TableCell>{supplier.cellphone}</TableCell>}
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/suppliers/edit/${supplier.id}`)}
                      size={isMobile ? "small" : "medium"}
                    >
                      <Edit fontSize={isMobile ? "small" : "medium"} />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(supplier.id)}
                      size={isMobile ? "small" : "medium"}
                    >
                      <Delete fontSize={isMobile ? "small" : "medium"} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination.totalPages > 1 && (
        <Stack spacing={2} sx={{ mt: 3, alignItems: "center" }}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.page + 1}
            onChange={handlePageChange}
            color="primary"
            size={isMobile ? "small" : "medium"}
            showFirstButton
            showLastButton
          />
        </Stack>
      )}

      {/* Diálogo de confirmación para eliminar */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar este proveedor? Esta acción no
            se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SupplierList;

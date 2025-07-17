import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomers } from "../../hooks/useCustomers";
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

const CustomerList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    customers,
    loading,
    error,
    pagination,
    fetchCustomers,
    removeCustomer,
  } = useCustomers();

  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    if (pagination.size > 0) {
      const timer = setTimeout(() => {
        fetchCustomers(searchTerm, 0, pagination.size);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [searchTerm, pagination.size, fetchCustomers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (event, newPage) => {
    fetchCustomers(searchTerm, newPage - 1, pagination.size);
  };

  const handleDeleteClick = (id) => {
    setSelectedCustomerId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedCustomerId) {
      await removeCustomer(selectedCustomerId);
      fetchCustomers(searchTerm, pagination.page, pagination.size);
      setDeleteDialogOpen(false);
      setSelectedCustomerId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedCustomerId(null);
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
          Lista de Clientes
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/customers/new")}
          sx={{ whiteSpace: "nowrap" }}
        >
          {isMobile ? "Nuevo" : "Nuevo Cliente"}
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar cliente por nombre, DNI, RUC, razón social o email..."
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
              <TableCell sx={{ fontWeight: 600 }}>DNI</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>RUC</TableCell>
              {!isMobile && (
                <>
                  <TableCell sx={{ fontWeight: 600 }}>Razón Social</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Teléfono</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                </>
              )}
              <TableCell sx={{ fontWeight: 600 }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 4 : 7}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : customers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 4 : 7}
                  align="center"
                  sx={{ py: 3 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No se encontraron clientes
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.dni}</TableCell>
                  <TableCell>{customer.ruc}</TableCell>
                  {!isMobile && (
                    <>
                      <TableCell>{customer.businessName}</TableCell>
                      <TableCell>{customer.phoneNumber}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                    </>
                  )}
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/customers/edit/${customer.id}`)}
                      size={isMobile ? "small" : "medium"}
                    >
                      <Edit fontSize={isMobile ? "small" : "medium"} />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(customer.id)}
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

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar este cliente? Esta acción no se
            puede deshacer.
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

export default CustomerList;

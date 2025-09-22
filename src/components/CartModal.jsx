import {
  Modal,
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Fade,
  TablePagination,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementItems,
  decrementFromCart,
  removeFromCart,
} from "../Features/featureSlice";

const CartModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [tablePage, setTablePage] = useState(0);
  const rowsPerPage = 3;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const displayTableItems = products.slice(
    tablePage * rowsPerPage,
    tablePage * rowsPerPage + rowsPerPage
  );

  const handleConfirmOpen = (item) => {
    setSelectedItem(item);
    setConfirmOpen(true);
  };
  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setSelectedItem(null);
  };
  const handleConfirmDelete = () => {
    if (selectedItem) {
      dispatch(removeFromCart({ id: selectedItem.id }));
      handleConfirmClose();
    }
  };
  const totalQty = products.reduce((total, item) => {
    total += item.qty;
    return total;
  }, 0);
  const grandTotal = products.reduce((total, item) => {
    total += item.price * item.qty;
    return total;
  }, 0);
  return (
    <>
      {/* Main Cart Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
            maxHeight: "80vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 3,
            overflow: "auto",
            p: 3,
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <Typography
              variant="h6"
              component="h2"
              className="!font-bold !text-2xl"
            >
              Your Cart is Ready
            </Typography>
            <IconButton onClick={handleClose}>
              <CancelIcon />
            </IconButton>
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "black" }}>
                  {["Image", "Name", "Price", "Total", "Qty", "Actions"].map(
                    (head) => (
                      <TableCell
                        key={head}
                        sx={{ color: "white" }}
                        align="center"
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Items In the Cart
                    </TableCell>
                  </TableRow>
                ) : (
                  displayTableItems.map((item, index) => (
                    <TableRow
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-[#FFFFFF]"
                      }
                    >
                      <TableCell align="center">
                        <img
                          src={item.image}
                          className="w-20 h-20 object-contain mx-auto"
                          alt=""
                        />
                      </TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">&#8377;{item.price}</TableCell>
                      <TableCell align="center">
                        &#8377;{item.price * item.qty}
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center items-center">
                          <Button
                            onClick={() =>
                              dispatch(incrementItems({ id: item.id }))
                            }
                          >
                            <AddCircleIcon />
                          </Button>
                          {item.qty}
                          <Button
                            onClick={() =>
                              dispatch(decrementFromCart({ id: item.id }))
                            }
                          >
                            <RemoveCircleIcon />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleConfirmOpen(item)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                <TableRow>
                  <TableCell colSpan={4} />
                  <TableCell className="!font-semibold !text-md">
                    Total Qty
                  </TableCell>
                  <TableCell>{totalQty}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} />
                  <TableCell className="!font-semibold !text-md">
                    Grand Total
                  </TableCell>
                  <TableCell>&#8377;{grandTotal}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex justify-end">
              <TablePagination
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={tablePage}
                onPageChange={(e, value) => setTablePage(value)}
                rowsPerPageOptions={[]}
              />
            </div>
          </TableContainer>
        </Box>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        open={confirmOpen}
        onClose={handleConfirmClose}
        closeAfterTransition
      >
        <Fade in={confirmOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" className="mb-3">
              Are you sure you want to remove this item?
            </Typography>
            <div className="flex justify-center gap-4 mt-2">
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmDelete}
              >
                Yes
              </Button>
              <Button variant="outlined" onClick={handleConfirmClose}>
                No
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default CartModal;

import {
  Badge,
  ButtonGroup,
  IconButton,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fade,
  Backdrop,
} from "@mui/material";
import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import produtcData from "./components/ProductData/productData";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementFromCart,
  incrementItems,
  removeFromCart,
} from "./Features/featureSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  console.log(products);

  return (
    <div className="">
      <nav className="flex justify-between items-center bg-black text-white p-5 ">
        <div className="text-2xl">Shopping Cart</div>
        <IconButton className="!bg-white" onClick={handleOpen}>
          <ShoppingCartIcon fontSize="large"></ShoppingCartIcon>
          <Badge
            className="bottom-3.5"
            color="primary"
            badgeContent={products.length}
          ></Badge>
        </IconButton>
      </nav>

      <Modal open={open} onClose={handleClose}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No Items In the Cart
                  </TableCell>
                </TableRow>
              ) : (
                products.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img src={item.image} className="max-w-36" alt="" />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Modal>
      <div className="flex justify-evenly flex-wrap px-5 gap-5 mt-5">
        {produtcData.length > 0 &&
          produtcData.map((item, index) => (
            <Card
              key={index}
              className="rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.03]"
              sx={{ maxWidth: 300 }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={item.image}
                className="rounded-t-xl"
              />
              <CardContent className="h-1/3">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {item.name}
                </h2>
                <h4 className="text-gray-600 text-sm mb-2">
                  {item.description}
                </h4>
                <p
                  variant="body2"
                  className="text-indigo-600 font-bold text-lg"
                  sx={{ fontSize: "1.5rem" }}
                >
                  &#8377;{item.price}
                </p>
              </CardContent>
              <CardActions className="flex flex-col items-center gap-2 mb-3">
                <div className="mb-2">
                  <ButtonGroup className="shadow-sm">
                    <Button
                      className="!bg-indigo-100 hover:!bg-indigo-200 !text-indigo-700"
                      onClick={() => dispatch(addToCart(item))}
                    >
                      <AddCircleIcon />
                    </Button>
                    <span className="px-4 font-medium text-gray-700">
                      {products.find((p) => p.id === item.id)?.qty || 0}
                    </span>
                    <Button
                      className="!bg-red-100 hover:!bg-red-200 !text-red-700"
                      onClick={() =>
                        dispatch(decrementFromCart({ id: item.id }))
                      }
                    >
                      <RemoveCircleIcon />
                    </Button>
                  </ButtonGroup>
                </div>
                <Button
                  variant="contained"
                  className="w-full !bg-indigo-600 hover:!bg-indigo-700 text-white font-medium transition-colors"
                  onClick={() => {
                    console.log(item), dispatch(addToCart(item));
                  }}
                  size="small"
                >
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Cart;

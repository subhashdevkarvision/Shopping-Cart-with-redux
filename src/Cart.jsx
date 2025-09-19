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
// import Paper from "@mui/material/Paper";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  console.log(products);

  return (
    <div className="">
      <nav className="flex justify-between bg-black text-white p-5 ">
        <div className="text-2xl">Shopping Cart</div>
        <IconButton color="warning" onClick={handleOpen}>
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
            // <Paper>
            <Card key={index} sx={{ maxWidth: 300 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={item.image}
              />
              <CardContent className="h-1/3">
                <h2 className="text-xl">{item.name}</h2>
                <h4 className="">{item.description}</h4>
                <p variant="body2" className="my-1" sx={{ fontSize: "1.5rem" }}>
                  {item.price}
                </p>
              </CardContent>
              <CardActions className="mt-2 flex-col">
                <div className="mb-2">
                  <ButtonGroup>
                    <Button
                      onClick={() => dispatch(incrementItems({ id: item.id }))}
                    >
                      <AddCircleIcon />
                    </Button>
                    <span>{item.qty}</span>
                    <Button
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
                  className="w-full"
                  onClick={() => {
                    console.log(item), dispatch(addToCart(item));
                  }}
                  size="small"
                >
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
            // </Paper>
          ))}
      </div>
    </div>
  );
};

export default Cart;

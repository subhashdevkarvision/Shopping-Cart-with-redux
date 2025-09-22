import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  ButtonGroup,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Features/featureSlice";

const ProductCard = ({ item }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.products);
  const handleIncrementQty = () => {
    setQty((prev) => (prev += 1));
  };
  const handleDecrementQty = () => {
    if (qty > 1) {
      setQty((prev) => (prev -= 1));
    }
  };
  const handleAddToCart = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
    // setQty(1);
  };
  return (
    <Card
      className="rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-2xl transition-transform transform hover:scale-105 overflow-hidden"
      sx={{ maxWidth: 300 }}
    >
      <CardMedia
        component="img"
        height="140"
        image={item.image}
        className="rounded-t-2xl !object-contain"
      />
      <CardContent className="flex flex-col justify-between h-40">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          {item.name}
        </h2>
        <h4 className="text-gray-600 text-sm mb-2">{item.description}</h4>
        <p className="text-indigo-600 font-bold text-lg mb-2">
          &#8377;{item.price}
        </p>
      </CardContent>
      <CardActions className="flex flex-col items-center gap-2 mb-3">
        <div className="mt-2 flex items-center justify-center">
          <ButtonGroup className="shadow-sm">
            <Button
              className="!bg-white hover:!bg-indigo-200 !text-indigo-700"
              onClick={handleIncrementQty}
            >
              <AddCircleIcon />
            </Button>
            <Button aria-readonly sx={{ pointerEvents: "none" }}>
              {qty}
            </Button>
            <Button
              className="!bg-white hover:!bg-red-200 !text-red-700"
              onClick={handleDecrementQty}
            >
              <RemoveCircleIcon />
            </Button>
          </ButtonGroup>
        </div>
        <Button
          variant="contained"
          className="w-full !bg-indigo-600 hover:!bg-indigo-700 text-white font-medium transition-colors"
          onClick={() => handleAddToCart(item, qty)}
          size="small"
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

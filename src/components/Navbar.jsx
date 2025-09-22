import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import { useSelector } from "react-redux";

const Navbar = ({ handleOpen }) => {
  const products = useSelector((state) => state.products);

  return (
    <nav className="flex justify-between items-center  bg-indigo-600 text-white p-5 shadow-md">
      <div className="text-2xl font-bold tracking-wide">Shopping Cart</div>
      <IconButton
        className="!bg-white hover:!bg-gray-100 transition-colors rounded-lg relative"
        onClick={handleOpen}
      >
        <ShoppingCartIcon fontSize="large" className="text-indigo-600" />
        <Badge
          className="bottom-3.5"
          badgeContent={products.length}
          color="warning"
        />
      </IconButton>
    </nav>
  );
};

export default Navbar;

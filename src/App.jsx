import React, { useState } from "react";
import Navbar from "./components/Navbar";
import CartModal from "./components/CartModal";
import ProductGrid from "./components/ProductGrid";
const App = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="bg-gray-100 min-h-screen px-5 py-8">
      <Navbar handleOpen={handleOpen} />
      <CartModal open={open} handleClose={handleClose} />
      <ProductGrid />
    </div>
  );
};

export default App;

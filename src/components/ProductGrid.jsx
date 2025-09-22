import { Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import produtcData from "../components/ProductData/productData";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayItems = produtcData.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex justify-center flex-wrap px-5 gap-10 mt-5">
        {displayItems.map((item, index) => (
          <ProductCard key={index} item={item} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Stack>
          <Pagination
            count={Math.ceil(produtcData.length / itemsPerPage)}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            color="primary"
          />
        </Stack>
      </div>
    </>
  );
};

export default ProductGrid;

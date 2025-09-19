import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = state.products.find(
        (item) => item?.id === action.payload.id
      );
      if (product) {
        product.qty += 1;
      } else {
        state.products.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },
    incrementItems: (state, action) => {
      const product = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (product) {
        product.qty += 1;
      }
    },
    decrementFromCart: (state, action) => {
      const product = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (product) {
        if (product.qty > 1) {
          product.qty -= 1;
        } else if (product.qty === 1) {
          state.products = state.products.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementItems, decrementFromCart } =
  productSlice.actions;

export default productSlice.reducer;

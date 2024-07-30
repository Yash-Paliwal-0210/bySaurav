import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [], // Ensure this matches what your component expects
};

// Fetch all products from Django API
export const FetchAllProduct = createAsyncThunk(
  "product/FetchAllProduct",
  async () => {
    const response = await axios.get("http://localhost:8000/api/get_products/");
    return response.data; // Response data should be the product array
  }
);

// Add product to wishlist (assuming wishlist management is still needed)
export const AddToWishList = createAsyncThunk(
  "product/AddToWishList",
  async (value) => {
    // Assuming you have an endpoint to handle wishlist updates
    await axios.put(`http://localhost:8000/api/user/update_wishlist/${value.userId}/`, { wishList: [value] });
    return value;
  }
);

export const productSlice = createSlice({
  name: "product", // Changed from "user" to "product" to reflect the actual state
  initialState,
  reducers: {
    setProduct(state, action) {
      const { product } = action.payload;
      state.products = product;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddToWishList.pending, (state) => {})
      .addCase(AddToWishList.fulfilled, (state, action) => {})
      .addCase(AddToWishList.rejected, (state, action) => {})
      .addCase(FetchAllProduct.pending, (state) => {})
      .addCase(FetchAllProduct.fulfilled, (state, action) => {
        // Assuming action.payload is an array of products
        state.products = action.payload;
      })
      .addCase(FetchAllProduct.rejected, (state, action) => {});
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;

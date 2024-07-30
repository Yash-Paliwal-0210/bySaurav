import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  orders: []
};

export const FetchAllOrders = createAsyncThunk(
  "order/FetchAllOrders",
  async () => {
    const response = await axios.get("http://localhost:8000/api/orders/");
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload.orders;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchAllOrders.pending, (state) => {
        // Handle loading state if needed
      })
      .addCase(FetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(FetchAllOrders.rejected, (state, action) => {
        // Handle error state if needed
      });
  },
});

export const { setOrders } = orderSlice.actions;

export default orderSlice.reducer;

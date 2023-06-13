import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

// thunk for fetching data from the API
export const getAllSellerOrder = createAsyncThunk(
  "/api/v1/seller/orders",
  async (orders, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/api/v1/order/orders`,
        config,
        orders
      );
      console.log("fetched Seller order ", response.data.data);
      return {
        data: response.data.data,
      };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: null,
    error: null,
  },
  extraReducers: {
    [getAllSellerOrder.pending]: (state) => {
      state.status = "loading.....";
    },
    [getAllSellerOrder.fulfilled]: (state, action) => {
      state.orders = action.payload;
      state.status = "success";
    },
    [getAllSellerOrder.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export default orderSlice.reducer;

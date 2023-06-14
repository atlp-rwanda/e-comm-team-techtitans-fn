import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

// thunk for fetching data from the API
export const getAllBuyerOrder = createAsyncThunk(
  "/api/v1/order/list-orders",
  async (buyerOrders, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/api/v1/order/list-orders`,
        config,
        buyerOrders
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

const buyerOrderSlice = createSlice({
  name: "buyerOrders",
  initialState: {
    buyerOrders: [],
    status: null,
    error: null,
  },
  extraReducers: {
    [getAllBuyerOrder.pending]: (state) => {
      state.status = "loading.....";
    },
    [getAllBuyerOrder.fulfilled]: (state, action) => {
      state.buyerOrders = action.payload;
      state.status = "success";
    },
    [getAllBuyerOrder.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export default buyerOrderSlice.reducer;

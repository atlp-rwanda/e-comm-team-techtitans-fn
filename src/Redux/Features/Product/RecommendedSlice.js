import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const RecommendedProduct = createAsyncThunk(
  "api/v1/product/recommended",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products`);
      console.log("response data:", response.data);
      return response.data;
    } catch (error) {
      console.log("product error:", error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//  slice for the product
const RecommendSlice = createSlice({
  name: "recommended",
  initialState: {
    recommended: null,
    status: null,
    error: null,
  },
  extraReducers: {
    [RecommendedProduct.pending]: (state, action) => {
      state.status = "loading.......";
    },
    [RecommendedProduct.fulfilled]: (state, action) => {
      state.recommended = action.payload;
      state.status = "success";
      // state.totalPages = calculateTotalPages(action.payload.data);
    },
    [RecommendedProduct.rejected]: (state, action) => {
      state.product = action.payload;
      state.error = "failed";
    },
  },
});

export default RecommendSlice.reducer;

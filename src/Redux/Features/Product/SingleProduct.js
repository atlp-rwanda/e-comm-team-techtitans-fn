import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productsEndpoint } from "../../../Constants";

export const fetchProduct = createAsyncThunk(
  "/api/v1/product/:id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/${productsEndpoint}/${id}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    product: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;

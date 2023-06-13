import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

export const getProductDetails = createAsyncThunk(
  "api/v1/product",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/product/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/api/v1/product/delete/:id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      const response = await axios.delete(
        `${BASE_URL}/api/v1/product/delete/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const DeleteProductSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    status: null,
    error: null,
  },
  extraReducers: {
    [getProductDetails.pending]: (state) => {
      state.status = "loading.....";
    },
    [getProductDetails.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = "success";
    },
    [getProductDetails.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
    [deleteProduct.pending]: (state, action) => {
      state.status = "loading.......";
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = "success";
    },
    [deleteProduct.rejected]: (state, action) => {
      state.product = action.payload;
      state.error = "failed";
    },
  },
});

export const DeleteProductReducer = DeleteProductSlice.reducer;
export default DeleteProductReducer;

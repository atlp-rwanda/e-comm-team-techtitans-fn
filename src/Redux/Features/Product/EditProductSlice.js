import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

export const getProductDetails = createAsyncThunk(
  "api/v1/product",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(` ${BASE_URL}/api/v1/product/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "api/v1/product/update/:id",
  async (
    { id, name, price, quantity, categoryId, description, expiryDate, images },
    { rejectWithValue }
  ) => {
    try {
      const authToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      const response = await axios.put(
        ` ${BASE_URL}/api/v1/product/update/${id}`,
        {
          name,
          price,
          quantity,
          categoryId,
          description,
          expiryDate,
          images,
        }, // data passed into the backend's req.body
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//  slice for the product
const ProductDetailsSlice = createSlice({
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
    [editProduct.pending]: (state, action) => {
      state.status = "loading.......";
    },
    [editProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = "success";
    },
    [editProduct.rejected]: (state, action) => {
      state.product = action.payload;
      state.error = "failed";
    },
  },
});

export const ProductDetailsReducer = ProductDetailsSlice.reducer;
export default ProductDetailsReducer;

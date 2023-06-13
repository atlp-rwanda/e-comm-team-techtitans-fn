import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

// thunk for fetching data from the API
export const fetchProducts = createAsyncThunk(
  "/api/v1/product",
  async (Allproducts, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/v1/product`,
        Allproducts
      );
      // console.log("the data you want", response.data.data);
      return {
        data: response.data.data.rows,
      };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
      // throw error;
    }
  }
);

// Create the products slice
const ProductSlice = createSlice({
  name: "Allproducts",
  initialState: {
    Allproducts: [],
    status: null,
    error: null,
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = "loading.....";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.Allproducts = action.payload;
      state.status = "success";
    },
    [fetchProducts.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export default ProductSlice.reducer;
//export const getProductsReducer = productsSlice.reducer;
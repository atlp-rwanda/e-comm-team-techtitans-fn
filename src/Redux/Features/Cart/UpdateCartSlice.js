import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis.js";

export const UpdateCartProduct = createAsyncThunk(
  "cart/updateToCart",
  async ({ productId, productQuantity }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/cart/add-to-cart`,
        { productId, productQuantity },
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const updateProductCartSlice = createSlice({
  name: "cart",
  initialState: {
    review: null,
    statuss: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddToCartProduct.pending, (state) => {
        state.statuss = "loading";
        state.error = null;
      })
      .addCase(AddToCartProduct.fulfilled, (state, action) => {
        state.statuss = "succeeded";
        state.review = action.payload;
      })
      .addCase(AddToCartProduct.rejected, (state, action) => {
        state.statuss = "failed";
        state.error = action.payload;
      });
  },
});

export default updateProductCartSlice.reducer;

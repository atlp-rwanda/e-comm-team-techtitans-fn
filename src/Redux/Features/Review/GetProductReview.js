import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis.js";

export const GetReviewsProduct = createAsyncThunk(
  "review/Show/Review",
  async ({ pid }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/review/getReview/${pid}`
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const productsReviewShowSlice = createSlice({
  name: "showreview",
  initialState: {
    showreview: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetReviewsProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(GetReviewsProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.showreview = action.payload;
      })
      .addCase(GetReviewsProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productsReviewShowSlice.reducer;

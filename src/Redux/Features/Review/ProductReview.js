import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis.js";

export const ReviewProduct = createAsyncThunk(
  "review/assignReview",
  async ({ pid, ratings, feedback }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/review/assign-review/${pid}`,
        { ratings, feedback },
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const productsReviewSlice = createSlice({
  name: "review",
  initialState: {
    review: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ReviewProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(ReviewProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.review = action.payload;
      })
      .addCase(ReviewProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productsReviewSlice.reducer;

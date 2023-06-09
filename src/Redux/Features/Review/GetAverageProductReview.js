import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis.js";

export const fetchProductReviewAverage = createAsyncThunk(
  "productsReviewAverage/fetchProductReviewAverage",
  async ({ pid }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/review/rating/${pid}`
      );

      return { pid, reviewAverage: response.data.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const productsReviewAverageSlice = createSlice({
  name: "productsReviewAverage",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductReviewAverage.fulfilled, (state, action) => {
      const { pid, reviewAverage } = action.payload;
      state[pid] = reviewAverage;
    });
  },
});

export default productsReviewAverageSlice.reducer;

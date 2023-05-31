import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { createSlice } from "@reduxjs/toolkit";
export const ViewCategory = createAsyncThunk(
  "api/v1/category",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://ecommerce-tech-titans.herokuapp.com/api/v1/category`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
      // throw error;
    }
  }
);

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    category: null,
    status: null,
    error: null,
  },
  extraReducers: {
    [ViewCategory.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = "success";
    },
    [ViewCategory.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export default CategorySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

export const ViewCategory = createAsyncThunk(
  "api/v1/category",
  async (Allcategories, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/v1/category`,
        Allcategories
      );
      console.log("your category",response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
      // throw error;
    }
  }
);

const CategorySlice = createSlice({
  name: "Allcategories",
  initialState: {
    Allcategories: [],
    status: null,
    error: null,
  },
  extraReducers: {
    [ViewCategory.pending]: (state) => {
      state.status = "loading.....";
    },
    [ViewCategory.fulfilled]: (state, action) => {
      state.Allcategories = action.payload;
      state.status = "success";
    },
    [ViewCategory.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export default CategorySlice.reducer;

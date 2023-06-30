import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

// thunk for fetching data from the API
export const getSingleCategory = createAsyncThunk(
  "/category/product",
  async ({ name }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/category/${name}`);
      console.log("Message ..........", response.data.data);
      return {
        data: response.data.data,
      };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const singleCategorySlice = createSlice({
  name: "singleCategory",
  initialState: {
    singleCategory: [],
    status: null,
    error: null,
  },
  extraReducers: {
    [getSingleCategory.pending]: (state) => {
      state.status = "loading.....";
    },
    [getSingleCategory.fulfilled]: (state, action) => {
      state.singleCategory = action.payload;
      state.status = "success";
    },
    [getSingleCategory.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export default singleCategorySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productsEndpoint } from "../../../Constants";
const initialState = {
  product: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const resetToInitialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// function to leverage the endpoint services

// get one product only
export const getProduct = createAsyncThunk(
  "getProduct-thunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        ` ${import.meta.env.VITE_API_KEY}/${productsEndpoint}/${id}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);
// create slice

export const singleProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: () => resetToInitialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.product = [];
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = payload;
        state.message = "";
      })
      .addCase(getProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
        state.product = [];
      });
  },
});

// export product slice

export const { reset } = singleProductSlice.actions;
export default singleProductSlice.reducer;

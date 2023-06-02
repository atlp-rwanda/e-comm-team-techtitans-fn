import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productsEndpoint } from "../../../Constants";
import { BASE_URL } from "../../../utils/apiUtilis"; 

const initialState = {
  singleProduct: [],
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
export const getSingleProduct = createAsyncThunk(
  "getSingleProduct-thunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        ` ${BASE_URL}/api/v1/${productsEndpoint}/${id}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);
// create slice

export const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    reset: () => resetToInitialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.singleProduct = [];
      })
      .addCase(getSingleProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.singleProduct = payload;
        state.message = "";
      })
      .addCase(getSingleProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
        state.singleProduct = [];
      });
  },
});

// export product slice

export const { reset } = singleProductSlice.actions;
export default singleProductSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsServices from "./productsServices";

const initialState = {
  products: [],
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
export const getProducts = createAsyncThunk(
  "getProducts-thunk",
  async (_, thunkAPI) => {
    try {
      return await productsServices.getProducts();
    } catch (error) {
      let message;
      if (error.code === "ERR_NETWORK") {
        message = "Network error, Please connect your device to the network";
      } else if (error.response) {
        message = error.response.data.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// create slice

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: () => resetToInitialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.products = [];
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = payload;
        state.message = "";
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
        state.products = [];
      });
  },
});

// export product slice

export const { reset } = productsSlice.actions;
export default productsSlice.reducer;

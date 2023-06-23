import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis.js";

export const ClearCart = createAsyncThunk(
    "/api/v1/cart/clear-cart/:id",
    async (id, { rejectWithValue }) => {
      try {
        const authToken = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        };
        const response = await axios.delete(
          `${BASE_URL}/api/v1/cart/clear-cart/${id}`,
          config
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  const ClearCartSlice = createSlice({
    name: "clearcart",
    initialState: {
      clearcart: null,
      status: null,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(ClearCart.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(ClearCart.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.clearcart = action.payload;
        })
        .addCase(ClearCart.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    },
  });
  
  export default ClearCartSlice.reducer;
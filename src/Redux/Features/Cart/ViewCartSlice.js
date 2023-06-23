import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis.js";

export const viewProductCart = createAsyncThunk(
    "cart/viewCart",
    async (showcart, { rejectWithValue }) => {
      try {
        const authToken = localStorage.getItem("token");
  
        const config = {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        };
        const response = await axios.get(
          `${BASE_URL}/api/v1/cart/view-cart`,
          config,
          showcart
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );
  const viewProductCartSlice = createSlice({
    name: "showcart",
    initialState: {
    showcart: [],
    statuss: null,
      error: null,
    },

    reducers: {
      incrementItem(state, action) {
        state.showcart = state.showcart.map(item => {
            if (item.id === action.payload) {
                item.quantity++;
            }
            return item;
        });
    },

    },
  extraReducers: (builder) => {
    builder
      .addCase(viewProductCart.pending, (state) => {
        state.statuss = "loading";
        state.error = null;
      })
      .addCase(viewProductCart.fulfilled, (state, action) => {
        state.statuss = "succeeded";
        state.showcart = action.payload;
      })
      .addCase(viewProductCart.rejected, (state, action) => {
        state.statuss = "failed";
        state.error = action.payload;
      });
  },
});
export const {incrementItem } = viewProductCartSlice.actions;
export default viewProductCartSlice.reducer;
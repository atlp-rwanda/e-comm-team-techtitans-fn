import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

export const updateOrderStatus = createAsyncThunk(
  "api/v1/order/post/trackorder/:id",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("token");
      const configs = {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      const response = await axios.put(
        `${BASE_URL}/api/v1/order/status/${id}`,
        { status },
        configs
      );
      console.log("fetched data ", response.data.data);
      return {
        data: response.data.data,
      };
    } catch (error) {
      console.log("Change order error:", error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const updateOrderStatusSlice = createSlice({
  name: "updateOrder",
  initialState: {
    updateOrder: null,
    status: null,
    error: null,
  },
  extraReducers: {
    [updateOrderStatus.pending]: (state) => {
      state.status = "loading.....";
    },
    [updateOrderStatus.fulfilled]: (state, action) => {
      state.updateOrder = action.payload.data;
      state.status = "success";
    },
    [updateOrderStatus.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export default updateOrderStatusSlice.reducer;

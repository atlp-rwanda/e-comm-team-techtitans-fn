import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

export const deleteBuyerOrder = createAsyncThunk(
  "api/v1/order/delete/:id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("token");
      const configs = {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      const response = await axios.delete(
        `${BASE_URL}/api/v1/order/delete/${id}`,
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

const deleteOrderSlice = createSlice({
  name: "deleteOrder",
  initialState: {
    deleteOrder: null,
    status: null,
    error: null,
  },
  extraReducers: {
    [deleteBuyerOrder.pending]: (state) => {
      state.status = "loading.....";
    },
    [deleteBuyerOrder.fulfilled]: (state, action) => {
      state.deleteOrder = action.payload.data;
      state.status = "success";
    },
    [deleteBuyerOrder.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export default deleteOrderSlice.reducer;

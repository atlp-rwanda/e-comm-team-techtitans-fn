import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

// thunk for fetching data from the API
export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (id, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/api/v1/order/${id}`,
        config
      );
      console.log("fetched single order ", response.data.data);
      return {
        data: response.data.data,
      };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const singleOrderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    status: null,
    error: null,
  },
  extraReducers: {
    [getOrder.pending]: (state) => {
      state.status = "loading.....";
    },
    [getOrder.fulfilled]: (state, action) => {
      state.order = action.payload;
      state.status = "success";
    },
    [getOrder.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export default singleOrderSlice.reducer;

/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis"

export const GetNotification = createAsyncThunk(
  "/api/v1/notification/vendor/all/",
  async (_,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          'Authorization': "Bearer " + token
        }
      };

      const response = await axios.get(`${BASE_URL}/api/v1/notification/vendor/all/`,config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);



const GetNotificationSlice = createSlice({
  name: 'getnotification',
  initialState: {
    getnotification: null,
    status: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetNotification.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(GetNotification.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.getnotification = action.payload;
      })
      .addCase(GetNotification.rejected, (state, action) => {
        state.error = "failed";
        state.status = "failed";
        state.getnotification= action.payload;
      });
  },
});

export default GetNotificationSlice.reducer;
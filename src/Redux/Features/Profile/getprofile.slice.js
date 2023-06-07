/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../../utils/apiUtilis"

export const GetProfile = createAsyncThunk(
  "api/v1/user/for/only/profiles",
  async (_,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          'Authorization': "Bearer " + token
        }
      };

      const response = await axios.get(`${BASE_URL}/api/v1/user/for/only/profiles`,config);
      console.log('response data:', response.data);
      return response.data.user;
    } catch (error) {
      console.log('get profile error:', error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getProfileSlice = createSlice({
  name: 'getprofile',
  initialState: {
    getprofile: null,
    status: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(GetProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.getprofile = action.payload;
      })
      .addCase(GetProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default getProfileSlice.reducer;
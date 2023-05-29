import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
// thunk for fetching data from the API
export const getAllUsers = createAsyncThunk(
  "/api/v1/user/profile/users",
  async (allusers, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      const response = await axios.get(
        `${process.env.BASE_URL}/user/profile/users`,
        config,
        allusers
      );
      console.log("response data:", response.data);

      return {
        data: response.data.data.rows, // Extract the user data array
      };
    } catch (error) {
      console.log("Fetch users error:", error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);


//  slice for the product
const AlluserSlice = createSlice({
  name: "allusers",
  initialState: {
    allusers: [],
    status: null,
    error: null,
    currentPage: 1, // Initialize currentPage to 0
    totalPages: 0,
  },
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.status = "loading.....";
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.allusers = action.payload;
      state.status = "success";
    },
    [getAllUsers.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export default AlluserSlice.reducer;

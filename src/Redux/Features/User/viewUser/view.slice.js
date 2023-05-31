import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../../utils/apiUtilis";

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
        `${BASE_URL}/api/v1/user/profile/users`,
        config,
        allusers
      );

      return {
        data: response.data.data.rows, // Extract the user data array
      };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const AlluserSlice = createSlice({
  name: "allusers",
  initialState: {
    allusers: [],
    status: null,
    error: null,
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

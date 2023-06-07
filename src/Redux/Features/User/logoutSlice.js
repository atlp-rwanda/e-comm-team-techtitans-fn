import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

// Create a thunk for fetching data from the API
export const logout = createAsyncThunk(
  "api/v1/user/logout",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/user/logout`, user);
      localStorage.clear();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const LogoutSlice = createSlice({
  name: "logout",
  initialState: {
    logout: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.getprofile = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default LogoutSlice.reducer;
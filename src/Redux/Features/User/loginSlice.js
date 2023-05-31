import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create a thunk for fetching data from the API
export const login = createAsyncThunk(
  "api/v1/user/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://ecommerce-tech-titans.herokuapp.com/api/v1/user/login`,
        user
      );
      localStorage.setItem("email", response?.data?.user?.email);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.log("login error:", error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const verify = createAsyncThunk(
  "api/v1/user/login/verifyotp",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://ecommerce-tech-titans.herokuapp.com/api/v1/user/login/verifyotp`,
        user
      );
      console.log("response data:", response.data);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.log("login error:", error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const loginSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: null,
    Error: null,
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = "loading.....";
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "success";
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.Error = action.payload;
    },
    [verify.pending]: (state, action) => {
      state.status = "loading.....";
    },
    [verify.rejected]: (state, action) => {
      state.status = "failed";
      state.Error = action.payload;
    },
    [verify.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "success";
    },
  },
});

export default loginSlice.reducer;

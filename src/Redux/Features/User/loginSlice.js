import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

// Create a thunk for fetching data from the API
export const login = createAsyncThunk(
  "api/v1/user/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/user/login`, user);
      localStorage.setItem("email", response?.data?.user?.email);
      localStorage.setItem("token", response.data?.token);
      localStorage.setItem("role", response.data.roleId);
      const { email, password } = user;
      return {
        ...response.data,
        credentials: {
          email,
          password,
        },
      };

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const verify = createAsyncThunk(
  "api/v1/user/login/verifyotp",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/user/login/verifyotp`,
        user
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
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
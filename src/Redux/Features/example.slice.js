import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create a thunk for fetching data from the API
export const login = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      // Replace the actual API endpoint with a dummy route
      const response = await axios.post(
        "https://example.com/api/v1/user/login",
        user
      );
      console.log("response data:", response.data);
      localStorage.setItem("email", response.data.user.email);
      if (response.data.message === "Please enter your OTP") {
        console.log(response.data.message);
        // alert("Proceed to verify otp page")
        return response.data;
      } else {
        console.log(response.data.message);
        return response.data.message;
      }
    } catch (error) {
      console.log("login error:", error.response.data.message);
      // alert(error.response.data.message)
      return rejectWithValue(error.response.data.message);
      // throw error;
    }
  }
);

export const verify = createAsyncThunk(
  "user/login/verifyotp",
  async (user, { rejectWithValue }) => {
    try {
      // Replace the actual API endpoint with a dummy route
      const response = await axios.post(
        "https://example.com/api/v1/user/login/verifyotp",
        user
      );
      console.log("response data:", response.data);
      localStorage.setItem("token", response.data.token);
      // localStorage.setItem('user',userdata);
      return response.data;
    } catch (error) {
      console.log("login error:", error.response.data.message);
      // alert(error.response.data.message)
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create a slice for the user
const loginExampleSlice = createSlice({
  name: "example",
  initialState: {
    example: [],
    status: null,
    Error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading.....";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.example = action.payload;
        state.status = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.Error = action.payload;
      })
      .addCase(verify.pending, (state, action) => {
        state.status = "loading.....";
      })
      .addCase(verify.rejected, (state, action) => {
        state.status = "failed";
        state.Error = action.payload;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.example = action.payload;
        state.status = "success";
      });
  },
});

export default loginExampleSlice.reducer;

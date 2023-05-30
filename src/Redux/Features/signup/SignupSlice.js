import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis"; // Import the base URL from the utility file

export const Signup = createAsyncThunk(
  "signup",
  async (signup, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/user/signup`,
        signup
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "verifyEmail",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/user/verifyEmail`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const setEmailVerificationStatus = createAction(
  "signup/setEmailVerificationStatus"
);

const SignupSlice = createSlice({
  name: "signup",
  initialState: {
    signup: null,
    status: null,
    error: null,
    emailVerified: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Signup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(Signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.signup = action.payload;
      })
      .addCase(Signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.status = "succeeded";
        state.emailVerified = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(setEmailVerificationStatus, (state, action) => {
        state.emailVerified = action.payload;
      });
  },
});

export default SignupSlice.reducer;

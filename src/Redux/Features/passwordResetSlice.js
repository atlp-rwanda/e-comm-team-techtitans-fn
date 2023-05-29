import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialState = {
  userId: null,
  token: null,
  status: 'idle',
  error: null,
};

// Create a thunk for fetching data from the API
export const sendResetLink = createAsyncThunk(
  'api/v1/user/forgot-password',
  async (user, { rejectWithValue, dispatch }) => {
    try {
      // Backend Urls
      const localUrl = 'http://localhost:1001/api/v1/user/forgot-password';
      const deployedUrl =
        'https://ecommerce-tech-titans.herokuapp.com/api/v1/user/forgot-password';

      const response = await axios.patch(deployedUrl, user);

      const token = response.data.token;
      const decodedToken = jwt_decode(token);

      // ...Dispatch an action to store the userId and token in the Redux store...
      dispatch(setUserCredentials({ userId: decodedToken.userId, token }));
    } catch (error) {
      error.response.status === 404
        ? toast.warning('User does not exist in the database')
        : toast.error(error.message);
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'api/v1/user/reset-password',
  async ({ password, confirmPassword, userId }, { rejectWithValue }) => {
    // const { userId } = params;
    // const { userId } = store.getState().resetPassword;

    const clientData = JSON.stringify({ password, confirmPassword });

    try {
      // Backend Urls
      const localUrl = `http://localhost:1001/api/v1/user/reset-password/${userId}`;
      const deployedUrl = `https://ecommerce-tech-titans.herokuapp.com/api/v1/user/reset-password/${userId}`;

      const response = await fetch(deployedUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: clientData,
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        // Handle error response
        const errorData = await response.json();
        toast.error(errorData.message);
        return rejectWithValue(errorData.message);
      }
    } catch (error) {
      toast.error('An error occurred while resetting the password.');
      return rejectWithValue('An error occurred while resetting the password.');
    }
  },
);

// Create a slice for the user

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendResetLink.pending, (state) => {
        state.status = 'loading.....';
      })
      .addCase(sendResetLink.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(sendResetLink.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading.....';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUserCredentials } = resetPasswordSlice.actions;

export const resetPasswordReducer = resetPasswordSlice.reducer;

export default resetPasswordReducer;

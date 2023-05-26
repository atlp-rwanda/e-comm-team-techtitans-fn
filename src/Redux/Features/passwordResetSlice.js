import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const initialState = { value: 0 };

// Create a thunk for fetching data from the API
export const sendResetLink = createAsyncThunk(
  'api/v1/user/forgot-password',
  async (user, { rejectWithValue }) => {
    try {
      // const response = await axios.patch(
      //   `http://localhost:1001/api/v1/user/forgot-password`,
      //   user,
      // );
      const response = await axios.patch(
        `https://ecommerce-tech-titans.herokuapp.com/api/v1/user/forgot-password`,
        user,
      );

      const token = response.data.token;
      const decodedToken = jwt_decode(token);

      const stringifiedToken = JSON.stringify(token);
      const stringifiedId = JSON.stringify(decodedToken.userId);

      localStorage.setItem('token', stringifiedToken);
      localStorage.setItem('userId', stringifiedId);
    } catch (error) {
      console.log('reset password error:', error);
      alert(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'api/v1/user/reset-password',
  async ({ password, confirmPassword }, { rejectWithValue }) => {
    const id = JSON.parse(localStorage.getItem('userId'));
    const clientData = JSON.stringify({ password, confirmPassword });

    try {
      const response = await fetch(
        // `http://localhost:1001/api/v1/user/reset-password/${id}`,
        `https://ecommerce-tech-titans.herokuapp.com/api/v1/user/reset-password/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: clientData,
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log('✅ response data:', data);
        // You can return the data or perform any necessary actions here
        return data;
      } else {
        // Handle error response
        const errorData = await response.json();
        console.log('❌ Reset password error:', errorData);
        alert(errorData.message);
        return rejectWithValue(errorData.message);
      }
    } catch (error) {
      console.log('❌ Reset password error:', error);
      alert('An error occurred while resetting the password.');
      return rejectWithValue('An error occurred while resetting the password.');
    }
  },
);

// Create a slice for the user

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(sendResetLink.pending, (state) => {
        state.status = 'loading.....';
      })
      .addCase(sendResetLink.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'success';
      })
      .addCase(sendResetLink.rejected, (state, action) => {
        state.status = 'failed';
        state.Error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading.....';
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = 'success';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.Error = action.payload;
      });
  },
});

export const { actions: resetPasswordActions, reducer: resetPasswordReducer } =
  resetPasswordSlice;

export default resetPasswordSlice.reducer;

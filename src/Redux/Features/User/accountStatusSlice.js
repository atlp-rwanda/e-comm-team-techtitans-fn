import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { BASE_URL } from '../../../utils/apiUtilis';

export const setAccountStatus = createAsyncThunk(
  'api/v1/user/updateAccountStatus',
  async ({ id, accountStatus, reason }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('token');
      const configs = {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      };
      const response = await axios.put(
        `${BASE_URL}/api/v1/user/updateAccountStatus/${id}`,
        { accountStatus, reason }, // data passed into the backend's req.body
        configs,
      );
      if (response.statusCode === 409) {
        const status = accountStatus === 'active' ? 'activated' : 'deactivated';
        message.error(`User is already ${status}`);
      }

      return {
        data: response.data.data,
      };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

const setAccountStatusSlice = createSlice({
  name: 'setAccountStatus',
  initialState: {
    setAccountStatus: null,
    status: null,
    error: null,
  },
  extraReducers: {
    [setAccountStatus.pending]: (state) => {
      state.status = 'loading.....';
    },
    [setAccountStatus.fulfilled]: (state, action) => {
      state.setAccountStatus = action.payload;
      state.status = 'success';
    },
    [setAccountStatus.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const setAccountStatusReducer = setAccountStatusSlice.reducer;
export default setAccountStatusReducer;

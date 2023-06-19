import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../utils/apiUtilis';

export const addRoles = createAsyncThunk(
  'api/v1/user/role',
  async ({ id, email, roleId }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('token');
      const configs = {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      };
      const response = await axios.put(
        `${BASE_URL}/api/v1/user/role/${id}`,
        { email, roleId },
        configs,
      );

      return {
        data: response.data.data,
      };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

const setRoleSlice = createSlice({
  name: 'setRole',
  initialState: {
    setRole: null,
    status: null,
    error: null,
  },
  extraReducers: {
    [addRoles.pending]: (state) => {
      state.status = 'loading.....';
    },
    [addRoles.fulfilled]: (state, action) => {
      state.setRole = action.payload;
      state.status = 'success';
    },
    [addRoles.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export default setRoleSlice.reducer;

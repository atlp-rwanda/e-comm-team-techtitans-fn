import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addRoles = createAsyncThunk(
  "api/v1/user/role",
  async ({ id, email, roleId }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("token");
      const configs = {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      const { BASE_URL } = process.env;
      console.log("config", configs);
      const response = await axios.put(
        `${BASE_URL}/user/role/${id}`,
        { email, roleId },
        configs
      );
      console.log("response data:", response.data);

      return {
        data: response.data.data,
      };
    } catch (error) {
      console.log("Fetch users error:", error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const setRoleSlice = createSlice({
  name: "setRole",
  initialState: {
    setRole: null,
    status: null,
    error: null,
  },
  extraReducers: {
    [addRoles.pending]: (state) => {
      state.status = "loading.....";
    },
    [addRoles.fulfilled]: (state, action) => {
      state.setRole = action.payload;
      state.status = "success";
    },
    [addRoles.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export default setRoleSlice.reducer;

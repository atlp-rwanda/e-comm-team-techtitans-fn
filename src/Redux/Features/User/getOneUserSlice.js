import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

const initialState = {
  oneuser: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const resetToInitialState = {
  oneuser: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};




export const getUser = createAsyncThunk(
  "getUser-thunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/user/profile/user/${id}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword-thunk",
  async ({ old_password,new_password,confirm_password, id}, { rejectWithValue }) => {
    try {
      const localUrl=`${BASE_URL}/api/v1/user/editpassword/${id}`
      const clientData = JSON.stringify({  old_password,new_password,confirm_password });
      const response = await fetch(localUrl, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: clientData,
      })
      
       
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
        
      }
      return data;
    } catch (error) {
      
      return rejectWithValue(error);
    }
  }
);

 const singleUserSlice = createSlice({
  name: "oneuser",
  initialState,
  reducers: {
    reset: () => resetToInitialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.oneuser = [];
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.oneuser = payload;
        state.message = "";
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
        state.oneuser = [];
      })
      
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload;
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
      });
  },
});

//export user slice

export const { reset } = singleUserSlice.actions;

export const singleUserReducer = singleUserSlice.reducer;

export default singleUserSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis"


export const GetOneNotification = createAsyncThunk(
    `/api/v1/notification/vendor/all/:id`,
    async (
       id
     
    ) => {
      try {
        const token = localStorage.getItem('token');
        console.log('the id is .....',id)
        const config = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
       
        const response = await axios.get(
          ` ${BASE_URL}/api/v1/notification/vendor/all/${id}`,
       // data passed into the backend's req.body
         config,
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    },
  );

  const GetOneNotificationSlice = createSlice({
    name: 'oneNotification',
    initialState: {
      oneNotification: null,
      status: null,
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(GetOneNotification.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(GetOneNotification.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.oneNotification = action.payload;
        })
        .addCase(GetOneNotification.rejected, (state, action) => {
          state.error = "failed";
          state.status = "failed";
          state.oneNotification= action.payload;
        });
    },
  });
  
  export default GetOneNotificationSlice.reducer;
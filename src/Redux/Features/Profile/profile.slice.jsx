/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const UpdateProfile = createAsyncThunk(
  "api/v1/user/profile",
  async ({profile}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
                headers: {
                    'Authorization': "Bearer "+ token
                }
            };

            const response = await axios.put(`https://ecommerce-tech-titans.herokuapp.com/api/v1/user/profile`, profile,config);
            console.log('response data:', response.data);
            return response.data;
        } catch (error) {
            console.log('edit profile error:', error.response.data.message);

            return rejectWithValue(error.response.data.message);
            // throw error;
        }
    }
);
  
// eslint-disable-next-line react-refresh/only-export-components
const ProfileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: null,
        status: null,
        error: null
    },
    reducers: {},
extraReducers: (builder) => {
builder
.addCase(UpdateProfile.pending, (state) => {
state.status = "loading";
state.error = null;
})
.addCase(UpdateProfile.fulfilled, (state, action) => {
state.status = "succeeded";
state.profile = action.payload;
})
.addCase(UpdateProfile.rejected, (state, action) => {
state.status = "failed";
state.error = action.payload;
})
},
});

export default ProfileSlice.reducer
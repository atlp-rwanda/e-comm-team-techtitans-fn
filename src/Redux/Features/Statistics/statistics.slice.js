import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

export const getStats = createAsyncThunk(
  "getstats/check-stats",
  async ({ startDate, endDate }, { rejectWithValue }) => {

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response = await axios.get(
        `${BASE_URL}/api/v1/stats/check-stats?startDate=${startDate}&endDate=${endDate}`,
      
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getStatsSlice = createSlice({
  name: "getstats",
  initialState: {
    getstats: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStats.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.getstats = action.payload;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default getStatsSlice.reducer;





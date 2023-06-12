import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

let initialState = {
  message: "",
  myMessages: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const allMessage = createAsyncThunk(
  "allMessage-thunk",
  async (payload) => {
    try {
      const data = {
        text: payload.message,
        name: payload.myName,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/message/group/send`,
        data
      );
      return response;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);

const getAllMessages = createAsyncThunk("getAllMessage-thunk", async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/message/group/receive`
    );
    return response;
  } catch (error) {
    console.log("error", error);
  }
});

const allmessages = createSlice({
  name: "allMessage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(allMessage.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getAllMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myMessages = action.payload;
      })
      .addCase(getAllMessages.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export { allMessage, getAllMessages };

export default allmessages.reducer;

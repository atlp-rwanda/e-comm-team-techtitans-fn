import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../utils/apiUtilis";

const initialState = {
  userToChat: null,
  data: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const storedToken = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${storedToken}`,
  },
};
const userToChat = createAsyncThunk("userToChat-thunk", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/chats/all`, config);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
});

const chat = createAsyncThunk("chat-thunk", async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/user/profile/users`,
      config
    );
    return response.data;
  } catch (error) {
    console.log("error:", error);
  }
});

const chatSlice = createSlice({
  name: "chat-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(chat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(chat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(chat.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(userToChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userToChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userToChat = action.payload;
      })
      .addCase(userToChat.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export { chat, userToChat };

export default chatSlice.reducer;

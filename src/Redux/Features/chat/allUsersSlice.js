import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

let initialState = {
  allUsers: null,
  allChats: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const storedToken = localStorage.getItem("token");

// const config = {
//   headers: {
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZkZmE4MWZjLTJmY2EtNDE4Yi1iZjg0LTg3NzA4NTEwMjE1MCIsImZ1bGxuYW1lIjoicmljaGFyZCIsImVtYWlsIjoiaXNoaW13ZXJpY2hhcmQyNkBnbWFpbC5jb20iLCJyb2xlSWQiOjEsImlhdCI6MTY4NjExMzkzNywiZXhwIjoxNzE3NjcxNTM3fQ.BS0UQarWUh_MjAbclNaSwBuXa_a1HODb0A9_4hqOjcA",
//   },
// };
const config = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0YmMwZTZlLTQxZDAtNGJiYi1iMzY0LWE4OGNmZGU5ODk2ZCIsImZ1bGxuYW1lIjoicmljaGFyZCIsImVtYWlsIjoiaXNoaW13ZXJpY2hhcmQyNkBnbWFpbC5jb20iLCJyb2xlSWQiOjEsImlhdCI6MTY4NjI5NjQyNSwiZXhwIjoxNzE3ODU0MDI1fQ.XcUyZWPFskNnBSxPG6SHq4QXRwIUqNG8sHuOiGsv9E0",
  },
};

const secondConfig = {
  headers: {
    Authorization: `Bearer ${storedToken}`,
  },
};

const allMyChats = createAsyncThunk("allchats-thunk", async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/chats/all`,
      secondConfig
    );
    return response.data;
  } catch (error) {
    console.log("error:", error);
  }
});

const users = createAsyncThunk("allUser-thunk", async () => {
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

const allUsers = createSlice({
  name: "allusers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(users.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(users.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allUsers = action.payload;
      })
      .addCase(users.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(allMyChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allMyChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allChats = action.payload;
      })
      .addCase(allMyChats.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export { users, allMyChats };

export default allUsers.reducer;

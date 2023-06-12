// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { BASE_URL } from "../../../utils/apiUtilis";

// let initialState = {
//   message: "",
//   message_create: "",
//   data: null,
//   allChat: null,
//   isLoading: false,
//   isError: false,
//   isSuccess: false,
// };

// const savedToken = localStorage.getItem("token");
// const config = {
//   Headers: {
//     Authorization: `Bearer ${savedToken}`,
//   },
// };

// const myMessages = createAsyncThunk("myMessage-thunk", async (chatId) => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/api/v1/message/${chatId}`,
//       config
//     );
//     return response.data;
//   } catch (error) {
//     console.log("error", error);
//   }
// });

// const createUserChat = createAsyncThunk(
//   "createUserChat-thunk",
//   async (chatingId) => {
//     try {
//       const savedToken = localStorage.getItem("token");
//       const config = {
//         headers: {
//           Authorization: `Bearer ${savedToken}`,
//         },
//       };

//       const response = await axios.get(
//         `https://ecommerce-tech-titans.herokuapp.com/api/v1/chats/create/${chatingId}`,
//         config
//       );
//       return response.data;
//     } catch (error) {
//       console.log("error", error);
//       throw error; // Re-throw the error to be handled by the rejection case
//     }
//   }
// );

// const allChats = createAsyncThunk("allMyChats-thunk", async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/v1/chats/all`, config);
//     return response.data;
//   } catch (error) {
//     console.log("error", error);
//   }
// });

// const sendMessage = createAsyncThunk(
//   "sendMessage-thunk",
//   async ({ content, chatId }) => { // Wrap parameters in curly braces
//     const sendConf = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${savedToken}`,
//       },
//       data: { content },
//     };

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/api/v1/message/send/${chatId}`,
//         sendConf.data, // Pass the data property from sendConf
//         { headers: sendConf.headers } // Pass the headers property from sendConf
//       );
//       return response;
//     } catch (error) {
//       console.log("error:", error);
//       throw error; // Re-throw the error to be handled by the rejection case
//     }
//   }
// );

// let messageSlice = createSlice({
//   name: "message-slice",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(myMessages.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(myMessages.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.data = action.payload;
//       })
//       .addCase(myMessages.rejected, (state) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//       })
//       .addCase(sendMessage.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(sendMessage.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.message = action.payload;
//       })
//       .addCase(sendMessage.rejected, (state) => {
//         state.isLoading = false;
//         state.isError = true;
//       })
//       .addCase(createUserChat.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createUserChat.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.message_create = action.payload;
//       })
//       .addCase(createUserChat.rejected, (state) => {
//         state.isLoading = false;
//         state.isError = true;
//       });
//   },
// });
// export { myMessages, sendMessage, createUserChat };

// export default messageSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

let initialState = {
  message: "",
  message_create: "",
  data: null,
  allChat: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const savedToken = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${savedToken}`,
  },
};

const myMessages = createAsyncThunk("myMessage-thunk", async (chatId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/message/${chatId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log("myMessages error:", error);
    throw error; // Re-throw the error to be handled by the rejection case
  }
});

const createUserChat = createAsyncThunk(
  "createUserChat-thunk",
  async (chatingId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/chats/create/${chatingId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log("createUserChat error:", error);
      throw error; // Re-throw the error to be handled by the rejection case
    }
  }
);

const allChats = createAsyncThunk("allMyChats-thunk", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/chats/all`, config);
    return response.data;
  } catch (error) {
    console.log("allChats error:", error);
    throw error; // Re-throw the error to be handled by the rejection case
  }
});

const sendMessage = createAsyncThunk(
  "sendMessage-thunk",
  async ({ content, chatId }) => { // Wrap parameters in curly braces
    const sendConf = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${savedToken}`,
      },
      data: { content },
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/message/send/${chatId}`,
        sendConf.data, // Pass the data property from sendConf
        { headers: sendConf.headers } // Pass the headers property from sendConf
      );
      return response;
    } catch (error) {
      console.log("sendMessage error:", error);
      throw error; // Re-throw the error to be handled by the rejection case
    }
  }
);

let messageSlice = createSlice({
  name: "message-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(myMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(myMessages.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createUserChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message_create = action.payload;
      })
      .addCase(createUserChat.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export { myMessages, sendMessage, createUserChat, allChats };

export default messageSlice.reducer;

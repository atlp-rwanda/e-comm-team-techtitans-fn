// import { createSlice } from "@reduxjs/toolkit";

// let initialState = {
//   chatId: "",
//   // chatId: "ac196974-4188-4f37-863c-d322e677e73d",
//   chatingUser: null,
//   isLoading: false,
//   isError: false,
//   isSuccess: false,
// };

// const chatingUserslice = createSlice({
//   name: "chatingUser",
//   initialState,
//   reducers: {
//     setChatingUser: (state, action) => {
//       state.chatingUser = action.payload;
//     },
//     setChatId: (state, action) => {
//       state.chatId = action.payload;
//     },
//   },
// });

// export const {
//   setChatingUser: setChatingUserchatingUser,
//   setChatId: setChatIdchatingUser,
// } = chatingUserslice.actions;

// export const chatingUserReducer = chatingUserslice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: "",
  chatingUser: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const chatingUserslice = createSlice({
  name: "chatingUser",
  initialState,
  reducers: {
    setChatingUser: (state, action) => {
      state.chatingUser = action.payload;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
  },
  serialize: {
    // Custom serialization for specific fields
    chatingUser: (value) => {
      // Serialize only necessary information from value
      return value?.username;
    },
    // Add more serialization functions if needed
  },
  deserialize: {
    // Custom deserialization for specific fields
    chatingUser: (value) => {
      // Deserialize and reconstruct the value if necessary
      return { username: value };
    },
    // Add more deserialization functions if needed
  },
});

export const {
  setChatingUser: setChatingUserchatingUser,
  setChatId: setChatIdchatingUser,
} = chatingUserslice.actions;

export const chatingUserReducer = chatingUserslice.reducer;

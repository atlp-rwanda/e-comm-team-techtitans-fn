import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async ({ otp, setMessage, setGo, email }) => {
    try {
      //https://jsonplaceholder.typicode.com/users
      //https://ecommerce-tech-titans.herokuapp.com/api/v1/user/login/verifyotp
      const response = await fetch(
        "https://ecommerce-tech-titans.herokuapp.com/api/v1/user/login/verifyotp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );
      if (!response.ok) {
        setMessage("invalid otp");
        throw new Error("Failed to fetch users.");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("all data", data);
      setMessage(data.message);
      setGo(true);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;

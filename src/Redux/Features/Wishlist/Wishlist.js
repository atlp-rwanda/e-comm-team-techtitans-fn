import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  isLoggedIn: false,
  isAddingItem: false,
};

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/api/v1/wishlist/${token}`,
        config
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createWishlistItem = createAsyncThunk(
  "wishlist/createWishlistItem",
  async (product, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.info("please login to add item to wishlist");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/wishlist/`,
        product,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeWishlistItem = createAsyncThunk(
  "wishlist/removeWishlistItem",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error(
          "No token provided. You must be logged in to remove from the wishlist."
        );
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${BASE_URL}/api/v1/wishlist/${productId}`, config);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const WishlistSlice = createSlice({
  name: "Wishlist",
  initialState,
  reducers: {
    toggleLogin: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createWishlistItem.pending, (state) => {
        state.error = null;
        state.isAddingItem = true;
      })
      .addCase(createWishlistItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isAddingItem = false;
      })
      .addCase(createWishlistItem.rejected, (state, action) => {
        state.error = action.payload;
        state.isAddingItem = false;
        toast.error(action.payload.message); // Display error message using toast
      })
      .addCase(removeWishlistItem.pending, (state) => {
        state.error = null;
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.productId !== action.payload
        );
      })
      .addCase(removeWishlistItem.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload.message); // Display error message using toast
      });
  },
});

export const { toggleLogin } = WishlistSlice.actions;

export default WishlistSlice.reducer;

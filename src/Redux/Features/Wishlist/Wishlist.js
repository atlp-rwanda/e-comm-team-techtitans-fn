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
        toast.info("Please login to add an item to the wishlist");
        return;
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
  async (product_id, { rejectWithValue }) => {
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
        data: {
          product_id: product_id, // Pass the product_id in the request body
        },
      };
      await axios.delete(`${BASE_URL}/api/v1/wishList`, config);

      // Show toast notification
      toast.success("Product removed successfully");

      return product_id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const WishlistSlice = createSlice({
  name: "wishlist",
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
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.message = "No wishlist found at the moment.";
      })
      .addCase(createWishlistItem.pending, (state) => {
        state.isAddingItem = true;
        state.error = null;
      })
      .addCase(createWishlistItem.fulfilled, (state, action) => {
        state.isAddingItem = false;
        state.items.push(action.payload);
        toast.success("Product added successfully"); // Display success message using toast
        state.error = null;
      })
      .addCase(createWishlistItem.rejected, (state, action) => {
        state.isAddingItem = false;
        state.error = action.payload.message;
        toast.error(action.payload.message); // Display error message using toast
      })
      .addCase(removeWishlistItem.pending, (state) => {
        state.isAddingItem = true;
        state.error = null;
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.isAddingItem = false;
        state.items = state.items.filter(
          (item) => item.product_id !== action.payload
        );
        state.error = null;
      })
      .addCase(removeWishlistItem.rejected, (state, action) => {
        state.isAddingItem = false;
        state.error = action.payload.message;
        toast.error(action.payload.message); // Display error message using toast
      });
  },
});

export const { toggleLogin } = WishlistSlice.actions;

export default WishlistSlice.reducer;

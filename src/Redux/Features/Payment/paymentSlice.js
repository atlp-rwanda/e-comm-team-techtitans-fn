import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../utils/apiUtilis';

export const shippingDetails = createAsyncThunk(
  'api/v1/checkout',
  async (
    { receiverName, address, phoneNumber, shippingMethod, orderToken },
    { rejectWithValue },
  ) => {
    try {
      const authToken = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      };
      const response = await axios.post(
        ` ${BASE_URL}/api/v1/checkout`,
        { receiverName, address, phoneNumber, shippingMethod, orderToken },
        config,
      );

      return response.data;
    } catch (error) {
      toast.error(error);
      return rejectWithValue(error.response.data.message);
    }
  },
);
export const paymentDetails = createAsyncThunk(
  'api/v1/payment',
  async ({ cvc, cardNumber }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      };

      const payToken = JSON.parse(localStorage.getItem('payToken'));

      const response = await axios.post(
        `${BASE_URL}/api/v1/payment/${payToken}`,
        { cvc, cardNumber },
        config,
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const buyNowThunk = createAsyncThunk(
  'api/v1/order/buy-now',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      };

      const response = await axios.post(
        ` ${BASE_URL}/api/v1/order`,
        { productId, quantity },
        config,
      );
      return response.data;
    } catch (error) {
      if (
        error.response.data.message ===
        '🚫 Your already order this product you need paid inorder to order it Again!'
      ) {
        toast.warning('This product is already among your orders');
      } else {
        toast.warning(error.response.data.message);
      }
      return rejectWithValue(error.response.data.message);
    }
  },
);

const PaymentSlice = createSlice({
  name: 'payment',
  initialState: {
    payment: null,
    status: null,
    error: null,
  },
  extraReducers: {
    [shippingDetails.pending]: (state) => {
      state.status = 'loading.....';
    },
    [shippingDetails.fulfilled]: (state, action) => {
      state.payment = action.payload;
      state.status = 'success';
    },
    [shippingDetails.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    [paymentDetails.pending]: (state) => {
      state.status = 'loading.....';
    },
    [paymentDetails.fulfilled]: (state, action) => {
      state.payment = action.payload;
      state.status = 'success';
    },
    [paymentDetails.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    [buyNowThunk.pending]: (state) => {
      state.status = 'loading.....';
    },
    [buyNowThunk.fulfilled]: (state, action) => {
      state.payment = action.payload;
      state.status = 'success';
    },
    [buyNowThunk.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const PaymentReducer = PaymentSlice.reducer;
export default PaymentReducer;

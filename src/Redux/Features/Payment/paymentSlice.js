import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../utils/apiUtilis';

export const getOrders = createAsyncThunk(
  'api/v1/order/list-orders',
  async (_, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      };
      const response = await axios.get(
        ` ${BASE_URL}/api/v1/order/list-orders`,
        config,
      );
      console.log('🛒 Orders response', response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);
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
      console.log('🛒 Shipping details response', response);
      const orderProductsToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJ0UHJvZHVjdHMiOlt7ImlkIjoiMTY4NDQ2MDctZGViYS00MDk4LWFmM2QtZmFlZTkwNzQxNjBhIiwibmFtZSI6IkJyb3duIExlYXRoZXIgQmFnIiwicHJpY2UiOjE1MCwidG90YWwiOjc1MCwiaW1hZ2VzIjpbImh0dHBzOi8vbS5lY29ub21pY3RpbWVzLmNvbS90aHVtYi9tc2lkLTk3MjM5NzIzLHdpZHRoLTE1MDAsaGVpZ2h0LTE1MDAscmVzaXplbW9kZS00LGltZ3NpemUtMTYxNDYyL3Rha2UtYS1sb29rLWF0LTUtYmVzdC1sZWF0aGVyLWJhZ3MtZm9yLW1lbi1pbi1pbmRpYS5qcGciLCJodHRwczovL20ubWVkaWEtYW1hem9uLmNvbS9pbWFnZXMvSS84MTVMK21jSGdmTC5qcGciLCJodHRwczovLzQuaW1pbWcuY29tL2RhdGE0L0FPL0JCL01ZLTgwMDg2NjYvZ29hdC1sZWF0aGVyLWJhZ3MtNTAweDUwMC5qcGciLCJodHRwczovL2kuZXRzeXN0YXRpYy5jb20vMjgxMDQ4NDUvci9pbC9mNzEwMzkvMzk1NTU0NjgzMy9pbF9mdWxseGZ1bGwuMzk1NTU0NjgzM18zZ3B5LmpwZyJdLCJxdWFudGl0eSI6NX0seyJpZCI6ImRhYTdlYTUyLTcxZTctNDEyZC1iMjUwLThhMGNmM2RkODI2NyIsIm5hbWUiOiJpUGFkIiwicHJpY2UiOjIwMDAsInRvdGFsIjo0MDAwLCJpbWFnZXMiOlsiaHR0cHM6Ly9zLnlpbWcuY29tL3V1L2FwaS9yZXMvMS4yLzU4TV9xbG5QWER5aTQ2Tkk3UnRFdWctLX5CL2FEMHhNakF3TzNjOU1UZ3dNRHRoY0hCcFpEMTVkR0ZqYUhsdmJnLS0vaHR0cHM6Ly9tZWRpYS1tYnN0LXB1Yi11ZTEuczMuYW1hem9uYXdzLmNvbS9jcmVhdHItdXBsb2FkZWQtaW1hZ2VzLzIwMjAtMTAvNTNhYWE3NDAtMTMwMS0xMWViLWI1ZmUtNjA4ZmQwODMzOWI5LmNmLmpwZyIsImh0dHBzOi8vaW1hZ2VzLm1hY3J1bW9ycy5jb20vdC9MT3hFQmF6c0djM1hIekxncThpX25IX0R2ZVE9LzE2MDB4L2FydGljbGUtbmV3LzIwMTkvMDMvaXBhZC1haXItMjAyMi1yb3VuZHVwLWhlYWRlci5wbmciLCJodHRwczovL3MueWltZy5jb20vdXUvYXBpL3Jlcy8xLjIvUjJZbXhvSW9nQlFOUVNaZ1RzZTBjUS0tfkIvYUQweE16TXpPM2M5TWpBd01EdGhjSEJwWkQxNWRHRmphSGx2YmctLS9odHRwczovL21lZGlhLW1ic3QtcHViLXVlMS5zMy5hbWF6b25hd3MuY29tL2NyZWF0ci11cGxvYWRlZC1pbWFnZXMvMjAyMi0wMy9kZTg0NDM4MC1hNDdkLTExZWMtYjZiZS05ZGQyZmY3NzVjNGUuY2YuanBnIiwiaHR0cHM6Ly93d3cuYXBwbGUuY29tL25ld3Nyb29tL2ltYWdlcy9wcm9kdWN0L29zL2lwYWRvcy9BcHBsZV9pUGFkT1NfVG9kYXktVmlldy1EYXJrLU1vZGVfMDYwMzE5X2JpZy5qcGcubGFyZ2UuanBnIl0sInF1YW50aXR5IjoyfV0sInRvdGFsX3ByaWNlIjo0NzUwLCJpYXQiOjE2ODY4MzI3NTMsImV4cCI6MTcxODM5MDM1M30.sgsZx0Tb1OvI7KXyc3AeUMDCOmYtM9V7I42DijfVaS8';

      localStorage.setItem('orderProducts', JSON.stringify(orderProductsToken));

      return response.data;
    } catch (error) {
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

      console.log('THE PAYYYY TOKEENNn', payToken);

      const response = await axios.post(
        `${BASE_URL}/api/v1/payment/${payToken}`,
        { cvc, cardNumber },
        config,
      );
      console.log('123');
      console.log('🛒 payment details response', response);
      return response.data;
    } catch (error) {
      console.log('❌ 1.0', error);
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
      console.log('🛒 buy now response (bn)', response);
      return response.data;
    } catch (error) {
      console.log('❌ 2.0', error);
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
    [getOrders.pending]: (state) => {
      state.status = 'loading.....';
    },
    [getOrders.fulfilled]: (state, action) => {
      state.payment = action.payload;
      state.status = 'success';
    },
    [getOrders.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
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

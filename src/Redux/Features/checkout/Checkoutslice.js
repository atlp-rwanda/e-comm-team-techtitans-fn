import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../utils/apiUtilis";

export const handleShippingDetails = createAsyncThunk(
  "checkout/handleShippingDetails",
  async (data, { dispatch }) => {
    console.log(data);
    if (data.names === "") {
      toast.warning("Please enter the recipient name");
      return;
    } else if (data.shippingAddress === "") {
      toast.warning("Please enter the shipping address");
      return;
    } else if (data.telephoneNumber === "") {
      toast.warning("Please enter the phone number");
      return;
    } else if (data.telephoneNumber) {
      toast.warning("Please enter a valid phone number");
      return;
    } else if (data.shippingMethod === "") {
      toast.warning("Please select a shipping method");
      return;
    }

    dispatch(setLoading(true));

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/checkout`, data);
      localStorage.setItem("payToken", response.data.payToken);

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoading(false)); //remove
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    isLoading: false,
    isCancelPaymentLoading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCancelPaymentLoading: (state, action) => {
      state.isCancelPaymentLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleShippingDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleShippingDetails.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(handleShippingDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLoading, setCancelPaymentLoading, setError } =
  checkoutSlice.actions;

export const cancelPayment = () => (dispatch) => {
  dispatch(setCancelPaymentLoading(true));

  setTimeout(() => {
    dispatch(setCancelPaymentLoading(false));
  }, 2000);
};

export default checkoutSlice.reducer;
import { IOrder } from '@/interfaces/models/IOrder'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface InitialState {
  order: IOrder;
  isLoading: boolean;
  isError: boolean;
}

interface SendInvoiceProps {
  recipient: string;
  subject: string;
  invoiceImage: string;
}

const initialState: InitialState = {
  order: {
    rowNo: -1,
    customer: '',
    timestamp: '',
    status: '',
    email: '',
    phoneNumber: '',
    address: '',
    socialMedia: '',
    purchasedProducts: [],
    shippingExpedition: '',
    shippingFee: -1
  },
  isLoading: true,
  isError: false,
};

export const order = createSlice({
  name: 'order',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(sendInvoice.pending, (prevState) => ({
      ...prevState,
      isLoading: true
    }))
    .addCase(sendInvoice.fulfilled, (prevState, action) => {
      return {
        ...prevState,
        isLoading: false
      };
    })
    .addCase(sendInvoice.rejected, (prevState) => ({
      ...prevState,
      isLoading: false,
      isError: true
    }));
  }
})

export const sendInvoice = createAsyncThunk<Array<IOrder>, SendInvoiceProps>('order/sendInvoice', async ({ subject, recipient, invoiceImage }) => {
  const request = await fetch(`/api/invoices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subject,
      recipient,
      invoiceImage
    })
  });

  const response = await request.json();

  return response;
});

// Action creators are generated for each case reducer function
export const {  } = order.actions

export default order.reducer
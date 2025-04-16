import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IOrder } from '@/interfaces/models/IOrder'

interface InitialState {
  orders: Array<IOrder>;
  isLoading: boolean;
  isError: boolean;
}

interface FetchOrdersProps {
  spreadsheetID: string;
  eventType: string;
}

interface UpdateOrderStatusProps {
  spreadsheetID: string;
  rowNo: number;
  status: string;
}

interface UpdateOrderStatusReturns {
  rowNo: number;
  status: string;
}

const initialState: InitialState = {
  orders: [],
  isLoading: false,
  isError: false,
};

export const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (prevState) => ({
      ...prevState,
      isLoading: true
    }))
    .addCase(fetchOrders.fulfilled, (prevState, action) => {
      return {
        ...prevState,
        isLoading: false,
        orders: action.payload
      };
    })
    .addCase(fetchOrders.rejected, (prevState) => ({
      ...prevState,
      isError: true
    }));


    builder.addCase(updateOrderStatus.pending, (prevState) => ({
      ...prevState
    }))
    .addCase(updateOrderStatus.fulfilled, (prevState, action) => {
      const updatedOrderIndex = prevState.orders.findIndex(order => order.rowNo === action.payload.rowNo);

      return {
        ...prevState,
        orders: [
          ...prevState.orders.slice(0, updatedOrderIndex),
          {
            ...prevState.orders[updatedOrderIndex],
            status: action.payload.status
          },
          ...prevState.orders.slice(updatedOrderIndex + 1)
        ]
      }
    })
    .addCase(updateOrderStatus.rejected, (prevState) => ({
      ...prevState,
      isError: true
    }));
  }
})

export const fetchOrders = createAsyncThunk<Array<IOrder>, FetchOrdersProps>('orders/fetchOrders', async ({ spreadsheetID, eventType }) => {
  const request = await fetch(`/api/orders/${spreadsheetID}?eventType=${eventType}`);
  const response = await request.json();

  return response;
})

export const updateOrderStatus = createAsyncThunk<UpdateOrderStatusReturns, UpdateOrderStatusProps>('orders/updateStatus', async ({ spreadsheetID, rowNo, status }, { rejectWithValue }) => {
  try {
    const request = await fetch(`/api/orders/${spreadsheetID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rowNo,
        status,
      })
    });

    const response = await request.json() as UpdateOrderStatusReturns;
    return response;
  } catch {
    return rejectWithValue('Failed');
  }
})

// Action creators are generated for each case reducer function
export const {  } = orders.actions

export default orders.reducer
import { IOrder } from '@/interfaces/models/IOrder'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OrderSortProps {
  by: string;
  direction: string;
}

interface OrderFilterAndSortProps {
  filters: Array<string>;
  sort: OrderSortProps;
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

interface InitialState extends OrderFilterAndSortProps {
  orders: Array<IOrder>;
  shownOrders: Array<IOrder>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: InitialState = {
  orders: [],
  shownOrders: [],
  filters: [],
  sort: {
    by: '',
    direction: ''
  },
  isLoading: true,
  isError: false,
};

const sortOrders = (orders: Array<IOrder>, { by, direction }: OrderSortProps) => {
  orders = orders.sort((a, b) => {
    const temp = a;

    if (direction === 'descending') {
      a = b;
      b = temp;
    }

    let compareResult = 0;
    if (by === 'Timestamp') {
      compareResult = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    } else if (by === 'Name') {
      compareResult = a.customer.localeCompare(b.customer);
    } else if (by === 'Email') {
      compareResult = a.email.localeCompare(b.email);
    } else if (by === 'Phone Number') {
      compareResult = a.phoneNumber.localeCompare(b.phoneNumber);
    } else if (by === 'Purchased Items') {
      compareResult = a.purchasedProducts.length - b.purchasedProducts.length
    }

    return compareResult;
  });

  return orders;
}

export const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    applyFilterAndSort(state, action: PayloadAction<OrderFilterAndSortProps>) {
      state.isLoading = true;

      let orders = [...state.orders];
      if(action.payload.filters.length > 0) {
        orders = orders.filter(order => action.payload.filters.includes(order.status));
      }

      if(action.payload.sort.by !== '') {
        orders = sortOrders(orders, { ...action.payload.sort });
      }

      state.filters = action.payload.filters;
      state.sort = action.payload.sort;
      state.shownOrders = orders;
      
      state.isLoading = false;
    }
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
        orders: action.payload,
        shownOrders: action.payload
      };
    })
    .addCase(fetchOrders.rejected, (prevState) => ({
      ...prevState,
      isLoading: false,
      isError: true
    }));


    builder.addCase(updateOrderStatus.pending, (prevState) => ({
      ...prevState
    }))
    .addCase(updateOrderStatus.fulfilled, (prevState, action) => {
      const updatedOrderIndex = prevState.orders.findIndex(order => order.rowNo === action.meta.arg.rowNo);
      const updatedShownOrderIndex = prevState.shownOrders.findIndex(order => order.rowNo === action.meta.arg.rowNo);

      return {
        ...prevState,
        orders: [
          ...prevState.orders.slice(0, updatedOrderIndex),
          {
            ...prevState.orders[updatedOrderIndex],
            status: action.meta.arg.status
          },
          ...prevState.orders.slice(updatedOrderIndex + 1)
        ],
        shownOrders: [
          ...prevState.shownOrders.slice(0, updatedShownOrderIndex),
          {
            ...prevState.shownOrders[updatedShownOrderIndex],
            status: action.meta.arg.status
          },
          ...prevState.shownOrders.slice(updatedShownOrderIndex + 1)
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
  if(spreadsheetID === '') {
    return [];
  }

  const request = await fetch(`/api/orders/${spreadsheetID}?eventType=${eventType}`);
  const response = await request.json();

  return response;
})

export const updateOrderStatus = createAsyncThunk<void, UpdateOrderStatusProps>('orders/updateStatus', async ({ spreadsheetID, rowNo, status }, { rejectWithValue }) => {
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

    await request.json();
  } catch {
    return rejectWithValue('Failed');
  }
})

// Action creators are generated for each case reducer function
export const { applyFilterAndSort } = orders.actions

export default orders.reducer
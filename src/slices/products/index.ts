import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IProduct } from '@/interfaces/models/IProduct';

interface InitialState {
  products: Array<IProduct>;
  isLoading: boolean;
  isError: boolean;
}

interface FetchProductsProps {
  notionPageID: string;
}

const initialState: InitialState = {
  products: [],
  isLoading: true,
  isError: false,
};

export const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (prevState) => ({
      ...prevState,
      isLoading: true
    }))
    .addCase(fetchProducts.fulfilled, (prevState, action) => {
      return {
        ...prevState,
        isLoading: false,
        products: action.payload
      };
    })
    .addCase(fetchProducts.rejected, (prevState) => ({
      ...prevState,
      isLoading: false,
      isError: true
    }));
  }
})

export const fetchProducts = createAsyncThunk<Array<IProduct>, FetchProductsProps>('products/fetchProducts', async ({ notionPageID }) => {
  if(notionPageID === '') {
    return [];
  }

  const request = await fetch(`/api/products/${notionPageID}`);
  const response = await request.json();

  return response;
})

// Action creators are generated for each case reducer function
export const {  } = products.actions

export default products.reducer
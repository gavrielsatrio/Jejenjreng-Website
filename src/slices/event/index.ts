import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IEvent } from '@/interfaces/models/IEvent';

interface InitialState {
  event: IEvent;
  isLoading: boolean;
  isError: boolean;
}

interface FetchEventProps {
  notionPageID: string;
}

const initialState: InitialState = {
  event: {
    notionPageID: '',
    name: '',
    type: '',
    location: '',
    date: '',
    gFormLink: '',
    spreadsheetLink: '',
    orders: []
  },
  isLoading: true,
  isError: false,
};

export const event = createSlice({
  name: 'event',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvent.pending, (prevState) => ({
      ...prevState,
      isLoading: true
    }))
    .addCase(fetchEvent.fulfilled, (prevState, action) => {
      return {
        ...prevState,
        isLoading: false,
        event: action.payload
      };
    })
    .addCase(fetchEvent.rejected, (prevState) => ({
      ...prevState,
      isError: true
    }));
  }
})

export const fetchEvent = createAsyncThunk<IEvent, FetchEventProps>('events/fetchEvent', async ({ notionPageID }) => {
  const request = await fetch(`/api/events/${notionPageID}`);
  const response = await request.json() as IEvent;

  return response;
});

// Action creators are generated for each case reducer function
export const {  } = event.actions

export default event.reducer
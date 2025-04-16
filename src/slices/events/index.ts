import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IEvent } from '@/interfaces/models/IEvent';

interface InitialState {
  events: Array<IEvent>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: InitialState = {
  events: [],
  isLoading: true,
  isError: false,
};

export const events = createSlice({
  name: 'events',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (prevState) => ({
      ...prevState,
      isLoading: true
    }))
    .addCase(fetchEvents.fulfilled, (prevState, action) => ({
      ...prevState,
      isLoading: false,
      events: action.payload
    }))
    .addCase(fetchEvents.rejected, (prevState) => ({
      ...prevState,
      isError: true
    }));
  }
})

export const fetchEvents = createAsyncThunk<Array<IEvent>>('events/fetchEvents', async () => {
  const request = await fetch(`/api/events`);
  const response = await request.json() as Array<IEvent>;

  return response;
});

// Action creators are generated for each case reducer function
export const {  } = events.actions

export default events.reducer
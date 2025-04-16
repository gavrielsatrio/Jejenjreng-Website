import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IEvent } from '@/interfaces/models/IEvent';

interface InitialState {
  pastEvents: Array<IEvent>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: InitialState = {
  pastEvents: [],
  isLoading: true,
  isError: false,
};

export const pastEvents = createSlice({
  name: 'pastEvents',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPastEvents.pending, (prevState) => ({
      ...prevState,
      isLoading: true
    }))
    .addCase(fetchPastEvents.fulfilled, (prevState, action) => ({
      ...prevState,
      isLoading: false,
      pastEvents: action.payload
    }))
    .addCase(fetchPastEvents.rejected, (prevState) => ({
      ...prevState,
      isError: true
    }));
  }
})

export const fetchPastEvents = createAsyncThunk<Array<IEvent>>('events/fetchPastEvents', async () => {
  const request = await fetch(`/api/events/past`);
  const response = await request.json() as Array<IEvent>;

  return response;
});

// Action creators are generated for each case reducer function
export const {  } = pastEvents.actions

export default pastEvents.reducer
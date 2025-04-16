import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IEvent } from '@/interfaces/models/IEvent';

interface InitialState {
  upcomingEvents: Array<IEvent>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: InitialState = {
  upcomingEvents: [],
  isLoading: true,
  isError: false,
};

export const upcomingEvents = createSlice({
  name: 'upcomingEvents',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUpcomingEvents.pending, (prevState) => ({
      ...prevState,
      isLoading: true
    }))
    .addCase(fetchUpcomingEvents.fulfilled, (prevState, action) => ({
      ...prevState,
      isLoading: false,
      upcomingEvents: action.payload
    }))
    .addCase(fetchUpcomingEvents.rejected, (prevState) => ({
      ...prevState,
      isError: true
    }));
  }
})

export const fetchUpcomingEvents = createAsyncThunk<Array<IEvent>>('events/fetchUpcomingEvents', async () => {
  const request = await fetch(`/api/events/upcoming`);
  const response = await request.json() as Array<IEvent>;

  return response;
});

// Action creators are generated for each case reducer function
export const {  } = upcomingEvents.actions

export default upcomingEvents.reducer
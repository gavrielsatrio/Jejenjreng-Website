import { RootState } from "@/stores";

const getPastEvents = (state: RootState) => state.pastEvents.pastEvents;
const getIsError = (state: RootState) => state.pastEvents.isError;
const getIsLoading = (state: RootState) => state.pastEvents.isLoading;

export {
  getPastEvents,
  getIsError,
  getIsLoading
}
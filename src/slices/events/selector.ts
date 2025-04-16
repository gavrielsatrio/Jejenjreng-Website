import { RootState } from "@/stores";

const getEvents = (state: RootState) => state.events.events;
const getIsError = (state: RootState) => state.events.isError;
const getIsLoading = (state: RootState) => state.events.isLoading;

export {
  getEvents,
  getIsError,
  getIsLoading
}
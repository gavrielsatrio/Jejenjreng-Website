import { RootState } from "@/stores";

const getUpcomingEvents = (state: RootState) => state.upcomingEvents.upcomingEvents;
const getIsError = (state: RootState) => state.upcomingEvents.isError;
const getIsLoading = (state: RootState) => state.upcomingEvents.isLoading;

export {
  getUpcomingEvents,
  getIsError,
  getIsLoading
}
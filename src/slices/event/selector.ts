import { RootState } from "@/stores";
import { extractSpreadsheetID } from "@/utils/spreadsheets/ID";

const getEvent = (state: RootState) => state.event.event;
const getIsError = (state: RootState) => state.event.isError;
const getIsLoading = (state: RootState) => state.event.isLoading;
const getSpreadsheetID = (state: RootState) => extractSpreadsheetID(state.event.event.spreadsheetLink);

export {
  getEvent,
  getIsError,
  getIsLoading,
  getSpreadsheetID
}
import { IDate } from "@/interfaces/notions/property-types";
import dayjs from "dayjs";

function getDateRange(date: IDate, format: string): string {
  let result = '';
  
  if(date.start) {
    result += dayjs(date.start).format(format);
  }

  if(date.end) {
    result += ' - ' + dayjs(date.end).format(format);
  }

  return result;
}

export { getDateRange }
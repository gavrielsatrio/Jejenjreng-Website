import { IOrder } from "./IOrder";

export interface IEvent {
  notionPageID: string;
  name: string;
  type: string;
  location: string;
  date: string;
  gFormLink: string;
  spreadsheetLink: string;
  orders: Array<IOrder>;
}
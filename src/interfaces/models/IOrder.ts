import { IPurchasedProduct } from "./IPurchasedProduct";

export interface IOrder {
  rowNo: number;
  customer: string;
  timestamp: string;
  status: string;
  email: string;
  phoneNumber: string;
  address: string;
  socialMedia: string;
  purchasedProducts: Array<IPurchasedProduct>;
  preferedExpedition?: string;
}
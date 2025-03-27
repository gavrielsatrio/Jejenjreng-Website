import { IPurchasedProduct } from "./IPurchasedProduct";

export interface IOrder {
  name: string;
  timestamp: string;
  status: string;
  email: string;
  phoneNumber: string;
  address: string;
  socialMedia: string;
  purchasedProducts: Array<IPurchasedProduct>;
  preferedExpedition?: string;
}
import { IPurchasedProduct } from "./IPurchasedProduct";

export interface IInvoice {
  number: number;
  recipient: string;
  date: Date;
  purchasedProducts: Array<IPurchasedProduct>
}
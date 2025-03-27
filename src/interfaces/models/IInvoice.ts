import { IProduct } from "./IPurchasedProduct";

export interface IInvoice {
  number: number;
  recipient: string;
  date: Date;
  purchasedProducts: Array<IProduct>
}
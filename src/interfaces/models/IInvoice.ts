import { IProduct } from "./IProduct";

export interface IInvoice {
  number: number;
  recipient: string;
  date: Date;
  purchasedProducts: Array<IProduct>
}
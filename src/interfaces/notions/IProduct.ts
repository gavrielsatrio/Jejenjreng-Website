import { IRichText } from "./property-types";

export interface IProduct {
  "Price": {
    id: string;
    type: string;
    number: number;
  };
  "Name": {
    id: string;
    type: string;
    title: Array<IRichText>
  }
}
import { ICheckbox, IDate, IEmail, IFile, INumber, IPhoneNumber, IRichText, ISelect, IStatus } from "./property-types";

export interface IProperty {
  id: string;
  type: string;
  [key: string]: string | ICheckbox | Array<IRichText> | INumber | ISelect | Array<ISelect> | IStatus | IDate | IFile | IEmail | IPhoneNumber;
}
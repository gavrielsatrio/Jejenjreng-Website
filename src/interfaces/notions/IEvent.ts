import { EventType } from "@/types/EventType";
import { IDate, IRichText, ISelect } from "./property-types";

export interface IEvent {
  "Location": {
    id: string;
    type: string;
    rich_text: Array<IRichText>
  };
  "Type": {
    id: string;
    type: string;
    select: ISelect<EventType>
  };
  "Link Spreadsheet": {
    id: string;
    type: string;
    rich_text: Array<IRichText>
  };
  "Event Date": {
    id: string;
    type: string;
    date: IDate
  };
  "Link GForm": {
    id: string;
    type: string;
    rich_text: Array<IRichText>
  };
  "Name": {
    id: string;
    type: string;
    title: Array<IRichText>
  };
}
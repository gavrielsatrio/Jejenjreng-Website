import { IPage } from "@/interfaces/notions/IPage";
import { IEvent } from "@/interfaces/models/IEvent";
import { Client } from "@notionhq/client";
import { getSpreadsheetID } from "@/utils/spreadsheets/ID";
import { getOrders } from "@/utils/spreadsheets/Order";

interface EventDetailProps {
  params: Promise<{ notionPageID: string }>
}

export async function GET(request: Request, { params }: EventDetailProps) {
  const { notionPageID } = await params;

  const notion = new Client({
    auth: process.env.NOTION_BEARER_TOKEN,
    notionVersion: process.env.NOTION_VERSION
  });

  const eventPage = await notion.pages.retrieve({
    page_id: notionPageID
  }) as IPage<IEvent>;

  const spreadsheetLink = eventPage.properties['Link Spreadsheet'].rich_text.length > 0 ? eventPage.properties['Link Spreadsheet'].rich_text[0].plain_text : '';
  const spreadsheetID = getSpreadsheetID(spreadsheetLink);
  const orders = await getOrders({
    spreadsheetID,
    eventType: eventPage.properties["Type"].select.name
  });
  eventPage.properties['Orders'] = orders;

  return Response.json(eventPage);
}
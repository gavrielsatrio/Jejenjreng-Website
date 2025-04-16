import dayjs from "dayjs";
import { Client } from "@notionhq/client";

import { IPage } from "@/interfaces/notions/IPage";
import { IEvent } from "@/interfaces/models/IEvent";
import { IEvent as INotionEvent } from "@/interfaces/notions/IEvent";

import { getOrders } from "@/utils/spreadsheets/Order";
import { getDateRange } from "@/utils/notions/Date";
import { extractSpreadsheetID } from "@/utils/spreadsheets/ID";


export async function GET(request: Request) {
  const notion = new Client({
    auth: process.env.NOTION_BEARER_TOKEN,
    notionVersion: process.env.NOTION_VERSION
  });

  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Event Date',
      date: {
        on_or_after: dayjs().format('YYYY-MM-DD')
      }
    },
    sorts: [
      {
        property: 'Event Date',
        direction: 'descending'
      }
    ],
    page_size: 3
  });

  const results = response.results as Array<IPage<INotionEvent>>;
  const sanitizedResults = await Promise.all(
    results.map<Promise<IEvent>>(async eventPage => {
      const spreadsheetLink = eventPage.properties['Link Spreadsheet'].rich_text.length > 0 ? eventPage.properties['Link Spreadsheet'].rich_text[0].plain_text : '';
      const spreadsheetID = extractSpreadsheetID(spreadsheetLink);
      const orders = await getOrders({
        spreadsheetID,
        eventType: eventPage.properties["Type"].select.name
      });

      return {
        notionPageID: eventPage.id,
        name: eventPage.properties['Name'].title.reduce((prev, curr, index) => prev + curr.plain_text + (index === 0 ? '' : '\n'), ''),
        date: getDateRange(eventPage.properties["Event Date"].date, 'DD/MM/YYYY'),
        location: eventPage.properties['Location'].rich_text.reduce((prev, curr, index) => prev + curr.plain_text + (index === 0 ? '' : '\n'), ''),
        type: eventPage.properties['Type'].select.name,
        gFormLink: eventPage.properties['Link GForm'].rich_text.reduce((prev, curr, index) => prev + curr.plain_text + (index === 0 ? '' : '\n'), ''),
        spreadsheetLink: eventPage.properties['Link Spreadsheet'].rich_text.reduce((prev, curr, index) => prev + curr.plain_text + (index === 0 ? '' : '\n'), ''),
        orders
      };
    })
  );

  return Response.json(sanitizedResults);
}
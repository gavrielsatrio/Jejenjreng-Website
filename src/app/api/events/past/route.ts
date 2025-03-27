import dayjs from "dayjs";
import { Client } from "@notionhq/client";

import { getSpreadsheetID } from "@/utils/spreadsheets/ID";
import { getOrders } from "@/utils/spreadsheets/Order";

import { IPage } from "@/interfaces/notions/IPage";
import { IEvent } from "@/interfaces/models/IEvent";

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
        before: dayjs().format('YYYY-MM-DD')
      }
    },
    sorts: [
      {
        property: 'Event Date',
        direction: 'descending'
      }
    ],
    page_size: 5
  });

  let results = response.results as Array<IPage<IEvent>>;
  
  results = await Promise.all(
    results.map(async eventPage => {
      const spreadsheetLink = eventPage.properties['Link Spreadsheet'].rich_text.length > 0 ? eventPage.properties['Link Spreadsheet'].rich_text[0].plain_text : '';
      const spreadsheetID = getSpreadsheetID(spreadsheetLink);
      const orders = await getOrders({
        spreadsheetID,
        eventType: eventPage.properties["Type"].select.name
      });

      return {
        ...eventPage,
        properties: {
          ...eventPage.properties,
          "Orders": orders
        }
      };
    })
  );

  return Response.json(results);
}
import dayjs from "dayjs";
import { Client } from "@notionhq/client";

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

  const results = response.results as Array<IPage<IEvent>>;

  return Response.json(results);
}
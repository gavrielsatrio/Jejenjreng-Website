import { Client } from "@notionhq/client";

import { IPage } from "@/interfaces/notions/IPage";
import { IProduct } from "@/interfaces/models/IProduct";
import { IProduct as INotionProduct } from "@/interfaces/notions/IProduct";

interface EventDetailProps {
  params: Promise<{ notionPageID: string }>
}

export async function GET(request: Request, { params }: EventDetailProps) {
  const { notionPageID } = await params;

  const notion = new Client({
    auth: process.env.NOTION_BEARER_TOKEN,
    notionVersion: process.env.NOTION_VERSION
  });

  const notionPageChildren = await notion.blocks.children.list({
    block_id: notionPageID
  });

  if(notionPageChildren.results.length === 0) {
    return Response.json([]);
  }

  const productsNotionDatabaseID = notionPageChildren.results[0].id;

  const productsNotionTable = await notion.databases.query({
    database_id: productsNotionDatabaseID
  });

  const products = productsNotionTable.results as Array<IPage<INotionProduct>>;
  const sanitizedProducts = products.map<IProduct>((product) => ({
    name: product.properties['Name'].title.reduce((prev, curr, index) => prev + curr.plain_text + (index === 0 ? '' : '\n'), ''),
    price: product.properties['Price'].number
  }))

  return Response.json(sanitizedProducts);
}
import { NextRequest } from "next/server";

import { getOrders, updateOrderStatus } from "@/utils/spreadsheets/Order";

interface OrdersProps {
  params: Promise<{ spreadsheetID: string }>
}

interface OrderPostBody {
  rowNo: number;
  status: string;
}

export async function GET(request: NextRequest, { params }: OrdersProps) {
  const { spreadsheetID } = await params;
  const searchParams = request.nextUrl.searchParams;
  const eventType = searchParams.get('eventType');

  if(eventType === null) {
    return Response.json('Please specify the event type');
  }
  
  const response = await getOrders({ spreadsheetID, eventType });
  return Response.json(response);
}

export async function POST(request: Request, { params }: OrdersProps) {
  const { spreadsheetID } = await params;
  
  const body = await request.json() as OrderPostBody;
  await updateOrderStatus({ ...body, spreadsheetID: spreadsheetID });

  return Response.json('Success');
}
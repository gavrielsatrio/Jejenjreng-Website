import { EventType } from "@/types/EventType";
import { NextRequest } from "next/server";

import { getOrders, updateOrderStatus } from "@/utils/spreadsheets/Order";

interface OrderDetailProps {
  params: Promise<{ spreadsheetID: string }>
}

interface OrderDetailPostBody {
  rowNo: number;
  status: string;
}

export async function GET(request: NextRequest, { params }: OrderDetailProps) {
  const { spreadsheetID } = await params;
  const searchParams = request.nextUrl.searchParams;
  const eventType = searchParams.get('eventType') as EventType;
  
  const response = await getOrders({ spreadsheetID, eventType });
  return Response.json(response);
}

export async function POST(request: Request, { params }: OrderDetailProps) {
  const { spreadsheetID } = await params;
  
  const body = await request.json() as OrderDetailPostBody;
  const response = await updateOrderStatus({ ...body, spreadsheetID: spreadsheetID });

  return Response.json(response);
}
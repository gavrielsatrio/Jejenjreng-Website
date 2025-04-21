import { NextRequest } from "next/server";

import { getOrder } from "@/utils/spreadsheets/Order";

interface OrderDetailProps {
  params: Promise<{
    spreadsheetID: string;
    rowNo: number;
  }>
}

export async function GET(request: NextRequest, { params }: OrderDetailProps) {
  const { spreadsheetID, rowNo } = await params;
  const searchParams = request.nextUrl.searchParams;
  const eventType = searchParams.get('eventType');

  if(eventType === null) {
    return Response.json('Please specify the event type');
  }
  
  const response = await getOrder({ spreadsheetID, eventType, rowNo });
  return Response.json(response);
}
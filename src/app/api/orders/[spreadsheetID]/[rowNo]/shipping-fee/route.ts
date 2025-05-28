import { updateOrderShippingFee } from "@/utils/spreadsheets/Order";
import { NextRequest } from "next/server";

interface OrderDetailProps {
  params: Promise<{
    spreadsheetID: string;
    rowNo: number;
  }>
}

interface OrderShippingFeeBody {
  shippingFee: number;
}

export async function PUT(request: NextRequest, { params }: OrderDetailProps) {
  const { spreadsheetID, rowNo } = await params;

  const body = await request.json() as OrderShippingFeeBody;
  await updateOrderShippingFee({ spreadsheetID, rowNo, ...body });

  return Response.json('Success');
}
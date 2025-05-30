import { NextRequest } from "next/server";
import { sendInvoiceEmail } from "@/utils/mails";

interface InvoiceBody {
  recipient: string;
  subject: string;
  invoiceImage: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json() as InvoiceBody;
  await sendInvoiceEmail({
    ...body
  });

  return Response.json('Success');
}
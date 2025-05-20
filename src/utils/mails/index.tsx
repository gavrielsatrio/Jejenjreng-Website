'use server'

import nodemailer from 'nodemailer';
import { render } from '@react-email/render';

import InvoiceMail from '@/mails/invoice';

interface InvoiceEmailProps {
  recipient: string;
  subject: string;
  invoiceImage: string;
}

async function sendInvoiceEmail({ recipient, subject, invoiceImage }: InvoiceEmailProps) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_ACCOUNT_USER,
      pass: process.env.GOOGLE_ACCOUNT_PASSWORD
    }
  });

  await transporter.sendMail({
    from: 'Jejenjreng <jejegenjang@gmail.com>',
    to: recipient,
    subject,
    html: await render(<InvoiceMail/>),
    attachments: [
      {
        cid: 'invoice_image',
        filename: 'Invoice.png',
        path: invoiceImage
      },
      {
        cid: 'jejenjreng_logotype',
        filename: 'logotype.png',
        path: `${process.env.WEBSITE_URL}/assets/jejenjreng-logotype.png`
      },
      {
        cid: 'check_image',
        filename: 'check.png',
        path: `${process.env.WEBSITE_URL}/assets/check.png`
      }
    ]
  });
}

export { sendInvoiceEmail }
'use server'

import nodemailer from 'nodemailer';

interface InvoiceEmailProps {
  recipient: string;
  subject: string;
  htmlBody: string;
  invoiceImage: string;
}

function useMailer() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'jejegenjang@gmail.com',
      serviceClient: process.env.SPREADSHEET_SERVICE_ACCOUNT_CLIENT_ID,
      privateKey: process.env.SPREADSHEET_SERVICE_ACCOUNT_PRIVATE_KEY
    }
  });

  const sendInvoiceEmail = async ({ recipient, subject, htmlBody, invoiceImage }: InvoiceEmailProps) => {
    await transporter.sendMail({
      from: 'Jejenjreng <jejenjreng@gmail.com>',
      to: recipient,
      subject,
      html: htmlBody,
      attachments: [
        {
          cid: 'invoice_image',
          filename: 'Invoice.png',
          path: invoiceImage
        }
      ]
    });
  }

  return {
    sendInvoiceEmail
  }
}

export { useMailer }
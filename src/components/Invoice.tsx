'use client'

import dayjs from "dayjs";
import numeral from "numeral"
import html2canvas from "html2canvas-pro";
import { Fragment, useEffect, useRef } from "react"

import { getProducts } from "@/slices/products/selector";
import { useAppSelector } from "@/hooks/useAppSelector";
import { sendInvoiceEmail } from "@/utils/mails";

import { EventType } from "@/enums/EventType";
import { IPurchasedProduct } from "@/interfaces/models/IPurchasedProduct";
import { INVOICE_ACCOUNT_NO, INVOICE_BANK_NAME, INVOICE_EMAIL, INVOICE_PHONE_NO } from "@/configs/apps/Invoice";

interface InvoiceProps extends React.HTMLAttributes<HTMLDivElement> {
  eventName: string;
  eventType: string;
  recipient: string;
  recipientEmail: string;
  orderNumber: number;
  purchasedProducts: Array<IPurchasedProduct>;
  shippingExpedition?: string;
  shippingFee?: number;
  onFinishGenerated?: () => void;
}

function Invoice({
  className,
  eventName,
  eventType,
  recipient,
  orderNumber,
  recipientEmail,
  shippingFee = 0,
  purchasedProducts,
  shippingExpedition,
  onFinishGenerated = () => { }
}: InvoiceProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const products = useAppSelector(getProducts);

  const packagingFee = 10000;
  let totalPrice = shippingFee + (eventType === EventType.MAIL_ORDER ? packagingFee : 0);

  const saveInvoice = async () => {
    if (!invoiceRef.current || !invoiceRef) {
      return;
    }

    // Scale the canvas into A5 width
    const canvas = await html2canvas(invoiceRef.current!, {
      logging: false,
      scale: 3.6904761905,
    });

    const dataURL = canvas.toDataURL("image/jpeg");

    await sendInvoiceEmail({
      recipient: recipientEmail,
      subject: `Jejenjreng's ${eventName} PO`,
      invoiceImage: dataURL
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `INVOICE-${eventName.toUpperCase()}-${recipient.toUpperCase()}.jpeg`;
    link.click();

    onFinishGenerated();
  }

  useEffect(() => {
    saveInvoice();
  }, []);

  return (
    <div className={`absolute w-2xl bg-primary px-6 py-10 overflow-hidden ${className}`} ref={invoiceRef}>
      <img src="/assets/jeje2.png" loading="lazy" alt="Fox Image" className="absolute -bottom-20 -left-8 z-10 w-1/2 object-contain object-right" />
      <img src="/assets/ornament-transparent.png" loading="lazy" alt="Ornament Image" className="absolute top-0 right-0 z-0 h-80 translate-x-1/2 -translate-y-1/3" />
      <img src="/assets/ornament-transparent.png" loading="lazy" alt="Ornament Image" className="absolute bottom-0 left-0 z-0 h-[30rem] -translate-x-1/2 translate-y-8" />
      <img src="/assets/ornament2-transparent.png" loading="lazy" alt="Ornament Image" className="absolute top-0 left-0 z-10 size-24" />

      <div className="relative bg-secondary-lighter rounded-3xl flex flex-col p-6 tracking-widest z-30">
        <img src="/assets/ornament2-transparent.png" loading="lazy" alt="Ornament Image" className="absolute bottom-0 right-0 z-10 size-24 translate-x-1/4 translate-y-1/2" />

        <div className="font-shrikhand flex justify-between items-center uppercase">
          <h3 className="text-2xl text-primary font-shrikhand">INVOICE</h3>
          <p className="text-primary-light text-xs">JEJENJRENG&apos;s {eventName} inv.</p>
        </div>
        <hr className="border-secondary-dark my-2" />
        <div className="flex items-center justify-between py-8 px-4 font-hammersmith-one text-xs uppercase">
          <div className="flex flex-col gap-y-2 max-w-1/2">
            <p className="text-primary-light">INVOICE TO</p>
            <p className="text-primary">{recipient}</p>
            <p className="text-primary-light">NO.{orderNumber}</p>
          </div>
          <div className="flex flex-col max-w-1/2">
            <p className="text-primary-light">DATE: {dayjs().format('DD MMMM YYYY')}</p>
          </div>
        </div>
        <hr className="border-secondary-dark my-2" />
        <div className="grid grid-cols-3 uppercase font-shrikhand tracking-normal text-sm text-primary text-center px-4 py-2">
          <div className="col-span-1">DESCRIPTION</div>
          <div className="col-span-1">PRICE</div>
          <div className="col-span-1">SUBTOTAL</div>
        </div>
        <hr className="border-secondary-dark my-2" />
        <div className="grid grid-cols-3 gap-y-4 text-primary-light font-hammersmith-one text-xs text-center p-4 tracking-normal">
          {purchasedProducts.map((purchasedProduct, index) => {
            const product = products.find(product => product.name === purchasedProduct.name);
            let productPrice = 0;

            if (product) {
              productPrice = product.price;
            }

            totalPrice += productPrice * purchasedProduct.qty;

            return (
              <Fragment key={index}>
                <div className="col-span-1">{purchasedProduct.name}</div>
                <div className="col-span-1">{productPrice / 1000}k X {purchasedProduct.qty}</div>
                <div className="col-span-1">{productPrice * purchasedProduct.qty / 1000}k</div>
              </Fragment>
            )
          })}
        </div>
        <hr className="border-secondary-dark my-2" />
        {eventType === EventType.MAIL_ORDER && (
          <div className="grid grid-cols-3 gap-y-4 text-primary-light font-hammersmith-one text-xs text-center p-4 tracking-normal">
            <div className="col-span-1">
              Packaging Fee
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1">{packagingFee / 1000}k</div>

            <div className="col-span-1">
              Shipping Fee
              <br />
              ({shippingExpedition})
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1">{shippingFee / 1000}k</div>
          </div>
        )}
        <div className="py-4 font-shrikhand text-right">
          <p className="text-primary">
            <span className="text-primary-light me-6"> Total:</span>
            IDR{numeral(totalPrice).format('0,0').replace(',', '.')},-
          </p>
        </div>
      </div>

      <div className="relative mt-16 flex flex-col justify-end items-end mx-12">
        <h3 className="text-5xl font-shrikhand w-fit text-secondary-lighter tracking-widest leading-10">Terima<br />Kasih!</h3>
        <div className="w-3/4 rounded-s-3xl bg-secondary-lighter -mx-18 mt-8 py-6 ps-10 tracking-wide">
          <h4 className="text-primary font-shrikhand">Payment details</h4>
          <div className="grid grid-cols-2 gap-2 text-primary-light font-hammersmith-one text-xs mt-2">
            <p className="col-span-1">Bank Name: <br />{INVOICE_BANK_NAME}</p>
            <p className="col-span-1">Email: <br />{INVOICE_EMAIL}</p>
            <p className="col-span-1">Account No: <br />{INVOICE_ACCOUNT_NO}</p>
            <p className="col-span-1">Phone No: <br />{INVOICE_PHONE_NO}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Invoice }
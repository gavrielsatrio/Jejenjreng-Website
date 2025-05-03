import dayjs from "dayjs";
import Image from "next/image"
import numeral from "numeral"
import html2canvas from "html2canvas";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Fragment, useEffect, useRef } from "react"

import { getProducts } from "@/slices/products/selector";
import { IPurchasedProduct } from "@/interfaces/models/IPurchasedProduct";

interface InvoiceProps extends React.HTMLAttributes<HTMLDivElement> {
  eventName: string;
  recipient: string;
  orderNumber: number;
  purchasedProducts: Array<IPurchasedProduct>;
  onFinishGenerated?: () => void;
}

function Invoice({
  eventName,
  recipient,
  orderNumber,
  purchasedProducts,
  className,
  onFinishGenerated = () => { }
}: InvoiceProps) {
  const invoiceRef = useRef(null);
  const products = useAppSelector(getProducts);

  let totalPrice = 0;

  const saveInvoice = async () => {
    if (!invoiceRef) {
      return;
    }

    // Scale the canvas into A5 width
    const canvas = await html2canvas(invoiceRef.current!, {
      logging: false,
      scale: 3.6904761905
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL("image/jpeg");
    link.download = `${recipient}-${eventName}.jpg`;
    link.click();

    onFinishGenerated();
  }

  useEffect(() => {
    saveInvoice();
  }, []);

  return (
    <div className={`absolute w-2xl bg-[#30373d] px-6 py-10 overflow-hidden ${className}`} ref={invoiceRef}>
      <Image width={2048} height={1454} alt="Fox Image" src="/assets/fox-transparent.png" className="absolute bottom-4 -left-20 z-10 h-72 w-5/8 object-contain object-left" />
      <Image width={547} height={456} alt="Ornament Image" src="/assets/ornament-transparent.png" className="absolute top-0 right-0 z-0 h-80 translate-x-1/2 -translate-y-1/3" />
      <Image width={547} height={456} alt="Ornament Image" src="/assets/ornament-transparent.png" className="absolute bottom-0 left-0 z-0 h-1/2 -translate-x-1/2 translate-y-8" />
      <Image width={150} height={150} alt="Ornament Image" src="/assets/ornament2-transparent.png" className="absolute top-0 left-0 z-10 size-24" />

      <div className="relative bg-[#fcf9e9] rounded-3xl flex flex-col p-6 tracking-widest">
        <Image width={150} height={150} alt="Ornament Image" src="/assets/ornament2-transparent.png" className="absolute bottom-0 right-0 z-10 size-24 translate-x-1/4 translate-y-1/2" />

        <div className="font-shrikhand flex justify-between items-center uppercase">
          <h3 className="text-2xl text-[#dd5e57] font-shrikhand">INVOICE</h3>
          <p className="text-[#27589f] text-xs">JEJENJRENG&apos;s {eventName} inv.</p>
        </div>
        <hr className="border-[#d2a879] my-2" />
        <div className="flex items-center justify-between py-8 px-4 font-hammersmith-one text-xs uppercase">
          <div className="flex flex-col gap-y-2 max-w-1/2">
            <p className="text-[#27589f]">INVOICE TO</p>
            <p className="text-[#dd5e57]">{recipient}</p>
            <p className="text-[#27589f]">NO.{orderNumber}</p>
          </div>
          <div className="flex flex-col gap-y-2 max-w-1/2">
            <p className="text-[#27589f]">DATE: {dayjs().format('DD MMMM YYYY')}</p>
          </div>
        </div>
        <hr className="border-[#d2a879] my-2" />
        <div className="grid grid-cols-3 uppercase font-shrikhand tracking-normal text-sm text-[#dd5e57] text-center px-4 py-2">
          <div className="col-span-1">DESCRIPTION</div>
          <div className="col-span-1">PRICE</div>
          <div className="col-span-1">SUBTOTAL</div>
        </div>
        <hr className="border-[#d2a879] my-2" />
        <div className="grid grid-cols-3 gap-y-4 text-[#27589f] font-hammersmith-one text-xs text-center px-4 py-8 tracking-normal">
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
                <div className="col-span-1">{productPrice} X {purchasedProduct.qty}</div>
                <div className="col-span-1">{productPrice * purchasedProduct.qty}k</div>
              </Fragment>
            )
          })}
        </div>
        <hr className="border-[#d2a879] my-2" />
        <div className="py-4 font-shrikhand text-right">
          <p className="text-[#dd5e57]">
            <span className="text-[#27589f] me-6"> Total:</span>
            IDR{numeral(totalPrice).format('0,0').replace(',', '.')},-
          </p>
        </div>
      </div>

      <div className="mt-16 flex flex-col justify-end items-end mx-12">
        <h3 className="text-5xl font-shrikhand w-fit text-[#fcf9e9] tracking-widest leading-10">Terima<br />Kasih!</h3>
        <div className="w-3/4 rounded-s-3xl bg-[#fcf9e9] -mx-18 mt-8 py-6 ps-16 tracking-wide">
          <h4 className="text-[#dd5e57] font-shrikhand">Payment details</h4>
          <div className="grid grid-cols-2 gap-2 text-[#27589f] font-hammersmith-one text-xs mt-2">
            <p className="col-span-1">Bank Name: <br />BCA a.n. Hisana</p>
            <p className="col-span-1">Email: <br />jejenjreng@gmail.com</p>
            <p className="col-span-1">Account No: <br />7401937939</p>
            <p className="col-span-1">Phone No: <br />+6287748274701</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Invoice }
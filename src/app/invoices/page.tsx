import { useState, Fragment } from "react";
import dayjs from "dayjs";
import numeral from "numeral";

import fox from '@/assets/fox-transparent.png';
import ornament from '@/assets/ornament-transparent.png'
import ornament2 from '@/assets/ornament2-transparent.png';

import { IInvoice } from "@/interfaces/models/IInvoice";

function Invoice() {
  const [data] = useState<IInvoice>({
    number: 1,
    recipient: 'Gavriel',
    date: new Date('2025-03-18'),
    purchasedProducts: [
      {
        description: 'Totebag | Zayyin Matcha',
        price: 110000,
        quantity: 1
      },
      {
        description: 'Totebag | Zayyin Matcha',
        price: 110000,
        quantity: 1
      },
    ]
  });

  return (
    <div className="relative w-2xl bg-[#30373d] px-6 py-10 overflow-hidden">
      <img src={fox} className="absolute bottom-4 -left-16 z-10 h-72" />
      <img src={ornament} className="absolute top-0 right-0 z-0 h-80 translate-x-1/2 -translate-y-1/3" />
      <img src={ornament} className="absolute bottom-0 left-0 z-0 h-1/2 -translate-x-1/2 translate-y-8" />
      <img src={ornament2} className="absolute top-0 left-0 z-10 size-24" />

      <div className="relative bg-[#fcf9e9] rounded-3xl flex flex-col p-6 tracking-widest">
        <img src={ornament2} className="absolute bottom-0 right-0 z-10 size-24 translate-x-1/4 translate-y-1/2" />

        <div className="font-[Shrikhand] flex justify-between items-center uppercase">
          <h3 className="text-2xl text-[#dd5e57] font-[Shrikhand]">INVOICE</h3>
          <p className="text-[#27589f] text-xs">JEJENJRENG's cf-18 pickup inv.</p>
        </div>
        <hr className="border-[#d2a879] my-2" />
        <div className="flex items-center justify-between py-8 px-4 font-[Hammersmith_One] text-xs uppercase">
          <div className="flex flex-col gap-y-2 max-w-1/2">
            <p className="text-[#27589f]">INVOICE TO</p>
            <p className="text-[#dd5e57]">{data.recipient}</p>
            <p className="text-[#27589f]">NO.{data.number.toString().padStart(2, '0')}</p>
          </div>
          <div className="flex flex-col gap-y-2 max-w-1/2">
            <p className="text-[#27589f]">DATE: {dayjs(data.date).format('DD MMMM YYYY')}</p>
          </div>
        </div>
        <hr className="border-[#d2a879] my-2" />
        <div className="grid grid-cols-3 uppercase font-[Shrikhand] tracking-normal text-sm text-[#dd5e57] text-center px-4 py-2">
          <div className="col-span-1">DESCRIPTION</div>
          <div className="col-span-1">PRICE</div>
          <div className="col-span-1">SUBTOTAL</div>
        </div>
        <hr className="border-[#d2a879] my-2" />
        <div className="grid grid-cols-3 gap-y-4 text-[#27589f] font-[Hammersmith_One] text-xs text-center px-4 py-8 tracking-normal">
          {data.purchasedProducts.map((product, index) => (
            <Fragment key={index}>
              <div className="col-span-1">{product.description}</div>
              <div className="col-span-1">{product.price / 1000} X {product.quantity}</div>
              <div className="col-span-1">{(product.price * product.quantity) / 1000}k</div>
            </Fragment>
          ))}
        </div>
        <hr className="border-[#d2a879] my-2" />
        <div className="py-4 font-[Shrikhand] text-right">
          <p className="text-[#dd5e57]"><span className="text-[#27589f] me-6">Total:</span> IDR{numeral(data.purchasedProducts.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0)).format('0,0').replace(',', '.')},-</p>
        </div>
      </div>

      <div className="mt-16 flex flex-col justify-end items-end mx-12">
        <h3 className="text-5xl font-[Shrikhand] w-fit text-[#fcf9e9] tracking-widest leading-10">Terima<br />Kasih!</h3>
        <div className="w-3/4 rounded-s-3xl bg-[#fcf9e9] -mx-18 mt-8 py-6 ps-16 tracking-wide">
          <h4 className="text-[#dd5e57] font-[Shrikhand]">Payment details</h4>
          <div className="grid grid-cols-2 gap-2 text-[#27589f] font-[Hammersmith_One] text-xs mt-2">
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

export default Invoice;
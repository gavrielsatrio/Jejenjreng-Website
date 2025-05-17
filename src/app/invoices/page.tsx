'use client';

import { Invoice } from "@/components/Invoice";
import { IPurchasedProduct } from "@/interfaces/models/IPurchasedProduct";

function InvoicePage() {
  const purchasedProducts: Array<IPurchasedProduct> = [
    {
      name: 'asdf',
      qty: 1,
    },
    {
      name: 'asdf',
      qty: 1,
    },
    {
      name: 'asdf',
      qty: 1,
    }
  ]

  return (
    <Invoice eventName={`Jejenjreng's CFXX Pickup Inv.`} orderNumber={1} purchasedProducts={purchasedProducts} recipient={'Test'} recipientEmail={'test@gmail.com'}/>
  )
}

export default InvoicePage;
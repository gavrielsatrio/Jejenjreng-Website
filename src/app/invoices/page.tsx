'use client';

import { Invoice } from "@/components/Invoice";
import { EventType } from "@/enums/EventType";
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
    <Invoice eventType={EventType.MAIL_ORDER} eventName={'CFXX Pickup'} orderNumber={1} purchasedProducts={purchasedProducts} recipient={'Test'} recipientEmail={'test@gmail.com'} shippingExpedition={'JNE REG'}/>
  )
}

export default InvoicePage;
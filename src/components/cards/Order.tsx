'use client'

import numeral from "numeral"
import classNames from "classnames"

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"

import { getProducts } from "@/slices/products/selector"
import { updateOrderShippingFee, updateOrderStatus } from "@/slices/orders"
import { getEvent, getSpreadsheetID } from "@/slices/event/selector"

import { IOrder } from "@/interfaces/models/IOrder"

import { Badge } from "@/components/Badge"
import { Invoice } from "@/components/Invoice"
import { EventType } from "@/enums/EventType"
import { OrderStatus } from "@/enums/OrderStatus"
import { ShippingInfo } from "@/components/ShippingInfo"
import { Check, Close, Envelope, Loader, Map, Phone, Receipt, Truck } from "@/icons"

interface OrderProps {
  order: IOrder;
}

function Order({ order }: OrderProps) {
  const dispatch = useAppDispatch();

  let totalPrice = 0;

  const event = useAppSelector(getEvent);
  const products = useAppSelector(getProducts);
  const eventSpreadsheetID = useAppSelector(getSpreadsheetID);

  const shippingFeeInput = useRef<HTMLInputElement>(null);

  const [shippingFee, setShippingFee] = useState('0');
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isShippingInfoOpen, setShippingInfoOpen] = useState(false);
  const [isShippingFeeLoading, setIsShippingFeeLoading] = useState(false);
  const [isOrderStatusLoading, setIsOrderStatusLoading] = useState(false);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [isShippingFeeUpdatable, setIsShippingFeeUpdatable] = useState(false);
  const [isPurchasedProductsVisible, setIsPurchasedProductsVisible] = useState(false);


  const toggleStatusModal = () => {
    setIsStatusModalVisible(prev => !prev);
  }

  const togglePurchasedProducts = () => {
    setIsPurchasedProductsVisible(prev => !prev);
  }

  const toggleUpdateShippingFee = () => {
    setIsShippingFeeUpdatable(prev => !prev);
  }

  const handleUpdateStatus = async (status: string) => {
    if (isOrderStatusLoading) {
      return;
    }

    setIsStatusModalVisible(false);
    setIsOrderStatusLoading(true);

    await dispatch(updateOrderStatus({
      spreadsheetID: eventSpreadsheetID,
      rowNo: order.rowNo,
      status
    }));

    setIsOrderStatusLoading(false);
  }

  const handleShippingFeeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const shippingFeeNumeral = Number(e.target.value.replace('.', ''));
    setShippingFee(shippingFeeNumeral.toString());
  }

  const handleUpdateShippingFee = async () => {
    if (isShippingFeeLoading) {
      return;
    }

    setIsShippingFeeUpdatable(false);
    setIsShippingFeeLoading(true);

    await dispatch(updateOrderShippingFee({
      spreadsheetID: eventSpreadsheetID,
      rowNo: order.rowNo,
      shippingFee: Number(shippingFee)
    }));

    setIsShippingFeeLoading(false);
  }

  const handleOpenInvoice = () => {
    if (isInvoiceOpen) {
      return;
    }

    setIsInvoiceOpen(true);
  }

  const handleOpenShippingInfo = () => {
    setShippingInfoOpen(true);
  }

  useEffect(() => {
    if (event.type === EventType.MAIL_ORDER && order.shippingFee) {
      setShippingFee(order.shippingFee.toString());
    }
  }, []);

  useEffect(() => {
    if (isShippingFeeUpdatable && shippingFeeInput.current) {
      shippingFeeInput.current.focus();
    }
  }, [isShippingFeeUpdatable]);

  return (
    <div className={classNames("rounded-lg shadow-md bg-secondary-lighter p-5 md:p-6 flex flex-col gap-x-6 relative h-fit overflow-hidden", {
      'md:min-h-[316px]': event.type === EventType.MAIL_ORDER,
      'md:min-h-[268px]': event.type === EventType.PICK_UP
    })}>
      <div className="relative flex gap-x-2 justify-between">
        <div className="grow">
          <h3 className="font-bold text-lg text-primary">{order.customer}</h3>
          <p className="text-xs md:text-sm text-primary-light">placed order at {order.timestamp}</p>
        </div>
        <Badge
          onClick={toggleStatusModal}
          loading={isOrderStatusLoading}
          className={classNames('font-semibold italic self-start flex-none cursor-pointer', {
            'bg-red-500/20 text-red-500 fill-red-500 hover:bg-red-600/20 hover:text-red-600 hover:fill-red-600': order.status === OrderStatus.PENDING,
            'bg-blue-500/20 text-blue-500 fill-blue-500 hover:bg-blue-600/20 hover:text-blue-600 hover:fill-blue-600': order.status === OrderStatus.PAID,
            'bg-amber-500/20 text-amber-500 fill-amber-500 hover:bg-amber-600/20 hover:text-amber-600 hover:fill-amber-600': order.status === OrderStatus.INVOICE_SENT,
            'bg-yellow-900/20 text-yellow-900 fill-yellow-900 hover:bg-yellow-950/20 hover:text-yellow-950 hover:fill-yellow-950': order.status === OrderStatus.PACKED,
            'bg-emerald-500/20 text-emerald-500 fill-emerald-500 hover:bg-emerald-600/20 hover:text-emerald-600 hover:fill-emerald-600': order.status === OrderStatus.DELIVERED,
          })}
        >
          {order.status}
        </Badge>

        {isStatusModalVisible && (
          <div className="flex flex-col bg-secondary-lighter border border-[#C8C8C8] absolute top-0 right-0 p-3 rounded-sm max-w-3/4">
            <p className="text-sm font-semibold">Select order status:</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {Object.values(OrderStatus).map((status, index) => (
                <Badge
                  key={index}
                  onClick={() => handleUpdateStatus(status)}
                  className={classNames('font-semibold italic self-start flex-none cursor-pointer', {
                    'bg-red-500/20 text-red-500 hover:bg-red-600/20 hover:text-red-600': status === OrderStatus.PENDING,
                    'bg-blue-500/20 text-blue-500 hover:bg-blue-600/20 hover:text-blue-600': status === OrderStatus.PAID,
                    'bg-yellow-900/20 text-yellow-900 hover:bg-yellow-950/20 hover:text-yellow-950': status === OrderStatus.PACKED,
                    'bg-amber-500/20 text-amber-500 hover:bg-amber-600/20 hover:text-amber-600': status === OrderStatus.INVOICE_SENT,
                    'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-600/20 hover:text-emerald-600': status === OrderStatus.DELIVERED,
                  })}
                >
                  {status}
                </Badge>
              ))}
            </div>

            <Close className="fill-black/60 hover:fill-black/75 size-4 flex-none absolute top-3 right-3 cursor-pointer" onClick={toggleStatusModal} />
          </div>
        )}
      </div>

      <div className="flex items-center gap-x-2 mt-4">
        <Envelope className="fill-primary-light size-3 md:size-4 flex-none" />
        <p className="text-primary-light text-xs md:text-sm">{order.email}</p>
      </div>
      <div className="flex items-center gap-x-2 mt-2">
        <Phone className="fill-primary-light size-3 md:size-4 flex-none" />
        <p className="text-primary-light text-xs md:text-sm">{order.phoneNumber}</p>
      </div>
      <div className="flex items-center gap-x-2 mt-2">
        <Map className="fill-primary-light size-3 md:size-4 flex-none" />
        <p className="text-primary-light text-xs md:text-sm">{order.address}</p>
      </div>
      {event.type === EventType.MAIL_ORDER && (
        <div className="flex items-center gap-x-2 mt-2">
          <Truck className="fill-primary-light size-3 md:size-4 flex-none" />
          <div className="text-primary-light text-xs md:text-sm">
            {isShippingFeeLoading ? (
              <Loader className="fill-primary-light size-3.5 md:size-5 animate-spin duration-1000" />
            ) : isShippingFeeUpdatable ? (
              <form className="flex items-center gap-x-2 border rounded-sm border-primary" onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                handleUpdateShippingFee();
              }}>
                <input type="text" className="focus:outline-0 p-2" value={numeral(shippingFee).format('0,0').replace(',', '.')} onChange={handleShippingFeeChange} ref={shippingFeeInput} />
                <Check className="fill-primary size-5 cursor-pointer" onClick={handleUpdateShippingFee} />
                <Close className="fill-primary size-5 cursor-pointer" onClick={toggleUpdateShippingFee} />
              </form>
            ) : (
              <>
                <p>IDR {numeral(shippingFee).format('0,0').replace(',', '.')},-</p>
                {order.status === OrderStatus.PENDING && (
                  <button className="block underline cursor-pointer font-medium hover:text-primary" onClick={toggleUpdateShippingFee}>Update Shipping Fee</button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <div className="grow flex items-end">
        <div className="flex w-full items-center justify-between mt-6">
          <Badge className="relative bg-orange-500/20 text-orange-500 hover:bg-orange-600/20 hover:text-orange-600 font-semibold cursor-pointer" onClick={togglePurchasedProducts}>
            {order.purchasedProducts.reduce((prev, curr) => (prev + curr.qty), 0)} items
          </Badge>
          <div className="flex items-center gap-x-2">
            {event.type === EventType.MAIL_ORDER && order.status === OrderStatus.PACKED && (
              <button className="flex items-center gap-x-2 px-4 py-2 text-sm font-bold bg-blue-800 hover:bg-blue-900 rounded-full text-white cursor-pointer" onClick={handleOpenShippingInfo}>
                {isShippingInfoOpen ? (
                  <Loader className="size-3.5 md:size-5 fill-white animate-spin duration-1000" />
                ) : (
                  <>
                    <Truck className="fill-white size-5" />
                    <span>Shipping Info</span>
                  </>
                )}
              </button>
            )}

            {order.status === OrderStatus.PENDING && (
              <button className="flex items-center gap-x-2 px-4 py-2 text-xs md:text-sm font-bold bg-emerald-500 hover:bg-emerald-600 rounded-full text-white cursor-pointer" onClick={handleOpenInvoice} disabled={isInvoiceOpen}>
                {isInvoiceOpen ? (
                  <Loader className="size-3.5 md:size-5 fill-white animate-spin duration-1000" />
                ) : (
                  <>
                    <Receipt className="fill-white size-3.5 md:size-5" />
                    <span>Send Invoice</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {isPurchasedProductsVisible && (
        <>
          <h4 className="text-primary text-sm md:text-base font-bold w-fit mt-4">Purchased Products:</h4>
          {order.purchasedProducts.map(purchasedProduct => {
            const product = products.find(product => product.name === purchasedProduct.name);
            let productPrice = 0;

            if (product) {
              productPrice = product.price;
            }

            totalPrice += productPrice * purchasedProduct.qty;

            return (
              <p key={purchasedProduct.name} className="text-xs md:text-sm text-primary-light mt-1">{purchasedProduct.qty}x {purchasedProduct.name}</p>
            )
          })}
          <h5 className="text-xs md:text-sm font-medium text-primary-light mt-2">Total: IDR {numeral(totalPrice).format('0,0').replace(',', '.')},-</h5>
        </>
      )}

      {isInvoiceOpen && (
        <Invoice className="top-0 left-0 -z-10" eventType={event.type} eventName={`${event.name} ${event.type}`} orderNumber={order.rowNo - 1} purchasedProducts={order.purchasedProducts} recipient={order.customer} recipientEmail={order.email} shippingFee={order.shippingFee} shippingExpedition={order.shippingExpedition} onFinishGenerated={async () => {
          await handleUpdateStatus(OrderStatus.INVOICE_SENT);
          setIsInvoiceOpen(false);
        }} key={order.timestamp} />
      )}

      {isShippingInfoOpen && (
        <ShippingInfo eventName={`${event.name} ${event.type}`} recipient={order.customer} address={order.address} phoneNumber={order.phoneNumber} className="top-0 left-0 -z-10" onFinishGenerated={() => setShippingInfoOpen(false)} />
      )}
    </div>
  )
}

export { Order }